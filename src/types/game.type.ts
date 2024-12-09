export enum GAME_STATUS {
	'active',
	'paused',
	'finished',
}

export enum TURN_STATUS {
	PLAYER = 'Player',
	OPPONENT = 'Opponent',
}

export type GameType = {
	status: GAME_STATUS
	currentTurn: TURN_STATUS
}
