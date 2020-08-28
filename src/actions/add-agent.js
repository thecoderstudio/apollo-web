const SELECT_OPERATING_SYSTEM = 'SELECT_OPERATING_SYSTEM';
const SELECT_ARCHITECTURE = 'SELECT_ARCHITECTURE';

function selectOperatingSystem(operatingSystem) {
  return {
    type: SELECT_OPERATING_SYSTEM,
    selectedOperatingSystem: operatingSystem
  };
}

function selectArchitecture(architecture) {
  return {
    type: SELECT_ARCHITECTURE,
    selectedArchitecture: architecture
  };
}

export {
  selectOperatingSystem,
  SELECT_OPERATING_SYSTEM,
  selectArchitecture,
  SELECT_ARCHITECTURE
};
