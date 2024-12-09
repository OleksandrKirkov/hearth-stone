import { RootState } from '@/assets/store/store'
import { IPlayer } from '@/types/player.type'
import { attackCardAction, attackHeroAction } from './actions/otherActions'
import { useAppDispatch, useAppSelector } from './useRedux'

const useAction = (playerType: keyof IPlayer) => {
	const dispatch = useAppDispatch()
	const { player, game } = useAppSelector((state: RootState) => state)

	const attackCard = (attackerId: number, defenderId: number) => {
		attackCardAction({
			player,
			playerType,
			game,
			attackerId,
			defenderId,
			dispatch,
		})
	}

	const attackHero = (attackerId: number) => {
		attackHeroAction({
			player,
			playerType,
			dispatch,
			attackerId,
		})
	}

	return {
		attackCard,
		attackHero,
	}
}

export default useAction
