import Cart from "@/components/card/Card"
import { NextPageWithLayout } from "./_app"
import styles from './Home.module.css'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import useDeck from "@/hooks/useDeck"
import { PlayerType } from "@/types/player.type"
import { initialPlayer } from "@/assets/store/reducers/playerSlice"
import { startGame } from "@/assets/store/reducers/gameSlice"
import { RootState } from "@/assets/store/store"
import { initialEnemy } from "@/assets/store/reducers/enemySlice"

const Main: NextPageWithLayout = () => {
    const player = useSelector((state: RootState) => state.player)
    const enemy = useSelector((state: RootState) => state.enemy)
    const game = useSelector((state: RootState) => state.game)

    const dispatch = useDispatch()

    const { getDeck } = useDeck()

    useEffect(() => {
        const fetchPlayerDeck = async () => {
            const deck = await getDeck()

            const playerData: PlayerType = {
                id: 0,
                name: 'Oleksandr',
                hero: 'Hero',
                deck: deck,
                mana: 1
            }

            dispatch(initialPlayer(playerData))
        }

        const fetchEnemyDeck = async () => {
            const deck = await getDeck()

            const enemyData: PlayerType = {
                id: 1,
                name: 'Enemy',
                hero: 'Hero',
                deck: deck,
                mana: 1
            }

            dispatch(initialEnemy(enemyData))
        }

        fetchPlayerDeck();
        fetchEnemyDeck();

        dispatch(startGame())
    }, [])

    return <div className={styles.wrapper}>
        <div className={styles.section}>
            <div className={styles.mana}>{enemy.mana}</div>
            <div className={styles.deck}>
                {enemy.deck.map((card, index) => (
                    <Cart key={index} card={card} />
                ))}
            </div>
            <div className={styles.hero}>3</div>
        </div>
        <div className={styles.section}>
            <div className={styles.mana}>{enemy.mana}</div>
            <div className={styles.deck}>
                {player.deck.map((card, index) => (
                    <Cart key={index} card={card} />
                ))}
            </div>
            <div className={styles.hero}>3</div>
        </div>
        <div className={styles.game_data}>
            <p className={styles.value}>Current Turn: {game.currentTurn}</p>
        </div>
    </div>
}

Main.title = "HearthStone"

export default Main
