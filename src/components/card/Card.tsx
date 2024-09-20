import { FC } from 'react'
import styles from './Card.module.css'
import { CharacterType } from '@/types/character.type'


const Card: FC<{ data: CharacterType }> = ({ data }) => {
    return <div>
        <div className={styles.card}>
            <div className={styles.wrapper}>
                <div className={styles.image}>
                    <img src={data.image.url} alt='card' />
                </div>
            </div>
        </div>
    </div>
}

export default Card
