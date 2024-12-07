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
import { IPlayer } from '@/types/player.type'

const updateIsAttack = (deck: CardType[]): CardType[] => {
	const cards = deck
	return cards.map(card => {
		if (!card.isDeck) {
			return {
				...card,
				isAttack: true,
			}
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

	const addCardDeck = async (type: keyof IPlayer) => {
		try {
			if (player[type].deck.filter(card => card.isDeck).length < DECK_LENGTH) {
				const card = await updateDeck()
				if (card)
					dispatch(
						addCard({
							player: type,
							card: card,
						})
					)
			}
		} catch (e: unknown) {
			console.error(e)
		}
	}

	if (isPlayerTurn) {
		addCardDeck('player2')
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
	} else {
		addCardDeck('player1')
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
	}
}

export default nextTurnAction
