import magicRender from '../utils/magicRender'
import App from './App'

const render = (() => {
  let destroy: Function
  return (code: string) => {
    destroy?.()
    destroy = magicRender(new App(code), () => document.querySelector('#yapi .caseContainer'))
  }
})()

export default render
