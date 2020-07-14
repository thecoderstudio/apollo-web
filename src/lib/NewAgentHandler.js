export default class NewAgentHandler {
  constructor() {
    this.supportedArch = ['amd64', 'arm64', 'arm'];
    this.supportedOS = ['linux', 'darwin', 'freebsd', 'openbsd'];
  };

  getDirectlyOnMachineCommand(os, arch, agentId, secret, host) {
    let command = `curl http://localhost:1970/agent/download?target_os=${os}&target_arch=${arch}`;
    return command += ` chmod +x apollo-agent && ${this.getExecuteCommand(agentId, secret, host)}`;
  }

  getManualUploadCommand(agentId, secret, host) {
    return command += `chmod +x apollo-agent && ${this.getExecuteCommand(agentId, secret, host)}`;
  }

  getExecuteCommand(agentId, secret, host) {
    return `./apollo-agent --agent-id=${agentId} --secret=${secret}, --host=${host}`;
  }
}