import { assert } from 'chai'

import { isEqual } from '../index'

describe('isEqual', () => {
    it('2 the same objects, should return true', () => {
        assert.equal(isEqual({ a: 1 }, { a: 1 }), true)
    })

    it('2 not the same objects, should return false', () => {
        assert.equal(isEqual({ a: 1 }, { a: 2 }), false)
    })

    it('2 the same arrays, should return true', () => {
        assert.equal(isEqual([5], [5]), true)
    })

    it('2 not the same arrays, should return false', () => {
        assert.equal(isEqual([5], [15]), false)
    })
})
