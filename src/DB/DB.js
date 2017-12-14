import mongoose from 'mongoose';
import DbCONSTANTS from './DbCONSTANTS';

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
    return new Promise((resolve, reject) => {
      this.db = mongoose.connect(`mongodb://${this.ip}/${this.databaseName}`);

      // we are listening for the connection success on the DB
      this.db.once(DbCONSTANTS.MONGOOSE_STATES.OPEN, () => {
      // we are connected to the db
        console.log(`Connected to the database ${this.databaseName}`);

        resolve(this);
      });

      // we are listening for on error to happen
      this.db.on(DbCONSTANTS.MONGOOSE_STATES.ERROR, (err) => {
        // an error happend
        console.log(`An error has been catch : ${err}`);

        reject(err);
      });

      // we are listening for the connection on the DB server
      this.db.on(DbCONSTANTS.MONGOOSE_STATES.CONNECTED, () => {
        this.isConnectedVar = true;
      });

      // we are listening for the disconnection on the DB server
      this.db.on(DbCONSTANTS.MONGOOSE_STATES.DISCONNECTED, () => {
        this.isConnectedVar = false;
      });
    });
  }
}
