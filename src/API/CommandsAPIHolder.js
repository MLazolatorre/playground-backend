/**
 * Holde all Commands
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
   * is the command exist
   * @param  {string}  commandName - the command name
   * @return {Boolean} - the Object {name, func} linked to the command if the command exist, else null
   */
  isCommandExist(commandName) {
    return this.allCommands.find(x => x.name === commandName);
  }

  /**
   * check if the command exite and return the executable command function
   * @param  {[type]} cmdName - The function's name
   * @throws - Will throw an error if the command doesn't exist
   * @return {[type]} - The executable function
   */
  getExecutableCommand(cmdName) {
    const cmd = this.isCommandExist(cmdName);

    if (!cmd) {
      const error = new Error(`The command: '${cmdName}' doesn't exist`);
      error.code = 415;

      throw error;
    }

    return cmd.func;
  }

  /**
   * execute the command in parameter
   * @param  {string} cmdName - The command name to execute
   * @throws - Will throw an error if there is a probleme while the command execution
   * @param  {Object} params - The parameters for the command
   */
  async executeCmd(cmdName, ...params) {
    const cmd = this.getExecutableCommand(cmdName);

    try {
      return cmd.call(null, ...params);
    } catch (err) {
      const error = new Error(`Impossible to execute the command: '${cmdName}'`);
      error.code = 415;

      throw err;
    }
  }
}
