import { Tldraw } from '@abc.xyz/tldraw'
import '@abc.xyz/tldraw/tldraw.css'

export default function HideUiExample() {
	return (
		<div className="tldraw__editor">
			<Tldraw persistenceKey="hide-ui-example" autoFocus hideUi />
		</div>
	)
}
