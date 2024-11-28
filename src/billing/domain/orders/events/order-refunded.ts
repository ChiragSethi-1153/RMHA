import { Event } from "../../common/event";

export class OrderRefunded extends Event {
    constructor(payload: any) {
        super(payload);
        this.type = "billing.order_refunded";
    }
    getBody() {
        return {
            data: this.payload
        };
    }
}