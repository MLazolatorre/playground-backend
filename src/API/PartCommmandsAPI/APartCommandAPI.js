/**
 * The schema of an AIP command
 */
export default class APartCommandAPI {
  constructor() {
    this.name = 'Unset name';
  }

  getAllCommands() {
    throw new Error('The function is not defined');
  }

  /*
   * generate the commands array using strings name's functions
   * @param  {[String]} arr   all commands name
   * @return {[type]}         the array of command function
   */
  generateAllCommandsArrayUsingStrings(arr) {
    return Array.from(arr, x => ({
      name: x,
      func: this[x],
    }));
  }
}
