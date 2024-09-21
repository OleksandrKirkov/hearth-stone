import { TURN_STATUS } from "@/types/game.type";
import { RootState } from "../../store";
import { CardType } from "@/types/card.type";

export interface IAttack {
    turnStatus: TURN_STATUS
    attackCardId: number
    targetCardId: number
}

export function getCardById(cardId: number, deck: CardType[]) {
    return deck.find((card) => card.id === cardId)
}

export function attackCard(state: RootState, data: IAttack) {
    const { turnStatus, attackCardId, targetCardId } = data

    const isAttackPlayer = turnStatus === TURN_STATUS.player

    const attackerCard = getCardById(
        attackCardId,
        isAttackPlayer ? state.player.deck : state.enemy.deck
    )

    const targetCard = getCardById(
        targetCardId,
        isAttackPlayer ? state.player.deck : state.enemy.deck
    )

    if (attackerCard && targetCard && attackerCard.isAttack) {
        targetCard.health -= attackerCard.attack
        attackerCard.isAttack = false
        attackerCard.attackPerTurn -= 1

        if(targetCard.health <= 0) {
            if(isAttackPlayer) {
                state.enemy.deck = state.enemy.deck.filter(
                    (card) => card.id !== targetCardId
                )
            } else {
                state.player.deck = state.enemy.deck.filter(
                    (card) => card.id !== targetCardId
                )
            }
       }
    }
}
