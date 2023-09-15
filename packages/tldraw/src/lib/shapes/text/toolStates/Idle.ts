import { StateNode, TLEventHandlers, TLGroupShape, TLTextShape } from '@abc.xyz/editor'
import { updateHoveredId } from '../../../tools/selection-logic/updateHoveredId'

export class Idle extends StateNode {
	static override id = 'idle'

	override onPointerMove: TLEventHandlers['onPointerMove'] = (info) => {
		switch (info.target) {
			case 'shape':
			case 'canvas': {
				updateHoveredId(this.editor)
			}
		}
	}

	override onPointerDown: TLEventHandlers['onPointerDown'] = (info) => {
		const { hoveredShape } = this.editor
		const hitShape =
			hoveredShape && !this.editor.isShapeOfType<TLGroupShape>(hoveredShape, 'group')
				? hoveredShape
				: this.editor.getShapeAtPoint(this.editor.inputs.currentPagePoint)
		if (hitShape) {
			if (this.editor.isShapeOfType<TLTextShape>(hitShape, 'text')) {
				requestAnimationFrame(() => {
					this.editor.setSelectedShapes([hitShape.id])
					this.editor.setEditingShape(hitShape.id)
					this.editor.setCurrentTool('select.editing_shape', {
						...info,
						target: 'shape',
						shape: hitShape,
					})
				})
				return
			}
		}

		this.parent.transition('pointing', info)
	}

	override onEnter = () => {
		this.editor.setCursor({ type: 'cross', rotation: 0 })
	}

	override onKeyDown: TLEventHandlers['onKeyDown'] = (info) => {
		if (info.key === 'Enter') {
			const { onlySelectedShape } = this.editor
			// If the only selected shape is editable, start editing it
			if (
				onlySelectedShape &&
				this.editor.getShapeUtil(onlySelectedShape).canEdit(onlySelectedShape)
			) {
				this.editor.setCurrentTool('select')
				this.editor.setEditingShape(onlySelectedShape.id)
				this.editor.root.current.value!.transition('editing_shape', {
					...info,
					target: 'shape',
					shape: onlySelectedShape,
				})
			}
		}
	}

	override onCancel = () => {
		this.editor.setCurrentTool('select')
	}
}
