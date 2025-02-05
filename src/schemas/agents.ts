import { z } from 'zod'
import { factionSymbolEnum } from './_enums'

export const publicAgentSchema = z.object({
  symbol: z.string(),
  headquarters: z.string(),
  credits: z.number(),
  startingFaction: factionSymbolEnum,
  shipCount: z.number(),
})

export const privateAgentSchema = z.object({
  accountId: z.string(),
})

export const agentSchema = z.union([
  publicAgentSchema,
  privateAgentSchema,
])

export type Agent = z.infer<typeof agentSchema>

export const agentsSchema = z.array(agentSchema)

export type Agents = z.infer<typeof agentsSchema>
