/**
 * 帧定时器
 * @param  {Function} func     [回调方法]
 * @param  {Function} stop     [空值判定]
 * @param  {number} timeout    [超时时间]
 * @return {Promise}
 */
const asyncLoopTimer = async <T = any>(
  func: Function,
  stop: Function,
  timeout = Infinity
): Promise<T> => {
  const startTime = performance.now()
  return await new Promise((resolve) => {
    const timer: FrameRequestCallback = async (nowTime: number) => {
      cancelAnimationFrame(requestID)
      const data = await func()
      if (stop(data) || nowTime - startTime > timeout) {
        resolve(data)
      } else {
        requestID = requestAnimationFrame(timer)
      }
    }
    let requestID = requestAnimationFrame(timer)
  })
}

export default asyncLoopTimer
