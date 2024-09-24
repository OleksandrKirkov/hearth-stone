import { initialPlayer } from "@/assets/store/reducers/playerSlice"
import { PLAYER_NAME } from "@/contstants/game"
import { useDispatch } from "react-redux"
import useDeck from "./useDeck"
import { initialEnemy } from "@/assets/store/reducers/enemySlice"
import { startAction, turnAction as nextTurn } from "@/assets/store/reducers/gameSlice"

const useGame = () => {
    const dispatch = useDispatch()
    const { getDeck } = useDeck()

    const startGame = async () => {
        dispatch(initialPlayer({
            id: 0,
            name: PLAYER_NAME,
            mana: 0,
            deck: (await getDeck()),
            hero: ''
        })) 

        dispatch(initialEnemy({
            id: 1,
            name: 'Opponent',
            mana: 0,
            deck: (await getDeck()),
            hero: ''
        }))

        dispatch(startAction())
        dispatch(nextTurn())
    }

    return { startGame }
}

export default useGame
