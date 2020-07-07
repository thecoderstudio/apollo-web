import navBarReducer from '../../src/reducers/navbar'
import { TOGGLE_OPTIONS } from '../../src/actions/navbar'

describe("navBar reducer", () => {
  it("should return true as initial state", () => {
    expect(navBarReducer(undefined, {})).toEqual(true)
  })

  it("should correctly handle toggle", () => {
    expect(navBarReducer({}, { type: TOGGLE_OPTIONS })).toEqual(false)
  })
})