// polyfill for safari will be loaded only if the browser is SAFARI.
// todo: create a .ready() promise to signal the user that everything is ready to go
// in SAFARI, or browser that dont have native fetch implemented:
// make a async call to load the polyfill before the lib
!function(){"use strict";function t(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function e(t){return"string"!=typeof t&&(t=String(t)),t}function r(t){this.map={},t instanceof r?t.forEach(function(t,e){this.append(e,t)},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function o(t){return t.bodyUsed?Promise.reject(new TypeError("Already read")):void(t.bodyUsed=!0)}function n(t){return new Promise(function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}})}function s(t){var e=new FileReader;return e.readAsArrayBuffer(t),n(e)}function i(t){var e=new FileReader;return e.readAsText(t),n(e)}function a(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t,"string"==typeof t)this._bodyText=t;else if(p.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(p.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(t){if(!p.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t))throw new Error("unsupported BodyInit type")}else this._bodyText=""},p.blob?(this.blob=function(){var t=o(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this.blob().then(s)},this.text=function(){var t=o(this);if(t)return t;if(this._bodyBlob)return i(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)}):this.text=function(){var t=o(this);return t?t:Promise.resolve(this._bodyText)},p.formData&&(this.formData=function(){return this.text().then(f)}),this.json=function(){return this.text().then(JSON.parse)},this}function u(t){var e=t.toUpperCase();return c.indexOf(e)>-1?e:t}function h(t,e){e=e||{};var o=e.body;if(h.prototype.isPrototypeOf(t)){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new r(t.headers)),this.method=t.method,this.mode=t.mode,o||(o=t._bodyInit,t.bodyUsed=!0)}else this.url=t;if(this.credentials=e.credentials||this.credentials||"omit",(e.headers||!this.headers)&&(this.headers=new r(e.headers)),this.method=u(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&o)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(o)}function f(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var r=t.split("="),o=r.shift().replace(/\+/g," "),n=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(o),decodeURIComponent(n))}}),e}function d(t){var e=new r,o=t.getAllResponseHeaders().trim().split("\n");return o.forEach(function(t){var r=t.trim().split(":"),o=r.shift().trim(),n=r.join(":").trim();e.append(o,n)}),e}function l(t,e){e||(e={}),this._initBody(t),this.type="default",this.status=e.status,this.ok=this.status>=200&&this.status<300,this.statusText=e.statusText,this.headers=e.headers instanceof r?e.headers:new r(e.headers),this.url=e.url||""}if(!self.fetch){r.prototype.append=function(r,o){r=t(r),o=e(o);var n=this.map[r];n||(n=[],this.map[r]=n),n.push(o)},r.prototype["delete"]=function(e){delete this.map[t(e)]},r.prototype.get=function(e){var r=this.map[t(e)];return r?r[0]:null},r.prototype.getAll=function(e){return this.map[t(e)]||[]},r.prototype.has=function(e){return this.map.hasOwnProperty(t(e))},r.prototype.set=function(r,o){this.map[t(r)]=[e(o)]},r.prototype.forEach=function(t,e){Object.getOwnPropertyNames(this.map).forEach(function(r){this.map[r].forEach(function(o){t.call(e,o,r,this)},this)},this)};var p={blob:"FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in self,arrayBuffer:"ArrayBuffer"in self},c=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];h.prototype.clone=function(){return new h(this)},a.call(h.prototype),a.call(l.prototype),l.prototype.clone=function(){return new l(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new r(this.headers),url:this.url})},l.error=function(){var t=new l(null,{status:0,statusText:""});return t.type="error",t};var y=[301,302,303,307,308];l.redirect=function(t,e){if(-1===y.indexOf(e))throw new RangeError("Invalid status code");return new l(null,{status:e,headers:{location:t}})},self.Headers=r,self.Request=h,self.Response=l,self.fetch=function(t,e){return new Promise(function(r,o){function n(){return"responseURL"in i?i.responseURL:/^X-Request-URL:/m.test(i.getAllResponseHeaders())?i.getResponseHeader("X-Request-URL"):void 0}var s;s=h.prototype.isPrototypeOf(t)&&!e?t:new h(t,e);var i=new XMLHttpRequest;i.onload=function(){var t=1223===i.status?204:i.status;if(100>t||t>599)return void o(new TypeError("Network request failed"));var e={status:t,statusText:i.statusText,headers:d(i),url:n()},s="response"in i?i.response:i.responseText;r(new l(s,e))},i.onerror=function(){o(new TypeError("Network request failed"))},i.open(s.method,s.url,!0),"include"===s.credentials&&(i.withCredentials=!0),"responseType"in i&&p.blob&&(i.responseType="blob"),s.headers.forEach(function(t,e){i.setRequestHeader(e,t)}),i.send("undefined"==typeof s._bodyInit?null:s._bodyInit)})},self.fetch.polyfill=!0}}();


(function (self) {

    'use strict';

    var Events, Support, Template, Params, Lib,
        API_VERSION = '2.0.0',
        API_END_POINT = ((self.location.href + '').indexOf('local.getmo.') === -1) ? 'https://api.getmo.com.br' : 'https://local.getmo.api';

    /*
     *
     * EVENTS
     *
     */
    Events = function () { return; };
    Events.prototype.element = self.document.createElement('div');
    Events.prototype.listeners = [];
    Events.prototype._getIndex = function (name) {
        var i;
        for (i = 0; i < this.listeners.length; i++) {
            if (this.listeners[i].name === name) {
                return i;
            }
        }
        return false;
    };
    Events.prototype.on = function (name, callback) {
        this.listeners.push({name: name, callback: callback, type: 'on'});
        this.element.addEventListener(name, callback);
    };
    Events.prototype.one = function (name, callback) {
        this.listeners.push({name: name, callback: callback, type: 'one'});
        this.element.addEventListener(name, callback);
    };
    Events.prototype.off = function (name) {
        var index = this._getIndex(name);
        if (index !== false) {
            this.element.removeEventListener(name, this.listeners[index].callback);
            this.listeners.splice(index, 1);
        }
    };
    Events.prototype.trigger = function (name, detail) {
        this.element.dispatchEvent(new self.CustomEvent(name, { 'detail': detail }));
        var index = this._getIndex(name);
        if (index !== false) {
            if (this.listeners[index].type === 'one') {
                this.off(name);
            }
        }
    };
    Events.prototype.once = function (name, detail) {
        this.element.dispatchEvent(new self.CustomEvent(name, { 'detail': detail }));
        this.off(name);
    };

    /*
     *
     * SUPPORT
     *
     */
    Support = function () {
        this._platform = null;
        this._browserVersion = null;
    };
    Support.prototype._checkFeature = function (feature) {
        switch (feature) {
        case 'postMessage':
            return 'postMessage' in self;
        case 'Notification':
            return 'Notification' in self;
        case 'localStorage':
            try {
                return ('localStorage' in self && self.localStorage !== null);
            } catch (e) {
                return false;
            }
            break;
        case 'permission':
            return 'permission' in self.Notification;
        case 'showNotification':
            try {
                return 'showNotification' in self.ServiceWorkerRegistration.prototype;
            } catch (e) {
                return;
            }
            break;
        case 'serviceWorker':
            return 'serviceWorker' in self.navigator;
        case 'PushManager':
            return 'PushManager' in self;
        case 'pushNotification':
            return 'pushNotification' in self.safari;
        }

        return true;
    };
    Support.prototype._getPlatform = function () {
        if (this._platform) {
            return this._platform;
        }
        var platform = this._getPlatformName();
        this._platform = platform || null;
        return this._platform;
    };
    Support.prototype._getPlatformName = function () {
        if (self.hasOwnProperty('chrome') && /Chrome/.test(self.navigator.userAgent) && /Google Inc/.test(self.navigator.vendor)) {
            return 'CHROME';
        }
        if (/Firefox/.test(self.navigator.userAgent) && self.InstallTrigger !== 'undefined') {
            return 'FIREFOX';
        }
        if (/Safari/.test(self.navigator.userAgent) && /Apple Computer/.test(self.navigator.vendor)) {
            if (self.hasOwnProperty('safari')) {
                return 'SAFARI';
            }
            console.warn('Probably the user is using a mobile safari browser! "safari" object is not present on "window"');
        }
        return false;
    };
    Support.prototype._getBrowserVersion = function () {
        if (this._browserVersion) {
            return this._browserVersion;
        }
        var version = '';
        switch (this._getPlatform()) {
        case 'CHROME':
            version = self.navigator.userAgent.match(/Chrom(e|ium|eframe)\/([0-9]+)\./i)[0];
            break;
        case 'FIREFOX':
            version = self.navigator.userAgent.match(/Firefox\/([0-9]+)\./i)[0];
            break;
        case 'SAFARI':
            version = 'Safari/' + self.navigator.userAgent.match(/Version\/(([0-9]+)(\.|[0-9])+)/i)[1];
            break;
        }
        this._browserVersion = version || null;
        return this._browserVersion;
    };
    Support.prototype._checkAllFeatures = function () {
        if (!this._checkFeature('postMessage')) {
            console.warn('"postMessage" is not supported.');
            return;
        }
        if (!this._checkFeature('Notification')) {
            console.warn('"Notification" is not supported.');
            return;
        }
        if (!this._checkFeature('localStorage')) {
            console.warn('"localStorage" is not supported.');
            return;
        }

        var platform = this._getPlatform();
        if (platform === 'CHROME' || platform === 'FIREFOX') {
            if (!this._checkFeature('permission')) {
                console.warn('This browser dont support Notifications');
                return;
            }
            if (!this._checkFeature('showNotification')) {
                console.warn('"showNotification" is not supported.');
                return;
            }
            if (!this._checkFeature('serviceWorker')) {
                console.warn('"serviceWorker" is not supported.');
                return;
            }
            if (!this._checkFeature('PushManager')) {
                console.warn('"PushManager" is not supported.');
                return;
            }
        } else if (platform === 'SAFARI') {
            if (!this._checkFeature('pushNotification')) {
                console.warn('"pushNotification" is not supported.');
                return;
            }
        }
        return true;
    };

    /*
     *
     * TEMPLATE
     *
     */
    Template = function (baseUrl) {
        this.baseUrl = baseUrl || self.location.href;
    };
    Template.prototype._createAbsoluteUrl = function (value) {
        var url = '',
            templateRootUrlExec = null;
        if (!value) {
            return;
        }
        if (!value.match('^https?:\/\/')) {
            if (value[0] === '/') {
                templateRootUrlExec = /^((https?:\/\/(.+?))\/)/i.exec(this.baseUrl);
                if (templateRootUrlExec && templateRootUrlExec[2]) {
                    url = templateRootUrlExec[2] + value;
                }
            } else {
                templateRootUrlExec = /^(https?:\/\/(.+)\/)/i.exec(this.baseUrl);
                if (templateRootUrlExec && templateRootUrlExec[1]) {
                    url = templateRootUrlExec[1] + value;
                }
            }
        } else {
            url = value;
        }
        return url;
    };
    Template.prototype._makeBase64OfImage = function (img) {
        var canvas = self.document.createElement("canvas"),
            context = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        return canvas.toDataURL("image/png");
    };
    Template.prototype._loadImageBase64FromUrl = function (url) {
        var that = this,
            image,
            interval,
            counter;



        return new Promise(function (resolve, reject) {
            image = new self.Image();
            image.addEventListener('load', function (e) {
                clearInterval(interval);
                resolve(that._makeBase64OfImage(this));
                e.stopPropagation();
                //this.removeEventListener('load');
            }, true);
            image.addEventListener('error', function (e) {
                clearInterval(interval);
                reject(e);
                e.stopPropagation();
                //this.removeEventListener('error');
            }, true);
            image.src = that._createAbsoluteUrl(url);

            interval = setInterval(function () {
                if (counter > 150) {
                    clearInterval(interval);
                    reject('_loadImageBase64FromUrl() Timeout!');
                }
                counter = counter + 1;
            }, 50);
        });
    };
    Template.prototype._loadStylesForTemplate = function (tempDocument) {
        var that = this,
            cssContent = [],
            cssTags = tempDocument.getElementsByTagName('link'),
            counter = 0,
            interval = null,
            i,
            x,
            href,
            urlMatch,
            value,
            cssUrl;

        return new Promise(function (resolve, reject) {
            for (i = 0; i < cssTags.length; i++) {
                if (cssTags[i].rel !== 'stylesheet') {
                    cssContent.push('');
                    continue;
                }
                href = cssTags[i].href;
                if (href) {
                    href = that._createAbsoluteUrl(href);
                    self.fetch(href).then(function (response) {
                        response.text().then(function (result) {
                            urlMatch = result.match(/url\s?\((["']?)(.+\.(png|jpg|gif|jpeg){1})\1?\)/ig);
                            if (urlMatch) {
                                for (x = 0; x < urlMatch.length; x++) {
                                    value = /url\s?\((["']?)(.+\.(png|jpg|gif|jpeg){1})\1?\)/ig.exec(urlMatch[x]);
                                    if (value && value[2]) {
                                        cssUrl = that._createAbsoluteUrl(value[2]);
                                        if (cssUrl) {
                                            result = result.replace(urlMatch[x], 'url(\'' + cssUrl + '\')');
                                        }
                                    }
                                }
                            }
                            cssContent.push(result);
                        }, function () {
                            cssContent.push('');
                        });
                    }, function (e) {
                        console.error('fetch error', e);
                        cssContent.push('');
                    });
                } else {
                    cssContent.push('');
                }
            }
            interval = setInterval(function () {
                if (cssContent.length >= cssTags.length) {
                    var style = self.document.createElement("style");
                    style.innerHTML = cssContent.join(' ');
                    tempDocument.head.appendChild(style);
                    while (cssTags[0]) {
                        cssTags[0].parentNode.removeChild(cssTags[0]);
                    }
                    clearInterval(interval);
                    resolve(tempDocument);
                } else {
                    if (counter > 150) {
                        console.error('cssTags', cssTags);
                        console.error('cssContent', cssContent);
                        clearInterval(interval);
                        reject('_loadStylesForTemplate() Timeout!');
                    }
                    counter = counter + 1;
                }
            }, 50);
        });
    };
    Template.prototype._loadImagesForTemplate = function (tempDocument) {
        var that = this,
            imagesContent = [],
            imagesTags = tempDocument.getElementsByTagName('img'),
            counter = 0,
            interval = null,
            src,
            imageUrl,
            image,
            i,
            x;
        return new Promise(function (resolve, reject) {
            for (i = 0; i < imagesTags.length; i++) {
                if (!imagesTags[i].src) {
                    src = /src="((.+?)\.(jpg|jpeg|gif|png))"/gi.exec(imagesTags[i].outerHTML);
                    if (src && src[1]) {
                        imageUrl = that._createAbsoluteUrl(src[1]);
                        if (imageUrl) {
                            imagesTags[i].src = imageUrl;
                        }
                    } else {
                        continue;
                    }
                }
                image = new self.Image();
                image.addEventListener('load', function (e) {
                    imagesContent[this.id] = that._makeBase64OfImage(this);
                    e.stopPropagation();
                    //this.removeEventListener('load');
                }, true);
                image.addEventListener('error', function (e) {
                    imagesContent[this.id].base64 = 'false';
                    e.stopPropagation();
                    //this.removeEventListener('error');
                }, true);
                image.id = i;
                image.src = imagesTags[i].src;
            }
            interval = setInterval(function () {
                if (imagesContent.length >= imagesTags.length) {
                    for (x = 0; x < imagesTags.length; x++) {
                        imagesTags[x].src = imagesContent[x];
                    }
                    clearInterval(interval);
                    resolve(tempDocument);
                } else {
                    if (counter > 150) {
                        console.error('imagesContent', imagesContent);
                        console.error('imagesTags', imagesTags);
                        clearInterval(interval);
                        reject('_loadImagesForTemplate() Timeout!');
                    }
                    counter = counter + 1;
                }
            }, 50);
        });
    };
    Template.prototype._loadImagesFromStylesForTemplate = function (tempDocument) {
        var that = this,
            cssImagesContent = {},
            html = tempDocument.head.outerHTML + tempDocument.body.outerHTML,
            urlMatch = html.match(/url\s?\((["']?)(.+\.(png|jpg|gif|jpeg){1})\1?\)/ig),
            counter = 0,
            interval = null,
            i,
            prop1,
            prop2,
            prop3,
            value,
            cssImageUrl,
            image,
            loaded = true,
            newUrl;

        return new Promise(function (resolve, reject) {
            if (urlMatch) {

                for (i = 0; i < urlMatch.length; i++) {
                    value = /url\s?\((["']?)(.+\.(png|jpg|gif|jpeg){1})\1?\)/ig.exec(urlMatch[i]);
                    if (value && value[2]) {
                        cssImageUrl = that._createAbsoluteUrl(value[2]);
                        if (cssImageUrl) {
                            cssImagesContent[cssImageUrl] = {'$1': value[1], '$2': value[2], base64: ''};
                        }
                    }
                }

                for (prop1 in cssImagesContent) {
                    if (cssImagesContent.hasOwnProperty(prop1)) {
                        image = new self.Image();
                        image.addEventListener('load', function (e) {
                            cssImagesContent[this.id].base64 = that._makeBase64OfImage(this);
                            e.stopPropagation();
                            //this.removeEventListener('load');
                        }, true);
                        image.addEventListener('error', function (e) {
                            cssImagesContent[this.id].base64 = 'false';
                            e.stopPropagation();
                            //this.removeEventListener('error');
                        }, true);
                        image.id = prop1;
                        image.src = prop1;
                    }
                }
                interval = setInterval(function () {
                    for (prop2 in cssImagesContent) {
                        if (cssImagesContent.hasOwnProperty(prop2)) {
                            if (!cssImagesContent[prop2].base64) {
                                loaded = false;
                            }
                        }
                    }
                    if (loaded) {
                        for (prop3 in cssImagesContent) {
                            if (cssImagesContent.hasOwnProperty(prop3)) {
                                if (cssImagesContent[prop3].base64 !== 'false') {
                                    newUrl = '';
                                    if (!cssImagesContent[prop3].$1) {
                                        newUrl = "'" + cssImagesContent[prop3].base64 + "'";
                                    } else {
                                        newUrl = cssImagesContent[prop3].base64;
                                    }
                                    html = html.replace(prop3, newUrl).replace(cssImagesContent[prop3].$2, newUrl);
                                }
                            }
                        }
                        clearInterval(interval);
                        resolve(new self.DOMParser().parseFromString('<!DOCTYPE html>' + html, 'text/html'));
                    } else {
                        if (counter > 150) {
                            console.error('cssImagesContent', cssImagesContent);
                            clearInterval(interval);
                            reject('_loadImagesFromStylesForTemplate() Timeout!');
                        }
                        counter = counter + 1;
                    }
                }, 50);
            } else {
                resolve(tempDocument);
            }
        });
    };
    Template.prototype._cleanAndPrepareHtml = function (html) {
        var that = this;
        return new Promise(function (resolve, reject) {
            var tempDocument = new self.DOMParser().parseFromString(html.replace(/<script.*?>((\n*)?.*?(\n*)?)*?<\/script>/igm, ''), 'text/html');
            that._loadStylesForTemplate(tempDocument).then(function (tempDocument) {
                that._loadImagesForTemplate(tempDocument).then(function (tempDocument) {
                    that._loadImagesFromStylesForTemplate(tempDocument).then(function (tempDocument) {
                        var manifest = self.document.createElement('link');
                        manifest.rel = 'manifest';
                        manifest.href = '/webpush-chrome-manifest.json';
                        tempDocument.head.appendChild(manifest);
                        resolve('<!DOCTYPE html><html>' + tempDocument.head.outerHTML + tempDocument.body.outerHTML + '</html>');
                    }, function (e) {
                        reject(e);
                    });
                }, function (e) {
                    reject(e);
                });
            }, function (e) {
                reject(e);
            });
        });
    };

    /*
     *
     * DATA MANAGER (PARAMS)
     *
     */
    Params = function () {
        this.data = {
            devid: null,
            appid: null,
            hwid: null,
            regid: null,
            alias: null,
            platform: null,
            setupEndPoint: null,
            templateEndPoint: null,
            safariPushID: null
        };
    };
    Params.prototype._get = function (name, lsName) {
        if (this.data[name]) {
            return this.data[name];
        }
        lsName = lsName || 'smartpush_params';
        try {
            var lsParams = JSON.parse(self.localStorage.getItem(lsName));
            if (lsParams[name] || lsParams[name] === false) {
                this.data[name] = lsParams[name];
                return lsParams[name];
            }
            // todo? nops search on ls-center for the needed param. how to make async work?
            return null;
        } catch (e) {
            return null;
        }
    };
    Params.prototype._set = function (newParams, lsName) {
        var key1, key2, lsParams;
        if (typeof newParams === 'object') {
            lsName = lsName || 'smartpush_params';
            try {
                lsParams = JSON.parse(self.localStorage.getItem(lsName));
                for (key1 in lsParams) {
                    if (lsParams.hasOwnProperty(key1)) {
                        this.data[key1] = lsParams[key1];
                    }
                }
            } catch (e) {}
            for (key2 in newParams) {
                if (newParams.hasOwnProperty(key2)) {
                    this.data[key2] = newParams[key2];
                }
            }
            self.localStorage.setItem(lsName, JSON.stringify(this.data));
            // todo? nops... send current this.params to ls-center when needed (if second url param exists on setup)
        }
    };

    /*
     *
     * if (!e.data.eventI && e.data.status === 'subscribedd && type e.data.params === 'objecto
 {
      * LIB
     * else {
     *
     */
    Lib = function () {
        this.version = API_VERSION;
        this.iframe = self.document.createElement('iframe');
        this.popup = null;
    };
    Lib.prototype.events = new Events();
    Lib.prototype.support = new Support();
    Lib.prototype.template = new Template();
    Lib.prototype.params = new Params();

    Lib.prototype.control = {
        iframe: {
            isLoading: false,
            hasLoaded: false
        },
        hasSetup: false,
        eventForPostMassageIsListening: false,
        register: {
            tries: 0,
            waitInSeconds: 10,
            maxTimeoutInMinutes: 1
        }
    };

    Lib.prototype.registerEndPoint = API_END_POINT + '/device';
    Lib.prototype.optOutEndPoint = API_END_POINT + '/device/optout';
    Lib.prototype.tagEndPoint = API_END_POINT + '/tag';
    Lib.prototype.notificationEndPoint = API_END_POINT + '/notifications';
    Lib.prototype.safariEndPoint = API_END_POINT + '/safari';

    Lib.prototype._encodeParams = function (data) {
        var key,
            query = [];
        if (typeof data === 'object') {
            for (key in data) {
                if (data.hasOwnProperty(key)) {
                    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
                }
            }
            return query.join('&');
        }
        if (typeof data === 'string') {
            return data;
        }
        console.error('Parameters cannot be parsed. Use "object" or a url encoded "string". Unknown type...', typeof data);
        return false;
    };

    Lib.prototype._request = function (url, data, method) {
        var params = this._encodeParams(data);
        return new Promise(function (resolve, reject) {
            if (!url || !params) {
                reject('URL: ' + url + ' | PARAMS: ' + params);
                return false;
            }
            if (!method) {
                method = 'POST';
            } else {
                params += '&_method=' + method;
                method = 'POST';
            }
            self.fetch(url, {
                method: method,
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: params
            }).then(function (result) {
                result.json().then(function (json) {
                    resolve(json);
                }, function (e) {
                    reject(e);
                });
            }, function (e) {
                reject(e);
            });
        });
    };

    Lib.prototype._processMessageFromIframe = function (e) {
        if (!e.data.eventId && e.data.status === 'subscribed' && typeof e.data.params === 'object') {
            this.params._set(e.data.params);
            this.events.once('subscribed');
        } else if (e.data.eventId) {
            this.events.once(e.data.eventId, e.data);
        }
    };
    Lib.prototype._postMessageToIframe = function (action, params) {
        var that = this;
        return new Promise(function (resolve, reject) {
            if (!that.iframe) {
                return reject('Iframe dont exist or wasnt initialize yet.');
            }

            action = action || '';

            var timeout = null,
                data = {
                    eventId: action + '-' + (new Date().getTime()) + '-' + Math.random(),
                    action: action
                };

            if (params && typeof params === 'object') {
                data.params = params;
            }

            that.events.one(data.eventId, function (e) {
                clearTimeout(timeout);

                if (e.detail && e.detail.params && typeof e.detail.params === 'object') {
                    that.params._set(e.detail.params);
                }
                resolve(e.detail);
            });

            if (action !== 'doSubscribe') {
                timeout = setTimeout(function () {
                    reject('postMessage event timeout: ' + data.eventId);
                }, 5000);
            }

            that.iframe.contentWindow.postMessage(data, '*');
        });
    };

    Lib.prototype._addIframe = function (callback) {
        var that = this;
        if (this.control.iframe.hasLoaded) {
            callback();
            return;
        }
        if (this.control.iframe.isLoading) {
            return;
        }
        this.iframe.id = 'smartpush-webpush-iframe';
        this.iframe.style.display = 'none';
        this.iframe.src = (this.params._get('setupEndPoint') || '') + '/lib' + (this.version ? '-' + this.version : '') + '.html';
        this.iframe.onload = function () {
            if (!that.control.iframe.hasLoaded) {
                that.control.iframe.hasLoaded = true;
                that.control.iframe.isLoading = false;
                callback();
            }
        };
        this.iframe.onerror = function (e) {
            console.error(e);
        };
        self.document.body.appendChild(this.iframe);
        this.control.iframe.isLoading = true;
    };
    Lib.prototype._addIframeEvents = function () {
        var that = this;
        if (this.control.eventForPostMassageIsListening === false) {
            if (self.addEventListener) {
                self.addEventListener('message', function (e) {
                    if (e.data.source === 'smartpush.webpush.iframe') {
                        that._processMessageFromIframe(e);
                    }
                }, false);
            } else {
                self.attachEvent('onmessage', function (e) {
                    if (e.data.source === 'smartpush.webpush.iframe') {
                        that._processMessageFromIframe(e);
                    }
                });
            }
            this.control.eventForPostMassageIsListening = true;
        }
    };

    Lib.prototype._openPopUp = function () {

        var width = 440,
            height = 330,
            left = (self.screen.width / 2) - (width / 2),
            top = (self.screen.height / 2) - (height / 2),
            config = 'toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=' + width + ',height=' + height + ',left=' + left + ',top=' + top,
            url = this.params._get('setupEndPoint') + '/lib' + (this.version ? '-' + this.version : '') + '.html';

        if (!this.popup || this.popup.closed) {
            this.popup = self.open(url, 'notification', config);
        } else {
            if (this.popup && !this.popup.closed) {
                this.popup.focus();
            } else {
                this.popup = self.open(url, 'notification', config);
            }
        }

        if (!this.popup) {
            return false;
        }

        this.popup.focus();

        return true;
    };
    
    Lib.prototype._setupUserTemplate = function () {
        var that = this,
            params = {
                callback: self.location.href,
                subscribe: true
            }, template;

        self.fetch(that.params._get('templateEndPoint')).then(function (response) {
            response.text().then(function (html) {
                template = new Template(that.params._get('templateEndPoint'));
                template._cleanAndPrepareHtml(html).then(function (newHtml) {
                    if (newHtml.length > 5232400) {
                        console.error('Your template is too big!');
                    } else {
                        that._postMessageToIframe('ping', {
                            template: newHtml
                        }).then(function () {
                            self.location.href = that.iframe.src + '?' + that._encodeParams(params);
                        }, function (e) {
                            console.error('postMessage timeout!', e);
                        });
                    }
                }, function (e) {
                    console.error(e);
                });
            });
        }, function (e) {
            console.error('Template target error!', e);
        });
    };

    Lib.prototype._setupDefaultTemplate = function (popupFail) {
        var that = this,
            params = { callback: self.location.href },
            imageUrl,
            template;
        imageUrl = that.params._get('templateImageUrl');
        if (imageUrl && imageUrl.indexOf('https') === -1) {
            template = new Template();
            template._loadImageBase64FromUrl(imageUrl).then(function (base64) {
                that._postMessageToIframe('ping', {
                    templateImageBase64: base64
                }).then(function () {
                    if (!popupFail) {
                        that._openPopUp();
                    } else {
                        self.location.href = that.iframe.src + '?' + that._encodeParams(params);
                    }
                }, function (e) {
                    console.error(e);
                });
            }, function (e) {
                console.error(e);
            });
        } else {
            if (!popupFail) {
                that._openPopUp();
            } else {
                self.location.href = that.iframe.src + '?' + that._encodeParams(params);
            }
        }
    };

    Lib.prototype._setup = function (action) {
        var that = this,
            platform = this.support._getPlatform(),
            popupFail = false;

        return new Promise(function (resolve, reject) {
            if (platform === 'CHROME' || platform === 'FIREFOX') {

                if (action === 'initSubscribe') {
                    if (!that.params._get('hwid') || !that.params._get('regid')) {
                        if (that.params._get('setupEndPoint') && !that.params._get('templateEndPoint')) {
                            if (!that._openPopUp()) {
                                popupFail = true;
                            }
                        }
                    }
                }

                if (that.control.hasSetup === true) {
                    return resolve();
                }

                that._addIframeEvents();
                that._addIframe(function () {

                    that._postMessageToIframe(action, {
                        devid: that.params._get('devid'),
                        appid: that.params._get('appid'),
                        platform: that.params._get('platform'),
                        setupEndPoint: that.params._get('setupEndPoint'),
                        templateEndPoint: that.params._get('templateEndPoint'),
                        templateImageUrl: that.params._get('templateImageUrl'),
                        templateSiteName: that.params._get('templateSiteName')
                    }).then(function (data) {

                        switch (data.status) {
                            case 'ready':
                                that.control.hasSetup = true;
                                resolve(data);
                                break;
                            case 'pong':
                                resolve(data);
                                break;

                            case 'setup-ssl-error':
                            //console.error('DOMException: Only secure origins are allowed (see: https://goo.gl/Y0ZkNV).');
                            case 'setup-error':
                                if (!that.params._get('setupEndPoint')) {
                                    reject(data);
                                    break;
                                }
                            case 'setup-reload':
                                if (self.location.href.indexOf('https') !== -1) {
                                    console.warn('You are using a secure connection. HTTPS');
                                    return;
                                }
                            case 'registered-redirect':
                                that.control.hasSetup = true;
                                that.checkStatus().then(function (status) {
                                    if (that.params._get('templateEndPoint')) {
                                        if (status === 'denied') {
                                            resolve(data);
                                            return;
                                        }
                                        that._setupUserTemplate();
                                    } else {
                                        that._setupDefaultTemplate(popupFail);
                                    }

                                }, function (e) {
                                    console.error(e);
                                });
                                break;
                        }
                    }, function (e) {
                        console.error('postMessage timeout!', e);
                        reject();
                    });
                });

            } else if (platform === 'SAFARI') {

                if (that.params._get('safariPushID') && that.params._get('hwid') && that.params._get('regid')) {
                    resolve();
                    return true;
                }
                that._request(that.safariEndPoint + '/getPushID', {
                    devid: that.params._get('devid'),
                    appid: that.params._get('appid')
                }, 'POST').then(function (json) {
                    if (json.code === 200 && json.safariPushID) {
                        that.params._set({safariPushID: json.safariPushID});
                        resolve();
                    } else {
                        reject(json.message);
                    }
                }, function (e) {
                    console.error('Cannot fetch safari app Push ID', e);
                    reject(e);
                });
            }
        });
    };

    Lib.prototype.checkStatus = function () {
        var that = this,
            platform = this.support._getPlatform();

        return new Promise(function (resolve, reject) {
            that._setup('checkStatus').then(function () {
                if (platform === 'CHROME' || platform === 'FIREFOX') {
                    that._postMessageToIframe('checkSubscriptionStatus').then(function (data) {
                        switch (data.status) {
                        case 'status-true-checked':
                            resolve('granted');
                            break;
                        case 'status-sm-unreachable':
                            if (!that.params._get('setupEndPoint')) {
                                self.document.body.removeChild(self.document.getElementById('smartpush-webpush-iframe'));
                                that.control.hasSetup = false;
                                that.control.iframe.hasLoaded = false;
                            }
                        case 'status-false-checked':
                            resolve('default');
                            break;
                        case 'status-denied-checked':
                            resolve('denied');
                        }
                    }, function (e) {
                        reject(e);
                    });
                } else if (platform === 'SAFARI') {

                    var permissionData = self.safari.pushNotification.permission(that.params._get('safariPushID'));
                    if (permissionData.permission === 'default') {
                        resolve('default');
                    } else if (permissionData.permission === 'granted') {
                        if (that.params._get('hwid') && that.params._get('regid')) {
                            resolve('granted');
                        } else if (that.params._get('setupEndPoint')) {
                            that._postMessageToIframe('getLocalStorageParams').then(function () {
                                resolve('granted');
                            }, function () {
                                console.error('postMessage timeout!');
                                resolve('default');
                            });
                        } else {
                            resolve('default');
                        }
                    } else if (permissionData.permission === 'denied') {
                        resolve('denied');
                    } else {
                        resolve('default');
                    }
                }
            }, function (e) {
                console.error('Cannot setup web push service to check user status', e);
                reject(e);
            });
        });
    };

    Lib.prototype.subscribe = function () {
        var that = this,
            platform = this.support._getPlatform();

        return new Promise(function (resolve, reject) {
            that._setup('initSubscribe').then(function () {
                if (platform === 'CHROME' || platform === 'FIREFOX') {

                    that.checkStatus().then(function (status) {

                        if (status == 'denied') {
                            reject('denied');
                            return;
                        }
                        if (that.params._get('hwid') && that.params._get('regid')) {
                            resolve(that);
                            return;
                        }
                        if (that.params._get('setupEndPoint') && !that.params._get('templateEndPoint')) {
                            if (that._openPopUp()) {
                                that.events.one('subscribed', function() {
                                    resolve(that);
                                });
                                return;
                            }
                        }

                        that._postMessageToIframe('doSubscribe').then(function (data) {

                            switch (data.status) {
                                case 'subscribed':
                                    resolve(that);
                                    break;
                                case 'subscribed-error':
                                    reject('error');
                                    break;
                                case 'default':
                                    reject('default');
                                    break;
                                case 'denied':
                                    reject('denied');
                                    break;
                                default:
                                    console.error('No "data.status" match', data.status);
                                    reject('error');
                            }
                        }, function (e) {
                            console.error(e);
                            reject('error');
                        });
                    }, function (e) {
                        console.error(e);
                        reject('error');
                    });

                } else if (platform === 'SAFARI') {

                    self.safari.pushNotification.requestPermission(
                        that.safariEndPoint,
                        that.params._get('safariPushID'),
                        {
                            devid: that.params._get('devid'),
                            appid: that.params._get('appid')
                        },
                        function (permissionData) {
                            if (permissionData.permission === 'default') {
                                reject('default');
                            } else if (permissionData.permission === 'granted') {
                                that._request(that.registerEndPoint, {
                                    appid: that.params._get('appid'),
                                    uuid: 'null',
                                    platform: platform,
                                    regid: permissionData.deviceToken,
                                    device: 'Safari/' + self.navigator.userAgent.match(/Version\/(([0-9]+)(\.|[0-9])+)/i)[1],
                                    manufacturer: self.navigator.vendor,
                                    framework: self.navigator.platform || self.navigator.oscpu
                                }, 'POST').then(function (json) {
                                    if (json.code === 200 && json.hwid) {
                                        that.params._set({
                                            hwid: json.hwid,
                                            regid: permissionData.deviceToken,
                                            alias: json.alias
                                        });
                                        if (that.params._get('setupEndPoint')) {
                                            that._postMessageToIframe('ping', {
                                                devid: that.params._get('devid'),
                                                appid: that.params._get('appid'),
                                                hwid: json.hwid,
                                                regid: permissionData.deviceToken,
                                                alias: json.alias,
                                                platform: that.params._get('platform'),
                                                setupEndPoint: that.params._get('setupEndPoint'),
                                                templateEndPoint: that.params._get('templateEndPoint'),
                                                templateImageUrl: that.params._get('templateImageUrl'),
                                                templateSiteName: that.params._get('templateSiteName')
                                            }).then(function (data) {
                                                if (data.status === 'pong') {
                                                    resolve(that);
                                                } else {
                                                    reject('Its not you! Baby...');
                                                }
                                            }, function () {
                                                console.error('Cannot set parameters on centralized domain.');
                                                reject('error');
                                            });
                                        }

                                    } else {
                                        console.error(json.message);
                                        reject('error');
                                    }
                                }, function (e) {
                                    console.error('Cannot register extra data for this device!', e);
                                    reject('error');
                                });
                            } else if (permissionData.permission === 'denied') {
                                reject('denied');
                            } else {
                                reject('default');
                            }
                        }
                    );
                }
            }, function (e) {
                console.error('Cannot setup web push service for subscribe to webpush', e);
                reject('error');
            });
        });
    };

    Lib.prototype.unSubscribe = function () {
        var that = this;
        return new Promise(function (resolve, reject) {
            that._postMessageToIframe('unsubscribe').then(function (data) {
                switch (data.status) {
                    case 'unsubscribed':
                        that._request(that.registerEndPoint, {
                            devid: that.params._get('devid'),
                            appid: that.params._get('appid'),
                            uuid: that.params._get('hwid')
                        }, 'DELETE').then(function () {
                            that.params._set({
                                regid: null,
                                alias: null
                            });
                            if (that.params._get('templateEndPoint')) {
                                that.control.hasSetup = false;
                            }
                            resolve();
                        }, function (e) {
                            console.error('Cannot un-register this user on DB. It will be removed in next dry-run!', e);
                            reject();
                        });
                        break;
                    case 'unsubscribed-error':
                        reject();
                        break;
                }
            }, function () {
                reject();
            });
        });
    };

    Lib.prototype.getLastNotifications = function (dateFormat) {
        var that = this,
            i;
        return new Promise(function (resolve, reject) {
            return that._request(that.notificationEndPoint + '/last', {
                devid: that.params._get('devid'),
                appid: that.params._get('appid'),
                hwid: that.params._get('hwid'),
                platform: that.support._getPlatform(),
                dateFormat: dateFormat || '',
                browserVersion: that.support._getBrowserVersion()
            }, 'POST').then(function (json) {
                for (i = 0; i < json.length; i++) {
                    json[i].payload.icon = (json[i].payload.icon && (json[i].payload.icon + ''.indexOf('http') !== -1)) ? json[i].payload.icon : (that.params._get('setupEndPoint') ? that.params._get('setupEndPoint') : '') + '/webpush-image.png';
                }
                resolve(json);
            }, function (e) {
                console.error('Cannot fetch user Notifications', e);
                reject(e);
            });
        });
    };

    Lib.prototype.getUnreadNotifications = function (dateFormat) {
        var that = this,
            i;
        return new Promise(function (resolve, reject) {
            return that._request(that.notificationEndPoint + '/unread', {
                devid: that.params._get('devid'),
                appid: that.params._get('appid'),
                hwid: that.params._get('hwid'),
                platform: that.support._getPlatform(),
                dateFormat: dateFormat || '',
                browserVersion: that.support._getBrowserVersion()
            }, 'POST').then(function (json) {
                for (i = 0; i < json.length; i++) {
                    json[i].payload.icon = (json[i].payload.icon && (json[i].payload.icon + ''.indexOf('http') !== -1)) ? json[i].payload.icon : (that.params._get('setupEndPoint') ? that.params._get('setupEndPoint') : '') + '/webpush-image.png';
                }
                resolve(json);
            }, function (e) {
                console.error('Cannot fetch user Unred Notifications', e);
                reject(e);
            });
        });
    };

    Lib.prototype.removeUnreadNotification = function (pushid) {
        return this._request(this.notificationEndPoint + '/read-one', {
            devid: this.params._get('devid'),
            appid: this.params._get('appid'),
            hwid: this.params._get('hwid'),
            pushid: pushid,
            browserVersion: this.support._getBrowserVersion()
        }, 'DELETE');
    };

    Lib.prototype.removeAllUnreadNotifications = function () {
        return this._request(this.notificationEndPoint + '/read-all', {
            devid: this.params._get('devid'),
            appid: this.params._get('appid'),
            hwid: this.params._get('hwid'),
            browserVersion: this.support._getBrowserVersion()
        }, 'DELETE');
    };

    Lib.prototype.getTag = function (key) {
        return this._request(this.tagEndPoint + '/' + this.params._get('hwid'), {
            devid: this.params._get('devid'),
            appid: this.params._get('appid'),
            key: key,
            browserVersion: this.support._getBrowserVersion()
        }, 'POST');
    };

    Lib.prototype.addTag = function (key, value, type) {
        if (!type) {
            type = 'STRING';
        }
        if (type === 'LIST') {
            value = JSON.stringify(value);
        }
        return this._request(this.tagEndPoint, {
            devid: this.params._get('devid'),
            appid: this.params._get('appid'),
            uuid: this.params._get('hwid'),
            type: type,
            key: key,
            value: value,
            browserVersion: this.support._getBrowserVersion()
        }, 'POST');
    };

    Lib.prototype.removeTag = function (key, value, type) {
        if (!type) {
            type = 'STRING';
        }
        if (type === 'LIST') {
            value = JSON.stringify(value);
        }
        return this._request(this.tagEndPoint, {
            devid: this.params._get('devid'),
            appid: this.params._get('appid'),
            uuid: this.params._get('hwid'),
            type: type,
            key: key,
            value: value,
            browserVersion: this.support._getBrowserVersion()
        }, 'DELETE');
    };

    Lib.prototype.optOut = function (bool) {
        return this._request(this.optOutEndPoint, {
            devid: this.params._get('devid'),
            appid: this.params._get('appid'),
            uuid: this.params._get('hwid'),
            block: bool ? '1' : '0',
            browserVersion: this.support._getBrowserVersion()
        }, 'PUT');
    };


    Lib.prototype.getAlias = function () {
        return this.params._get('alias');
    };


    /*
    *
    * SETUP
    *
    */
    self.Smartpush = {
        create: function (setup) {

            if (!setup.devid || setup.devid === 'DEVID') {
                console.error('"devid" was NOT set, see the documentation');
                return;
            }
            if (typeof setup.appid !== 'object') {
                console.error('"appid" must be an Object');
                return;
            }
            if (setup.ssl && typeof setup.ssl !== 'object') {
                console.error('"ssl" must be an Object');
                return;
            }
            if (setup.template && typeof setup.template !== 'object') {
                console.error('"template" must be an Object');
                return;
            }

            var that = new Lib();

            var platform = that.support._getPlatform();
            if (platform !== 'CHROME' && platform !== 'SAFARI' && platform !== 'FIREFOX') {
                console.info('Platform not Allowed for Webpush:', [self.navigator.vendor, self.navigator.userAgent]);
                return;
            }
            if (!that.support._checkAllFeatures()) {
                console.error('This browser doesnt have all features to receive webpush.');
                return;
            }

            var ssl = setup.ssl;
            if (ssl && ssl.url && typeof ssl.url === 'string') {
                if (ssl.url.indexOf('https') === -1) {
                    console.error('The URL informed (' + ssl.url + ') is not secure. Please, use https');
                    return;
                }
                if (ssl.url.slice(-1) === '/') {
                    ssl.url = ssl.url.substring(0, ssl.url.length - 1);
                }
            } else {
                ssl = false;
            }
            that.params._set({setupEndPoint: ssl && ssl.url ? ssl.url : false});

            if (window.location.href.indexOf('https') === -1 && !that.params._get('setupEndPoint')) {
                console.error('You are using a "http" connection, but the URL in the "ssl" object, in the setup() method, dont exist or is invalid. See the documentation');
                return;
            }

            var template = ssl.template || false;
            if (template) {
                if (typeof template === 'string') {
                    if (template.indexOf('http') === -1) {
                        console.error('To use the template render feature, you must inform a valid absolute url for the "template" property')
                        return;
                    }
                    if (platform !== 'SAFARI' && !that.params._get('setupEndPoint')) {
                        console.error('Without a valid ssl "url" you cant make use of the template render feature');
                        return;
                    }
                    if (template.slice(-1) === '/') {
                        template = template.substring(0, template.length - 1);
                    }
                    that.params._set({
                        templateEndPoint: template,
                        templateImageUrl: false,
                        templateSiteName: false
                    });
                } else if (typeof template === 'object') {
                    if (template.imageUrl && template.imageUrl.indexOf('http') === -1) {
                        console.error('To use a custom image, you must inform a valid absolute url for the "imageUrl" property');
                        return;
                    }
                    that.params._set({
                        templateEndPoint: false,
                        templateImageUrl: template.imageUrl || false,
                        templateSiteName: template.siteName || false
                    });
                } else {
                    that.params._set({
                        templateEndPoint: false,
                        templateImageUrl: false,
                        templateSiteName: false
                    });
                }
            } else {
                that.params._set({
                    templateEndPoint: false,
                    templateImageUrl: false,
                    templateSiteName: false
                });
            }

            var appid;
            switch (platform) {
            case 'CHROME':
                if (setup.appid.chrome === false) {
                    console.warn('Chrome Disabled');
                    return;
                }
                if (!setup.appid.chrome || setup.appid.chrome === 'APPID') {
                    console.error('No "appid" found for chrome. See the documentation');
                    return;
                }
                appid = setup.appid.chrome;
                break;
            case 'SAFARI':
                if (setup.appid.safari === false) {
                    console.warn('Safari Disabled');
                    return;
                }
                if (!setup.appid.safari || setup.appid.chrome === 'APPID') {
                    console.error('No "appid" found for safari. See the documentation');
                    return;
                }
                appid = setup.appid.safari;
                break;
            case 'FIREFOX':
                if (setup.appid.firefox === false) {
                    console.warn('Safari Disabled');
                    return;
                }
                if (!setup.appid.firefox || setup.appid.chrome === 'APPID') {
                    console.error('No "appid" found for firefox. See the documentation');
                    return;
                }
                appid = setup.appid.firefox;
                break;
            }

            that.params._set({
                devid: setup.devid,
                appid: appid,
                platform: platform
            });

            return that;
        }
    };

}(window));