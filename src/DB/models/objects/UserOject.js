export default class UserObject {
  constructor(node) {
    Object.entries(node.properties).forEach((property) => {
      const key = property[0];
      const value = property[1];

      this[key] = value;
    });
  }
}
