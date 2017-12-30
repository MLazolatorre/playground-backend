/**
 * The schema of an AIP command
 * @class
 */
export default class APartCommandAPI {
  constructor() {
    this.name = 'Unset name';
  }

  /**
   * get All Commands
   * @abstract
   */
  getAllCommands() {
    throw new Error('The function is not defined');
  }

  /**
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

  /**
   * Check if the parameters send by the clients match with the command
   * @param  {Object} params the parameters sent by the clients
   * @param  {Object} description object with command's name as key and check function as value
   * @return {boolean} true if params fit with description
   */
  checkParametersAreGood(params, description) {
    params.entries().every((param) => {
      const key = param[0];
      const value = param[1];

      // check if the param exist in the description
      if (typeof description[key] === 'undefined') return false;

      // if the parameter is allowed, launche and return the check function
      return description[key](value);
    });
  }
}
