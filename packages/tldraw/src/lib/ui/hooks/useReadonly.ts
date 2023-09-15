import { useEditor, useValue } from '@abc.xyz/editor'

/** @public */
export function useReadonly() {
	const editor = useEditor()
	return useValue('isReadonlyMode', () => editor.instanceState.isReadonly, [editor])
}
