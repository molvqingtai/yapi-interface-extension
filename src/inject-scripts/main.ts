import '@webcomponents/custom-elements'
import App from './App'
import customRender from '../utils/custom-render'

customRender(new App(), '#yapi .caseContainer')

console.log('yapi-interface-extension')
