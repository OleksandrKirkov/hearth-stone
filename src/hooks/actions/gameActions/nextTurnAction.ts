import { nextTurn as nextTurnReducer } from '@/assets/store/reducers/gameSlice'
import {
	addCard,
	updateCards,
	updateMana,
} from '@/assets/store/reducers/playerSlice'
import { DECK_LENGTH } from '@/contstants/game'
import useDeck from '@/hooks/useDeck'
import { ActionType } from '@/types/action.type'
import { CardType } from '@/types/card.type'
import { TURN_STATUS } from '@/types/game.type'

const updateIsAttack = (deck: CardType[]): CardType[] => {
	return deck.map(card => {
		if (!card.isDeck) {
			card.isAttack = true
		}

		return card
	})
}

const nextTurnAction = async ({ player, game, dispatch }: ActionType) => {
	if (!game || !player) return

	const { updateDeck } = useDeck()

	const player1Deck = player['player1'].deck
	const player2Deck = player['player2'].deck

	const isPlayerTurn = game.currentTurn === TURN_STATUS.player

	try {
		if (isPlayerTurn) {
			dispatch(nextTurnReducer({ turn: TURN_STATUS.enemy }))
			dispatch(
				updateMana({ player: 'player2', value: player['player2'].mana + 1 })
			)

			dispatch(
				updateCards({
					player: 'player2',
					cards: [...updateIsAttack(player2Deck)],
				})
			)

			if (
				player['player2'].deck.filter(card => card.isDeck).length < DECK_LENGTH
			) {
				const card = await updateDeck()
				if (card)
					dispatch(
						addCard({
							player: 'player2',
							card: card,
						})
					)
			}
		} else {
			dispatch(nextTurnReducer({ turn: TURN_STATUS.player }))
			dispatch(
				updateMana({ player: 'player1', value: player['player1'].mana + 1 })
			)

			dispatch(
				updateCards({
					player: 'player1',
					cards: [...updateIsAttack(player1Deck)],
				})
			)

			if (
				player['player1'].deck.filter(card => card.isDeck).length < DECK_LENGTH
			) {
				const card = await updateDeck()
				if (card)
					dispatch(
						addCard({
							player: 'player1',
							card: card,
						})
					)
			}
		}
	} catch (e: unknown) {
		console.error(e)
	}
}

export default nextTurnAction
