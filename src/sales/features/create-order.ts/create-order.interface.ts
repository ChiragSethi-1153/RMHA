interface CreateOrderPayload {
    order_id: string;
    customer_id: string;
    products: {
        product_id: string;
        quantity: number;
      }[];
    total_amount?: number;
}