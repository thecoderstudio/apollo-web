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
    return command += ` --host=${process.env.EXTERNAL_APOLLO_HTTP_URL}`;
  }
}
