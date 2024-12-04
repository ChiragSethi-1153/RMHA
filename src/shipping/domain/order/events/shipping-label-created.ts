import { Event } from "../../common/event";

export class ShippingLabelCreated extends Event {
    constructor(payload: any) {
        super(payload);
        this.type = "shipping.shipping_label_created";
    }
    getBody() {
        return {
            data: this.payload
        };
    }
}