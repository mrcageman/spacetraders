import { z } from 'zod'
import { contractTypeEnum, factionSymbolEnum, tradeSymbolEnum } from './_enums'

export const contractDeliverGoodSchema = z.object({
  tradeSymbol: tradeSymbolEnum,
  destinationSymbol: z.string(),
  unitsRequired: z.number(),
  unitsFulfilled: z.number(),
})

export type ContractDeliverGood = z.infer<typeof contractDeliverGoodSchema>

export const contractPaymentSchema = z.object({
  onAccepted: z.number(),
  onFulfilled: z.number(),
})

export type ContractPayment = z.infer<typeof contractPaymentSchema>

export const contractTermsSchema = z.object({
  deadline: z.coerce.date(),
  payment: contractPaymentSchema,
  deliver: contractDeliverGoodSchema.array(),
})

export type ContractTerms = z.infer<typeof contractTermsSchema>

export const contractSchema = z.object({
  id: z.string(),
  factionSymbol: factionSymbolEnum,
  type: contractTypeEnum,
  terms: contractTermsSchema,
  accepted: z.boolean(),
  fulfilled: z.boolean(),
  expiration: z.coerce.date(),
  deadlineToAccept: z.coerce.date(),
})

export type Contract = z.infer<typeof contractSchema>

export const acceptContractInputSchema = z.object({
  contractId: z.string(),
})

export type AcceptContractInput = z.infer<typeof acceptContractInputSchema>

export const deliverCargoInputSchema = z.object({
  contractId: z.string(),
  shipSymbol: z.string(),
  tradeSymbol: tradeSymbolEnum,
  units: z.number(),
})

export type DeliverCargoInput = z.infer<typeof deliverCargoInputSchema>
