export enum GAME_STATUS {
    'active',
    'paused',
    'finished'
}

export enum TURN_STATUS {
    'player',
    'enemy'
}

export type GameType = {
    status: GAME_STATUS
    currentTurn: TURN_STATUS
}
