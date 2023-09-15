import { useValue } from '@abc.xyz/state'
import { TLShapeId } from '@abc.xyz/tlschema'
import { useEditor } from './useEditor'

/** @public */
export function useIsCropping(shapeId: TLShapeId) {
	const editor = useEditor()
	return useValue('isCropping', () => editor.croppingShapeId === shapeId, [editor, shapeId])
}
