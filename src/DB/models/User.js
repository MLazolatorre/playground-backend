import DB from '../DB';
import DbUtils from '../DbUtils';
import UserObject from './objects/UserOject';

export default class User {
  constructor(context) {
    this.session = DB.getInstance().getSession(context);
  }

  /**
   * create a user in the DB
   * @param  {Object}  UserParameters The user description
   * @param  {string}  UserParameters.login The user login
   * @param  {string}  UserParameters.pwd   The user password
   * @throws Will throw an error if there is a problem while the db query
   * @return {Object} The user model object
   */
  async createUser({
    login,
    pwd,
  }) {
    try {
      // the a user with the same login to
      // check if the login is already used
      const existingLogin = await this.session.run('MATCH (user:User {login: {login}}) RETURN user', { login });
      if (existingLogin.records.length) throw new Error('login already exist');

      // create the user in the db
      const createdUserResponse = await this.session.run(
        'CREATE (user:User {' +
            'id: {id},' +
            'login: {login},' +
            'pwd: {pwd},' +
            'api_key: {api_key}' +
        '}) RETURN user',
        {
          login,
          id: DbUtils.creatId(),
          pwd: DbUtils.getCyphPwd(login, pwd),
          api_key: DbUtils.createApiKey(),
        },
      );

      // return the Model Object, not the db Object
      return new UserObject(createdUserResponse.records[0].get('user'));
    } catch (err) {
      throw err;
    }
  }
}
