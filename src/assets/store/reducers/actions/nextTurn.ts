import { TURN_STATUS } from "@/types/game.type";
import { RootState } from "../../store";
import { CardType } from "@/types/card.type";
import { DECK_LENGTH } from "@/contstants/game";
import useDeck from "@/hooks/useDeck";

function setIsAttack(card: CardType): CardType {
    !card.isDeck && (card.isAttack = true)

    return card
}

export async function nextTurn(state: RootState) {
    const isPlayerTurn = state.game.currentTurn === TURN_STATUS.player

    const { updateDeck } = useDeck()

    if(isPlayerTurn) {
        state.game.currentTurn = TURN_STATUS.enemy

        if(state.enemy.deck.length < DECK_LENGTH) {
            const deck = await updateDeck(state.enemy.deck)

            state.enemy.deck = deck
        }

        state.enemy.mana += 1

        state.enemy.deck = state.enemy.deck.map(card => setIsAttack(card))
    } else {
        state.game.currentTurn = TURN_STATUS.player

        if(state.player.deck.length < DECK_LENGTH) {
            const deck = await updateDeck(state.player.deck)

            state.enemy.deck = deck
        }

        state.player.mana += 1

        state.player.deck = state.player.deck.map(card => setIsAttack(card))
    }

}
