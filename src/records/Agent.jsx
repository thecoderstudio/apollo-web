import { Record } from 'immutable';
import { UNKNOWN } from '../util/constants';

const Agent = Record({
  id: null,
  name: null, 
  connectionState: null,
  operatingSystem: UNKNOWN,
  architecture: UNKNOWN,
  externalIpAddress: UNKNOWN,
});

export default Agent;
