import '@webcomponents/custom-elements'
import magicRender from '../utils/magic-render'
import RawToTs from 'raw-to-ts'
import { Polly } from '@pollyjs/core'
import XHRAdapter from '@pollyjs/adapter-xhr'
import LocalStoragePersister from '@pollyjs/persister-local-storage'
import App from './App'

Polly.register(XHRAdapter)
Polly.register(LocalStoragePersister)

const { server } = new Polly('请求拦截', {
  adapters: ['xhr'],
  persister: 'local-storage',
  logging: false
})

server.get('/api/interface/get').on('response', (req, res) => {
  try {
    const key = { GET: 'res_body', POST: 'req_body_other' }[
      JSON.parse(res.body).data.method as string
    ]
    const raw = JSON.parse(JSON.parse(res.body).data[key!])
    const code = RawToTs(raw).reduce((a, b) => {
      return `${a}\n\n${b}`
    })
    magicRender(new App(code), () => {
      return document.querySelector('#yapi .caseContainer')
    })
  } catch (error: any) {
    console.error('Raw 解析错误：', error.message)
  }
})

console.log(
  `%c yapi-interface-extension %c v1.0.0 %c`,
  'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
  'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
  'background:transparent'
)
