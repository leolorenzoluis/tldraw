import { useEditor, useValue } from '@abc.xyz/editor'

/** @public */
export function useCanUndo() {
	const editor = useEditor()
	return useValue('useCanUndo', () => editor.canUndo, [editor])
}
