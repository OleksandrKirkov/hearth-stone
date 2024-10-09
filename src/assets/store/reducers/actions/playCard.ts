import { CARD_CLASS, CardType } from "@/types/card.type";
import { PlayerType } from "@/types/player.type";

function getCardById(cardId: number, deck: CardType[]) {
    return deck.find((card) => card.id === cardId)
}

export function playCard(state: PlayerType, cardId: number) {
    const currentCard = getCardById(cardId, state.deck)

    if(currentCard && currentCard.mana <= state.mana) {
        state.mana -= currentCard.mana

        currentCard.isDeck = false

        if(currentCard.class === CARD_CLASS.rush)
            currentCard.isAttack = true
    }
}
