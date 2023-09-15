import { useValue } from '@abc.xyz/state'
import { TLInstancePresence } from '@abc.xyz/tlschema'
import { useMemo } from 'react'
import { useEditor } from './useEditor'

// TODO: maybe move this to a computed property on the App class?
/**
 * @returns The list of peer UserIDs
 * @internal
 */
export function usePresence(userId: string): TLInstancePresence | null {
	const editor = useEditor()

	const $presences = useMemo(() => {
		return editor.store.query.records('instance_presence', () => ({
			userId: { eq: userId },
		}))
	}, [editor, userId])

	const latestPresence = useValue(
		`latestPresence:${userId}`,
		() => {
			return $presences.value
				.slice()
				.sort((a, b) => b.lastActivityTimestamp - a.lastActivityTimestamp)[0]
		},
		[]
	)

	return latestPresence ?? null
}
