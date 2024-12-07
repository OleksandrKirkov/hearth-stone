import { RootState } from '@/assets/store/store'
import Card from '@/components/card/Card'
import usePlayer from '@/hooks/usePlayer'
import { useAppSelector } from '@/hooks/useRedux'
import { TURN_STATUS } from '@/types/game.type'
import Image from 'next/image'
import { CSSProperties, FC, useEffect } from 'react'
import styles from './Player.module.css'

interface IPlayer {
	setAttackerCardId: (id: number) => void
	setDefenderCardId: (id: number) => void
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
	setDefenderCardId,
	setAttackerCardId,
	attackerCardId,
}) => {
	const player = useAppSelector((state: RootState) => state.player)['player1']
	const game = useAppSelector((state: RootState) => state.game)

	const { playCard } = usePlayer('player1')

	const playingCards = player.deck.filter(
		card => !card.isDeck && player.mana >= card.mana
	)

	const onAttackerCardHandler = (id: number) => {
		if (game.currentTurn == TURN_STATUS.player) {
			setAttackerCardId(id)
		}
	}

	const onPlayCardHandler = (id: number, mana: number) => {
		if (game.currentTurn !== TURN_STATUS.player) return

		mana <= player.mana && playCard(id)
	}

	useEffect(() => {
		if (game.currentTurn === TURN_STATUS.enemy && attackerCardId) {
			const cardIndex = playingCards.length
				? Math.floor(Math.random() * playingCards.length)
				: undefined
			if (cardIndex != undefined) setDefenderCardId(playingCards[cardIndex].id)
		}
	}, [game.currentTurn, attackerCardId])

	return (
		<div className={styles.player}>
			<div className={styles.table}>
				{player.deck
					.filter(card => card.isDeck === false)
					.map((card, index) => (
						<Card
							onClick={() => onAttackerCardHandler(card.id)}
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
								onClick={() => onPlayCardHandler(card.id, card.mana)}
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
