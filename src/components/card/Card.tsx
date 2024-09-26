import { FC } from 'react'
import styles from './Card.module.css'
import { CardType, CARD_CLASS } from '@/types/card.type'

interface ICard {
    card: CardType
    onClick?: () => void
    enemy?: boolean
}
const Card: FC<ICard> = ({ card, onClick, enemy = false }) => {
    
    console.log(card)

    return <div onClick={onClick}>
        <div className={styles.card}>
            <div className={styles.wrapper}>
                <p className={styles.mana}>{card.mana}</p>
                <p className={styles.name}>{card.data.name}</p>
                <p className={styles.class}>{CARD_CLASS[card.class]}</p>
                <div className={styles.attack}>
                    <p className={styles.value}>{card.attack}</p>
                    <p className={styles.value}>{card.health}</p>
                </div>
                <div className={styles.image}>
                    <img src={!enemy ? card.data.image.url : '/card.jpg'} alt='card' />
                </div>
            </div>
        </div>
    </div>
}

export default Card
