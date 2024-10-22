import { CARD_CLASS, CardType } from '@/types/card.type'
import { CSSProperties, FC } from 'react'
import styles from './Card.module.css'

interface ICard {
	card: CardType
	onClick?: () => void
	enemy?: boolean
	style?: CSSProperties
}
const Card: FC<ICard> = ({ card, onClick, style, enemy = false }) => {
	return (
		<div style={style} onClick={onClick}>
			<div className={`${styles.card} ${enemy && styles.enemy}`}>
				<div className={styles.wrapper}>
					<p className={styles.mana}>{!enemy && card.mana}</p>
					<p className={styles.name}>{!enemy && card.data.name}</p>
					<p className={styles.class}>{!enemy && CARD_CLASS[card.class]}</p>
					<div className={styles.attack}>
						<p className={styles.value}>{!enemy && card.attack}</p>
						<p className={styles.value}>{!enemy && card.health}</p>
					</div>
					<div className={styles.image}>
						<img src={!enemy ? card.data.image.url : ''} alt='card' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card
