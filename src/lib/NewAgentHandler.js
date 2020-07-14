export default class NewAgentHandler {
  constructor() {
    this.supportedArch = ['amd64', 'arm64', 'arm'];
    this.supportedOS = ['linux', 'darwin', 'freebsd', 'openbsd'];
  };

  generateDirectlyOnMachineCommand(os) {

  }

  generateManualUploadCommand(os) {

  }
}