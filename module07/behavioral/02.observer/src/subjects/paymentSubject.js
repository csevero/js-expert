export default class PaymentSubject {
  #observers = new Set()
  //event that will be trigger to subscribers
  notify(data) {
    this.#observers.forEach(observer => observer.update(data))
  }

  //everybody that wants to unsubscribe at event
  unsubscribe(observable) {
    this.#observers.delete(observable)
  }

  //everybody that wants to subscribe at event
  subscribe(observable) {
    this.#observers.add(observable)
  }
}