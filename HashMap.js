const { Node, LinkedList } = require('./linkedList');
const util = require("util"); // used for debugging;

class HashMap {
    
    constructor() {
        this.map = [];
    }
    
    #buckets = 97;
    #length = 0;

    #loopAll(listCB, objCB) { // Utility for getKeys and getValues
        var arr = [];
        
        for (let bucket of this.map) {
            if (!bucket) continue;
            else if (this.isList(bucket)) arr = listCB(arr, bucket);
            else objCB(arr, bucket);
        }

        return arr;
    }

    get length() {
        return this.#length;
    } 

    hash(key) {
        var hashCode = 0;
        const prime = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (hashCode * prime + key.charCodeAt(i)) % this.#buckets;
        }

        return hashCode;
    }

    isList = (bucket) =>  bucket instanceof LinkedList;
    
    set(key, value) {
        const hashCode = this.hash(key);
        var bucket = this.map[hashCode];
        var currentPair = {[key]: value};

        const isKey = (node) => Object.keys(node.value)[0] === key ? true : false; // Predicate callback function for linkedlist methods to find duplicates

        if (bucket === undefined) { // Handle empty bucket

            this.map[hashCode] = currentPair;
            this.#length += 1;

        } else if (Object.keys(bucket)[0] === key && !this.isList(bucket)) { // Handle duplicates

            this.map[hashCode] = currentPair

        } else if (this.isList(bucket)) { // Handle linked lists
            if (bucket.contains(isKey)) { // Catch duplicate 
                var duplicateKey = bucket.find(isKey);
                
                this.map[hashCode].replace(currentPair, duplicateKey);

            } else {

                this.map[hashCode].append(currentPair);
                this.#length += 1;

            }

        } else { // Create linked list
            var oldPair = this.map[hashCode];

            this.map[hashCode] = new LinkedList();
            if (Object.keys(oldPair)[0] !== key) { // Catch duplicate

                this.map[hashCode].append(oldPair);
                this.#length += 1;

            }
            this.map[hashCode].append(currentPair);

        }
    }

    get(key) {
        const hashCode = this.hash(key);
        const bucket = this.map[hashCode];

        if (bucket === undefined) {

            return null;

        } else if (this.isList(bucket)) {
            var index = bucket.find((node) => key === Object.keys(node)[0]);

            if (index !== null) {

               return bucket.at(index)[key];

            } else {

                return null;

            }
        } else {

            return bucket[key];

        }
    }

    has(key) {
        const hashCode = this.hash(key);

        if (this.map[hashCode] === undefined) {

            return false;

        } else if (this.isList(this.map[hashCode])) {

            return this.map[hashCode].contains((node) => Object.keys(node.value)[0] === key);

        } else if (Object.keys(this.map[hashCode])[0] === key) {

            return true;

        }

        return false;
    }

    remove(key) {
        const hashCode = this.hash(key);

        if (this.map[hashCode] === undefined) {

            return false;

        } else if (this.isList(this.map[hashCode])) {
            var index = this.map[hashCode].find((node) => Object.keys(node.value)[0] === key);

            if (index !== null) {

                this.map[hashCode].removeAt(index);
                this.#length -= 1;
                return true;

            } else {

                return false;

            }
        } else if (this.map[hashCode][key]) {

            delete this.map[hashCode];
            this.#length -= 1;
            return true;
            
        }

        return false;
    }

    clear() {

        this.map.length = 0;

    }

    getKeys() {
       return this.#loopAll(
        (arr, bucket) => arr.concat(bucket.getKeys()),
        (arr, bucket) => arr.push(Object.keys(bucket)[0])
       )
    }

    getValues() {
      return this.#loopAll(
        (arr, bucket) => arr.concat(bucket.getValues()),
        (arr, bucket) => arr.push(bucket[Object.keys(bucket)[0]])
      )
    }

    getEntries() {
        return this.#loopAll(
            (arr, bucket) => arr.concat(bucket.getEntries()),
            (arr, bucket) => arr.push(Object.entries(bucket)[0])
        )
    }

    findCollision(key) { // Used for debugging
        const hashCode = this.hash(key);
        for (let i = 0; i < 10000000; i++) {
            var candidate = i.toString();
            if (this.hash(candidate) === hashCode) {
                return candidate;
            } 
        }
        return "Fail!"
    }
}

var myMap = new HashMap();
myMap.set("kenny", "kenny powers");
myMap.set("kevin", "kevin malone");
myMap.set("charles", "charles jeffords");
myMap.set("jeff", "jeff johnson");
myMap.set("charles", "charles jeffery");
myMap.set("362", "Collision!");
myMap.set("kenny", "Collision!");
// console.log(util.inspect(myMap.map, { depth: null }));
console.log(myMap.getEntries());
// console.log(myMap.findCollision('kenny'));