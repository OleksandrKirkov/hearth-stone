import { Dispatch } from '@reduxjs/toolkit'
import { GameType } from './game.type'
import { IPlayer } from './player.type'

export type ActionType = {
	dispatch: Dispatch
	playerType?: keyof IPlayer
	player?: IPlayer
	game?: GameType
}
