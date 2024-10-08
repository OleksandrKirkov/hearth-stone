import { NextPageWithLayout } from "./_app"
import styles from './Home.module.css'
import { useSelector } from "react-redux"
import { RootState } from "@/assets/store/store"
import { GAME_STATUS } from "@/types/game.type"
import useGame from "@/hooks/useGame"
import Player from "./player/Player"
import Opponent from "./opponent/Opponent"

const Main: NextPageWithLayout = () => {
    const game = useSelector((state: RootState) => state.game)

    const { startGame, attackCard, playCard } = useGame()

    const gameStatus = game.status === GAME_STATUS.active

    const onStartHandler = async () => {
        await startGame()
    }

    return <>{gameStatus ? <div className={styles.wrapper}>
        <Opponent />
        <Player />
        <div className={styles.game_data}>
            <p className={styles.value}>Current Turn: {game.currentTurn}</p>
        </div>
    </div> : <div><button className={styles.button} onClick={onStartHandler}>Start</button></div>}</>
}

Main.title = "HearthStone"

export default Main
