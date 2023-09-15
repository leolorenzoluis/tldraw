import { StateNode, TLEventHandlers } from '@abc.xyz/editor'

export class Idle extends StateNode {
	static override id = 'idle'

	override onEnter = () => {
		this.editor.setCursor({ type: 'grab', rotation: 0 })
	}

	override onPointerDown: TLEventHandlers['onPointerDown'] = (info) => {
		this.parent.transition('pointing', info)
	}

	override onCancel = () => {
		this.editor.setCurrentTool('select')
	}
}
