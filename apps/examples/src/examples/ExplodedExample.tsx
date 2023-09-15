import {
	Canvas,
	ContextMenu,
	TldrawEditor,
	TldrawUi,
	defaultShapeUtils,
	defaultTools,
} from '@abc.xyz/tldraw'
import '@abc.xyz/tldraw/tldraw.css'

export default function ExplodedExample() {
	return (
		<div className="tldraw__editor">
			<TldrawEditor
				initialState="select"
				shapeUtils={defaultShapeUtils}
				tools={defaultTools}
				autoFocus
				persistenceKey="exploded-example"
			>
				<TldrawUi>
					<ContextMenu>
						<Canvas />
					</ContextMenu>
				</TldrawUi>
			</TldrawEditor>
		</div>
	)
}
