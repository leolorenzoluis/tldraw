import { StateNode } from '@abc.xyz/editor'
import { Drawing } from './toolStates/Drawing'
import { Idle } from './toolStates/Idle'

export class DrawShapeTool extends StateNode {
	static override id = 'draw'
	static override initial = 'idle'
	static override children = () => [Idle, Drawing]

	override shapeType = 'draw'

	override onExit = () => {
		const drawingState = this.children!['drawing'] as Drawing
		drawingState.initialShape = undefined
	}
}
