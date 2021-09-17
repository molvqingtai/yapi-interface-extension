import watchElement from './watch-element'

const customRender = async (app: Element, selector: () => Element | null) => {
  watchElement('mount', selector, (root: Element) => root.appendChild(app))
}

export default customRender
