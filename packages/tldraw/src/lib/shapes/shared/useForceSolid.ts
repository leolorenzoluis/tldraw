import { useEditor, useValue } from '@abc.xyz/editor'

export function useForceSolid() {
	const editor = useEditor()
	return useValue('zoom', () => editor.zoomLevel < 0.35, [editor])
}
