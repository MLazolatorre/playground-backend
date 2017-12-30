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

  /**
   * load all api commands in the singleton
   * @return {boolean} - true if it's been successfully loaded
   */
  loadAllCommands() {
    try {
      this.allCommands = this.allPartCommandsInstance.reduce((tmp, partCommand) =>
        [...tmp, ...partCommand.getAllCommands()], []);
    } catch (err) {
      return false;
    }

    return true;
  }

  /**
   * get the singleton instance
   * @return {Object} the instance of the singleton
   */
  static getInstance() {
    return instance || new CommandsAPIHolder();
  }

  /**
   * is the command in parameter exist
   * @param  {string}  commandName - the command name to check
   * @return {Boolean}             - the function that match with the commandName
   */
  isCommandExist(commandName) {
    return this.allCommands.find(x => x.name === commandName).func;
  }

  /**
   * execute the command in parameter
   * @param  {string} cmdName - the command name to execute
   * @param  {Object} params - the parameters for the command
   */
  executeCmd(cmdName, params) {
    const cmd = this.isCommandExist(cmdName);

    if (typeof cmd === 'undefined') {
      throw new Error(`the command ${cmdName} doesn't exist`);
    }

    try {
      cmd.call(null, params);
    } catch (err) {
      throw new Error(`Impossible to execute the command ${cmdName}`);
    }
  }
}
