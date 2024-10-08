import { FC, useState } from "react";
import styles from "./Opponent.module.css"
import Card from "@/components/card/Card";
import { useAppSelector } from "@/hooks/useRedux";
import { RootState } from "@/assets/store/store";
import { TURN_STATUS } from "@/types/game.type";
import useGame from "@/hooks/useGame";


const Opponent: FC = () => {
    const enemy = useAppSelector((state: RootState) => state.enemy)
    const game = useAppSelector((state: RootState) => state.game)

    const [attackCardId, setAttackCardId] = useState<number | null>()

    const { startGame, attackCard, playCard } = useGame()

    const onTargetHandler = (id: number) => {
        if (game.currentTurn !== TURN_STATUS.player) return

        attackCardId && attackCard(attackCardId, id)
    }

    return (
        <div className={styles.opponent}>
            <div className={styles.interface}>
                <div className={styles.deck}>
                    {enemy.deck.map((card, index) => (
                        <Card
                            onClick={() => onTargetHandler(card.id)}
                            key={index}
                            card={card}
                        />
                    ))} 
                </div>
            </div>
            <div className={styles.table}></div>
        </div>
    )
}

export default Opponent
