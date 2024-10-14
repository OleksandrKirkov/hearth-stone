import { NextPageWithLayout } from "./_app"
import styles from './Home.module.css'
import { useSelector } from "react-redux"
import { RootState } from "@/assets/store/store"
import { GAME_STATUS, TURN_STATUS } from "@/types/game.type"
import useGame from "@/hooks/useGame"
import Player from "./player/Player"
import Opponent from "./opponent/Opponent"

const Main: NextPageWithLayout = () => {
    const game = useSelector((state: RootState) => state.game)

    const { startGame, nextTurn } = useGame()

    const gameStatus = game.status === GAME_STATUS.active

    const onStartHandler = async () => {
        await startGame()
    }

    return <>{gameStatus ? <div className={styles.wrapper}>
        <Opponent />
        <Player />
        <div className={styles.game_data}>
            <p className={styles.value}>Current Turn: {TURN_STATUS[game.currentTurn]}</p>
            <button onClick={nextTurn}>Next turn</button>
        </div>
    </div> : <div><button className={styles.button} onClick={onStartHandler}>Start Game</button></div>}</>
}

Main.title = "HearthStone"

export default Main
