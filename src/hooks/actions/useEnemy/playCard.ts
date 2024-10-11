import { playCard as playCardAction } from "@/assets/store/reducers/enemySlice"
import { PlayerType } from "@/types/player.type"
import { Dispatch } from "@reduxjs/toolkit"

interface IPlayCard {
    enemy: PlayerType
    dispatch: Dispatch
}

const playCard = ({ enemy, dispatch }: IPlayCard) => {
    const playingCards = enemy.deck
        .filter((card) => card.mana <= enemy.mana && card.isDeck) 

    if(!playingCards.length) return

    const resultPlayCard = playingCards[Math.floor(Math.random() * playingCards.length)]

    dispatch(playCardAction({cardId: resultPlayCard.id}))

    
}

export default playCard
