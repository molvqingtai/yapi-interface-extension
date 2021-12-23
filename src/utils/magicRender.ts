import watchElement from './watchElement'

/**
 * 魔法渲染
 *
 * 挂载点插入到 Document，会触发 app 重新渲染
 *
 * 同一个 app 引用，多次渲染将替换旧的 app
 *
 * @param app 要渲染的 App
 * @param selector 选择器，返回挂载点 Target
 * @return destroy 销毁函数
 */
const magicRender = ((destroys: Map<Element, Function>) => (app: Element, selector: () => Element | null) => {
  // 销毁旧的 app，防止同一个 app 引用重复渲染
  destroys.get(app)?.()
  const watcher = watchElement('enter', selector, (target: Element) => target.appendChild(app), true)
  // 创建销毁函数
  const destroy = () => {
    app.remove()
    destroys.delete(app)
    watcher.disconnect()
  }
  return destroys.set(app, destroy).get(app)!
})(new Map())

export default magicRender
