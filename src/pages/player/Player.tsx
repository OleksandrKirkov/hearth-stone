import { RootState } from '@/assets/store/store'
import Card from '@/components/card/Card'
import useGame from '@/hooks/useGame'
import { useAppSelector } from '@/hooks/useRedux'
import { TURN_STATUS } from '@/types/game.type'
import Image from 'next/image'
import { CSSProperties, FC } from 'react'
import styles from './Player.module.css'

interface IPlayer {
	setAttackerCardId: (id: number) => void
	setAttachCardId: (id: number) => void
	attackerCardId: number | null
}

const getStyleRotation = (
	index: number,
	total: number,
	isPlayer?: boolean
): CSSProperties => {
	const middle = (total - 1) / 2
	const rotate = (index - middle) * 10

	const distanceFromMiddle = Math.abs(index - middle)
	const translateY = Math.pow(distanceFromMiddle, 2) * 20

	return {
		transform: `rotate(${isPlayer ? rotate : -rotate}deg) translateY(${
			isPlayer ? translateY : -translateY
		}px)`,
	}
}

const Player: FC<IPlayer> = ({
	setAttachCardId,
	setAttackerCardId,
	attackerCardId,
}) => {
	const player = useAppSelector((state: RootState) => state.player)
	const game = useAppSelector((state: RootState) => state.game)

	const { playCard } = useGame()

	const onPlayCardHandler = (id: number) => {
		if (game.currentTurn == TURN_STATUS.player) {
			setAttackerCardId(id)
		} else {
			if (!attackerCardId) return

			setAttachCardId(id)
		}
	}

	const onAttackerHandler = (id: number) => {
		if (game.currentTurn !== TURN_STATUS.player) return

		playCard(id)
	}

	return (
		<div className={styles.player}>
			<div className={styles.table}>
				{player.deck
					.filter(card => card.isDeck === false)
					.map((card, index) => (
						<Card
							onClick={() => onPlayCardHandler(card.id)}
							key={index}
							card={card}
							enemy={false}
						/>
					))}
			</div>
			<div className={styles.interface}>
				<div className={styles.health}>
					<Image
						src='/health.png'
						alt='health'
						objectFit='contain'
						fill={true}
					/>
					<p></p>
				</div>
				<div className={styles.deck}>
					{player.deck
						.filter(card => card.isDeck == true)
						.map((card, index) => (
							<Card
								style={getStyleRotation(
									index,
									player.deck.filter(card => card.isDeck == true).length,
									true
								)}
								onClick={() => onAttackerHandler(card.id)}
								key={index}
								card={card}
								enemy={false}
							/>
						))}
				</div>
				<div className={styles.mana}>
					<Image src='/mana.png' alt='mana' objectFit='contain' fill={true} />
					<p className={styles.value}>{player.mana}</p>
				</div>
			</div>
		</div>
	)
}

export default Player
