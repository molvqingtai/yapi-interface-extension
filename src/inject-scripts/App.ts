import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
// import shiki from 'shiki'

import { Polly } from '@pollyjs/core'
import XHRAdapter from '@pollyjs/adapter-xhr'
import LocalStoragePersister from '@pollyjs/persister-local-storage'
Polly.register(XHRAdapter)
Polly.register(LocalStoragePersister)

const { server } = new Polly('请求拦截', {
  adapters: ['xhr'],
  persister: 'local-storage',
  logging: true
})

@customElement('interface-extension')
class App extends LitElement {
  static styles = css`
    .title {
      font-weight: 400;
      margin-bottom: 16px;
      border-left: 3px solid #2395f1;
      padding-left: 8px;
      float: left;
      color: rgba(39, 56, 72, 0.85);
    }
    .code {
    }
  `

  connectedCallback() {
    super.connectedCallback()
    // console.log(111)
    server.get('/api/interface/get').on('response', (req, res) => {
      console.log(JSON.parse(JSON.parse(res.body).data.res_body))
    })
  }

  render() {
    return html`
      <h2 class="title">类型定义</h2>
      <div class="code"></div>
    `
  }
}
export default App
