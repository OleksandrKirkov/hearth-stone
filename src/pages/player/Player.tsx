import { RootState } from '@/assets/store/store'
import Card from '@/components/card/Card'
import useAction from '@/hooks/useAction'
import usePlayer from '@/hooks/usePlayer'
import { useAppSelector } from '@/hooks/useRedux'
import { TURN_STATUS } from '@/types/game.type'
import Image from 'next/image'
import { FC, useEffect } from 'react'
import styles from './Player.module.css'

interface IPlayer {
	setAttackerCardId: (id: number) => void
	attackerCardId: number | null
}

const Player: FC<IPlayer> = ({ setAttackerCardId, attackerCardId }) => {
	const player = useAppSelector((state: RootState) => state.player)['player1']
	const game = useAppSelector((state: RootState) => state.game)

	const { playCard } = usePlayer('player1')
	const { attackCard } = useAction('player2')

	const playingCards = player.deck.filter(card => !card.isDeck)

	const onAttackerCardHandler = (id: number) => {
		if (game.currentTurn == TURN_STATUS.PLAYER) {
			setAttackerCardId(id)
		}
	}

	const onPlayCardHandler = (id: number, mana: number) => {
		if (game.currentTurn !== TURN_STATUS.PLAYER) return

		if (mana <= player.mana) playCard(id)
	}

	useEffect(() => {
		console.log(attackerCardId, 'attacker card')
		if (game.currentTurn === TURN_STATUS.OPPONENT && attackerCardId) {
			const cardIndex = playingCards.length
				? Math.floor(Math.random() * playingCards.length)
				: undefined
			if (cardIndex != undefined)
				attackCard(attackerCardId, playingCards[cardIndex].id)
		}
	}, [game.currentTurn, attackerCardId])

	return (
		<div className={styles.player}>
			{/* <div className={styles.table}>
				{player.deck
					.filter(card => card.isDeck === false)
					.map((card, index) => (
						<Card
							onClick={() => onAttackerCardHandler(card.id)}
							key={index}
							card={card}
							isEnemy={false}
							index={index}
						/>
					))}
			</div> */}
			<div className={styles.interface}>
				<div className={styles.health}>
					<p className={styles.health_value}>{player.hero}</p>
				</div>
				<div className={styles.deck}>
					{player.deck
						.filter(card => card.isDeck == true)
						.map((card, index) => (
							<Card
								index={index}
								cardsLength={
									player.deck.filter(card => card.isDeck == true).length
								}
								onClick={() => onPlayCardHandler(card.id, card.mana)}
								key={`${card.data.name}_${index}`}
								card={card}
								isEnemy={false}
							/>
						))}
				</div>
				<div className={styles.mana}>
					<Image
						className={styles.image}
						src='/mana.png'
						alt='mana'
						objectFit='cover'
						fill={true}
					/>
					<p className={styles.mana_value}>{player.mana}</p>
				</div>
			</div>
		</div>
	)
}

export default Player
