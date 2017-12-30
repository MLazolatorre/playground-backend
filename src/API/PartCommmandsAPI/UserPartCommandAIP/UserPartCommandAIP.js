/**
 * All function refer to the user part
 */

import APartCommandAPI from '../APartCommandAPI';
import API_CONSTANTS from '../../API_CONSTANTS';

/**
 *
 * @class
 */
export default class UserPartCommandAIP extends APartCommandAPI {
  constructor() {
    super();
    this.name = API_CONSTANTS.COMMANDS_NAME.User;
  }

  getAllCommands() {
    return this.generateAllCommandsArrayUsingStrings([
      'addUser',
    ]);
  }

  addUser() {
    this.a = 1;

    console.log('Add user function has been called');
  }
}
