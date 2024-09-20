import Cart from "@/components/card/Card"
import { NextPageWithLayout } from "./_app"
import styles from './Home.module.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useDeck from "@/hooks/useDeck"
import { PlayerType } from "@/types/player.type"
import { initialPlayer } from "@/assets/store/reducers/playerSlice"
import { startGame } from "@/assets/store/reducers/gameSlice"
import { RootState } from "@/assets/store/store"
import { CharacterType } from "@/types/character.type"

const Main: NextPageWithLayout = () => {
    const [ enemyState, setEnemyState ] = useState<CharacterType[]>([])

    const player = useSelector((state: RootState) => state.player)

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
                mana: 0
            }

            dispatch(initialPlayer(playerData))
            dispatch(startGame())
        }

        const fetchEnemyDeck = async () => {
            const deck = await getDeck()

            setEnemyState(deck)
        }

        fetchPlayerDeck();
        fetchEnemyDeck();
    }, [])

    return <div className={styles.wrapper}>
        <div className={styles.section}>
            <div className={styles.mana}>1</div>
            <div className={styles.deck}>
                {enemyState.map((card, index) => (
                    <Cart key={index} data={card} />
                ))}
            </div>
            <div className={styles.hero}>3</div>
        </div>
        <div className={styles.section}>
            <div className={styles.mane}>1</div>
            <div className={styles.deck}>
                {player.deck.map((card, index) => (
                    <Cart key={index} data={card} />
                ))}
            </div>
            <div className={styles.hero}>3</div>
        </div>
    </div>
}

Main.title = "HearthStone"

export default Main
