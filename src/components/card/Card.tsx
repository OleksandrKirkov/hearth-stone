import { FC } from 'react'
import styles from './Card.module.css'
import { CardType } from '@/types/card.type'


const Card: FC<{ card: CardType, enemy: boolean }> = ({ card, enemy = false }) => {
    return <div>
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
