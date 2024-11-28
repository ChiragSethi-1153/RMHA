// import { Command, CommandRunner } from "nest-commander";
// import { ConsumerService } from "../rabbitmq/workers/consumer.service";

// interface BasicCommandOptions {
//     limit: number;
//   }

// @Command({ name: 'handle-messages', description: 'handle messages' })
// export class HandleMessages extends CommandRunner {
//     constructor(private readonly consumerService: ConsumerService) {
//         super()
//     }

//     async run(
//         passedParam: string[],
//         options?: BasicCommandOptions,
//       ): Promise<void> {
//         await this.consumerService.consumeMessage(options.limit);
//   }



// }
