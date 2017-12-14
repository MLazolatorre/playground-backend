/**
 * Holde all Commandes
 */

import UserPartCommandAIP from './PartCommmandsAPI/UserPartCommandAIP/UserPartCommandAIP';
import VideoPartCommandAIP from './PartCommmandsAPI/VideoPartCommandAPI/VideoPartCommandAPI';

export default class CommandsAPIHolder {
  constructor() {
    this.allCommands = [];

    this.allPartCommandsClass = [
      UserPartCommandAIP,
      VideoPartCommandAIP,
    ];

    this.allPartCommandsInstance = this.allPartCommandsClass.map(XClass => new XClass());
  }

  loadAllCommands() {
    this.allCommands = this.allPartCommandsInstance.reduce((tmp, partCommand) =>
      [...tmp, ...partCommand.getAllCommands()], []);
  }
}
