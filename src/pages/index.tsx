import Cart from "@/components/card/Card"
import { NextPageWithLayout } from "./_app"
import styles from './Home.module.css'
import { useSelector } from "react-redux"
import { RootState } from "@/assets/store/store"
import { GAME_STATUS, TURN_STATUS } from "@/types/game.type"
import useGame from "@/hooks/useGame"
import { useState } from "react"
import Card from "@/components/card/Card"

const Main: NextPageWithLayout = () => {
    const player = useSelector((state: RootState) => state.player)
    const enemy = useSelector((state: RootState) => state.enemy)
    const game = useSelector((state: RootState) => state.game)

    const { startGame, attackCard, playCard } = useGame()

    const [attackCardId, setAttackCardId] = useState<number | null>()

    const gameStatus = game.status === GAME_STATUS.active

    const onStartHandler = async () => {
        await startGame()
    }

    const onAttckerHandler = (id: number) => {
        if (game.currentTurn !== TURN_STATUS.player) return

        setAttackCardId(id)

        playCard(id)
    }

    const onTargetHandler = (id: number) => {
        if (game.currentTurn !== TURN_STATUS.player) return

        attackCardId && attackCard(attackCardId, id)
    }

    return <>{gameStatus ? <div className={styles.wrapper}>
        <div className={styles.section}>
            <div className={styles.mana}>{enemy.mana}</div>
            <div className={styles.deck}>
                {enemy.deck.map((card, index) => (
                    <Cart
                        onClick={() => onTargetHandler(card.id)}
                        key={index}
                        card={card}
                    />
                ))}
            </div>
            <div className={styles.hero}>3</div>
        </div>
        <div>
            <div className={styles.deck}>
                {player.deck.filter((card) => card.isDeck === false).map((card, index) => (
                    <Card
                        key={index}
                        card={card}
                        enemy={false}
                    />
                ))}
            </div>
        </div>
        <div className={styles.section}>
            <div className={styles.player_game}>
                <div className={styles.health}>
                    <img src="/health.png" alt="health" />
                </div>
                <div className={styles.deck}>
                    {player.deck.filter((card) => card.isDeck === true).map((card, index) => (
                        <Cart
                            onClick={() => onAttckerHandler(card.id)}
                            key={index}
                            card={card}
                            enemy={false}
                        />
                    ))}
                </div>
                <div className={styles.mana}>
                    <img src="/mana.png" alt="mana" />
                </div>
            </div>
        </div>
        <div className={styles.game_data}>
            <p className={styles.value}>Current Turn: {game.currentTurn}</p>
        </div>
    </div> : <div><button className={styles.button} onClick={onStartHandler}>Start</button></div>}</>
}

Main.title = "HearthStone"

export default Main
