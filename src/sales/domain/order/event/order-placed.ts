import { Event } from "../../common/event";

export class OrderPlaced extends Event {
    constructor(payload: any) {
        super(payload);
        this.type = "sales.order_placed";
    }
    getBody() {
        return {
            data: this.payload
        };
    }
}