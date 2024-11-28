import { jsonrepair } from "jsonrepair";

export class JsonMessageParserService {
  robustParseMessageContent(message: any): any {
    try {
      return JSON.parse(message.toString());
    } catch (err) {
      console.warn('WARNING: Failed to parse message content initially');
      const repairMessage = jsonrepair(message?.toString() || '{}');
      return JSON.parse(repairMessage);
    }
  }
}
