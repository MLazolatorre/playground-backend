import neo4j from 'neo4j-driver';
import DBCONSTANTS from './DBCONSTANTS';

export default class DB {
  constructor({
    databaseName,
    ip = 'localhost',
    port = '27017',
    username = false,
    password = false,
  }) {
    this.ip = ip;
    this.isConnectedVar = false;
    this.databaseName = databaseName;
    this.username = username;
    this.password = password;
    this.port = port;
    this.driver = null;
    this.db = null;
  }

  get isConnected() {
    return this.isConnectedVar;
  }

  connect() {
    this.driver = neo4j.driver('bolt://127.0.0.1:7687', neo4j.auth.basic('neo4j', 'neo4j'));

    const session = this.driver.session();

    session
      .run('MERGE (james:Person {name : {nameParam} }) RETURN james.name AS name', { nameParam: 'James' })
      .then((result) => {
        result.records.forEach((record) => {
          console.log(record.get('name'));
        });
        session.close();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  disconnect() {
    this.driver.close();
  }
}
