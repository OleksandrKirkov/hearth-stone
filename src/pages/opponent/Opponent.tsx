import { RootState } from '@/assets/store/store'
import Card from '@/components/card/Card'
import useAction from '@/hooks/useAction'
import useGame from '@/hooks/useGame'
import usePlayer from '@/hooks/usePlayer'
import { useAppSelector } from '@/hooks/useRedux'
import { TURN_STATUS } from '@/types/game.type'
import { CSSProperties, FC, useEffect } from 'react'
import styles from './Opponent.module.css'

interface IOpponent {
	setAttackerCardId: (id: number) => void
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

const Opponent: FC<IOpponent> = ({ setAttackerCardId, attackerCardId }) => {
	const player = useAppSelector((state: RootState) => state.player)['player2']
	const game = useAppSelector((state: RootState) => state.game)

	const { attackCard } = useAction('player1')
	const { playCard } = usePlayer('player2')
	const { nextTurn } = useGame()

	const deckCards = player.deck.filter(
		card => card.isDeck && player.mana >= card.mana
	)
	const playingCards = player.deck.filter(card => !card.isDeck)

	const onTargetHandler = (id: number) => {
		if (game.currentTurn == TURN_STATUS.player && attackerCardId) {
			attackCard(attackerCardId, id)
		}
	}

	const onPlayCardHandler = (id: number) => {
		if (game.currentTurn === TURN_STATUS.enemy) {
		} else {
			if (attackerCardId === null) return
			setAttackerCardId(id)
		}
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			if (game.currentTurn === TURN_STATUS.enemy) {
				const playCardIndex = deckCards.length
					? Math.floor(Math.random() * deckCards.length)
					: undefined
				if (playCardIndex != undefined) playCard(deckCards[playCardIndex].id)
				const cardIndex = playingCards.length
					? Math.floor(Math.random() * playingCards.length)
					: undefined
				if (cardIndex != undefined)
					setAttackerCardId(playingCards[cardIndex].id)
				nextTurn()
			}

			clearTimeout(timer)
		}, 2000)
	}, [game.currentTurn])

	return (
		<div className={styles.opponent}>
			<div className={styles.interface}>
				<div className={styles.deck}>
					{player.deck
						.filter(card => card.isDeck == true)
						.map((card, index) => (
							<Card
								style={getStyleRotation(
									index,
									player.deck.filter(card => card.isDeck == true).length,
									false
								)}
								onClick={() => onPlayCardHandler(card.id)}
								key={`${card.id}_${index}`}
								card={card}
								enemy={true}
							/>
						))}
				</div>
			</div>
			<div className={styles.table}>
				{player.deck
					.filter(card => card.isDeck === false)
					.map((card, index) => (
						<Card
							onClick={() => onTargetHandler(card.id)}
							key={`${card.id}_${index}`}
							card={card}
							enemy={false}
						/>
					))}
			</div>
			<p className='text-red-500'>{player.mana}</p>
		</div>
	)
}

export default Opponent
