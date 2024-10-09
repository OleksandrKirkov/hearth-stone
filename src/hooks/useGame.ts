import { 
    initialPlayer, 
    playCard as playCardReducer 
} from "@/assets/store/reducers/playerSlice"
import { PLAYER_NAME, START_MANA } from "@/contstants/game"
import useDeck from "./useDeck"
import { initialEnemy } from "@/assets/store/reducers/enemySlice"
import { 
    startAction as startGameReducer, 
} from "@/assets/store/reducers/gameSlice"
import attackCard from "@/hooks/actions/useGame/attackCard"
import nextTurnAction from "./actions/useGame/nextTurn"
import { useAppDispatch, useAppSelector } from "./useRedux"
import { RootState } from "@/assets/store/store"

const useGame = () => {
    const dispatch = useAppDispatch()
    const { player, enemy, game } = useAppSelector((state: RootState) => state)
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

    const playCard = (id: number) => {
        dispatch(playCardReducer({cardId: id}))
    }

    const nextTurn = () => {
        nextTurnAction({ player, game, enemy, dispatch })
    }

    return { startGame, nextTurn, attackCard, playCard }
}

export default useGame
