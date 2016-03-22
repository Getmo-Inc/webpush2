# Smartpush
---
## Web Push SDK Documentation 1.2.8
This lib activates the off-site web push service on your Web Browser. Remember that you must have a secure environment to use web push notifications. The SDK only works on ``https://`` connections.

##### I dont have a ssl certificate!
\- No problem! You can request us to deploy a custom CDN with a SSL certificate. After everything is set up, you will receive a URL target that can be use to create a CNAME record on your DNS. Example: ``` webpush.yourdomain.com => xxxxxxx.cloudfront.net ```.

In this case, the use of `sslUrl` on the SDK **create** method is required for webpush work well. See more information about using a centralized subdomains bellow.

### What does the project do?
This project integrates off-site webpush notification system with **Smartpush API**, for browsers that supports this feature.

### How to install it?

**Important:** if you dont have a https connection and you choose to use owr infra-structure, you can skip the Download and Installation process descripted bellow, because the following 4 files are already present on owr CDN.

Download "Webpush Installation Files" (*.zip) from [https://cdn.getmo.com.br/webpush-pack-1.2.8.zip](https://cdn.getmo.com.br/webpush-pack-1.2.8.zip) and install the following files in the root of your website:
- webpush-1.2.8.html
- webpush-chrome-manifest.json
- webpush-service-worker.js
- webpush-image.png (customize the image before installation)

After that, you load the SDK's current version in your html page from one of this two sources: 
- ``http://cdn.getmo.com.br/webpush-1.2.8.min.js``
- ``https://cdn.getmo.com.br/webpush-1.2.8.min.js``

and you are ready to go!
```html
<script src="//cdn.getmo.com.br/webpush-1.2.8.min.js"></script>
```
 

### How to use it?

First of all: verify if Smartpush object is correctly loaded.

```javascript
if (!window.Smartpush) {
    console.error('The Smartpush lib was not loaded correctly.');
    // Disable or hide your UI elements, "web push notifications" are not supported because the SDK was not loaded.
    return;
}
```

If the test is successful, we can continue and create the "webpush" object.

```javascript
var webpush = window.Smartpush.create({
    devid: 'DEVID',
    appid: {
        chrome: 'APPID',
        safari: 'APPID',
        firefox: 'APPID'
    }
});
```

If "webpush" variable returns ``false``, then probably your Browser don't support all features to run the webpush service. You can test it:
```javascript
if (!webpush) {
    console.warn('This browser is blocked to receive Notifications from this website, or it dont support all features required to run web push services.');
    // Disable or hide your UI elements, "web push notifications" are not supported because this Browser dont support all needed features.
    return;
}
```

When you need to centralize subdomains, or when you dont have a secure connection, you can pass a string with a absolute https URL, named `sslUrl`.
> It is recommended to use the `templateUrl` property with `sslUrl`, to customize and prevent the white page when the browser *Ask* to send Web Notification.
 
Example:
```javascript
var webpush = window.Smartpush.create({
    devid: 'DEVID',
    appid: {
        chrome: 'APPID',
        safari: 'APPID',
        firefox: 'APPID'
    },
    sslUrl: 'https://...', // optional
    templateUrl: '(http|https)://...', // optional
});
```
> **Attention!** If you use ``templateUrl`` property, pay attention in the following topics:

- ``templateUrl`` must be the same origin of the website, otherwise the browser will throw a **'Access-Control-Allow-Origin'** error.
- ``<script>`` tags inside the template will be removed/ignored.
- ``<link rel="stylesheet">`` tags will be removed hand his content will be loaded inside a ``<style>`` tag.
- Don't use CSS styles with **import()** method, these styles won't be loaded/parsed.
- All images that can be loaded will be transformed in base64 and injected back into the HTML template.
- We recommend you to be simple as possible, and style your target using a ``<style></style>`` tag. Many external loads means slow render time.
- Remember, this page will display on a ``https`` connection, everything (besides pure CSS and images) that your template URL loads from a ``http`` connection will fail and be ignored.
- **Important**: The compiled page must be lighter than 4Mb (include: images, styles, html).

**Now the fun begins:** Ever single function described here returns a ``Promise``!

##### The "webpush" object
---
###### `webpush.checkStatus()`

> The **chechStatus()** method check the current user registration status.

- The **sucess** callback returns an object called ``"user"``. The ***"user"*** object is where you interact the most. We talk more about all the methods of the ***"user"*** object below.
- The **error** callback returns a string called ``"status"``. You can verify the **"status"** for the following values: ``"default"``, ``"denied"``, ``"error"``.
```javascript
webpush.checkStatus().then(function(user) {
    // the current user is registered
    // user.getTag()
    // user.addTag()
    // user.removeTag()
    // user.getUnreadNotifications()
    // user.getLastNotifications()
    // user.removeUnreadNotification()
    // user.removeAllUnreadNotifications()
    // see complete documentation...
}, function(status) {
    if (status == 'default') {
        console.warn('The user has not accept the notification permission yet. Here is a good place to trigger the subscribe() method if you will ask the user permission to receive web push notifications.');
        return;
    }
    if (status == 'denied') {
        console.warn('The user has denied the permission to receive notifications for this domain, until the permission are manually changed we cannot send data.');
        return;
    }
    if (status == 'error') {
        console.log('Try again later, the GCM or APNS are unreachable at the moment');
    }
});
```

###### `webpush.subscribe()`

> The **subscribe()** method triggers the "Notification Permission Ask" if the user doesn't have answered it yet.

- The **sucess** callback returns an object called ``"user"`` too. We talk more about all the interaction with the **"user"** object below. Keep going...
- The **error** callback returns nothing. But you can inspect your console for extra errors, generated to help you understand what happened.
```javascript
webpush.subscribe().then(function(user) {
    // the current user was successfully registered
    // here you can trigger more methods, like:
    // user.getTag()
    // user.addTag()
    // user.removeTag()
    // user.getUnreadNotifications()
    // user.getLastNotifications()
    // user.removeUnreadNotification()
    // user.removeAllUnreadNotifications()
    // We talk more about all the methods below, keep going.
}, function(status) {
    if (status == 'default') {
        console.warn('The user has not accept the notification permission yet. Here is a good place to trigger the subscribe() method if you will ask the user permission to receive web push notifications.');
        return;
    }
    if (status == 'denied') {
        console.warn('The user has denied the permission to receive notifications for this domain, until the permission are manually changed we cannot send data.');
        return;
    }
    if (status == 'error') {
        console.log('Try again later, the GCM or APNS are unreachable at the moment');
    }
});
```

##### The "user" object
---
###### `user.getTag('TAG_NAME')`

> The **getTag()** method is triggered by ***"user"*** object and receives a single "TAG_NAME" parameter.

- The **sucess** callback returns an array called ``"result"`` with all values attached to this tag.
- The **error** callback returns the same catch error object of the javascript "fetch API".
```javascript
user.getTag('TAG_NAME').then(function(result){
    console.log('getTag result', result); // ["value1", "value2"]
    console.log('getTag result.length', result.length); // 2
}, function(e) {
    console.error(e);
    console.log('Do something when catch a error!');
});
```

###### `user.addTag('TAG_NAME', 'TAG_VALUE', 'TAG_TYPE')`

> The **addTag()** method is triggered by ***"user"*** object and receives three parameters: "TAG_NAME", "TAG_VALUE", "TAG_TYPE". The ***"TAG_TYPE"*** must be one of the following values: ``"STRING"``, ``"TIMESTAMP"``, ``"BOOLEAN"``, ``"NUMERIC"``, ``"LIST"``.

- The **sucess** callback returns a object called ``"result"`` with a success message.
- The **error** callback returns the same catch error object of the javascript "fetch API".

Simple Example...
```javascript
user.addTag('TAG_NAME', 'TAG_VALUE', 'TAG_TYPE');
```
...or with callbacks!
```javascript
user.addTag('TAG_NAME', 'TAG_VALUE', 'TAG_TYPE').then(function(result){
    console.log('addTag result', result);
    console.log('Do something when the request success!');
}, function(e) {
    console.error(e);
    console.log('Do something when catch a error!');
});
```

###### `user.removeTag('TAG_NAME', 'TAG_VALUE', 'TAG_TYPE')`

> The **removeTag()** method is triggered by ***"user"*** object and receives three parameters: "TAG_NAME", "TAG_VALUE", "TAG_TYPE". The ***"TAG_TYPE"*** must be one of the following values: ``"STRING"``, ``"TIMESTAMP"``, ``"BOOLEAN"``, ``"NUMERIC"``, ``"LIST"``.

- The **sucess** callback returns a object called ``"result"`` with a success message.
- The **error** callback returns the same catch error object of the javascript "fetch API".

Simple Example...
```javascript
user.removeTag('TAG_NAME', 'TAG_VALUE', 'TAG_TYPE');
```
...or with callbacks!
```javascript
user.removeTag('TAG_NAME', 'TAG_VALUE', 'TAG_TYPE').then(function(result){
    console.log('removeTag result', result);
    console.log('Do something when the request success!');
}, function(e) {
    console.error(e);
    console.log('Do something when catch a error!');
});
```

###### `user.getUnreadNotifications()`

> The **getUnreadNotifications()** method triggered by ***"user"*** object whitout parameters.

- The **sucess** callback returns a array of objects called **"result"** with all unread notifications. The list of objects has two important properties: ``result.pushid`` and ``result.payload``. The **"pushid"** information is important for further utilization when you trigger the remove unread notifications method. The **"payload"** contain all information you need to know about the push notification (``title``, ``text``, ``ìcon``, ``clickUrl``).
- The **error** callback returns the same catch error object of the javascript "fetch API".
```javascript
user.getUnreadNotifications().then(function(result){
    console.log('getUnreadNotifications result', result);
    // result example [{pushid: "...", payload: { title: "...", text: "...", icon: "...", clickUrl: "..."}}]
}, function(e) {
    console.error(e)
    console.log('Do something when catch a error!');
});
```

###### `user.getLastNotifications()`

> The **getLastNotifications()** method is triggered by ***"user"*** object whitout parameters.

- The **sucess** callback returns a array of objects called **"result"** with the latest read notifications. The list of objects has one important property: ``result.payload``. The **"payload"** contain all information you need to know about the push notification (``title``, ``text``, ``ìcon``, ``clickUrl``).
- The **error** callback returns the same catch error object of the javascript "fetch API".
```javascript
user.getLastNotifications().then(function(result){
    console.log('getLastNotifications', result);
    // result example [{payload: { title: "...", text: "...", icon: "...", clickUrl: "..."}}]
}, function(e) {
    console.error(e)
    console.log('Do something when catch a error!');
});
```

###### `user.removeUnreadNotification(pushid)`

> The **removeUnreadNotification()** method is trigger from the user object and receives a single ``"pushid"`` parameter. This parameter you get on the result of the "getUnreadNotifications()" method.

- The **sucess** callback returns a object called ``"result"`` with a success message.
- The **error** callback returns the same catch error object of the javascript "fetch API".
```javascript
user.removeUnreadNotification(pushid).then(function(result){
    console.log('removeUnreadNotification result', result);
}, function(e) {
    console.error(e);
    console.log('Do something when catch a error!');
});
```

###### `user.removeAllUnreadNotifications()`

> The **removeAllUnreadNotifications()** method is triggered by ***"user"*** object whitout parameters.

- The **sucess** callback returns a object called ``"result"`` with a success message.
- The **error** callback returns the same catch error object of the javascript "fetch API".
```javascript
user.removeAllUnreadNotifications().then(function(result){
    console.log('removeAllUnreadNotifications result', result);
}, function(e) {
    console.error(e);
    console.log('Do something when catch a error!');
});
```

###### `user.getAlias()`

> Important! Note that this function dont return a Promise. It returns a string value.

```javascript
var alias = user.getAlias();
```

### Full Example:

```javascript
window.addEventListener('load', function() {
    if (!Smartpush) {
        console.error('The Smartpush lib was not loaded correctly.');
        // Disable or hide your UI elements, "web push notifications" are not supported because the SDK was not loaded.
        return;
    }

    var webpush = Smartpush.create({
        devid: 'DEVID',
        appid: {
            chrome: 'APPID',
            safari: 'APPID',
            firefox: 'APPID'
        }
    });
    if (!webpush) {
        console.warn('This Browser probably dont support all features required to run web push service');
        // Disable or hide your UI elements, "web push notifications" are not supported because this Browser dont support all needed features.
        return;
    }

    button.on('click', function(){ // note: "button" here represents a clickable element

        webpush.checkStatus().then(function(user){

            // make what you need with the user object, example:
            user.addTag('TAG_NAME', 'TAG_VALUE', 'STRING');
            user.removeTag('TAG_NAME', 'TAG_VALUE', 'STRING');

            user.getTag('TAG_NAME').then(function(result){
                console.log('getTag result', result);
                console.log('getTag result.length', result.length);
            }, function(e) {
                console.error(e);
                console.log('Do something when catch a error!');
            });

            user.getUnreadNotifications().then(function(result){         
                console.log('getUnreadNotifications sucess', result);
                // append elements to the DOM from "result" object
                for (var i = 0; i < result.length; i++) {
                    var pushid = result[i].pushid;
                    element.on('click', function() { // note: "element" here represents a item on a list of elements
                        user.removeUnreadNotification(pushid).then(function(){
                            // remove the "element" from DOM
                        }, function(e){
                            console.error(e);
                            // Do something when catch a error!
                        });
                    });
                    button.on('click', function() { // note: "button" here represents a clickable element
                        user.removeAllUnreadNotifications().then(function(){
                            // remove "all elements" from the DOM
                        }, function(e){
                            console.error(e);
                            // Do something when catch a error!
                        });
                    });
                }
            }, function(e) {
                console.error(e)
                // Do something when catch a error!
            });

            user.getLastNotifications().then(function(result){
                // append elements to the DOM from "result" object
            }, function(e) {
                console.error(e)
                // Do something when catch a error!
            });
        }, function(status) {
            if (status == 'denied') {
                console.warn('The user has denied the permission to receive notifications for this domain, until the permission are manually changed we cannot send data.');
                return;
            }
            if (status == 'default') {
                webpush.subscribe().then(function(user){
                    // again, make what you need with the user object, example:
                    user.addTag('TAG_NAME', 'TAG_VALUE', 'STRING');
                    user.removeTag('TAG_NAME', 'TAG_VALUE', 'STRING');
                    // ...
                }, function() {
                    console.warn('Subscribe catch. Probably the user does not answer the notification request yet.');
                });
            }
        });
    });
});
```

### List of browser features required
- Notifications API

### Supported Browsers
- Chrome 45+
- Firefox 44+
- Safari (OS X Mavericks - 10.9+)

### Support
Jonathan Martins
webmaster@getmo.com.br
---

> Developed by Getmo
