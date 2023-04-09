
import { IHttpClient, HttpRequest, HttpResponse } from '@/src/usecases/boundaries/output/gateways/http/http-client'

import axios, { AxiosResponse } from 'axios'

export class AxiosAdapter implements IHttpClient {
  async request (data: HttpRequest): Promise<HttpResponse<any>> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
        params: data.params
      })
    } catch (error) {
      axiosResponse = error
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
