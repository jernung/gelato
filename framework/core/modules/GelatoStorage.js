/**
 * @module Core
 */
define([], function() {

    /**
     * @class GelatoStorage
     */
    function GelatoStorage() {
        this.database = null;
        this.databaseName = null;
        this.databaseVersion = 1;
    }

    /**
     * @method all
     * @param {String} storeName
     * @param {Function} callbackSuccess
     * @param {Function} callbackError
     */
    GelatoStorage.prototype.all = function(storeName, callbackSuccess, callbackError) {
        var objects = [];
        var transaction = this.database.transaction(storeName, 'readonly');
        transaction.oncomplete = function () {
            callbackSuccess(objects);
        };
        transaction.onerror = function (error) {
            callbackError(error);
        };
        transaction.objectStore(storeName).openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                objects.push(cursor.value);
                cursor.continue();
            }
        };
    };

    /**
     * @method bound
     * @param {String} storeName
     * @param {Object} condition
     * @param {Function} callbackSuccess
     * @param {Function} callbackError
     */
    GelatoStorage.prototype.bound = function(storeName, condition, callbackSuccess, callbackError) {
        var objects = [];
        var transaction = this.database.transaction(storeName, 'readonly');
        var index = transaction.objectStore(storeName).index(condition.name);
        transaction.oncomplete = function () {
            callbackSuccess(objects);
        };
        transaction.onerror = function (error) {
            callbackError(error);
        };
        index.openCursor(condition.bound).onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                objects.push(cursor.value);
                cursor.continue();
            }
        };
    };

    /**
     * @method clear
     * @param {Array|String} storeNames
     * @param {Function} callbackSuccess
     * @param {Function} callbackError
     */
    GelatoStorage.prototype.clear = function(storeNames, callbackSuccess, callbackError) {
        var transaction = this.database.transaction(storeNames, 'readwrite');
        storeNames = Array.isArray(storeNames) ? storeNames : [storeNames];
        transaction.oncomplete = function() {
            callbackSuccess();
        };
        transaction.onerror = function(error) {
            callbackError(error);
        };
        for (var i = 0, length = storeNames.length; i < length; i++) {
            transaction.objectStore(storeNames[i]).clear();
        }
    };

    /**
     * @method count
     * @param {String} storeName
     * @param {Function} callbackSuccess
     * @param {Function} callbackError
     */
    GelatoStorage.prototype.count = function(storeName, callbackSuccess, callbackError) {
        var count = 0;
        var transaction = this.database.transaction(storeName, 'readonly');
        transaction.oncomplete = function () {
            callbackSuccess(count);
        };
        transaction.onerror = function (error) {
            callbackError(error);
        };
        transaction.objectStore(storeName).count().onsuccess = function(event) {
            count = event.target.result;
        };
    };

    /**
     * @method destroy
     * @param {Function} callbackSuccess
     * @param {Function} callbackError
     */
    GelatoStorage.prototype.destroy = function(callbackSuccess, callbackError) {
        var self = this;
        this.database.close();
        var request = indexedDB.deleteDatabase(this.databaseName);
        request.onsuccess = function() {
            self.database = null;
            self.databaseName = null;
            self.databaseVersion = 1;
            callbackSuccess();
        };
        request.onerror = function(error) {
            callbackError(error);
        };

    };

    /**
     * @method remove
     * @param {String} storeName
     * @param {Array|String} keys
     * @param {Function} callbackSuccess
     * @param {Function} callbackError
     */
    GelatoStorage.prototype.get = function(storeName, keys, callbackSuccess, callbackError) {
        var objects = [];
        var transaction = this.database.transaction(storeName, 'readonly');
        var objectStore = transaction.objectStore(storeName);
        var singleKey = Array.isArray(keys) ? false : true;
        keys = Array.isArray(keys) ? keys : [keys];
        function push(event) {
            objects.push(event.target.result);
        }
        transaction.oncomplete = function() {
            callbackSuccess(singleKey ? objects[0] : objects);
        };
        transaction.onerror = function(error) {
            callbackError(error);
        };
        for (var i = 0, length = keys.length; i < length; i++) {
            objectStore.get(keys[i]).onsuccess = push;
        }
    };

    /**
     * @method open
     * @param {String} databaseName
     * @param {Object} stores
     * @param {Function} callbackSuccess
     * @param {Function} callbackError
     */
    GelatoStorage.prototype.open = function(databaseName, databaseVersion, stores, callbackSuccess, callbackError) {
        var self = this;
        var request = indexedDB.open(databaseName, databaseVersion || this.databaseVersion);
        request.onsuccess = function(event) {
            self.database = event.target.result;
            self.databaseName = databaseName;
            self.databaseVersion = databaseVersion;
            callbackSuccess();
        };
        request.onerror = function(error) {
            callbackError(error);
        };
        request.onupgradeneeded = function(event) {
            var database = event.target.result;
            for (var storeName in stores) {
                var store = stores[storeName];
                var storeIndex = store.index || [];
                var storeOptions = {autoIncrement: store.autoIncrement || false, keyPath: store.keyPath || null};
                var objectStore = database.createObjectStore(storeName, storeOptions);
                for (var i = 0, length = storeIndex.length; i < length; i++) {
                    var index = storeIndex[i];
                    var indexOptions = {unique: index.unique || false};
                    objectStore.createIndex(index.name, index.name, indexOptions);
                }
            }
        };
    };

    /**
     * @method put
     * @param {String} storeName
     * @param {Array|Object} objects
     * @param {Function} callbackSuccess
     * @param {Function} callbackError
     */
    GelatoStorage.prototype.put = function(storeName, objects, callbackSuccess, callbackError) {
        var transaction = this.database.transaction(storeName, 'readwrite');
        var objectStore = transaction.objectStore(storeName);
        objects = Array.isArray(objects) ? objects : [objects];
        transaction.oncomplete = function () {
            callbackSuccess();
        };
        transaction.onerror = function (error) {
            callbackError(error);
        };
        for (var i = 0, length = objects.length; i < length; i++) {
            objectStore.put(objects[i]);
        }
    };

    /**
     * @method remove
     * @param {String} storeName
     * @param {Array|String} keys
     * @param {Function} callbackSuccess
     * @param {Function} callbackError
     */
    GelatoStorage.prototype.remove = function(storeName, keys, callbackSuccess, callbackError) {
        var transaction = this.database.transaction(storeName, 'readwrite');
        var objectStore = transaction.objectStore(storeName);
        keys = Array.isArray(keys) ? keys : [keys];
        transaction.oncomplete = function() {
            callbackSuccess();
        };
        transaction.onerror = function(error) {
            callbackError(error);
        };
        for (var i = 0, length = keys.length; i < length; i++) {
            objectStore.delete(keys[i]);
        }
    };

    /**
     * @method reset
     * @param {Function} callbackSuccess
     * @param {Function} callbackError
     */
    GelatoStorage.prototype.reset = function(callbackSuccess, callbackError) {
        var storeNames = [];
        var objectStoreNames = this.database.objectStoreNames;
        for (var i = 0; i < objectStoreNames.length; i++) {
            storeNames.push(objectStoreNames[i]);
        }
        this.clear(storeNames, callbackSuccess, callbackError);
    };

    return GelatoStorage;

});