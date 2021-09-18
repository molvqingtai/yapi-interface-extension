import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'

@customElement('interface-extension')
class App extends LitElement {
  static styles = css`
    .interface {
      float: left;
      width: 100%;
    }
    .interface-head {
      font-weight: 400;
      margin-bottom: 30px;
      border-left: 3px solid #2395f1;
      padding-left: 8px;
      color: rgba(39, 56, 72, 0.85);
    }
    .interface-body {
      padding: 0 16px;
    }
    .interface-code {
      background-color: #f8f8f8;
      color: #e0ffff;
      background-color: #32363a;
      padding: 16px;
      border-radius: 4px;
    }
  `
  @state()
  code: string

  constructor(code: string) {
    super()
    this.code = code
  }

  render() {
    return html`
      <div class="interface">
        <h2 class="interface-head">类型定义</h2>
        <div class="interface-body">
          <pre class="interface-code"><code>${this.code}</code>
        </pre>
        </div>
      </div>
    `
  }
}
export default App
