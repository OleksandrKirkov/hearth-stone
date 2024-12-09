import { RootState } from '@/assets/store/store'
import useGame from '@/hooks/useGame'
import { GAME_STATUS } from '@/types/game.type'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NextPageWithLayout } from './_app'
import styles from './Home.module.css'
import Opponent from './opponent/Opponent'
import Player from './player/Player'

const Main: NextPageWithLayout = () => {
	const [attackerCardState, setAttackerCardState] = useState<number | null>(
		null
	)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isLoadingGame, setIsLoadingGame] = useState<boolean>(false)

	const game = useSelector((state: RootState) => state.game)

	const { startGame, nextTurn } = useGame()

	const gameStart = game.status === GAME_STATUS.active
	const gameFinish = game.status === GAME_STATUS.finished

	const onStartHandler = async () => {
		setIsLoadingGame(true)
		await startGame()
		setIsLoadingGame(false)
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false)
			clearTimeout(timer)
		}, 2000)
	}, [])

	if (!isLoading && gameFinish) {
		return (
			<div className={styles.start}>
				<h1 className={styles.title}>GAME OVER</h1>
			</div>
		)
	}

	if (!isLoading && !gameStart) {
		return (
			<div className={styles.start}>
				<motion.h1
					className={styles.title}
					animate={{ scale: 1 }}
					initial={{ scale: 6 }}
				>
					HEARTH-STONE
				</motion.h1>
				<motion.button
					className={styles.button}
					onClick={onStartHandler}
					animate={{ y: 0, opacity: 1 }}
					initial={{ y: 30, opacity: 0 }}
					transition={{ duration: 1 }}
				>
					{isLoadingGame ? 'Loading...' : 'Start Game'}
				</motion.button>
			</div>
		)
	}

	return (
		!isLoading && (
			<>
				<div className={styles.wrapper}>
					<div className={styles.menu}>
						<button className={styles.menu_button}>menu</button>
					</div>
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
						<div className={styles.game_turn}>
							<p className={styles.turn_title}>Current Turn:</p>
							<p className={styles.turn_value}>{game.currentTurn}</p>
						</div>
						<button className={styles.next_turn} onClick={nextTurn}>
							Next turn
						</button>
					</div>
				</div>
			</>
		)
	)
}

Main.title = 'HearthStone'

export default Main
