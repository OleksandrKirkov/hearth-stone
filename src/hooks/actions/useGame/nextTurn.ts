import useDeck from "@/hooks/useDeck"
import { GameType, TURN_STATUS } from "@/types/game.type"
import { nextTurn as nextTurnReducer } from "@/assets/store/reducers/gameSlice"
import { DECK_LENGTH } from "@/contstants/game"
import { updateEnemyDeck, updateEnemyMana } from "@/assets/store/reducers/enemySlice"
import { CardType } from "@/types/card.type"
import { updatePlayerDeck, updatePlayerMana } from "@/assets/store/reducers/playerSlice"
import { PlayerType } from "@/types/player.type"
import { Dispatch } from "@reduxjs/toolkit"

interface INextTurn {
    player: PlayerType
    enemy: PlayerType
    game: GameType
    dispatch: Dispatch
}

const setIsAttack = (card: CardType): CardType => {
    !card.isDeck && (card.isAttack = true)

    return card
}

const nextTurn = async ({player, enemy, game, dispatch}: INextTurn) => {
    const { updateDeck } = useDeck()

    const isPlayerTurn = game.currentTurn === TURN_STATUS.player

    if (isPlayerTurn) {
        dispatch(nextTurnReducer({ turn: TURN_STATUS.enemy }))

        if (enemy.deck.length < DECK_LENGTH) {
            const deck = await updateDeck(
                enemy.deck.map(card => setIsAttack(card))
            )

            dispatch(updateEnemyDeck({ deck }))
        }

        dispatch(updateEnemyMana())
    } else {
        dispatch(nextTurnReducer({ turn: TURN_STATUS.player }))

        if (player.deck.length < DECK_LENGTH) {
            const deck = await updateDeck(
                enemy.deck.map(card => setIsAttack(card))
            )

            dispatch(updatePlayerDeck({ deck }))
        }

        dispatch(updatePlayerMana())
    }
}

export default nextTurn
