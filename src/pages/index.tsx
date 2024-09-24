import Cart from "@/components/card/Card"
import { NextPageWithLayout } from "./_app"
import styles from './Home.module.css'
import { useSelector } from "react-redux"
import { RootState } from "@/assets/store/store"
import { GAME_STATUS } from "@/types/game.type"
import useGame from "@/hooks/useGame"

const Main: NextPageWithLayout = () => {
    const player = useSelector((state: RootState) => state.player)
    const enemy = useSelector((state: RootState) => state.enemy)
    const game = useSelector((state: RootState) => state.game)

    const { startGame } = useGame()

    const gameStatus = game.status === GAME_STATUS.active

    const onStartHandler = async () => {
        await startGame()
    }

    return <>{gameStatus ? <div className={styles.wrapper}>
        <div className={styles.section}>
            <div className={styles.mana}>{enemy.mana}</div>
            <div className={styles.deck}>
                {enemy.deck.map((card, index) => (
                    <Cart key={index} card={card} enemy={true} />
                ))}
            </div>
            <div className={styles.hero}>3</div>
        </div>
        <div className={styles.section}>
            <div className={styles.mana}>{enemy.mana}</div>
            <div className={styles.deck}>
                {player.deck.map((card, index) => (
                    <Cart key={index} card={card} enemy={false} />
                ))}
            </div>
            <div className={styles.hero}>3</div>
        </div>
        <div className={styles.game_data}>
            <p className={styles.value}>Current Turn: {game.currentTurn}</p>
        </div>
    </div> : <div><button className={styles.button} onClick={onStartHandler}>Start</button></div>}</>
}

Main.title = "HearthStone"

export default Main
