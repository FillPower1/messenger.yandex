import { expect } from 'chai'
import sinon from 'sinon'

import { HTTP } from '..'

describe('http', () => {
    const http = new HTTP('/api')
    // const stub = sinon.stub('', 'get')
    // console.log(stub)

    it('get', () => {
        http.get('/get')
        // expect(stub.calledOnce).to.be.true
    })
})
