import { TURN_STATUS } from "@/types/game.type";
import { RootState } from "../../store";
import { CardType } from "@/types/card.type";

export interface IAttack {
    turnStatus: TURN_STATUS
    attackCardId: number
    targetCardId: number
}

function getCardById(cardId: number, deck: CardType[]) {
    return deck.find((card) => card.id === cardId)
}

function deleteCardById(cardId: number, deck: CardType[]) {
    return deck.filter((card) => card.id !== cardId)
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

        if (targetCard.health <= 0) {
            if (isAttackPlayer) {
                state.enemy.deck = deleteCardById(targetCardId, state.enemy.deck)
            } else {
                state.player.deck = deleteCardById(targetCardId, state.player.deck)
            }
        }

        if (attackerCard.attackPerTurn <= 0) {
            if (isAttackPlayer) {
                state.player.deck = deleteCardById(attackCardId, state.player.deck)
            } else {
                state.enemy.deck = deleteCardById(attackCardId, state.enemy.deck)
            }
        }

    }
}
