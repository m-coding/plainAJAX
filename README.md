# plainAJAX (work in progress)
Make AJAX requests with vanilla javascript (no jQuery)!

###Background
I had a project where I didn't need to use the jQuery library, but needed to make a simple AJAX request to an API.

As I researched, I learned about the XMLHttpRequest Level 2 (XHR2) spec and the new advance features. In particular, Internet Explorer not supporting `json` as `responseType` (see http://caniuse.com/#feat=xhr2).

The [discussion](https://mathiasbynens.be/notes/xhr-responsetype-json) on [Mathias Bynen](https://github.com/mathiasbynens)'s site, lead me to find a way to check for this, so I incorporated that in my code.

I'm not sure if I will use what I've been working on, though it was a nice programming exercise to get familiar with XMLHttpRequest again after relying jQuery's `$.ajax` so much.

In the mean time, I found these [**micro libraries**](http://microjs.com/#AJAX) which might be a better route to go.

####Other useful resources I consulted:

* [MDN AJAX Introduction](https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started)
* [MDN Using XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)
* [A Guide to Vanilla Ajax Without jQuery](http://www.sitepoint.com/guide-vanilla-ajax-without-jquery/) (corresponding [repo](https://github.com/sitepoint-editors/VanillaAjaxNojQuery))
* [You Don't Need jQuery!](http://blog.garstasio.com/you-dont-need-jquery/ajax/)
* [Ajax without jQuery](http://idiallo.com/javascript/ajax-without-jquery)

#Usage

####Example
```javascript
AJAX.request("http://domain.com/something/api","GET",null,function(data){
    console.log("Success");
},function(){
    console.log("Failure");
});
```
####Live Example

See [index.html](http://m-coding.github.io/plainAJAX/), demo using ipinfo.io:

```javascript
AJAX.request("http://ipinfo.io/json","GET",null,function(response){
    var result = "";

    for (var property in response) {
        result += property + ": " + response[property] + "<br>";
    }

    document.getElementById("content").innerHTML = result;
},function(){
    document.getElementById("content").innerHTML = "AJAX request failed."
});
```