export default class DbCONSTANTS {
  static get MONGOOSE_STATES() {
    return {
      OPEN: 'open',
      CLOSE: 'close',
      ERROR: 'error',
      CONNECTED: 'connected',
      DISCONNECTED: 'disconnected',
    };
  }
}
