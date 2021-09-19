import { Polly } from '@pollyjs/core'
import XHRAdapter from '@pollyjs/adapter-xhr'
import LocalStoragePersister from '@pollyjs/persister-local-storage'
import responseHandler from './responseHandler'
import render from './render'

Polly.register(XHRAdapter)
Polly.register(LocalStoragePersister)

const { server } = new Polly('Preview', {
  adapters: ['xhr'],
  persister: 'local-storage',
  logging: false
})

/**
 * App 渲染流程：
 *
 * onResponse -> new App() -> Root mounted -> render(app)
 */
server.get('/api/interface/get').on('response', responseHandler(render))

console.log(`%c Yapi-Interface-Extension v1.0.1`, 'color:#ff865c')
