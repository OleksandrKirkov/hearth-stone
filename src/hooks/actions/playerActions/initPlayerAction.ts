import { initialPlayer } from '@/assets/store/reducers/playerSlice'
import { HERO_HEALTH, PLAYER_NAME, START_MANA } from '@/contstants/game'
import useDeck from '@/hooks/useDeck'
import { ActionType } from '@/types/action.type'

const initPlayerAction = async ({ dispatch }: ActionType) => {
	const { getDeck } = useDeck()

	dispatch(
		initialPlayer({
			player: 'player1',
			data: {
				id: 0,
				name: PLAYER_NAME,
				mana: 1,
				deck: await getDeck(),
				hero: HERO_HEALTH,
			},
		})
	)

	dispatch(
		initialPlayer({
			player: 'player2',
			data: {
				id: 1,
				name: 'Opponent',
				mana: START_MANA,
				deck: await getDeck(),
				hero: HERO_HEALTH,
			},
		})
	)
}

export default initPlayerAction
