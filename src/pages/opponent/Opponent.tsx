import { RootState } from '@/assets/store/store'
import Card from '@/components/card/Card'
import useEnemy from '@/hooks/useEnemy'
import useGame from '@/hooks/useGame'
import { useAppSelector } from '@/hooks/useRedux'
import { TURN_STATUS } from '@/types/game.type'
import { CSSProperties, FC, useEffect } from 'react'
import styles from './Opponent.module.css'

interface IOpponent {
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

const Opponent: FC<IOpponent> = ({
	setAttachCardId,
	setAttackerCardId,
	attackerCardId,
}) => {
	const enemy = useAppSelector((state: RootState) => state.enemy)
	const game = useAppSelector((state: RootState) => state.game)

	const { attackCard } = useGame()
	const { playCard } = useEnemy()

	const onTargetHandler = (id: number) => {
		console.log(attackerCardId, 'attacker card id')
		if (game.currentTurn == TURN_STATUS.player && attackerCardId) {
			console.log('card')
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
		if (game.currentTurn === TURN_STATUS.enemy) playCard()
	}, [game.currentTurn])

	return (
		<div className={styles.opponent}>
			<div className={styles.interface}>
				<div className={styles.deck}>
					{enemy.deck
						.filter(card => card.isDeck == true)
						.map((card, index) => (
							<Card
								style={getStyleRotation(
									index,
									enemy.deck.filter(card => card.isDeck == true).length,
									false
								)}
								onClick={() => onTargetHandler(card.id)}
								key={index}
								card={card}
								enemy={true}
							/>
						))}
				</div>
			</div>
			<div className={styles.table}>
				{enemy.deck
					.filter(card => card.isDeck === false)
					.map((card, index) => (
						<Card
							onClick={() => onTargetHandler(card.id)}
							key={index}
							card={card}
							enemy={false}
						/>
					))}
			</div>
			<p className='text-red-500'>{enemy.mana}</p>
		</div>
	)
}

export default Opponent
