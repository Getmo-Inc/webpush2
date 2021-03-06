// fetch polyfill for safari
!function(){"use strict";function t(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function e(t){return"string"!=typeof t&&(t=String(t)),t}function r(t){this.map={},t instanceof r?t.forEach(function(t,e){this.append(e,t)},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function o(t){return t.bodyUsed?Promise.reject(new TypeError("Already read")):void(t.bodyUsed=!0)}function n(t){return new Promise(function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}})}function s(t){var e=new FileReader;return e.readAsArrayBuffer(t),n(e)}function i(t){var e=new FileReader;return e.readAsText(t),n(e)}function a(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t,"string"==typeof t)this._bodyText=t;else if(p.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(p.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(t){if(!p.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t))throw new Error("unsupported BodyInit type")}else this._bodyText=""},p.blob?(this.blob=function(){var t=o(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this.blob().then(s)},this.text=function(){var t=o(this);if(t)return t;if(this._bodyBlob)return i(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)}):this.text=function(){var t=o(this);return t?t:Promise.resolve(this._bodyText)},p.formData&&(this.formData=function(){return this.text().then(f)}),this.json=function(){return this.text().then(JSON.parse)},this}function u(t){var e=t.toUpperCase();return c.indexOf(e)>-1?e:t}function h(t,e){e=e||{};var o=e.body;if(h.prototype.isPrototypeOf(t)){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new r(t.headers)),this.method=t.method,this.mode=t.mode,o||(o=t._bodyInit,t.bodyUsed=!0)}else this.url=t;if(this.credentials=e.credentials||this.credentials||"omit",(e.headers||!this.headers)&&(this.headers=new r(e.headers)),this.method=u(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&o)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(o)}function f(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var r=t.split("="),o=r.shift().replace(/\+/g," "),n=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(o),decodeURIComponent(n))}}),e}function d(t){var e=new r,o=t.getAllResponseHeaders().trim().split("\n");return o.forEach(function(t){var r=t.trim().split(":"),o=r.shift().trim(),n=r.join(":").trim();e.append(o,n)}),e}function l(t,e){e||(e={}),this._initBody(t),this.type="default",this.status=e.status,this.ok=this.status>=200&&this.status<300,this.statusText=e.statusText,this.headers=e.headers instanceof r?e.headers:new r(e.headers),this.url=e.url||""}if(!self.fetch){r.prototype.append=function(r,o){r=t(r),o=e(o);var n=this.map[r];n||(n=[],this.map[r]=n),n.push(o)},r.prototype["delete"]=function(e){delete this.map[t(e)]},r.prototype.get=function(e){var r=this.map[t(e)];return r?r[0]:null},r.prototype.getAll=function(e){return this.map[t(e)]||[]},r.prototype.has=function(e){return this.map.hasOwnProperty(t(e))},r.prototype.set=function(r,o){this.map[t(r)]=[e(o)]},r.prototype.forEach=function(t,e){Object.getOwnPropertyNames(this.map).forEach(function(r){this.map[r].forEach(function(o){t.call(e,o,r,this)},this)},this)};var p={blob:"FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in self,arrayBuffer:"ArrayBuffer"in self},c=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];h.prototype.clone=function(){return new h(this)},a.call(h.prototype),a.call(l.prototype),l.prototype.clone=function(){return new l(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new r(this.headers),url:this.url})},l.error=function(){var t=new l(null,{status:0,statusText:""});return t.type="error",t};var y=[301,302,303,307,308];l.redirect=function(t,e){if(-1===y.indexOf(e))throw new RangeError("Invalid status code");return new l(null,{status:e,headers:{location:t}})},self.Headers=r,self.Request=h,self.Response=l,self.fetch=function(t,e){return new Promise(function(r,o){function n(){return"responseURL"in i?i.responseURL:/^X-Request-URL:/m.test(i.getAllResponseHeaders())?i.getResponseHeader("X-Request-URL"):void 0}var s;s=h.prototype.isPrototypeOf(t)&&!e?t:new h(t,e);var i=new XMLHttpRequest;i.onload=function(){var t=1223===i.status?204:i.status;if(100>t||t>599)return void o(new TypeError("Network request failed"));var e={status:t,statusText:i.statusText,headers:d(i),url:n()},s="response"in i?i.response:i.responseText;r(new l(s,e))},i.onerror=function(){o(new TypeError("Network request failed"))},i.open(s.method,s.url,!0),"include"===s.credentials&&(i.withCredentials=!0),"responseType"in i&&p.blob&&(i.responseType="blob"),s.headers.forEach(function(t,e){i.setRequestHeader(e,t)}),i.send("undefined"==typeof s._bodyInit?null:s._bodyInit)})},self.fetch.polyfill=!0}}();

(function(self){

    var API_END_POINT = ((self.location.href+'').indexOf('local.getmo.') === -1) ? 'https://api.getmo.com.br' : 'https://local.getmo.api';

    var _webpush = {
        debug: true,
        version: '1.2.10',
        iframe: document.createElement('iframe'),
        event: document.createElement('div'),
        events: {
            listeners: [],
            on: function (name, callback) {
                this.listeners.push({name: name, callback: callback});
                _webpush.event.addEventListener(name, callback);
            },
            off: function (name) {
                for (var i = 0; i < this.listeners.length; i++) {
                    if (this.listeners[i].name == name) {
                        _webpush.event.removeEventListener(name, this.listeners[i].callback);
                        this.listeners.splice(i, 1);
                    }
                }
            },
            trigger: function (name) {
                _webpush.event.dispatchEvent(new CustomEvent(name));
            },
            once: function (name) {
                _webpush.event.dispatchEvent(new CustomEvent(name));
                this.off(name);
            }
        },
        control: {
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
        },
        registerEndPoint: API_END_POINT + '/device',
        optOutEndPoint: API_END_POINT + '/device/optout',
        tagEndPoint: API_END_POINT + '/tag',
        notificationEndPoint: API_END_POINT + '/notifications',
        safariEndPoint: API_END_POINT + '/safari',
        params: {
            devid: null,
            appid: null,
            hwid: null,
            regid: null,
            alias: null,
            platform: null,
            setupEndPoint: null,
            templateEndPoint: null,
            safariPushID: null
        },
        _checkSupport: function (platform) {
            if (!('postMessage' in window)) {
                //alert('postMessage is no in window');
                console.warn('"postMessage" is not supported.');
                return;
            }

            if (!('Notification' in window)) {
                //alert('Notification is no in window');
                console.warn('"Notification" is not supported.');
                return;
            }

            if (!this._checkLocalStorageSupport()) {
                //alert('localStorage is no suppported????');
                console.error('"localStorage" is NOT supported.');
                return;
            }

            if (platform == 'CHROME' || platform == 'FIREFOX') {

                if (!('permission' in Notification)) {
                    //alert('This browser dont support Notification');
                    console.warn('This browser dont support Notification');
                    return;
                }

                try {
                    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
                        //alert('showNotification is not in ServiceWorkerRegistration.prototype');
                        console.warn('"showNotification" is not supported.');
                        return;
                    }
                } catch (e) {
                    console.warn('"showNotification" is not supported.', e);
                    return;
                }

                if (!('serviceWorker' in navigator)) {
                    //alert('serviceWorker is not navigator');
                    console.warn('"serviceWorker" is not supported.');
                    return;
                }

                if (!('PushManager' in window)) {
                    //alert('PushManager is not window');
                    console.warn('"PushManager" is not supported.');
                    return;
                }

            } else if (platform == 'SAFARI') {

                if (!('pushNotification' in window.safari)) {
                    console.warn('"pushNotification" is not supported.');
                    return;
                }

            }

            return true;
        },
        _checkLocalStorageSupport: function () {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch (e) {
                return false;
            }
        },
        _getPlatform: function(){
            if ('chrome' in window && /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)) {
                return 'CHROME';
            }
            if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
                if ('safari' in window) {
                    return 'SAFARI';
                } else {
                    console.warn('Probably the user is using a mobile safari browser! "safari" object is not present on "window"')
                }
            }
            if (/Firefox/.test(navigator.userAgent) && typeof InstallTrigger !== 'undefined') {
                return 'FIREFOX';
            }
            return false;
        },
        _setParams: function (newParams) {
            if (typeof(newParams) === 'object'){
                var lsName = 'smartpush_params';
                try {
                    var lsParams = JSON.parse(self.localStorage.getItem(lsName));
                    for(var key in lsParams) {
                        if(lsParams.hasOwnProperty(key)){
                            this.params[key] = lsParams[key];
                        }
                    }
                } catch (e) {}
                for(var key in newParams) {
                    if(newParams.hasOwnProperty(key)){
                        this.params[key] = newParams[key];
                    }
                }
                self.localStorage.setItem(lsName, JSON.stringify(this.params));
                // todo? nops... send current this.params to ls-center when needed (if second url param exists on setup)
            }
        },
        _getParam: function(name) {
            if (this.params[name]) {
                return this.params[name];
            } else {
                var lsName = 'smartpush_params';
                try {
                    var lsParams = JSON.parse(localStorage.getItem(lsName));
                    if (lsParams[name]) {
                        this.params[name] = lsParams[name];
                        return lsParams[name];
                    } else {
                        // todo? nops search on ls-center for the needed param. how to make async work?
                        return null;
                    }
                } catch(e) {
                    return null;
                }
            }
        },
        _encodeParams: function (data) {
            if (typeof(data) === 'object'){
                var query = [];
                for(var key in data) {
                    if(data.hasOwnProperty(key)){
                        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
                    }
                }
                return query.join('&');
            } else if (typeof(data) === 'string') {
                return data;
            }
            console.error('Parameters cannot be parsed. Use "object" or a url encoded "string". Unknown type...', typeof(data));
            return false;
        },
        _ajax: function (url, data, method) {
            if (!method) {
                method = 'POST';
            } else {
                data['_method'] = method;
                method = 'POST';
            }
            var params = this._encodeParams(data);
            if (!url || !params) {
                return false;
            }
            return fetch(url, {
                method: method,
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: params
            })
        },
        _request: function(url, data, method) {
            return new Promise(function(resolve, reject) {
                this._ajax(url, data, method).then(function(result){
                    result.json().then(function(json){
                        resolve(json);
                    }, function(e){
                        reject(e);
                    });
                }, function(e) {
                    reject(e);
                });
            }.bind(this));
        },
        // _removeDevice: function() {
        //     if (this.hwid) {
        //         this._ajax(this.registerEndPoint, {
        //             devid: this.devid,
        //             appid: this.appid,
        //             uuid: this.hwid
        //         }, 'DELETE', 'unsubscribe');
        //     } else {
        //         console.error('No "hwid" found when removing device.');
        //     }
        // },
        _createAbsoluteUrl: function(value) {
            var baseUrl = this._getParam('templateEndPoint'),
                url = '';
            if (!value.match('^https?:\/\/')) {
                var templateRootUrlExec = null;
                if (value[0] == '/') {
                    templateRootUrlExec = /^((https?:\/\/(.+?))\/)/i.exec(baseUrl);
                    if (templateRootUrlExec && templateRootUrlExec[2]) {
                        url = templateRootUrlExec[2] + value;
                    }
                } else {
                    templateRootUrlExec = /^(https?:\/\/(.+)\/)/i.exec(baseUrl);
                    if (templateRootUrlExec && templateRootUrlExec[1]) {
                        url = templateRootUrlExec[1] + value;
                    }
                }
            } else {
                url = value;
            }
            return url;
        },
        _makeBase64OfImage: function(img) {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var context = canvas.getContext("2d");
            context.drawImage(img, 0, 0);
            return canvas.toDataURL("image/png");
        },
        _loadStylesForTemplate: function(tempDocument) {
            var cssContent = [],
                cssTags = tempDocument.getElementsByTagName('link'),
                counter = 0,
                interval = null;
            return new Promise(function(resolve, reject) {
                for (var i = 0; i < cssTags.length; i++) {
                    if (cssTags[i].rel != 'stylesheet') {
                        cssContent.push('');
                        continue;
                    }
                    var href = cssTags[i].href;
                    if (href) {
                        href = this._createAbsoluteUrl(href);
                        fetch(href).then(function(response) {
                            response.text().then(function(result) {
                                var urlMatch = result.match(/url\s?\((["']?)(.+\.(png|jpg|gif|jpeg){1})\1?\)/ig);
                                if (urlMatch) {
                                    for (var i = 0; i < urlMatch.length; i++) {
                                        var value = /url\s?\((["']?)(.+\.(png|jpg|gif|jpeg){1})\1?\)/ig.exec(urlMatch[i]);
                                        if (value && value[2]) {
                                            var cssUrl = this._createAbsoluteUrl(value[2]);
                                            if (cssUrl) {
                                                result = result.replace(urlMatch[i], 'url(\'' + cssUrl + '\')');
                                            }
                                        }
                                    }
                                }
                                cssContent.push(result);
                            }.bind(this), function() {
                                cssContent.push('');
                            });
                        }.bind(this), function(e) {
                            console.error('fetch error', e);
                            cssContent.push('');
                        });
                    } else {
                        cssContent.push('');
                    }
                }
                interval = setInterval(function(){
                    if (cssContent.length >= cssTags.length) {
                        var style = document.createElement("style");
                        style.innerHTML = cssContent.join(' ');
                        tempDocument.head.appendChild(style);
                        while (cssTags[0]) {
                            cssTags[0].parentNode.removeChild(cssTags[0]);
                        }
                        clearInterval(interval);
                        resolve(tempDocument);
                    } else {
                        if (counter > 50) {
                            clearInterval(interval);
                            reject('_loadStylesForTemplate() Timeout!');
                        }
                        counter++;
                    }
                }.bind(this), 250);
            }.bind(this));
        },
        _loadImagesForTemplate: function(tempDocument) {
            var me = this,
                imagesContent = [],
                imagesTags = tempDocument.getElementsByTagName('img'),
                counter = 0,
                interval = null;
            return new Promise(function(resolve, reject) {
                for (var i = 0; i < imagesTags.length; i++) {
                    if (!imagesTags[i].src) {
                        var src = /src="((.+?)\.(jpg|jpeg|gif|png))"/gi.exec(imagesTags[i].outerHTML);
                        if (src && src[1]) {
                            var imageUrl = this._createAbsoluteUrl(src[1]);
                            if (imageUrl) {
                                imagesTags[i].src = imageUrl;
                            }
                        } else {
                            continue;
                        }
                    }
                    var image = new Image();
                    image.addEventListener('load', function(e) {
                        imagesContent[this.id] = me._makeBase64OfImage(this);
                        e.stopPropagation();
                        //this.removeEventListener('load');
                    }, true);
                    image.addEventListener('error', function(e) {
                        cssImagesContent[this.id].base64 = 'false';
                        e.stopPropagation();
                        //this.removeEventListener('error');
                    }, true);
                    image.id = i;
                    image.src = imagesTags[i].src;
                }
                interval = setInterval(function(){
                    if (imagesContent.length >= imagesTags.length) {
                        for (var i = 0; i < imagesTags.length; i++) {
                            imagesTags[i].src = imagesContent[i];
                        }
                        clearInterval(interval);
                        resolve(tempDocument);
                    } else {
                        if (counter > 50) {
                            console.error('imagesContent', imagesContent);
                            console.error('imagesTags', imagesTags);
                            clearInterval(interval);
                            reject('_loadImagesForTemplate() Timeout!');
                        }
                        counter++;
                    }
                }.bind(this), 250);
            }.bind(this));
        },
        _loadImagesFromStylesForTemplate: function(tempDocument) {
            var me = this,
                cssImagesContent = {},
                html = tempDocument.head.outerHTML + tempDocument.body.outerHTML,
                urlMatch = html.match(/url\s?\((["']?)(.+\.(png|jpg|gif|jpeg){1})\1?\)/ig),
                counter = 0,
                interval = null;
            return new Promise(function(resolve, reject) {
                if (urlMatch) {
                    for (var i = 0; i < urlMatch.length; i++) {
                        var value = /url\s?\((["']?)(.+\.(png|jpg|gif|jpeg){1})\1?\)/ig.exec(urlMatch[i]);
                        if (value && value[2]) {
                            var cssImageUrl = this._createAbsoluteUrl(value[2]);
                            if (cssImageUrl) {
                                cssImagesContent[cssImageUrl] = {'$1': value[1], '$2': value[2], base64: ''};
                            }
                        }
                    }
                    for (var prop in cssImagesContent) {
                        if(!cssImagesContent.hasOwnProperty(prop)) {
                            continue;
                        }
                        var image = new Image();
                        image.addEventListener('load', function(e) {
                            cssImagesContent[this.id].base64 = me._makeBase64OfImage(this);
                            e.stopPropagation();
                            //this.removeEventListener('load');
                        }, true);
                        image.addEventListener('error', function(e) {
                            cssImagesContent[this.id].base64 = 'false';
                            e.stopPropagation();
                            //this.removeEventListener('error');
                        }, true);
                        image.id = prop;
                        image.src = prop;
                    }
                    interval = setInterval(function(){
                        var loaded = true;
                        for (var prop in cssImagesContent) {
                            if(!cssImagesContent.hasOwnProperty(prop)) {
                                continue;
                            }
                            if (!cssImagesContent[prop].base64) {
                                loaded = false;
                            }
                        }
                        if (loaded) {
                            for (var prop in cssImagesContent) {
                                if(!cssImagesContent.hasOwnProperty(prop)) {
                                    continue;
                                }
                                if (cssImagesContent[prop].base64 != 'false') {
                                    var newUrl = '';
                                    if (!cssImagesContent[prop].$1) {
                                        newUrl = "'"+cssImagesContent[prop].base64+"'";
                                    } else {
                                        newUrl = cssImagesContent[prop].base64;
                                    }
                                    html = html.replace(prop, newUrl).replace(cssImagesContent[prop].$2, newUrl);
                                }
                            }
                            clearInterval(interval);
                            resolve(new DOMParser().parseFromString('<!DOCTYPE html>'+html, 'text/html'));
                        } else {
                            if (counter > 50) {
                                console.error('cssImagesContent', cssImagesContent);
                                clearInterval(interval);
                                reject('_loadImagesFromStylesForTemplate() Timeout!');
                            }
                            counter++;
                        }
                    }.bind(this), 250);
                } else {
                    resolve(tempDocument);
                }
            }.bind(this));
        },
        _cleanAndPrepareHtml: function(html) {
            return new Promise(function(resolve, reject) {
                var tempDocument = new DOMParser().parseFromString(html.replace(/<script.*?>((\n*)?.*?(\n*)?)*?<\/script>/igm, ''), 'text/html');
                this._loadStylesForTemplate(tempDocument).then(function(tempDocument) {
                    this._loadImagesForTemplate(tempDocument).then(function(tempDocument) {
                        this._loadImagesFromStylesForTemplate(tempDocument).then(function(tempDocument) {
                            var manifest = document.createElement('link');
                            manifest.rel = 'manifest';
                            manifest.href = '/webpush-chrome-manifest.json';
                            tempDocument.head.appendChild(manifest);
                            resolve('<!DOCTYPE html><html>' + tempDocument.head.outerHTML + tempDocument.body.outerHTML + '</html>');
                        }.bind(this), function(e){
                            reject(e);
                        });
                    }.bind(this), function(e){
                        reject(e);
                    });
                }.bind(this), function(e){
                    reject(e);
                });
            }.bind(this));
        },
        _processMessageFromIframe: function(e) {
            switch (e.data.status) {
                case 'ready':
                case 'check-ready':
                case 'status-false-checked':
                case 'status-denied-checked':
                case 'subscribed-error':
                case 'setup-error':
                //case 'unsubscribed-error':
                case 'safari-has-setup':
                    this.events.once(e.data.status);
                    break;
                case 'status-true-checked':
                    this._setParams({
                        hwid: e.data.hwid,
                        regid: e.data.regid,
                        alias: e.data.alias
                    });
                    this.events.once(e.data.status);
                    break;
                case 'status-sm-unreachable':
                case 'setup-ssl-error':
                    if (!this._getParam('setupEndPoint')) {
                        this.events.once(e.data.status);
                        break;
                    }
                case 'registered-redirect':
                    var params = {
                        subscribe: true,
                        callback: self.location.href
                    };
                    if (this._getParam('templateEndPoint')) {
                        fetch(this._getParam('templateEndPoint')).then(function(response) {
                            response.text().then(function(html){
                                this._cleanAndPrepareHtml(html).then(function(newHtml) {
                                    this._setParams({
                                        templateContent: newHtml
                                    });
                                    this._postMessageToIframe('setParams', {
                                        templateContent: this._getParam('templateContent')
                                    });
                                    self.location.href = this.iframe.src + '?' + this._encodeParams(params);
                                }.bind(this), function(e){
                                   console.error(e);
                                });
                            }.bind(this));
                        }.bind(this), function(e) {
                            console.error('Template target error!', e);
                        });
                    } else {
                        self.location.href = this.iframe.src + '?' + this._encodeParams(params);
                    }
                    break;
                case 'subscribed':
                    this._setParams({
                        hwid: e.data.hwid,
                        regid: e.data.regid,
                        alias: e.data.alias
                    });
                    this.events.once(e.data.status);
                    break;
                case 'unsubscribed':
                    //this._removeDevice();
                    break;
                case 'default':
                    console.warn('The user close the ask box without answer to receive Notifications.');
                    this.events.once('subscribed-default');
                    break;
                case 'denied':
                    console.warn('Permission for Notifications was denied. The user denied the notification permission which means we failed to subscribe and the user will need to manually change the notification permission to subscribe to push messages.');
                    this.events.once('subscribed-denied');
                    break;
                case 'error':
                    this.events.once('subscribed-error');
                    break;
                case 'local-storage-center-params':
                    this._setParams(e.data.params);
                    this.events.once('iframe-local-storage-params');
                    break;
                default:
                    console.error('default: e.data.status = ' + e.data.status);
            }
        },
        _postMessageToIframe: function (method, params) {
            var message = {
                method: method ? method : ''
            };
            if (params && typeof(params) === 'object') {
                message.params = params;
            }
            this.iframe.contentWindow.postMessage(message, '*');
        },
        _addIframe: function (callback) {
            if (this.control.iframe.hasLoaded) {
                callback();
                return;
            } else if (this.control.iframe.isLoading) {
                return;
            }
            this.iframe.id = 'smartpush-webpush-iframe';
            this.iframe.style.display = 'none';
            this.iframe.src = (this._getParam('setupEndPoint') ? this._getParam('setupEndPoint') : '')+'/webpush'+(this.version ? '-'+this.version : '')+'.html';
            this.iframe.onload = function() {
                if (!this.control.iframe.hasLoaded) {
                    this.control.iframe.hasLoaded = true;
                    this.control.iframe.isLoading = false;
                    callback();
                }
            }.bind(this);
            this.iframe.onerror = function(e) {
                console.error(e);
            };
            document.body.appendChild(this.iframe);
            this.control.iframe.isLoading = true;
        },
        _addIframeEvents: function() {
            if (this.control.eventForPostMassageIsListening === false) {
                if (self.addEventListener) {
                    self.addEventListener('message', function(e) {
                        if (e.data.status && e.data.source == 'smartpush.webpush.iframe') {
                            this._processMessageFromIframe(e);
                        }
                    }.bind(this), false);
                } else {
                    self.attachEvent('onmessage', function(e) {
                        if (e.data.status && e.data.source == 'smartpush.webpush.iframe') {
                            this._processMessageFromIframe(e);
                        }
                    }.bind(this));
                }
                this.control.eventForPostMassageIsListening = true;
            }
        },
        _setup: function(method) {
            return new Promise(function(resolve, reject) {
                if (this._getParam('platform') == 'CHROME' || this._getParam('platform') == 'FIREFOX') {
                    if (this.control.hasSetup === true) {
                        return resolve();
                    }
                    this.events.on('ready', function() {
                        this.control.hasSetup = true;
                        resolve();
                    }.bind(this));
                    this.events.on('check-ready', function() {
                        resolve();
                    }.bind(this));
                    this.events.on('setup-error', function() {
                        reject('error');
                    });
                    this.events.on('setup-ssl-error', function() {
                        console.error('DOMException: Only secure origins are allowed (see: https://goo.gl/Y0ZkNV).');
                        reject('ssl-error');
                    });
                    this._addIframeEvents();
                    this._addIframe(function() {
                        this._postMessageToIframe(method, {
                            devid: this._getParam('devid'),
                            appid: this._getParam('appid'),
                            platform: this._getParam('platform'),
                            setupEndPoint: this._getParam('setupEndPoint')
                        });
                    }.bind(this));

                } else if (this._getParam('platform') == 'SAFARI') {

                    if (this._getParam('safariPushID') && this._getParam('hwid') && this._getParam('regid')) {
                        resolve();
                        return true;
                    }
                    var url = this.safariEndPoint + '/getPushID';
                    this._request(url, {
                        devid: this._getParam('devid'),
                        appid: this._getParam('appid')
                    }, 'POST').then(function(json){
                        if (json.code = 200 && json.safariPushID) {
                            this._setParams({safariPushID: json.safariPushID});
                            resolve();
                        } else {
                            reject(json.message);
                        }
                    }.bind(this), function(e){
                        console.error('Cannot fetch safari app Push ID', e);
                        reject(e);
                    });
                }
            }.bind(this));
        },
        _getBrowserVersion: function() {
            switch (this._getParam('platform')) {
                case 'CHROME': return navigator.userAgent.match(/Chrom(e|ium|eframe)\/([0-9]+)\./i)[0];
                case 'FIREFOX': return navigator.userAgent.match(/Firefox\/([0-9]+)\./i)[0];
                case 'SAFARI': return 'Safari/' + navigator.userAgent.match(/Version\/(([0-9]+)(\.|[0-9])+)/i)[1];
            }
            return '';
        },
        getAlias: function() {
            return this._getParam('alias');
        },
        checkStatus: function() {
            return new Promise(function(resolve, reject) {
                this._setup().then(function() {
                    if (this._getParam('platform') == 'CHROME' || this._getParam('platform') == 'FIREFOX') {
                        this.events.on('status-true-checked', function(){
                            resolve(this);
                        }.bind(this));
                        this.events.on('status-false-checked', function(){
                            reject('default');
                        });
                        this.events.on('status-denied-checked', function(){
                            reject('denied');
                        });
                        this.events.on('status-sm-unreachable', function() {
                            if (!this._getParam('setupEndPoint')) {
                                document.body.removeChild(document.getElementById('smartpush-webpush-iframe'));
                                this.control.hasSetup = false;
                                this.control.iframe.hasLoaded = false;
                            }
                            reject('default');
                        }.bind(this));
                        this._postMessageToIframe('checkSubscriptionStatus');

                    } else if (this._getParam('platform') == 'SAFARI') {

                        var permissionData = self.safari.pushNotification.permission(this._getParam('safariPushID'));
                        if (permissionData.permission === 'default') {
                            reject('default');
                        } else if (permissionData.permission === 'granted') {
                            if (this._getParam('hwid') && this._getParam('regid')) {
                                resolve(this);
                            } else if (this._getParam('setupEndPoint')) {
                                this.events.on('iframe-local-storage-params', function(){
                                    if (this._getParam('hwid') && this._getParam('regid')) {
                                        resolve(this);
                                    } else {
                                        reject('default');
                                    }
                                }.bind(this));
                                this._postMessageToIframe('getLocalStorageParams');
                            } else {
                                reject('default');
                            }
                        } else if (permissionData.permission === 'denied') {
                            reject('denied');
                        } else {
                            reject('default');
                        }
                    }
                }.bind(this), function(e) {
                    console.error('Cannot setup web push service to check user status', e);
                    reject(e);
                });
            }.bind(this));
        },
        subscribe: function () {
            return new Promise(function(resolve, reject) {
                this._setup('initializeServiceWorker').then(function(){
                    if (this._getParam('platform') == 'CHROME' || this._getParam('platform') == 'FIREFOX') {
                        this.events.on('subscribed', function() {
                            resolve(this);
                        }.bind(this));
                        this.events.on('subscribed-error', function() {
                            reject('error');
                        });
                        this.events.on('subscribed-default', function() {
                            reject('default');
                        });
                        this.events.on('subscribed-denied', function() {
                            reject('denied');
                        });
                        this._postMessageToIframe('subscribe');

                    } else if (this._getParam('platform') == 'SAFARI') {

                        self.safari.pushNotification.requestPermission(
                            this.safariEndPoint,
                            this._getParam('safariPushID'),
                            {
                                devid: this._getParam('devid'),
                                appid: this._getParam('appid')
                            },
                            function(permissionData){
                                if (permissionData.permission === 'default') {
                                    reject('default');
                                } else if (permissionData.permission === 'granted') {
                                    this._request(this.registerEndPoint, {
                                        appid: this._getParam('appid'),
                                        uuid: 'null',
                                        platform: 'SAFARI',
                                        regid: permissionData.deviceToken,
                                        device: 'Safari/' + navigator.userAgent.match(/Version\/(([0-9]+)(\.|[0-9])+)/i)[1],
                                        manufacturer: navigator.vendor,
                                        framework: navigator.platform ? navigator.platform : navigator.oscpu
                                    }, 'POST').then(function(json){
                                        if (json.code == 200 && json.hwid) {
                                            this._setParams({
                                                hwid: json.hwid,
                                                regid: permissionData.deviceToken,
                                                alias: json.alias
                                            });
                                            if (this._getParam('setupEndPoint')) {
                                                this._postMessageToIframe('setParams', {
                                                    devid: this._getParam('devid'),
                                                    appid: this._getParam('appid'),
                                                    hwid: json.hwid,
                                                    regid: permissionData.deviceToken,
                                                    alias: json.alias,
                                                    platform: this._getParam('platform'),
                                                    setupEndPoint: this._getParam('setupEndPoint')
                                                });
                                            }
                                            resolve(this);
                                        } else {
                                            console.error(json.message);
                                            reject('error');
                                        }
                                    }.bind(this), function(e){
                                        console.error('Cannot register extra data for this device!', e);
                                        reject('error');
                                    });
                                } else if (permissionData.permission === 'denied') {
                                    reject('denied');
                                } else {
                                    reject('default');
                                }
                            }.bind(this)
                        );
                    }
                }.bind(this), function(e){
                    console.error('Cannot setup web push service for subscribe to webpush', e);
                    reject('error');
                });
            }.bind(this));
        },
        // unsubscribe: function () {
        //     var that = this;
        //     return new Promise(function(resolve, reject) {
        //         that.events.on('unsubscribed', function() {
        //             resolve();
        //         });
        //         that.events.on('unsubscribed-error', function() {
        //             reject();
        //         });
        //         that.iframe.contentWindow.postMessage('unsubscribe', '*');
        //     });
        // },
        getLastNotifications: function(dateFormat) {
            return new Promise(function(resolve, reject) {
                return this._request(this.notificationEndPoint + '/last', {
                    devid: this._getParam('devid'),
                    appid: this._getParam('appid'),
                    hwid: this._getParam('hwid'),
                    platform: this._getParam('platform'),
                    dateFormat: dateFormat ? dateFormat : '',
                    browserVersion: this._getBrowserVersion()
                }, 'POST').then(function(json){
                    for (var i = 0; i < json.length; i++){
                        json[i].payload.icon = (json[i].payload.icon && (json[i].payload.icon+''.indexOf('http') !== -1)) ? json[i].payload.icon : (this._getParam('setupEndPoint') ? this._getParam('setupEndPoint') : '') + '/webpush-image.png';
                    }
                    resolve(json);
                }.bind(this), function(e){
                    console.error('Cannot fetch user Notifications', e);
                    reject(e);
                });
            }.bind(this));
        },
        getUnreadNotifications: function(dateFormat){
            return new Promise(function(resolve, reject) {
                return this._request(this.notificationEndPoint + '/unread', {
                    devid: this._getParam('devid'),
                    appid: this._getParam('appid'),
                    hwid: this._getParam('hwid'),
                    platform: this._getParam('platform'),
                    dateFormat: dateFormat ? dateFormat : '',
                    browserVersion: this._getBrowserVersion()
                }, 'POST').then(function(json){
                    for (var i = 0; i < json.length; i++){
                        json[i].payload.icon = (json[i].payload.icon && (json[i].payload.icon+''.indexOf('http') !== -1)) ? json[i].payload.icon : (this._getParam('setupEndPoint') ? this._getParam('setupEndPoint') : '') + '/webpush-image.png';
                    }
                    resolve(json);
                }.bind(this), function(e){
                    console.error('Cannot fetch user Unred Notifications', e);
                    reject(e);
                });
            }.bind(this));
        },
        removeUnreadNotification: function(pushid){
            return this._request(this.notificationEndPoint + '/read-one', {
                devid: this._getParam('devid'),
                appid: this._getParam('appid'),
                hwid: this._getParam('hwid'),
                pushid: pushid,
                browserVersion: this._getBrowserVersion()
            }, 'DELETE');
        },
        removeAllUnreadNotifications: function() {
            return this._request(this.notificationEndPoint + '/read-all', {
                devid: this._getParam('devid'),
                appid: this._getParam('appid'),
                hwid: this._getParam('hwid'),
                browserVersion: this._getBrowserVersion()
            }, 'DELETE');
        },
        getTag: function (key) {
            return this._request(this.tagEndPoint + '/' + this._getParam('hwid'), {
                devid: this._getParam('devid'),
                appid: this._getParam('appid'),
                key: key,
                browserVersion: this._getBrowserVersion()
            }, 'POST');
        },
        addTag: function (key, value, type) {
            if (!type) {
                type = 'STRING';
            }
            if (type == 'LIST') {
                value = JSON.stringify(value);
            }
            return this._request(this.tagEndPoint, {
                devid: this._getParam('devid'),
                appid: this._getParam('appid'),
                uuid: this._getParam('hwid'),
                type: type,
                key: key,
                value: value,
                browserVersion: this._getBrowserVersion()
            }, 'POST');
        },
        removeTag: function(key, value, type) {
            if (!type) {
                type = 'STRING';
            }
            if (type == 'LIST') {
                value = JSON.stringify(value);
            }
            return this._request(this.tagEndPoint, {
                devid: this._getParam('devid'),
                appid: this._getParam('appid'),
                uuid: this._getParam('hwid'),
                type: type,
                key: key,
                value: value,
                browserVersion: this._getBrowserVersion()
            }, 'DELETE');
        },
        optOut: function(bool) {
            return this._request(this.optOutEndPoint, {
                devid: this._getParam('devid'),
                appid: this._getParam('appid'),
                uuid: this._getParam('hwid'),
                block: bool ? '1' : '0',
                browserVersion: this._getBrowserVersion()
            }, 'PUT');
        }
    };

    self.Smartpush = {
        create: function(setup) {

            if (!setup.devid || setup.devid == 'DEVID') {
                console.error('No "devid" was NOT set. See the documentation');
                return;
            }
            if (!typeof(setup.appid) === 'object') {
                console.error('"appid" must be a Object');
                return;
            }

            var instance = Object.create(_webpush);

            var sslUrl = setup.sslUrl;
            if (sslUrl) {
                if (sslUrl.indexOf('https') == -1) {
                    console.error('The URL informed ('+sslUrl+') is not secure. Please, use https');
                    return;
                }
                if (sslUrl.slice(-1) == '/') {
                    sslUrl = sslUrl.substring(0, sslUrl.length - 1);
                }
                instance._setParams({setupEndPoint: sslUrl});
            } else {
                instance._setParams({setupEndPoint: false});
            }

            var templateUrl = setup.templateUrl;
            if (templateUrl) {
                if (templateUrl.slice(-1) == '/') {
                    templateUrl = templateUrl.substring(0, templateUrl.length - 1);
                }
                instance._setParams({templateEndPoint: templateUrl});
            } else {
                instance._setParams({templateEndPoint: false});
            }

            var platform = instance._getPlatform();
            if (platform != 'CHROME' && platform != 'SAFARI' && platform != 'FIREFOX') {
                console.info('Platform not Allowed for Webpush:', [navigator.vendor, navigator.userAgent]);
                return;
            }

            if (!instance._checkSupport(platform)) {
                console.error('This browser doesnt have all features to receive webpush.');
                return;
            }

            var appid;
            switch (platform) {
                case 'CHROME':
                    if (setup.appid.chrome === false) {
                        console.warn('Chrome Disabled');
                        return;
                    } else if (!setup.appid.chrome || setup.appid.chrome == 'APPID') {
                        console.error('No "appid" found for chrome. See the documentation');
                        return;
                    }
                    appid = setup.appid.chrome;
                    break;
                case 'SAFARI':
                    if (setup.appid.safari === false) {
                        console.warn('Safari Disabled');
                        return;
                    } else if (!setup.appid.safari || setup.appid.chrome == 'APPID') {
                        console.error('No "appid" found for safari. See the documentation');
                        return;
                    }
                    appid = setup.appid.safari;
                    break;
                case 'FIREFOX':
                    if (setup.appid.firefox === false) {
                        console.warn('Safari Disabled');
                        return;
                    } else if (!setup.appid.firefox || setup.appid.chrome == 'APPID') {
                        console.error('No "appid" found for firefox. See the documentation');
                        return;
                    }
                    appid = setup.appid.firefox;
                    break;
            }

            instance._setParams({
                devid: setup.devid,
                appid: appid,
                platform: platform
            });

            return instance;
        }
    };
}(window));