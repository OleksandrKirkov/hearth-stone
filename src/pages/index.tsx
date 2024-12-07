import { RootState } from '@/assets/store/store'
import useGame from '@/hooks/useGame'
import { GAME_STATUS, TURN_STATUS } from '@/types/game.type'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { NextPageWithLayout } from './_app'
import styles from './Home.module.css'
import Opponent from './opponent/Opponent'
import Player from './player/Player'

const Main: NextPageWithLayout = () => {
	const [attackerCardState, setAttackerCardState] = useState<number | null>(
		null
	)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const game = useSelector((state: RootState) => state.game)

	const { startGame, nextTurn } = useGame()

	const gameStatus = game.status === GAME_STATUS.active

	const onStartHandler = async () => {
		setIsLoading(true)
		await startGame()
		setIsLoading(false)
	}

	return (
		<>
			{gameStatus ? (
				<div className={styles.wrapper}>
					<Opponent
						setAttackerCardId={(id: number) => setAttackerCardState(id)}
						attackerCardId={attackerCardState}
					/>
					<Player
						setAttackerCardId={(id: number) => {
							setAttackerCardState(id)
						}}
						attackerCardId={attackerCardState}
					/>
					<div className={styles.game_data}>
						<p className={styles.value}>
							Current Turn: {TURN_STATUS[game.currentTurn]}
						</p>
						<button className={styles.next_turn} onClick={nextTurn}>
							Next turn
						</button>
					</div>
				</div>
			) : (
				<div className={styles.start}>
					<h1 className={styles.title}>HEARTH-STONE</h1>
					<button className={styles.button} onClick={onStartHandler}>
						{isLoading ? 'Loading...' : 'Start Game'}
					</button>
				</div>
			)}
		</>
	)
}

Main.title = 'HearthStone'

export default Main
