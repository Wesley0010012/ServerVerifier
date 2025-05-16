import { DomainError } from 'project-custom-errors'
import { Usage } from '../../usage'

describe('Usage', () => {
  test('should throw if used is higher than total', () => {
    expect(() => new Usage(10, 100)).toThrow(DomainError)
  })

  test('test should return the correct free', () => {
    const data = new Usage(100, 10)

    expect(data.getFree()).toBe(90)
  })

  test('should return the correct percentage', () => {
    const data = new Usage(100, 10)

    expect(data.getPercentage()).toBe(90)
  })

  test('should return true if the percentage is equal than limit', () => {
    const data = new Usage(100, 10)

    const limit = 90

    expect(data.isInLimit(limit)).toBe(true)
  })

  test('should return true if the percentage is lower than limit', () => {
    const data = new Usage(100, 10)

    const limit = 99

    expect(data.isInLimit(limit)).toBe(true)
  })

  test('should return false if the percentage is higher than limit', () => {
    const data = new Usage(100, 10)

    const limit = 80

    expect(data.isInLimit(limit)).toBe(false)
  })
})
