import { FC, useEffect, useState } from "react";
import styles from "./Opponent.module.css"
import Card from "@/components/card/Card";
import { useAppSelector } from "@/hooks/useRedux";
import { RootState } from "@/assets/store/store";
import { TURN_STATUS } from "@/types/game.type";
import useGame from "@/hooks/useGame";
import useEnemy from "@/hooks/useEnemy";


const Opponent: FC = () => {
    const enemy = useAppSelector((state: RootState) => state.enemy)
    const game = useAppSelector((state: RootState) => state.game)

    const [attackCardId, setAttackCardId] = useState<number | null>()

    const { startGame, attackCard } = useGame()
    const { playCard } = useEnemy()

    const onTargetHandler = (id: number) => {
        if (game.currentTurn !== TURN_STATUS.player) return

        attackCardId && attackCard(attackCardId, id)
    }

    useEffect(() => {
        if(game.currentTurn === TURN_STATUS.enemy)
            playCard()
    }, [game.currentTurn])

    return (
        <div className={styles.opponent}>
            <div className={styles.interface}>
                <div className={styles.deck}>
                    {enemy.deck.filter((card) => card.isDeck == true).map((card, index) => (
                        <Card
                            onClick={() => onTargetHandler(card.id)}
                            key={index}
                            card={card}
                        />
                    ))} 
                </div>
            </div>
            <div className={styles.table}>
                {enemy.deck.filter((card) => card.isDeck === false).map((card, index) => (
                    <Card
                        key={index}
                        card={card}
                        enemy={false}
                    />
                ))}
            </div>
            <p className="text-red-500">{ enemy.mana }</p>
        </div>
    )
}

export default Opponent
