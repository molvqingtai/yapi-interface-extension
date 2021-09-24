import responseHandler from './responseHandler'
import listenResponse from './listenResponse'
import render from './render'

/**
 * App 渲染流程：
 *
 * onResponse -> new App() -> Root mounted -> render(app)
 */
listenResponse('/api/interface/get', responseHandler(render))
