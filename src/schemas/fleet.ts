import { z } from 'zod'
import { systemTypeEnum, factionSymbolEnum, shipCrewRotationEnum, shipDepositsEnum, shipEngineSymbolEnum, shipFrameSymbolEnum, shipModuleSymbolEnum, shipMountSymbolEnum, shipNavFlightModeEnum, shipNavStatusEnum, shipReactorSymbolEnum, shipRoleEnum, tradeSymbolEnum, waypointTypeEnum, shipConditionSymbolEnum } from './_enums'
import { chartSchema, waypointFactionSchema, waypointOrbitalSchema, waypointSymbolSchema, waypointTraitSchema } from './systems'

export const shipModificationTransactionSchema = z.object({
  waypointSymbol: waypointSymbolSchema,
  shipSymbol: z.string(),
  tradeSymbol: tradeSymbolEnum,
  totalPrice: z.number(),
  timestamp: z.coerce.date()
})

export type shipModificationTransaction = z.infer<typeof shipModificationTransactionSchema>

export const shipConditionEventSchema = z.object({
  symbol: shipConditionSymbolEnum,
  component: z.enum(['FRAME', 'REACTOR', 'ENGINE']),
  name: z.string(),
  description: z.string()
})

export type shipConditionEvent = z.infer<typeof shipConditionEventSchema>

export const scrapTransactionSchema = z.object({
  waypointSymbol: waypointSymbolSchema,
  shipSymbol: z.string(),
  totalPrice: z.number(),
  timestamp: z.coerce.date(),
})

export type ScrapTransaction = z.infer<typeof scrapTransactionSchema>

export const repairTransactionSchema = z.object({
  waypointSymbol: waypointSymbolSchema,
  shipSymbol: z.string(),
  totalPrice: z.number(),
  timestamp: z.coerce.date(),
})

export type RepairTransaction = z.infer<typeof repairTransactionSchema>

export const extractionYieldSchema = z.object({
  symbol: tradeSymbolEnum,
  units: z.number(),
})

export type ExtractionYield = z.infer<typeof extractionYieldSchema>

export const extractionSchema = z.object({
  shipSymbol: z.string(),
  yield: extractionYieldSchema,
})

export type Extraction = z.infer<typeof extractionSchema>

export const surveyDepositSchema = z.object({
  symbol: z.string(),
})

export type SurveyDeposit = z.infer<typeof surveyDepositSchema>

export const surveySchema = z.object({
  signature: z.string(),
  symbol: z.string(),
  deposits: surveyDepositSchema.array(),
  expiration: z.coerce.date(),
  size: z.enum(['SMALL', 'MODERATE', 'LARGE']),
})

export type Survey = z.infer<typeof surveySchema>

export const siphonYieldSchema = z.object({
  symbol: tradeSymbolEnum,
  units: z.number(),
})

export type SiphonYield = z.infer<typeof siphonYieldSchema>

export const siphonSchema = z.object({
  shipSymbol: z.string(),
  yield: siphonYieldSchema,

})

export type Siphon = z.infer<typeof siphonSchema>

export const shipComponentIntegritySchema = z.number().min(0).max(1)

export type ShipComponentIntegrity = z.infer<typeof shipComponentIntegritySchema>

export const shipComponentConditionSchema = z.number().min(0).max(1)

export type ShipComponentCondition = z.infer<typeof shipComponentConditionSchema>

export const shipCargoItemSchema = z.object({
  symbol: tradeSymbolEnum,
  name: z.string(),
  description: z.string(),
  units: z.number(),
})

export type ShipCargoItem = z.infer<typeof shipCargoItemSchema>

export const shipRequirementsSchema = z.object({
  power: z.number(),
  crew: z.number(),
  slots: z.number(),
})

export type ShipRequirements = z.infer<typeof shipRequirementsSchema>

export const shipRegistrationSchema = z.object({
  name: z.string(),
  factionSymbol: factionSymbolEnum,
  role: shipRoleEnum,
})

export type ShipRegistration = z.infer<typeof shipRegistrationSchema>

export const shipNavRouteWaypointSchema = z.object({
  symbol: waypointSymbolSchema,
  type: waypointTypeEnum,
  systemSymbol: z.string(),
  x: z.number(),
  y: z.number(),
})

export type ShipNavRouteWaypoint = z.infer<typeof shipNavRouteWaypointSchema>

export const shipNavRouteSchema = z.object({
  destination: shipNavRouteWaypointSchema,
  origin: shipNavRouteWaypointSchema,
  departureTime: z.coerce.date(),
  arrivalTime: z.coerce.date(),
})

export type ShipNavRoute = z.infer<typeof shipNavRouteSchema>

export const shipNavSchema = z.object({
  systemSymbol: z.string(),
  waypointSymbol: z.string(),
  route: z.any(),
  status: shipNavStatusEnum,
  flightMode: shipNavFlightModeEnum
    .default('CRUISE'),
})

