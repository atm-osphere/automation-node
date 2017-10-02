import * as appRoot from "app-root-path";
import * as config from "config";
import { Configuration } from "@atomist/automation-client/configuration";
import { guid } from "@atomist/automation-client/internal/util/string";
import { ActionBoard, CommenceWork, ActionBoardUpdate, PostponeWork } from "./action-board/ActionBoard";

import { UpdateActionBoardsOnIssue } from "./action-board/UpdateActionBoardsOnIssue";
import { Unassign } from "./action-board/Unassign";
import { CloseIssue } from "./action-board/Complete";
import { NewAutomation } from "./commands/generator/NewAutomation";
import { HelloIngestor } from "./events/HelloIngestor";
import { StartUpListener } from "./startup";
import { SendStartupMessage } from "./commands/SendStartupMessage";

const pj = require(`${appRoot}//package.json`);

const token = process.env.GITHUB_TOKEN;

const whoami = {
    name: "action-board",
    version: "0.2.4",
    teamId: "T7BPVSAR3",
};

export const configuration: Configuration = {
    ...whoami,
    commands: [
        // action board
        () => new ActionBoard(),
        () => new ActionBoardUpdate(),
        () => new CommenceWork(),
        () => new PostponeWork(),
        () => new CloseIssue(),
        () => new Unassign(),
        // useful from sample
        () => new SendStartupMessage(),
    ],
    events: [
        () => new UpdateActionBoardsOnIssue(),
    ],
    ingestors: [
        () => new HelloIngestor(),
    ],
    token,
    http: {
        enabled: true,
        auth: {
            basic: {
                enabled: false,
            },
            bearer: {
                enabled: false,
            },
        },
    },
    listeners: [
        new StartUpListener(whoami.teamId, "jessitron", whoami.name, whoami.version),
    ],
};
