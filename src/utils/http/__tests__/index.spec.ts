import sinon from 'sinon'

import { HTTP } from '..'

describe('http', () => {
    const http = new HTTP('/api')

    it('get', () => {
        const spy = sinon.spy(http, 'get')
        http.get('/get')

        sinon.assert.calledOnce(spy)
    })

    it('post', () => {
        const spy = sinon.spy(http, 'post')
        http.post('/post')

        sinon.assert.calledOnce(spy)
    })

    it('put', () => {
        const spy = sinon.spy(http, 'put')
        http.put('/put')

        sinon.assert.calledOnce(spy)
    })

    it('patch', () => {
        const spy = sinon.spy(http, 'patch')
        http.patch('/patch')

        sinon.assert.calledOnce(spy)
    })

    it('delete', () => {
        const spy = sinon.spy(http, 'delete')
        http.delete('/delete')

        sinon.assert.calledOnce(spy)
    })
})
