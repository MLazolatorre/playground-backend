/**
 * Holde all Commandes
 */

import UserPartCommandAIP from './PartCommmandsAPI/UserPartCommandAIP/UserPartCommandAIP';
import VideoPartCommandAIP from './PartCommmandsAPI/VideoPartCommandAPI/VideoPartCommandAPI';

let instance = null;

export default class CommandsAPIHolder {
  constructor() {
    if (instance === null) {
      instance = this;

      this.allCommands = [];

      this.allPartCommandsClass = [
        UserPartCommandAIP,
        VideoPartCommandAIP,
      ];

      this.allPartCommandsInstance = this.allPartCommandsClass.map(XClass => new XClass());
    }

    return instance;
  }

  loadAllCommands() {
    this.allCommands = this.allPartCommandsInstance.reduce((tmp, partCommand) =>
      [...tmp, ...partCommand.getAllCommands()], []);
  }

  static getInstance() {
    return instance || new CommandsAPIHolder();
  }

  isCommandExist(commandName) {
    return this.allCommands.some(x => x.name === commandName);
  }
}
