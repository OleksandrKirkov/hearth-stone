import { PlayerType } from "./player.type"

export type GameType = {
    player: PlayerType | null
    status: 'active' | 'paused' | 'finished'
    currentTurn: number
}
