/**
 * DOM 挂载监听
 * @param {string} event 事件名称
 * @param {string} selector 选择器
 * @param {Function} callback 回调函数
 * @param {boolean} immediate 监听事件为初始状态立即触发
 */
const watchElement = <T extends Element>(
  event: 'alway' | 'enter' | 'leave',
  selector: () => T | null,
  callback: Function,
  immediate = false
) => {
  // 初始调用
  let target = selector()
  if (event === 'alway' && immediate) {
    callback(target)
  }
  if (event === 'enter' && immediate) {
    target && callback(target)
  }
  if (event === 'leave' && immediate) {
    !target && callback(target)
  }

  const onMutation: MutationCallback = (mutations) => {
    target = selector()
    mutations
      .flatMap(({ addedNodes, removedNodes }) => {
        if (event === 'enter') return [...addedNodes]
        if (event === 'leave') return [...removedNodes]
        return [...addedNodes, ...removedNodes]
      })
      .some((node) => node === target) && callback(target)
  }
  const observer = new MutationObserver(onMutation)
  observer.observe(document, {
    childList: true,
    subtree: true
  })
  return observer
}

export default watchElement
