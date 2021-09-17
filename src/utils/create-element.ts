/**
 * 字符串模板创建元素
 * @param {String} template [元素模板]
 * @return {Element} 元素对象
 */
const templateElement = <T extends Element>(template: string) => {
  return new Range().createContextualFragment(template)
    .firstElementChild as unknown as T
}

export default templateElement
