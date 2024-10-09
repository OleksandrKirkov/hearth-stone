import playCardAction from "./actions/useEnemy/playCard"
import nextTurn from "./actions/useGame/nextTurn"
import { useAppDispatch, useAppSelector } from "./useRedux"

const useEnemy = () => {

    const dispatch = useAppDispatch()
    const { enemy, player, game } = useAppSelector((state) => state)

    const playCard = () => {
        playCardAction({ enemy, dispatch })
        nextTurn({ enemy, player, game, dispatch })
    }

    return {
        playCard
    }
}
export default useEnemy
