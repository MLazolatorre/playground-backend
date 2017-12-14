/* eslint-disable no-restricted-globals */
export default class Utils {
  /**
   * [normalizePort description]
   */
  static normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  /**
   *
   */
  static onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = (typeof port === 'string')
      ? `Pipe  ${this.port}`
      : `Port  ${this.ort}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
}
