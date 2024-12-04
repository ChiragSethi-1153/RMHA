type ShippingOutboxMessagePayloadType = {
  message_id: string;
  type: string;
  properties: ShippingOutboxMessagePropertiesType;
  headers: ShippingOutboxMessageHeadersType;
  body: ShippingOutboxMessageBodyType;
};

type ShippingOutboxMessageResponseType = {
  id: number;
  message_id: string;
  type: string;
  properties: ShippingOutboxMessagePropertiesType;
  headers: ShippingOutboxMessageHeadersType;
  body: ShippingOutboxMessageBodyType;
  sent_at?: Date | null;
  status: 'pending' | 'sent';
};

type ShippingOutboxMessageHeadersType = {
  type: string;
  content_type: string;
};

type ShippingOutboxMessagePropertiesType = {
  messageId: string;
  type: string;
  appId: string;
  contentType: string;
  headers: ShippingOutboxMessageHeadersType;
};

type ShippingOutboxMessageBodyType = {
  [key: string]: any;
};
