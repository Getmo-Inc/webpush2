var apiEndPoint = 'https://api.getmo.com.br',
    defaultIcon = '/webpush-image.png';

function indexedDb() {
    return new Promise(function(resolve, reject) {
        var request = self.indexedDB.open('webpush.db', 1);
        request.onsuccess = function(e) {
            resolve(e.target.result);
        };
        request.onerror = function(e) {
            reject(e);
        };
        request.onupgradeneeded = function(e) {
            e.target.result.createObjectStore('info', {keyPath: 'id', autoIncrement: true});
        };
    });
}

function hold(data) {
    return new Promise(function(resolve, reject) {
        if (data.devid && data.appid && data.hwid) {
            return indexedDb().then(function(db){
                var empty = db.transaction(['info'], 'readwrite').objectStore('info').openCursor();
                empty.onsuccess = function(e) {
                    var cursor = e.target.result;
                    if (cursor) {
                        cursor.delete();
                        cursor.continue();
                    }
                };
                var add = db.transaction(['info'], 'readwrite').objectStore('info').add({
                    devid: data.devid,
                    appid: data.appid,
                    hwid: data.hwid,
                    setupEndPoint: data.setupEndPoint
                });
                add.onsuccess = function(e) {
                    resolve();
                };
                add.onerror = function(e) {
                    reject(e);
                };
            }, function(e){
                reject(e);
            });
        }
        resolve();
    });
}

function getInfo() {
    return new Promise(function(resolve, reject) {
        return indexedDb().then(function(db){
            var read = db.transaction(['info'], 'readonly').objectStore('info').openCursor();
            read.onsuccess = function(e) {
                resolve(e.target.result.value);
            };
            read.onerror = function(e) {
                reject(e);
            };
        }, function(e) {
            reject(e);
        });
    });
}

self.addEventListener('install', function(e) {
    e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(e) {
    e.waitUntil(self.clients.claim());
});

self.addEventListener('push', function(e) {
    e.waitUntil(self.registration.pushManager.getSubscription().then(function(subscription) {
        return getInfo().then(function(data){
            if (!data.devid || !data.appid || !data.hwid) {
                console.error('We are unable to get all information from IndexedDB');
                return;
            }

            var regid = null;
            if ('subscriptionId' in subscription) {
                regid = subscription.subscriptionId;
            } else {
                var split = subscription.endpoint.split('/');
                regid = split[(split.length-1)];
            }

            var url = apiEndPoint + '/push/payload?devid='+data.devid+'&appid='+data.appid+'&hwid='+data.hwid+'&regid='+regid;
            return fetch(url).then(function(response) {
                return response.json().then(function(json) {
                    return self.registration.showNotification(json.payload.title, {
                        body: json.payload.text,
                        icon: (json.payload.icon && (json.payload.icon+''.indexOf('http') !== -1)) ? json.payload.icon : (data.setupEndPoint ? data.setupEndPoint : '') + defaultIcon,
                        requireInteraction: json.payload.requireInteraction && json.payload.requireInteraction == 'true' ? true : false,
                        tag: json.payload.campaignId+','+json.payload.clickUrl
                    });
                }).catch(function(e){
                    console.error('payload json() catch Error', e);
                });
            }).catch(function (e) {
                console.error('Fetch payload Error', e);
            });
        }, function(e){
            console.error(e);
        });
    }));
});

self.addEventListener('notificationclick', function(e) {
    var temp = e.notification.tag.split(','),
        pushid = temp[0],
        url = temp[1] + '';

    e.notification.close();

    if (url && url.indexOf('http') !== -1) {
        e.waitUntil(
            clients.matchAll({
                type: "window"
            }).then(function () {
                if (clients.openWindow) {
                    return clients.openWindow(url);
                }
            })
        );
    }

    if (pushid) {
        return getInfo().then(function(data) {
            if (!data.devid || !data.appid || !data.hwid) {
                console.error('We are unable to get all information from IndexedDB');
                return;
            }
            fetch(apiEndPoint + '/hit/info', {
                method: 'post',
                //mode: 'no-cors',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: 'devid='+data.devid+'&appid='+data.appid+'&uuid='+data.hwid+'&action=CLICKED&campaignId='+pushid
            });
        }, function(e){
            console.error(e);
        });
    }
});

self.addEventListener('message', function(e) {
    if (e.data.test && e.data.test === true) {
        e.ports[0].postMessage({received: true});
    } else if (e.data) {
        hold(e.data).then(function(){
            e.ports[0].postMessage({received: true});
        }, function(e){
            console.error(e);
        });
    }
});