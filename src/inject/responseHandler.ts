import rawToTs from 'raw-to-ts'
import { XhrResponse } from 'ajax-hook'

interface Query {
  required: string
  name: string
  desc: string
}
const queryToCode = (query: Query[]) => {
  const content = query.reduce((acc, { required, name, desc }) => {
    const symbol = required === '0' ? '?' : ''
    return `${acc}\n  /** ${desc} */\n  ${name} ${symbol}: string`
  }, '')
  return `export interface Request {${content}\n}`
}

const responseHandler = (render: Function) => {
  return (res: XhrResponse) => {
    try {
      const data = JSON.parse(res.response).data
      const isGet = data.method === 'GET'
      const requestRaw = JSON.parse(data?.req_body_other || `{}`)
      const responseRaw = JSON.parse(data?.res_body || `{}`)
      const requestCode = isGet
        ? queryToCode(data.req_query)
        : rawToTs(requestRaw, { rootName: 'Request' }).reduce(
            (a, b) => `${a}\n\n${b}`
          )
      const responseCode = rawToTs(responseRaw, {
        rootName: 'Response'
      }).reduce((a, b) => `${a}\n\n${b}`)

      const code = `${requestCode}\n\n${responseCode}`

      // 渲染 app
      render(code)
    } catch (error: any) {
      console.error('Yapi-Interface-Extension:', error.message)
    }
  }
}

export default responseHandler
