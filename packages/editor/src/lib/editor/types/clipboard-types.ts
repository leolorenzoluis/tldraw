import { SerializedSchema } from '@abc.xyz/store'
import { TLAsset, TLShape, TLShapeId } from '@abc.xyz/tlschema'

/** @public */
export interface TLContent {
	shapes: TLShape[]
	rootShapeIds: TLShapeId[]
	assets: TLAsset[]
	schema: SerializedSchema
}
