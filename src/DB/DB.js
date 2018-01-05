import neo4j from 'neo4j-driver';
import DbCONSTANTS from './DBCONSTANTS';

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
    this.db = null;
  }

  get isConnected() {
    return this.isConnectedVar;
  }

  connect() {
    this.db = neo4j;

    console.log('this.db');
    console.log(this.db);
  }
}
