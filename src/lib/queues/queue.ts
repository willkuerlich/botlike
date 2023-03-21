import { DoubleLinkedList } from '../linked-list/doubleLinkedList';

/**
 * FIFO queue structure
 */
export class Queue {
  items: DoubleLinkedList;
  constructor() {
    this.items = new DoubleLinkedList();
  }

  get size() {
    return this.items.size;
  }

  /**
   * Add element to the queue
   * @param {any} item
   * @returns {queue} instance to allow chaining.
   */
  enqueue(item: any): any {
    this.items.addLast(item);
    return this;
  }

  /**
   * Remove element from the queue
   * @returns {any} removed value.
   */
  dequeue() {
    return this.items.removeFirst();
  }

  /**
   * Return true if is empty false otherwise true
   */
  isEmpty() {
    return !this.items.size;
  }

  // Aliases
  add(...args: any) {
    return this.enqueue(args[0] /* ...args */);
  }

  remove(...args: any) {
    return this.dequeue(/* ...args */);
  }
}
