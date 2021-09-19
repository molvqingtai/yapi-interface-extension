import browser from 'webextension-polyfill'
import createElement from '../utils/createElement'

/**
 * 设置 "run_at": "document_start"
 * 尽量在宿主页 script 加载之前插入 inject（不能保证最先加载）
 */
void ((path: string) => {
  const src = browser.runtime.getURL(path)
  const script = createElement<HTMLScriptElement>(
    `<script src="${src}"></script>`
  )
  script.async = false
  script.defer = false
  document.documentElement.appendChild(script)
})('inject/main.js')
