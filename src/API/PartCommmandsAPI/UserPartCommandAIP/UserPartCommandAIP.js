/**
 * All function refer to the user part
 */
import APartCommandAPI from '../APartCommandAPI';
import API_CONSTANTS from '../../API_CONSTANTS';

import User from '../../../DB/models/User';

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
      'createUser',
    ]);
  }

  async createUser(context, params) {
    const user = new User(context);

    const newUser = await user.createUser(params);

    return {
      token: newUser.api_key,
    };
  }
}
