import { z } from 'zod'
import { activityLevelEnum, factionSymbolEnum, shipTypeEnum, supplyLevelEnum, systemTypeEnum, tradeSymbolEnum, waypointModifierSymbolEnum, waypointTraitSymbolEnum, waypointTypeEnum } from './_enums'
import { factionSchema } from './factions'
import { shipSchema } from './fleet'

export const systemSymbolSchema = z.string()

export type SystemSymbol = z.infer<typeof systemSymbolSchema>

export const waypointSymbolSchema = z.string()

export type WaypointSymbol = z.infer<typeof waypointSymbolSchema>

export const systemFactionSchema = z.object({
  symbol: factionSymbolEnum,
})

export type SystemFaction = z.infer<typeof systemFactionSchema>

export const jumpGateSchema = z.object({
  symbol: waypointSymbolSchema,
  connections: z.string().array(),
})

export type JumpGate = z.infer<typeof jumpGateSchema>

export const tradeGoodSchema = z.object({
  symbol: tradeSymbolEnum,
  name: z.string(),
  description: z.string(),
})

export type TradeGood = z.infer<typeof tradeGoodSchema>

export const marketTransactionSchema = z.object({
  waypointSymbol: waypointSymbolSchema,
  shipSymbol: z.string(),
  tradeSymbol: tradeSymbolEnum,
  type: z.enum(['PURCHASE', 'SELL']),
  units: z.number(),
  pricePerUnit: z.number(),
  totalPrice: z.number(),
  timestamp: z.coerce.date(),
})

export type MarketTransaction = z.infer<typeof marketTransactionSchema>

export const marketTradeGoodSchema = z.object({
  symbol: tradeSymbolEnum,
  type: z.enum(['EXPORT', 'IMPORT', 'EXCHANGE']),
  tradeVolume: z.number(),
  supply: supplyLevelEnum,
  activity: activityLevelEnum,
  purchasePrice: z.number(),
  sellPrice: z.number(),
})

export type MarketTradeGood = z.infer<typeof marketTradeGoodSchema>

export const marketSchema = z.object({
  symbol: z.string(),
  exports: tradeGoodSchema.array(),
  imports: tradeGoodSchema.array(),
  exchange: tradeGoodSchema.array(),
  transactions: marketTransactionSchema.array(),
  tradeGoods: tradeGoodSchema.array(),

})

export type Market = z.infer<typeof marketSchema>

export const constructionMaterialSchema = z.object({
  tradeSymbol: tradeSymbolEnum,
  required: z.number(),
  fulfilled: z.number(),
})

export type ConstructionMaterial = z.infer<typeof constructionMaterialSchema>

export const constructionSchema = z.object({
  symbol: waypointSymbolSchema,
  materials: constructionMaterialSchema.array(),
  isComplete: z.boolean(),
})

export type Construction = z.infer<typeof constructionSchema>

export const shipyardTransactionSchema = z.object({
  waypointSymbol: z.string(),
  shipSymbol: z.string().optional(),
  shipType: shipTypeEnum,
  price: z.number(),
  agentSymbol: z.string(),
  timestamp: z.coerce.date(),
})

export type ShipyardTransaction = z.infer<typeof shipyardTransactionSchema>

export const shipyardShipSchema = shipSchema.pick({
  frame: true,
  reactor: true,
  engine: true,
  modules: true,
  mounts: true,
}).extend({
  type: shipTypeEnum,
  name: z.string(),
  description: z.string(),
  supply: supplyLevelEnum,
  activity: activityLevelEnum,
  purchasePrice: z.number(),
  crew: z.object({
    required: z.number(),
    capacity: z.number(),
  }),
})

export type ShipyardShip = z.infer<typeof shipyardShipSchema>

export const shipyardSchema = z.object({
  symbol: z.string(),
  shipTypes: z.object({
    type: shipTypeEnum,
  }),
  transactions: shipyardTransactionSchema.array(),
  ships: shipyardShipSchema.array(),
  modificationsFee: z.number(),
})

export type Shipyard = z.infer<typeof shipyardSchema>

export const chartSchema = z.object({
  waypointSymbol: z.string(),
  submittedBy: z.string(),
  submittedOn: z.coerce.date(),
})

export type Chart = z.infer<typeof chartSchema>

export const waypointModifierSchema = z.object({
  symbol: waypointModifierSymbolEnum,
  name: z.string(),
  description: z.string(),
})

export type WaypointModifier = z.infer<typeof waypointModifierSchema>

export const waypointTraitSchema = z.object({
  symbol: waypointTraitSymbolEnum,
  name: z.string(),
  description: z.string(),
})

export type WaypointTrait = z.infer<typeof waypointTraitSchema>

export const waypointFactionSchema = z.object({
  symbol: z.string(),
})

export type WaypointFaction = z.infer<typeof waypointFactionSchema>

export const waypointOrbitalSchema = z.object({
  symbol: z.string(),
})

export type WaypointOrbital = z.infer<typeof waypointOrbitalSchema>

export const systemWaypointSchema = z.object({
  symbol: waypointSymbolSchema,
  type: waypointTypeEnum,
  x: z.number(),
  y: z.number(),
  orbitals: waypointOrbitalSchema.array(),
  orbits: waypointSymbolSchema,
})

export type SystemWaypoint = z.infer<typeof systemWaypointSchema>

export const waypointSchema = z.object({
  symbol: z.string(),
  type: waypointTypeEnum,
  systemSymbol: z.string(),
  x: z.number(),
  y: z.number(),
  orbits: z.string(),
  orbitals: waypointOrbitalSchema.array(),
  faction: waypointFactionSchema,
  traits: waypointTraitSchema.array(),
  modifiers: waypointModifierSchema.array(),
  chart: chartSchema,
  isUnderConstruction: z.boolean(),
})

export type Waypoint = z.infer<typeof waypointSchema>

export const systemSchema = z.object({
  symbol: z.string(),
  sectorSymbol: z.string(),
  type: systemTypeEnum,
  x: z.number(),
  y: z.number(),
  waypoints: systemWaypointSchema.array(),
  factions: factionSchema.pick({ symbol: true }).array(),
})

export type System = z.infer<typeof systemSchema>
