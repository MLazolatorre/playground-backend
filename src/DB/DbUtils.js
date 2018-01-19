import uuid from 'uuid/v4';
import cryptoMacSha256 from 'crypto-js/hmac-sha256';
import randomstring from 'randomstring';

export default class DbUtils {
  static getCyphPwd(login, pwd) {
    return cryptoMacSha256(login, pwd).words;
  }

  static createApiKey() {
    return randomstring.generate({
      length: 20,
      charset: 'hex',
    });
  }

  static creatId() {
    return uuid();
  }
}
