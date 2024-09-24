import { initialPlayer } from "@/assets/store/reducers/playerSlice"
import { PLAYER_NAME, START_MANA } from "@/contstants/game"
import { useDispatch } from "react-redux"
import useDeck from "./useDeck"
import { initialEnemy } from "@/assets/store/reducers/enemySlice"
import { startGame as startGameReducer } from "@/assets/store/reducers/gameSlice"
import nextTurn from "@/hooks/actions/useGame/nextTurn"
import attackCard from "@/hooks/actions/useGame/attackCard"

const useGame = () => {
    const dispatch = useDispatch()
    const { getDeck } = useDeck()

    const startGame = async () => {
        dispatch(initialPlayer({
            id: 0,
            name: PLAYER_NAME,
            mana: 1,
            deck: (await getDeck()),
            hero: ''
        })) 

        dispatch(initialEnemy({
            id: 1,
            name: 'Opponent',
            mana: START_MANA,
            deck: (await getDeck()),
            hero: ''
        }))

        dispatch(startGameReducer())
    }

    return { startGame, nextTurn, attackCard }
}

export default useGame
