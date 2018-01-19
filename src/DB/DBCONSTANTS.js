export default class DBCONSTANTS {
  static get MONGOOSE_STATES() {
    return {
      OPEN: 'open',
      CLOSE: 'close',
      ERROR: 'error',
      CONNECTED: 'connected',
      DISCONNECTED: 'disconnected',
    };
  }

  static get IP_ADDRESS() {
    return 'localhost';
  }

  static get PORT() {
    return '7687';
  }

  static get URL() {
    return `bolt://${this.IP_ADDRESS}`;
  }

  static get DB_IDS() {
    return {
      LOGIN: 'neo4j',
      PWD: 'neo4j',
    };
  }
}
