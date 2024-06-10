const { LinkedList } = require("./linkedList");
const util = require("util");

class HashSet {
    
    constructor() {
        this.set = [];
        }
        
        #buckets = 97;
        #length = 0;
        #isList = (bucket) => bucket instanceof LinkedList;
        
        #loopAll(valueCB, listCB) {
            var arr = [];
        
            for (let bucket of this.set) {
                if (!bucket) continue;
                else if (this.#isList(bucket)) arr = listCB(arr, bucket);
                else valueCB(arr, bucket);
            }
        
            return arr;
        }
        
        hash(key) {
        var hashCode = 0;
        const prime = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (hashCode * prime + key.charCodeAt(i)) % this.#buckets;
        }

        return hashCode;
    }


    add(key) {
        const hashCode = this.hash(key);
        var bucket = this.set[hashCode];

        const isKey = (key) => key === this.set[hashCode];

        if (bucket === undefined) {

            this.set[hashCode] = key;
            this.#length++;

        } else if (isKey(key)) {

            this.set[hashCode] = key;

        } else if (this.#isList(bucket)) {

            if (bucket.contains(isKey)) {
                var duplicateKey = bucket.find(isKey);

                this.set[hashCode].replace(key, duplicateKey);

            } else {

                this.set[hashCode].append(key);
                this.#length++;

            }
        } else {
            var oldKey = this.set[hashCode];

            this.set[hashCode] = new LinkedList();
            this.set[hashCode].append(oldKey);
            this.set[hashCode].append(key);
            this.#length++;

        }
    }

    get(key) {
        const hashCode = this.hash(key);
        const bucket = this.set[hashCode];

        if (bucket === undefined) {

            return null;

        } else if (this.#isList(bucket)) {
            var index = bucket.find((node) => key === node.value);

            if (index !== null) {

                return bucket.at(index).value;

            } else {

                return null;

            }
        } else if (bucket === key){

            return bucket

        } else {

            return null;

        }
    }

    has(key) {
        const hashCode = this.hash(key);
        const bucket = this.set[hashCode];

        if (bucket === undefined) {

            return false;

        } else if (this.#isList(bucket)) {

            return bucket.contains((node) => node.value === key);

        } else if (bucket === key) {

            return true

        } else {

            return false;

        }
    }

    remove(key) {
        const hashCode = this.hash(key);
        const bucket = this.set[hashCode];

        if (bucket === undefined) {

            return false;

        } else if (this.#isList(bucket)) {
            var index = bucket.find((node) => node.value === key);

            if (index !== null) {

                if (bucket.size === 2) {

                    var otherIndex = bucket.find((node) => node.value !== key);
                    this.set[hashCode] = bucket.at(otherIndex).value;

                } else {

                    this.set[hashCode].removeAt(index);

                }

                this.#length--;
                return true;

            } else {

                return false;

            }
        } else if (bucket === key) {

            delete this.set[hashCode];
            this.#length--;
            return true;

        } else {

            return false;

        }
    }

    clear() {

        this.set.length = 0;

    }


    getKeys() {
        return this.#loopAll(
            (arr, bucket) => arr.push(bucket),
            (arr, bucket) => arr.concat(bucket.getValues())
        )
    }
}

var mySet = new HashSet();
mySet.add("jeff");
mySet.add("kenny");
mySet.add("john");
mySet.add("jake");
mySet.add("charles");
mySet.add("holt");
mySet.add("amy");
mySet.add("rosa");
mySet.add("harold");
mySet.add("362");
console.log(mySet.getKeys());
console.log(util.inspect(mySet.set, { depth: null }));
