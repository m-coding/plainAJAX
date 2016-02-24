/** this is still a work in progress **/

/**
 * Notes:
 * Since I'm not using jQuery, here's a vanilla javascript
 * AJAX object with methods to get JSON data.
 *
 * If the browser supports the json responseType property,
 * then we don't need to do JSON.parse.
 */
var AJAX = (function(){

    var that = {};

    that.xhr = null;

    that.isJSONSupported = function () {
        // credit: https://mathiasbynens.be/notes/xhr-responsetype-json
        if (typeof XMLHttpRequest == 'undefined') {
            return false;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('get', '/', true);
        try {
            // some browsers throw when setting `responseType` to an unsupported value
            xhr.responseType = 'json';
        } catch(error) {
            return false;
        }
        return 'response' in xhr && xhr.responseType == 'json';
    }; // supportsJSON

    that.request = function(url, method, data, success, fail) {
        if(!this.xhr) this.xhr = new XMLHttpRequest();

        var self = this.xhr;

        // Called when the request succeeds
        self.onload = function(e) {
            var result = '';

            if(e.target.responseType === 'json') {
                result = e.target.response;
                success(result);
            } else {
                result = JSON.parse(e.target.responseText);
                success(result);
            }

            if(window.console) console.log('onload event called with status: ' + e.target.status + ' ' + e.target.statusText);

        }; // onload

        // Called when a resource failed to load
        self.error = function() {
            fail();
            if(window.console) console.log('error event called with status: ' + self.status + ' ' + self.statusText);
        };

        // Called when property readyState of XMLHttpRequest (self) changes
        self.onreadystatechange = function() {
            var desc = '';
            // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
            switch (self.readyState) {
            case 0: desc = 'UNSENT'; break;
            case 1: desc = 'OPENED'; break;
            case 2: desc = 'HEADERS_RECEIVED'; break;
            case 3: desc = 'LOADING'; break;
            case 4: desc = 'DONE'; break;
            }

            // Only print msg if the console exists
            if(window.console) console.log('onreadystatechange event called with readyState: ' + desc);

        }; // onreadystatechange

        that.supportsJSON = that.isJSONSupported();

        if(that.supportsJSON) {
           that.xhr.responseType = 'json';
        }

        if(window.console) console.log('this.xhr.responseType: ' + this.xhr.responseType);

        // method: GET, POST, etc., url: send the request to, async: true/false
        that.xhr.open(method, url , true);
        that.xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        that.xhr.send();

    }; // request

    return that;

})(); // AJAX