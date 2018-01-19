export default class UserObject {
  constructor(dbInfos) {
    Object.entries(dbInfos.records[0].get('user').properties).forEach((property) => {
      const key = property[0];
      const value = property[1];

      this[key] = value;
    });
  }
}
