/**
 * All function refer to the user part
 */

import APartCommandAPI from '../APartCommandAPI';
import API_CONSTANTS from '../../API_CONSTANTS';

export default class VideoPartCommandAIP extends APartCommandAPI {
  constructor() {
    super();
    this.name = API_CONSTANTS.COMMANDS_NAME.Video;
  }

  getAllCommands() {
    return this.generateAllCommandsArrayUsingStrings([
      'addAVideo',
    ]);
  }

  addAVideo() {
    this.a = 1;

    console.log('Add a video function has been called');
  }
}
