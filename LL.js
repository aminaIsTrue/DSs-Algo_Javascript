class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class LL {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(value) {
    //O(1)
    const newNode = new Node(value);
    // push to an empty LL
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  pop() {
    //O(n)
    if (this.length === 0) return undefined;
    let temp = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      let prevNode = this.head;
      while (temp.next) {
        prevNode = temp;
        temp = temp.next;
      }
      this.tail = prevNode;
      prevNode.next = null;
    }
    this.length--;
    return temp;
  }
  shift() {
    // O(1)
    if (this.length === 0) return undefined;
    let shiftedNode = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }
    this.length--;
    shiftedNode.next = null;
    return shiftedNode;
  }
  unshift(value) {
    //O(1)
    const newNode = new Node(value);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }
  get(index) {
    let temp = this.head;
    //index out of range
    if (index < 0 || index >= this.length) return undefined;
    for (let i = 0; i <= index; i++) {
      if (i === index) {
        return temp;
      } else temp = temp.next;
    }
  }
  set(value, index) {
    if (this.get(index)) {
      this.get(index).value = value;
      return true;
    }
    return false;
  }
  insert(value, index) {
    //index out of range
    if (index < 0 || index > this.length) return false;
    // insert to an empty LL or to the end of LL is like pushing to LL
    if (this.length === 0 || index === this.length - 1) return this.push(value);
    //insert to the begining of the LL is unshifting
    if (index === 0) return this.unshift(value);
    const newNode = new Node(value);
    const prevNode = this.get(index - 1);
    newNode.next = prevNode.next;
    prevNode.next = newNode;
    this.length++;
    return true;
  }
  remove(index) {
    //index out of range
    if (index < 0 || index > this.length - 1) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    const prevNode = this.get(index - 1);
    const temp = prevNode.next;
    prevNode.next = temp.next;
    this.length--;
    temp.next = null;
    return temp;
  }
  //my brute force solution 1 (not in place)
  reverse() {
    const temp = this.head;
    for (let i = 1; i < this.length; i++) {
      this.get(this.length - i).next = this.get(this.length - (i + 1));
    }
    //make the tail as a new head
    this.head = this.tail;
    //make the previous head become tail
    this.tail = temp;
    // point the new tail to null
    this.tail.next = null;
    //return the reversed linked list
    return this;
  }
  //my brute force solution 2 (not in place)==> create New LL containing the reversed LL
  reverse1() {
    let NewLL = new LL();
    while (this.length > 0) {
      NewLL.push(this.pop().value);
    }
    return NewLL;
  }
  //optimized solution  (in place reverse)
  reverse2() {
    let prev = null;
    let temp = this.head;
    let next = temp.next;
    this.head = this.tail;
    this.tail = temp;
    for (let i = 0; i < this.length; i++) {
      next = temp.next;
      temp.next = prev;
      prev = temp;
      temp = next;
    }
    return this;
  }
}

let myLL = new LL();
myLL.push(0);
myLL.push(1);
myLL.push(2);
myLL.push(3);
//myLL.insert(2, 1);
