import { Queue } from './queue';

/**
 * FIFO queue structure
 */
export class QueueProcess extends Queue {
  _pendingPromise: boolean;
  _stop: boolean;
  constructor() {
    super();
    this._pendingPromise = false;
    this._stop = false;
  }

  /**
   * Add element to the queue
   * @param {any} item
   * @returns {queue} instance to allow chaining.
   */
  enqueue(action: any) {
    //console.log('-> enqueue', action.name);
    return new Promise((resolve, reject) => {
      super.enqueue({ action, resolve, reject });
      this.dequeue();
    });
  }

  /**
   * Remove element from the queue by either resolving its Promise or running its fn async
   * @returns {boolean} true if queue is empty
   */
  async dequeue() {
    if (this._pendingPromise) return false;

    const item = super.dequeue();

    if (!item) return false;

    try {
      this._pendingPromise = true;
      let payload = undefined;
      if (item.action) {
        payload = await item.action(this);
      }

      this._pendingPromise = false;
      item.resolve(payload);
    } catch (e) {
      this._pendingPromise = false;
      item.reject(e);
    } finally {
      this.dequeue();
    }
    return true;
  }
}
