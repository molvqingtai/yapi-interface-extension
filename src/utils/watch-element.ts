/**
 * 监听 DOM 挂载状态
 * @param event 事件名称
 * @param matcher 匹配器
 * @param callback 回调函数
 */
const watchElement = <T extends Element>(
  event: 'mount' | 'destroy',
  matcher: () => T | null,
  callback: Function
) => {
  const onMutation: MutationCallback = (mutations) => {
    const target = matcher()
    if (event === 'mount') {
      const mountNodes = mutations.flatMap((mutation) => [
        ...mutation[event === 'mount' ? 'addedNodes' : 'removedNodes']
      ])
      mountNodes.some((node) => target?.isEqualNode(node)) && callback(target)
    }
  }
  new MutationObserver(onMutation).observe(document, {
    childList: true,
    subtree: true
  })
}

export default watchElement
