import { testFunction } from './test'

describe('Test UnitTest', () => {
  test('should return 3', () => {
    expect(testFunction(1, 2)).toBe(3)
  })
})
