import { expect, assert } from 'chai'

import { isEmpty } from '..'

describe('isEmpty', () => {
    describe('empty cases', () => {
        it('{} should return true', () => {
            expect(isEmpty({})).to.be.true
        })

        it('any number should return true', () => {
            expect(isEmpty(1)).to.be.true
        })

        it('empty str should return true', () => {
            assert.equal(isEmpty(''), true)
        })

        it('null should return true', () => {
            assert.equal(isEmpty(''), true)
        })

        it('[] should return true', () => {
            assert.equal(isEmpty([]), true)
        })
    })

    describe('not empty cases', () => {
        it('object should return true', () => {
            expect(isEmpty({ a: 1 })).to.be.false
        })

        it('any str should return true', () => {
            expect(isEmpty('str')).to.be.false
        })

        it('array should return true', () => {
            assert.equal(isEmpty([1, 2]), false)
        })

        it('object Map should return true', () => {
            const map = new Map().set('key', 10)
            assert.equal(isEmpty(map), false)
        })
    })
})
