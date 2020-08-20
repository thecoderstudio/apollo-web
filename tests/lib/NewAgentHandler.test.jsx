import NewAgentHandler from '../../src/lib/NewAgentHandler';

describe('NewAgentHandler', () => {
  const newAgentHandler = new NewAgentHandler();

  it('get directly on machine command', () => {
    expect(newAgentHandler.getDirectlyOnMachineCommand(
      'test', 'test', 'test', 'test', 'test'
    )).toBe(
      'curl http://localhost:1970/agent/download?target_os=test&target_arch=test &&' +
      ' chmod +x apollo-agent.bin && ./apollo-agent.bin --agent-id=test --secret=test --host=test'
    );
  });

  it('test download file', () => {
    const link = {
      click: jest.fn()
    };
    jest.spyOn(document, "createElement").mockImplementation(() => link);
    global.URL.createObjectURL = jest.fn();
    newAgentHandler.downloadFile('');
    expect(link.download).toEqual('apollo-agent.bin');
    expect(link.click).toHaveBeenCalledTimes(1);
  });
});