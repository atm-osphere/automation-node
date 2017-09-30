import { SlackMessage } from "@atomist/slack-messages/SlackMessages";
import { CommandHandler, HandleCommand, Parameter, HandlerContext, HandlerResult } from "@atomist/automation-client/Handlers";
import { sendMessages } from "@atomist/automation-client/operations/support/contextUtils";

@CommandHandler("Sends a startup message to the owner of this automation-client")
export class SendStartupMessage implements HandleCommand {

    @Parameter({ pattern: /^.*$/ })
    public administrator: string;

    @Parameter({ pattern: /^.*$/ })
    public name: string;

    @Parameter({ pattern: /^.*$/ })
    public version: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        const msg: SlackMessage = {
            text: `It's me, \`${this.name}/${this.version}\`! I'm now running!`,
        };

        ctx.messageClient.recordAddressUsers(msg, this.administrator);
        return sendMessages(ctx);
    }
}