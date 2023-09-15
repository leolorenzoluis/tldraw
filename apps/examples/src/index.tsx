import { getAssetUrlsByMetaUrl } from '@abc.xyz/assets/urls'
import {
	DefaultErrorFallback,
	ErrorBoundary,
	setDefaultEditorAssetUrls,
	setDefaultUiAssetUrls,
} from '@abc.xyz/tldraw'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import ExamplesTldrawLogo from './components/ExamplesTldrawLogo'
import { ListLink } from './components/ListLink'

import BasicExample from './BasicExample'
import APIExample from './examples/APIExample'
import AssetPropsExample from './examples/AssetOptionsExample'
import CanvasEventsExample from './examples/CanvasEventsExample'
import CustomComponentsExample from './examples/CustomComponentsExample'
import CustomConfigExample from './examples/CustomConfigExample/CustomConfigExample'
import CustomStylesExample from './examples/CustomStylesExample/CustomStylesExample'
import CustomUiExample from './examples/CustomUiExample/CustomUiExample'
import ErrorBoundaryExample from './examples/ErrorBoundaryExample/ErrorBoundaryExample'
import ExplodedExample from './examples/ExplodedExample'
import HideUiExample from './examples/HideUiExample'
import MultipleExample from './examples/MultipleExample'
import PersistenceExample from './examples/PersistenceExample'
import ScrollExample from './examples/ScrollExample'
import ShapeMetaExample from './examples/ShapeMetaExample'
import SnapshotExample from './examples/SnapshotExample/SnapshotExample'
import StoreEventsExample from './examples/StoreEventsExample'
import UiEventsExample from './examples/UiEventsExample'
import UserPresenceExample from './examples/UserPresenceExample'
import ZonesExample from './examples/ZonesExample'
import EndToEnd from './examples/end-to-end/end-to-end'
import YjsExample from './examples/yjs/YjsExample'
import OnlyEditorExample from './only-editor/OnlyEditor'

// This example is only used for end to end tests

// we use secret internal `setDefaultAssetUrls` functions to set these at the
// top-level so assets don't need to be passed down in every single example.
const assetUrls = getAssetUrlsByMetaUrl()
setDefaultEditorAssetUrls(assetUrls)
setDefaultUiAssetUrls(assetUrls)

type Example = {
	path: string
	title?: string
	element: JSX.Element
}

export const allExamples: Example[] = [
	{
		title: 'Basic (development)',
		path: '/develop',
		element: <BasicExample />,
	},
	{
		title: 'Collaboration (with Yjs)',
		path: '/yjs',
		element: <YjsExample />,
	},
	{
		title: 'Editor API',
		path: '/api',
		element: <APIExample />,
	},
	{
		title: 'Multiple editors',
		path: '/multiple',
		element: <MultipleExample />,
	},
	{
		title: 'Scroll example',
		path: '/scroll',
		element: <ScrollExample />,
	},
	{
		title: 'Custom config',
		path: '/custom-config',
		element: <CustomConfigExample />,
	},
	{
		title: 'Sublibraries',
		path: '/exploded',
		element: <ExplodedExample />,
	},
	{
		title: 'Error boundary',
		path: '/error-boundary',
		element: <ErrorBoundaryExample />,
	},
	{
		title: 'Custom UI',
		path: '/custom-ui',
		element: <CustomUiExample />,
	},
	{
		title: 'Hide UI',
		path: '/hide-ui',
		element: <HideUiExample />,
	},
	{
		title: 'UI components',
		path: '/custom-components',
		element: <CustomComponentsExample />,
	},
	{
		title: 'UI events',
		path: '/ui-events',
		element: <UiEventsExample />,
	},
	{
		title: 'Canvas events',
		path: '/canvas-events',
		element: <CanvasEventsExample />,
	},
	{
		title: 'Store events',
		path: '/store-events',
		element: <StoreEventsExample />,
	},
	{
		title: 'User presence',
		path: '/user-presence',
		element: <UserPresenceExample />,
	},
	{
		title: 'UI zones',
		path: '/zones',
		element: <ZonesExample />,
	},
	{
		title: 'Persistence',
		path: '/persistence',
		element: <PersistenceExample />,
	},
	{
		title: 'Snapshots',
		path: '/snapshots',
		element: <SnapshotExample />,
	},
	{
		title: 'Custom styles',
		path: '/custom-styles',
		element: <CustomStylesExample />,
	},
	{
		title: 'Shape meta property',
		path: '/shape-meta',
		element: <ShapeMetaExample />,
	},
	{
		title: 'Only editor',
		path: '/only-editor',
		element: <OnlyEditorExample />,
	},
	{
		title: 'Asset props',
		path: '/asset-props',
		element: <AssetPropsExample />,
	},
	// not listed
	{
		path: '/end-to-end',
		element: <EndToEnd />,
	},
]

function App() {
	return (
		<div className="examples">
			<div className="examples__header">
				<ExamplesTldrawLogo />
				<p>
					See docs at <a href="https://tldraw.dev">tldraw.dev</a>
				</p>
			</div>
			<ul className="examples__list">
				{allExamples
					.filter((example) => example.title)
					.map((example) => (
						<ListLink key={example.path} title={example.title!} route={example.path} />
					))}
			</ul>
		</div>
	)
}

const router = createBrowserRouter([
	...allExamples,
	{
		path: '/',
		element: <App />,
	},
])
const rootElement = document.getElementById('root')
const root = createRoot(rootElement!)

root.render(
	<StrictMode>
		<ErrorBoundary
			fallback={(error) => <DefaultErrorFallback error={error} />}
			onError={(error) => console.error(error)}
		>
			<RouterProvider router={router} />
		</ErrorBoundary>
	</StrictMode>
)
