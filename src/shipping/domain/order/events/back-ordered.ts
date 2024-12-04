import { Event } from "../../common/event";

export class BackOrdered extends Event {
    constructor(payload: any) {
        super(payload);
        this.type = "shipping.back_ordered";
    }
    getBody() {
        return {
            data: this.payload
        };
    }
}