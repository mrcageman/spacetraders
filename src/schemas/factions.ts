import { z } from 'zod'
import { factionSymbolEnum, factionTraitSymbolEnum } from './_enums'

export const factionTraitSchema = z.object({
  symbol: factionTraitSymbolEnum,
  name: z.string(),
  description: z.string(),
})

export type FactionTrait = z.infer<typeof factionTraitSchema>

export const factionSchema = z.object({
  symbol: factionSymbolEnum,
  name: z.string(),
  description: z.string(),
  headquarters: z.string(),
  traits: factionTraitSchema.array(),
  isRecruiting: z.boolean(),
})

export type Faction = z.infer<typeof factionSchema>
