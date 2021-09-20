import { createInterceptor } from '@mswjs/interceptors'
import { interceptXMLHttpRequest } from '@mswjs/interceptors/lib/interceptors/XMLHttpRequest'

/**
 * XHR 响应监听
 * @param routerPathFragment 匹配路由地址片段
 * @param requestPathFragment 匹配请求地址片段
 * @param handler 触发回调
 */
const listenResponse = (
  routerPathFragment: string,
  requestPathFragment: string,
  handler: Function
) => {
  try {
    const interceptor = createInterceptor({
      modules: [interceptXMLHttpRequest],
      resolver() {}
    })

    interceptor.on('response', (request, response) => {
      const routerMatched = location.pathname.includes(routerPathFragment)
      const requestMatched = request.url.pathname.includes(requestPathFragment)
      routerMatched && requestMatched && handler(response)
    })

    interceptor.apply()
  } catch (error: any) {
    console.error(`Yapi-Interface-Extension: ${error.message as string}`)
  }
}

export default listenResponse
