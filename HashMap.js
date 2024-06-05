const LinkedList = require('./linkedList');

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

    set(key, value) {
        const hashCode = this.hash(key);

        if (this.map[hashCode] === undefined) {

            this.map[hashCode] = {[key]: value};

         } 
        //  else if (this.#getFirstKey(this.map[hashCode]) ===) {



        // }
    }

    // #getFirstKey(obj) {
    //     for (let key in obj) {
    //         return key;
    //     }
    // }
}

var myMap = new HashMap();
console.log(myMap.map);
myMap.set("kenny", "kenny powers");
myMap.set("kevin", "kevin malone");
myMap.set("charles", "charles jeffords");
myMap.set("jeff", "jeff johnson");
console.log(myMap.map[4].next);
console.log(myMap.map);