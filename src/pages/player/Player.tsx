import { FC, useState } from "react";
import styles from "./Player.module.css"
import Image from "next/image";
import { useAppSelector } from "@/hooks/useRedux";
import { RootState } from "@/assets/store/store";
import Card from "@/components/card/Card";
import { TURN_STATUS } from "@/types/game.type";
import useGame from "@/hooks/useGame";


const Player: FC = () => {

    const player = useAppSelector((state: RootState) => state.player)
    const game = useAppSelector((state: RootState) => state.game)

    const [attackCardId, setAttackCardId] = useState<number | null>()

    const { attackCard, playCard } = useGame()

    const onAttckerHandler = (id: number) => {
        if (game.currentTurn !== TURN_STATUS.player) return

        setAttackCardId(id)

        playCard(id)
    }

    return (
        <div className={styles.player}>
            <div className={styles.table}>
                {player.deck.filter((card) => card.isDeck === false).map((card, index) => (
                    <Card
                        key={index}
                        card={card}
                        enemy={false}
                    />
                ))}
            </div>
            <div className={styles.interface}>
                <div className={styles.health}>
                    <Image src="/health.png" alt="health" objectFit="contain" fill={true} />
                    <p></p>
                </div>
                <div className={styles.deck}>
                    {player.deck.filter((card) => card.isDeck == true).map((card, index) => (
                        <Card
                            onClick={() => onAttckerHandler(card.id)}
                            key={index}
                            card={card}
                            enemy={false}
                        />
                    ))}
                </div>
                <div className={styles.mana}>
                    <Image src="/mana.png" alt="mana" objectFit="contain" fill={true} />
                    <p className={styles.value}>{ player.mana }</p>
                </div>
            </div>
        </div>
    )
}

export default Player
