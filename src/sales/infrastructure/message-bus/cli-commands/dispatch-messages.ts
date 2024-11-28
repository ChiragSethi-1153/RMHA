import { Command, CommandRunner, Option } from 'nest-commander';
import { OutboxMessageRelay } from '../outbox-message-handler.service';

interface BasicCommandOptions {
  limit: number;
}

@Command({ name: 'dispatch-messages', description: 'dispatch messages' })
export class DispatchMessages extends CommandRunner {
  constructor(private readonly outBoxMessageRelay: OutboxMessageRelay) {
    super();
  }

  async run(
    passedParams: string[],
    options?: BasicCommandOptions,
  ): Promise<void> {
    await this.outBoxMessageRelay.handleMessage(options.limit);
    process.exit(0);
  }

  @Option({
    flags: '-l, --limit <limit>',
    description: 'Limit option',
    defaultValue: 10,
  })
  parseLimit(val: string): number {
    return Number(val);
  }
}
