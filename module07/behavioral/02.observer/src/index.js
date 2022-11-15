import Payment from "./events/payment.js";
import Marketing from "./observers/marketing.js";
import Shipment from "./observers/shipment.js";
import PaymentSubject from "./subjects/paymentSubject.js";


const subject = new PaymentSubject()

const marketing = new Marketing()
subject.subscribe(marketing);

const shipment = new Shipment()
subject.subscribe(shipment)

subject.unsubscribe(marketing)

const payment = new Payment(subject)
payment.creditCard({ username: 'csevero', id: Date.now() })
