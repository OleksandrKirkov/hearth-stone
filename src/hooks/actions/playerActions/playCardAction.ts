import { updateCard, updateMana } from '@/assets/store/reducers/playerSlice'
import { ActionType } from '@/types/action.type'

interface IPlayCardAction extends ActionType {
	cardId: number
}

const playCardAction = ({
	player,
	dispatch,
	playerType,
	cardId,
}: IPlayCardAction) => {
	if (!player || !playerType) return

	const playCard = player[playerType].deck.find(card => card.id === cardId)

	if (!playCard) return

	dispatch(
		updateMana({
			player: playerType,
			value: player[playerType].mana - playCard.mana,
		})
	)

	dispatch(
		updateCard({
			player: playerType,
			card: {
				...playCard,
				isDeck: false,
			},
			cardId: cardId,
		})
	)
}

export default playCardAction
