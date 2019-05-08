/* eslint-disable no-console */

export default class Logger {
  static log(message) {
    console.log(`----- LOG START -----`);
    console.log(message);
    console.log(`----- LOG END -----`);
  }
}