export type ShipNav = z.infer<typeof shipNavSchema>

export const scannedWaypointSchema = z.object({
  symbol: waypointSymbolSchema,
  type: waypointTypeEnum,
  systemSymbol: z.string(),
  x: z.number(),
  y: z.number(),
  orbitals: waypointOrbitalSchema.array(),
  faction: waypointFactionSchema,
  traits: waypointTraitSchema.array(),
  chart: chartSchema,
})

export type ScannedWaypoint = z.infer<typeof scannedWaypointSchema>

export const scannedSystemSchema = z.object({
  symbol: z.string(),
  sectorSymbol: z.string(),
  type: systemTypeEnum,
  x: z.number(),
  y: z.number(),
  distance: z.number(),
})

export type ScannedSystem = z.infer<typeof scannedSystemSchema>

export const scannedShipSchema = z.object({
  symbol: z.string(),
  registration: shipRegistrationSchema,
  nav: shipNavSchema,
  frame: z.object({
    symbol: shipFrameSymbolEnum,
  }),
  reactor: z.object({
    symbol: shipReactorSymbolEnum,
  }),
  engine: z.object({
    symbol: shipEngineSymbolEnum,
  }),
  mounts: z.object({
    symbol: shipMountSymbolEnum,
  }).array(),
})

export type ScannedShip = z.infer<typeof scannedShipSchema>

export const shipCrewSchema = z.object({
  current: z.number(),
  required: z.number(),
  capacity: z.number(),
  rotation: shipCrewRotationEnum
    .default('STRICT'),
  morale: z.number()
    .min(0)
    .max(100),
  wagess: z.number()
    .min(0),
})

export type ShipCrew = z.infer<typeof shipCrewSchema>

export const shipFrameSchema = z.object({
  symbol: shipFrameSymbolEnum,
  name: z.string(),
  description: z.string(),
  condition: shipComponentConditionSchema,
  integrity: shipComponentIntegritySchema,
  moduleSlots: z.number(),
  mountingPoints: z.number(),
  fuelCapacity: z.number(),
  requirements: shipRequirementsSchema,
})

export type ShipFrame = z.infer<typeof shipFrameSchema>

export const shipReactorSchema = z.object({
  symbol: shipReactorSymbolEnum,
  name: z.string(),
  description: z.string(),
  condition: shipComponentConditionSchema,
  integrity: shipComponentIntegritySchema,
  powerOutput: z.number(),
  requirements: shipRequirementsSchema,
})

export type ShipReactor = z.infer<typeof shipReactorSchema>

export const shipEngineSchema = z.object({
  symbol: shipEngineSymbolEnum,
  name: z.string(),
  description: z.string(),
  condition: shipComponentConditionSchema,
  integrity: shipComponentIntegritySchema,
  requirements: shipRequirementsSchema,
})

export type ShipEngine = z.infer<typeof shipEngineSchema>

export const cooldownSchema = z.object({
  shipSymbol: z.string(),
  totalSeconds: z.number(),
  remainingSeconds: z.number(),
  expiration: z.coerce.date(),
})

export type Cooldown = z.infer<typeof cooldownSchema>

export const shipModuleSchema = z.object({
  symbol: shipModuleSymbolEnum,
  capacity: z.number(),
  range: z.number(),
  name: z.string(),
  description: z.string(),
  requirements: shipRequirementsSchema,
})

export type ShipModule = z.infer<typeof shipModuleSchema>

export const shipMountSchema = z.object({
  symbol: shipMountSymbolEnum,
  name: z.string(),
  description: z.string(),
  strength: z.number(),
  deposits: shipDepositsEnum.array(),
  requirements: shipRequirementsSchema,
})

export type ShipMount = z.infer<typeof shipMountSchema>

export const shipCargoSchema = z.object({
  capacity: z.number(),
  units: z.number(),
  inventory: shipCargoItemSchema.array(),
})

export type ShipCargo = z.infer<typeof shipCargoSchema>

export const shipFuelSchema = z.object({
  current: z.number(),
  capacity: z.number(),
  consumed: z.object({
    amount: z.number(),
    timestampt: z.coerce.date(),
  }),
})

export type ShipFuel = z.infer<typeof shipFuelSchema>

export const shipSchema = z.object({
  symbol: z.string(),
  registration: shipRegistrationSchema,
  nav: shipNavSchema,
  crew: shipCrewSchema,
  frame: shipFrameSchema,
  reactor: shipReactorSchema,
  engine: shipEngineSchema,
  cooldown: cooldownSchema,
  modules: z.array(shipModuleSchema),
  mounts: z.array(shipMountSchema),
  cargo: z.array(shipCargoSchema),
  fuel: z.array(shipFuelSchema),
})

export type Ship = z.infer<typeof shipSchema>
