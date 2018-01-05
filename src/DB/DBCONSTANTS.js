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

  static get MAIN_DB_NAME() {
    return 'Playground';
  }
}
