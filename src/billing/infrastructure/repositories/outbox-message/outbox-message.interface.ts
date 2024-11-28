type BillingOutboxMessagePayloadType = {
  message_id: string;
  type: string;
  properties: BillingOutboxMessagePropertiesType;
  headers: BillingOutboxMessageHeadersType;
  body: BillingOutboxMessageBodyType;
};

type BillingOutboxMessageResponseType = {
  id: number;
  message_id: string;
  type: string;
  properties: BillingOutboxMessagePropertiesType;
  headers: BillingOutboxMessageHeadersType;
  body: BillingOutboxMessageBodyType;
  sent_at?: Date | null;
  status: 'pending' | 'sent';
};

type BillingOutboxMessageHeadersType = {
  type: string;
  content_type: string;
};

type BillingOutboxMessagePropertiesType = {
  messageId: string;
  type: string;
  appId: string;
  contentType: string;
  headers: BillingOutboxMessageHeadersType;
};

type BillingOutboxMessageBodyType = {
  [key: string]: any;
};
