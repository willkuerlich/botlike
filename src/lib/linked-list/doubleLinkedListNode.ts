/**
 * Node with reference to next and previous element
 */
export class DoubleLinkedListNode {
  value: any;
  next: DoubleLinkedListNode | null;
  previous: DoubleLinkedListNode | null;
  constructor(value: any) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }

  // get [Symbol.toStringTag]() {
  //   return this.constructor.name;
  // }

  // get [Symbol.for('toLog')]() {
  //   return {
  //     [`[${this[Symbol.toStringTag]}]`]: isNaN(+this.value) ? this.value : +this.value,
  //   };
  // }
}
