import { FC } from 'react'
import styles from './Card.module.css'
import { CardType } from '@/types/card.type'

interface ICard {
    card: CardType
    onClick?: () => void
    enemy?: boolean
}

const Card: FC<ICard> = ({ card, onClick, enemy = false }) => {
    return <div onClick={onClick}>
        <div className={styles.card}>
            <div className={styles.wrapper}>
                <div className={styles.image}>
                    <img src={!enemy ? card.data.image.url : '/card.jpg'} alt='card' />
                </div>
            </div>
        </div>
    </div>
}

export default Card
