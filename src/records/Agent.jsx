import { Record } from 'immutable';
const UNKNOWN = 'unknown';

const Agent = Record({
  id: null,
  name: null, 
  connectionState: null,
  operatingSystem: UNKNOWN,
  architecture: UNKNOWN,
  externalIpAddress: UNKNOWN,
})

export default Agent;
