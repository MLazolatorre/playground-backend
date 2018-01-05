import http from 'http';
import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import Utils from './Utils';
import SERVER_CONTANTS from './SERVER_CONTANTS';
import DBCONSTANTS from '../DB/DBCONSTANTS';

import curlRoutes from '../routes/CurlRoutes';
import apiRoutes from '../routes/ApiRoutes';

import CommandsAPIHolder from '../API/CommandsAPIHolder';

import DB from '../DB/DB';

const debug = require('debug')('playground-backend:server');

export default class App {
  constructor() {
    this.expressObj = express();

    this.serverHttp = null;

    this.port = Utils.normalizePort(process.env.PORT || `${SERVER_CONTANTS.PORT}`);

    this.expressObj.use(logger('dev'));

    this.expressObj.use(bodyParser.json());

    this.expressObj.use(bodyParser.urlencoded({
      extended: false,
    }));

    this.expressObj.use(cookieParser());

    this.expressObj.set('views', express.static(`${__dirname}/../curl/views`));
    this.expressObj.set('view engine', 'twig');

    this.db = null;
  }

  /**
   *
   */
  setPort(port) {
    this.port = Utils.normalizePort(port);
  }

  /**
   *
   */
  createHttpServer() {
    this.serverHttp = http.createServer(this.expressObj);

    return this;
  }

  /**
   * Launche the server
   */
  startHttpServer() {
    this.serverHttp.listen(this.port);

    this.serverHttp.on('error', Utils.onError);

    this.serverHttp.on('listening', () => {
      const addr = this.serverHttp.address();
      const bind = typeof addr === 'string'
        ? `Pipe  ${addr}`
        : `Port  ${addr.port}`;
      debug(`Listening on ${bind}`);
    });

    return this;
  }

  /**
   * set all routes
   */
  defindRoutes() {
    this.expressObj.use('/api', apiRoutes);

    this.expressObj.use('/curl', curlRoutes);

    // catch 404 and forward to error handler
    this.pageNotFoundDetector();

    // error handler
    this.errorDetector();

    return this;
  }

  /**
   *
   */
  pageNotFoundDetector() {
    this.expressObj.use((req, res, next) => {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    });
  }

  /**
   *
   */
  errorDetector() {
    this.expressObj.use((err, req, res) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.this.expressObj.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);

      res.json({
        error: true,
        response: err,
      });
    });
  }

  /**
   * Load Api commands in the API Holder
   */
  loadApiCommands() {
    this.commandsAPIHolder = CommandsAPIHolder.getInstance();

    this.commandsAPIHolder.loadAllCommands();

    return this;
  }

  dbStart() {
    this.db = new DB({
      databaseName: DBCONSTANTS.MAIN_DB_NAME,
    });

    this.db.connect();

    return this;
  }

  /**
   * start the express server
   */
  start() {
    if (!this.serverHttp) {
      this.createHttpServer()
        .defindRoutes();
    }

    this.startHttpServer()
      .loadApiCommands()
      .dbStart();
  }

  quit() {
    this.db.disconnect();
  }
}
