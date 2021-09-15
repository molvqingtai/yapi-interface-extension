import browser from 'webextension-polyfill'
import makeElement from '../utils/make-element'
import asyncQuerySelector from '../utils/async-query-selector'

/**
 * 设置 "run_at": "document_start"
 * 使用异步选择器尽量在宿主页 script 加载之前插入 inject（不能保证最先加载）
 */
void (async (path: string) => {
  const src = browser.runtime.getURL(path)
  const script = makeElement(`<script src="${src}"></script>`)
  const [head] = await asyncQuerySelector('head')
  head?.insertAdjacentElement('afterbegin', script)
})('inject-scripts/main.js')
