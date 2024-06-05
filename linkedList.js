const util = require("util"); // only used to log the entire list in node for testing purposes

class LinkedList {
  #size;

  constructor() {
    this.head = null;
    this.#size = 0;
  }

  append(value) {
    if (this.head === null) {
      this.head = new Node(value);
    } else {
      var lastNode = this.tail;

      lastNode.next = new Node(value);
    }
    this.#size++;
  }

  prepend(value) {
    if (this.head === null) {
      this.head = new Node(value);
    } else {
      var node = new Node(value);
      node.next = this.head;
      this.head = node;
    }
    this.#size++;
  }

  get size() {
    return this.#size;
  }

  get getHead() {
    return this.head;
  }

  get tail() {
    var node = this.head;

    while (node.next !== null) {
      node = node.next;
    }

    return node;
  }

  at(index) {
    var node = this.head;

    for (let i = 0; i < index; i++) {
      node = node.next;
    }

    return node;
  }

  pop() {
    var node = this.head;

    while (node.next.next !== null) {
      node = node.next;
    }

    node.next = null;
  }

  contains(predicate) {
    var node = this.head;

    while (node !== null) {
      if (predicate(node)) {
        return true;
      }
      node = node.next;
    }
    return false;
  }

  find(predicate) {
    var node = this.head;
    var index = 0;

    while (node !== null) {
      if (predicate(node)) {
        return index;
      }
      index++;
      node = node.next;
    }
    return null;
  }

  toString() {
    var node = this.head;
    var str = "";

    while (node !== null) {
      str = str.concat(`(${node.value}) -> `);
      node = node.next;
    }
    str = str.concat(`${node}`);
    return str;
  }

  insertAt(value, index) {
    var node = new Node(value);
    var before = this.at(index - 1);
    var current = before.next;

    node.next = current;
    before.next = node;
    this.#size++;
  }

  removeAt(index) {
    var before = this.at(index - 1);
    var after = before.next.next;

    before.next = after;
    this.#size--;
  }

  replace(value, index) {
    
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

module.exports = LinkedList;

var list = new LinkedList();
list.prepend(1);
list.prepend(2);
list.append(3);
list.append(4);
list.append({john: "john johnson"});

console.log(util.inspect(list, { depth: null }));
