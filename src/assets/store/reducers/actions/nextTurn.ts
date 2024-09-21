import { TURN_STATUS } from "@/types/game.type";
import { RootState } from "../../store";
import { CardType } from "@/types/card.type";

function setIsAttack(card: CardType): CardType {
    !card.isDeck && (card.isAttack = true)

    return card
}

export function nextTurn(state: RootState) {
    const isPlayerTurn = state.game.currentTurn === TURN_STATUS.player

    if(isPlayerTurn) {
        state.game.currentTurn = TURN_STATUS.enemy

        state.enemy.mana += 1

        state.enemy.deck = state.enemy.deck.map(card => setIsAttack(card))
    } else {
        state.game.currentTurn = TURN_STATUS.player

        state.player.mana += 1

        state.player.deck = state.player.deck.map(card => setIsAttack(card))
    }

}
