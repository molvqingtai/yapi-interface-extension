import asyncLoopTimer from './async-loop-timer.js'

type Return = Element[] | undefined[]
/**
 * css 异步选择器
 * @param  {string} selector [CSS选择器]
 * @param  {number} timeout  [超时时间]
 * @return {Promise}         [DOM 列表]
 */
const asyncQuerySelector = async (selector: string, timeout?: number) => {
  return await asyncLoopTimer<Return>(
    () => [...document.querySelectorAll(selector)],
    (res: Return) => res.length,
    timeout
  )
}

export default asyncQuerySelector
