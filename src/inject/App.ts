import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import './components/style-code'

@customElement('interface-extension')
class App extends LitElement {
  constructor(code: string) {
    super()
    this.code = code
  }

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
      position: relative;
    }
    .interface-copy {
      position: absolute;
      background-color: rgba(255, 255, 255, 0.8);
      padding: 5px 10px;
      line-height: 1em;
      font-size: 16px;
      top: 10px;
      right: 30px;
      border: none;
      margin: 0;
      outline: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .interface-copy:hover {
      background-color: #ffffff;
      box-shadow: 0 0 1px 0 #ffffff;
    }
    .interface-copy:active {
      box-shadow: none;
      background-color: rgba(255, 255, 255, 0.8);
    }
    .interface-code {
      background-color: #32363a;
      padding: 16px;
      border-radius: 4px;
      max-height: 80vh;
      overflow-y: auto;
      overscroll-behavior: contain;
    }
    .interface-code::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      background-color: transparent;
    }
    .interface-code::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.5);
    }
  `
  @state()
  code: string

  async handleCodeCopy() {
    try {
      await navigator.clipboard.writeText(this.code)
      alert('已复制到剪切板！')
    } catch (error: any) {
      alert(`复制失败：${error.message as string}`)
    }
  }

  connectedCallback() {
    super.connectedCallback()
    console.log(`Yapi-Interface-Extension: Rendering completed!`)
  }

  render() {
    return html`
      <div class="interface">
        <h2 class="interface-head">类型定义</h2>
        <div class="interface-body">
          <button @click="${this.handleCodeCopy}" class="interface-copy">
            Copy
          </button>
          <div class="interface-code">
            <style-code code="${this.code}"></style-code>
          </div>
        </div>
      </div>
    `
  }
}
export default App
