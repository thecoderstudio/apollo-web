import NewAgentHandler from '../../src/lib/NewAgentHandler';

describe('NewAgentHandler', () => {
  const newAgentHandler = new NewAgentHandler();

  it('get directly on machine command', () => {
    expect(newAgentHandler.getDirectlyOnMachineCommand(
      'os', 'arch', 'id', 'secret'
    )).toBe(
      'curl http://localhost:1234/agent/download?target_os=os&target_arch=arch > apollo-agent.bin &&' +
      ' chmod +x apollo-agent.bin && ./apollo-agent.bin --agent-id=id --secret=secret --host=http://localhost:1234'
    );
  });
});
