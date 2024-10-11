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

const nextTurn = async ({ player, enemy, game, dispatch }: INextTurn) => {
    const { updateDeck } = useDeck()

    const isPlayerTurn = game.currentTurn === TURN_STATUS.player

    if (isPlayerTurn) {
        dispatch(nextTurnReducer({ turn: TURN_STATUS.enemy }))

        //const deck = await updateDeck(
            //enemy.deck.filter(card => card.isDeck === true)
        //)

        //dispatch(updateEnemyDeck({ deck }))

        dispatch(updateEnemyMana())
    } else {
        dispatch(nextTurnReducer({ turn: TURN_STATUS.player }))

        //const deck = await updateDeck(
            //player.deck.filter(card => card.isDeck === true)
        //)

        //dispatch(updatePlayerDeck({ deck }))

        dispatch(updatePlayerMana())
    }
}

export default nextTurn
