/**
 * 字符串模板创建元素
 * @param {String} template [元素模板]
 * @return {Element} 元素对象
 */
const templateElement = (template: string) => {
  return new Range().createContextualFragment(template)
    .firstElementChild as Element
}

export default templateElement
