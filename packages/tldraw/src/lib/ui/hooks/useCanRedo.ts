import { useEditor, useValue } from '@abc.xyz/editor'

/** @public */
export function useCanRedo() {
	const editor = useEditor()
	return useValue('useCanRedo', () => editor.canRedo, [editor])
}
