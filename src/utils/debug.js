import config from '../../config.json';

function error() {
  if (config.env !== 'dev') return;
  console.error(Array.prototype.join.call(arguments, ' '));
}

function log() {
  if (config.env !== 'dev') return;
  console.log(Array.prototype.join.call(arguments, ' '));
}

function table(value) {
  if (config.env !== 'dev') return;
  console.table(value);
}

function warn() {
  if (config.env !== 'dev') return;
  console.warn(Array.prototype.join.call(arguments, ' '));
}

export default debug = {
  error,
  log,
  table,
  warn,
}