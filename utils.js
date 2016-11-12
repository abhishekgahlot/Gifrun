function log() {
  console.log(...arguments); // eslint-disable-line
}

global.log = log;

module.exports = {
  log,
};
