import type { ZodTypeAny } from 'zod'
import { z } from 'zod'

export const paginationSchema = z.object({
  limit: z.number().optional().default(10),
  page: z.number().optional().default(1),
})

export type Pagination = z.infer<typeof paginationSchema>

const metaSchema = z.object({
  limit: z.number(),
  page: z.number(),
  total: z.number(),
})

export type Meta = z.infer<typeof metaSchema>

export function apiListResponse(schema: ZodTypeAny) {
  return z.object({
    data: schema,
    meta: metaSchema,
  })
}

export function apiResponse(schema: ZodTypeAny) {
  return z.object({
    data: schema,
  })
}
