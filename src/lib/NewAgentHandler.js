export default class NewAgentHandler {
  constructor() {
    this.supportedArch = ['amd64', 'arm64', 'arm'];
    this.supportedOS = ['linux', 'darwin', 'freebsd', 'openbsd'];
  }

  getDirectlyOnMachineCommand(os, arch, agentId, secret) {
    let command = `curl ${process.env.APOLLO_HTTP_URL}agent/download?target_os=${os}&target_arch=${arch}`;
    return command += ` > apollo-agent.bin && ${this.getExecuteCommand(agentId, secret)}`;
  }

  getExecuteCommand(agentId, secret) {
    let command = `chmod +x apollo-agent.bin && ./apollo-agent.bin --agent-id=${agentId} --secret=${secret}`;
    return command += ` --host=${process.env.APOLLO_BASE_HTTP_URL}${process.env.APOLLO_PORT}`;
  }

  downloadFile(data) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(new Blob([data]));
    link.download = 'apollo-agent.bin';
    link.click();
  }
}