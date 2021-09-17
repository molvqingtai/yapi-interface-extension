import '@webcomponents/custom-elements'
import magicRender from '../utils/magic-render'
import App from './App'

magicRender(new App(), () => document.querySelector('#yapi .caseContainer'))

console.log('yapi-interface-extension')
