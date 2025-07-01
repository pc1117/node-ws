
const child_process = require('child_process');
const util = require('node:util');
const logger = require('node:console');

const exec = util.promisify(child_process.exec);
const getCommand = (winCommand, linuxCommand, macCommand) => {
  if (process.platform === 'win32') {
    return winCommand;
  } else if (process.platform === 'darwin') {
    return macCommand;
  } else if (process.platform === 'linux') {
    return linuxCommand;
  } else {
    logger.error('Unsupported platform');
    return '';
  }
};

const openUrl = async (url) => {
  try {
    const command = getCommand('start ' + url, 'xdg-open ' + url, 'open ' + url);
    if (!command) {
      return { code: 1, msg: 'Unsupported platform' }
    }
    await exec(command)
    return { code: 0, msg: 'Open url success' }
  } catch (e) {
    logger.error(`Error open url: ${e.message}`);
    return { code: 1, msg: 'Error while open url' }
  }
}

module.exports = { openUrl };

