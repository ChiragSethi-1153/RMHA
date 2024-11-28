import { Event } from "../../common/event";

export class OrderBilled extends Event {
    constructor(payload: any) {
        super(payload);
        this.type = "billing.order_billed";
    }
    getBody() {
        return {
            data: this.payload
        };
    }
}