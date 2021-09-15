import asyncQuerySelector from './async-query-selector'

const customRender = async (element: any, selector: string) => {
  const [root] = await asyncQuerySelector(selector)
  console.log('root', root)

  root?.appendChild(element)
}

export default customRender
