import { Tldraw } from '@abc.xyz/tldraw'
import '@abc.xyz/tldraw/tldraw.css'

export default function BasicExample() {
	return (
		<div className="tldraw__editor">
			<Tldraw persistenceKey="tldraw_example" autoFocus />
		</div>
	)
}
