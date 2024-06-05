const { Node, LinkedList } = require('./linkedList');
const util = require("util"); // used for debugging;

class HashMap {
    #buckets = 97;
 
    constructor() {
        this.map = [];
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

        if (bucket === undefined || (Object.keys(bucket)[0] === key && key !== 'head')) { // Handle empty bucket and duplicates

                this.map[hashCode] = currentPair;

        } else if (this.isList(bucket)) { // Handle linked lists
            if (bucket.contains(isKey)) { // Catch duplicate 
                var duplicateKey = bucket.find(isKey);
                
                this.map[hashCode].replace(currentPair, duplicateKey);
                
            } else {

                this.map[hashCode].append(currentPair);
            }

        } else { // Create linked list
            var oldPair = this.map[hashCode];

            this.map[hashCode] = new LinkedList();
            if (Object.keys(oldPair)[0] !== key) { // Catch duplicate

                this.map[hashCode].append(oldPair);
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
console.log(util.inspect(myMap.map, { depth: null }));
// console.log(myMap.findCollision('kenny'));