import { Event } from "../../common/event";

export class PaymentFailed extends Event {
    constructor(payload: any) {
        super(payload);
        this.type = "billing.payment_failed";
    }
    getBody() {
        return {
            data: this.payload
        };
    }
}