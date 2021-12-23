import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'

@customElement('style-code')
class StyleCode extends LitElement {
  static styles = css`
    .style-code {
      color: #80ffea;
    }
    .token.keyword {
      color: #ff80bf;
    }
    .token.class-name {
      color: #8aff80;
    }
    .token.comment {
      color: #7970a9;
    }
    .token.punctuation {
      color: #ffffff;
    }
    .token.operator {
      color: #ff80bf;
    }
    .token.builtin {
      color: #ffffff;
    }
  `

  @property({ type: String })
  code = ''

  private highlight(code: string) {
    return unsafeHTML(Prism.highlight(code, Prism.languages.typescript, 'typescript'))
  }

  render() {
    return html`<pre class="style-code"><code>${this.highlight(this.code)}</code></pre>`
  }
}
export default StyleCode
