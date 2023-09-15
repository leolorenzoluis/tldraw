import { StateNode } from '@abc.xyz/editor'
import { Idle } from './toolStates/Idle'
import { Pointing } from './toolStates/Pointing'

export class NoteShapeTool extends StateNode {
	static override id = 'note'
	static override initial = 'idle'
	static override children = () => [Idle, Pointing]
	override shapeType = 'note'
}
