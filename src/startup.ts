import { AutomationEventListenerSupport } from "@atomist/automation-client/server/AutomationEventListener";
import { TransportEventHandler } from "@atomist/automation-client/internal/transport/TransportEventHandler";
import { guid } from "@atomist/automation-client/internal/util/string";

export class StartUpListener extends AutomationEventListenerSupport {

    constructor(private administrator: string,
        private name: string, private version: string) {
        super()
    }

    public registrationSuccessful(transport: TransportEventHandler) {

        // TODO CD this way of declaring an incoming command isn't nice.
        // We'll fix it with the general polish of API messages.
        transport.onCommand({
            name: "SendStartupMessage",
            atomist_type: "command_handler_request",
            correlation_context: { team: { id: "T1L0VDKJP" } },
            corrid: guid(),
            parameters: [{
                name: "administrator",
                value: this.administrator,
            }, {
                name: "name",
                value: this.name,
            }, {
                name: "version",
                value: this.version,
            }],
            mapped_parameters: [],
            secrets: [],
            team: { id: "T1L0VDKJP" },
            rug: {},
        });
    }
}