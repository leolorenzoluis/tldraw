import { EffectScheduler } from '@abc.xyz/state'
import { debounce } from '@abc.xyz/utils'
import * as React from 'react'
import { useContainer } from './useContainer'
import { useEditor } from './useEditor'

export function useZoomCss() {
	const editor = useEditor()
	const container = useContainer()

	React.useEffect(() => {
		const setScale = (s: number) => container.style.setProperty('--tl-zoom', s.toString())
		const setScaleDebounced = debounce(setScale, 100)

		const scheduler = new EffectScheduler('useZoomCss', () => {
			const numShapes = editor.currentPageShapeIds.size
			if (numShapes < 300) {
				setScale(editor.zoomLevel)
			} else {
				setScaleDebounced(editor.zoomLevel)
			}
		})

		scheduler.attach()
		scheduler.execute()

		return () => {
			scheduler.detach()
		}
	}, [editor, container])
}
