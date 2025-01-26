import type { z, ZodTypeAny } from 'zod'
import type { HTTPMethod } from '../types'
import ky from 'ky'
import { env } from '../config/env'
import { ResponseError } from './responseError'

interface FetcherConfig<Schema extends ZodTypeAny | null> {
  readonly method?: HTTPMethod
  readonly schema: Schema
  readonly body?: object
  readonly searchParams?: string[][] | Record<string, string | number> | string | URLSearchParams
  readonly config?: RequestInit & { searchParams?: any }
}

export async function fetcher<Schema extends null>(
  path: string,
  { method, body, config, schema, searchParams }: FetcherConfig<Schema>
): Promise<null>

export async function fetcher<Schema extends ZodTypeAny>(
  path: string,
  { method, body, config, schema, searchParams }: FetcherConfig<Schema>
): Promise<z.infer<Schema>>

export async function fetcher<Schema extends ZodTypeAny>(
  path: string,
  { method = 'GET', body, config, schema, searchParams }: FetcherConfig<Schema>,
) {
  try {
    const response = await ky(path, {
      ...config,
      prefixUrl: env.API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      method,
      ...(body && { json: body }),
      searchParams,
    })

    if (response.ok) {
      if (!schema) {
        return null
      }

      const data = await response.json()

      return schema.parse(data)
    }

    throw new ResponseError(response.statusText, response.status)
  }
  catch (err) {
    if (err instanceof ResponseError) {
      throw err
    }
    throw new ResponseError('Something went wrong during fetching!')
  }
}
