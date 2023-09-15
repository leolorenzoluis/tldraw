import { useValue } from '@abc.xyz/state'
import { TLShapeId } from '@abc.xyz/tlschema'
import { useEditor } from './useEditor'

/** @public */
export function useIsEditing(shapeId: TLShapeId) {
	const editor = useEditor()
	return useValue('isEditing', () => editor.editingShapeId === shapeId, [editor, shapeId])
}
