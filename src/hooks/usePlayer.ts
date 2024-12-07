import { IPlayer } from '@/types/player.type'
import { playCardAction } from './actions/playerActions'
import { useAppDispatch, useAppSelector } from './useRedux'

const usePlayer = (playerType: keyof IPlayer) => {
	const dispatch = useAppDispatch()
	const { player } = useAppSelector(state => state)

	const playCard = (cardId: number) => {
		console.log('play card')
		playCardAction({ player, dispatch, playerType, cardId })
	}

	return {
		playCard,
	}
}
export default usePlayer
