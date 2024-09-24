import { updateEnemyDeck } from "@/assets/store/reducers/enemySlice"
import { updatePlayerDeck } from "@/assets/store/reducers/playerSlice"
import { RootState } from "@/assets/store/store"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { CardType } from "@/types/card.type"
import { TURN_STATUS } from "@/types/game.type"

const getCardById = (cardId: number, deck: CardType[]) => {
    return deck.find((card) => card.id === cardId) 
}

const deleteCardById = (cardId: number, deck: CardType[]) => {
    return deck.filter((card) => card.id !== cardId)
}

const attackCard = (attackerCardId: number, targetCardId: number) => {
    const { player, enemy, game } = useAppSelector((state: RootState) => ({
        player: state.player,
        enemy: state.enemy,
        game: state.game
    }))

    const dispatch = useAppDispatch()

    const isAttackPlayer = game.currentTurn === TURN_STATUS.player

    const attackerCard = getCardById(
        attackerCardId,
        isAttackPlayer ? player.deck : enemy.deck
    )

    const targetCard = getCardById(
        targetCardId,
        isAttackPlayer ? enemy.deck : player.deck
    )

    if(attackerCard && targetCard && attackerCard.isAttack) {
        targetCard.health -= attackerCard.attack
        attackerCard.isAttack = false
        attackerCard.attackPerTurn -= 1

        if (targetCard.health <= 0) {
            if (isAttackPlayer) {
                dispatch(updateEnemyDeck({deck: deleteCardById(targetCardId, enemy.deck)}))
            } else {
                dispatch(updatePlayerDeck({deck: deleteCardById(targetCardId, player.deck)}))
            }
        }        

        if (attackerCard.attackPerTurn <= 0) {
            if (isAttackPlayer) {
                dispatch(updatePlayerDeck({deck: deleteCardById(attackerCardId, player.deck)}))
            } else {
                dispatch(updateEnemyDeck({deck: deleteCardById(attackerCardId, enemy.deck)}))
            }
        }
    }
}

export default attackCard
