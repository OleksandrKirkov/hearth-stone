import { initialPlayer } from "@/assets/store/reducers/playerSlice"
import { PLAYER_NAME, START_MANA } from "@/contstants/game"
import { useDispatch, useSelector } from "react-redux"
import useDeck from "./useDeck"
import { initialEnemy } from "@/assets/store/reducers/enemySlice"
import { startGame as startGameReducer } from "@/assets/store/reducers/gameSlice"
import { RootState } from "@/assets/store/store"
import nextTurn from "@/hooks/actions/useGame/nextTurn"

const useGame = () => {
    const dispatch = useDispatch()
    const { getDeck } = useDeck()

    const { player, game, enemy } = useSelector((state: RootState) => ({
        player: state.player,
        game: state.game,
        enemy: state.enemy
    }))

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

    return { startGame, nextTurn }
}

export default useGame
