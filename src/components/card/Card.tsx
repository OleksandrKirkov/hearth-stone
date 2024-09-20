import { FC, useCallback, useEffect, useState } from 'react'
import styles from './Card.module.css'
import { getCharacter } from '@/services/Api'
import { CharacterType } from '@/types/character.type'


const Card: FC<{ id: number }> = ({ id }) => {
    const [characterState, setScharacterState] = useState<CharacterType | null>(null)

    const fetchCharacter = useCallback(async () => {
        const character = await getCharacter(String(id));

        if (!character.error)
            setScharacterState(character.data)
    }, [])

    useEffect(() => {
        fetchCharacter()
    }, [fetchCharacter])

    return <div>
        {characterState
            ? <div className={styles.card}>
                <div className={styles.wrapper}>
                    <div className={styles.image}>
                        <img src={characterState.image.url} alt='card' />
                    </div>
                </div>
            </div> : <div>
                error
            </div>}
    </div>
}

export default Card
