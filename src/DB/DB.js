import neo4j from 'neo4j-driver';
import DBCONSTANTS from './DBCONSTANTS';

let instance = null;

export default class DB {
  constructor() {
    this.driver = neo4j.driver(
      `${DBCONSTANTS.URL}:${DBCONSTANTS.PORT}`,
      neo4j.auth.basic(DBCONSTANTS.DB_IDS.LOGIN, DBCONSTANTS.DB_IDS.PWD),
    );
  }

  static getInstance() {
    if (instance) return instance;

    instance = new DB();

    return instance;
  }

  getSession(context) {
    if (context.neo4jSession) return context.neo4jSession;

    return this.driver.session();
  }
}
