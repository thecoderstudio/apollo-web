import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import 'jest-styled-components'

Enzyme.configure({ adapter: new Adapter() });

process.env = {
  APOLLO_WS_URL: 'ws://localhost:1234/',
  APOLLO_HTTP_URL: 'http://localhost:1234/'
};
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
