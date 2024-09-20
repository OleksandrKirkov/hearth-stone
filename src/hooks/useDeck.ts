import { DECK_LENGTH } from "@/contstants/game"
import { getCharacter } from "@/services/Api"
import { CharacterType } from "@/types/character.type"

const getRandomId = () => {
    return Math.floor(Math.random() * DECK_LENGTH) + 1 
}

const useDeck = () => {
    const getDeck = async () => {
        const cards: CharacterType[] = []

        for(let i = 1; i <= DECK_LENGTH; i++ ) {
            const character = await getCharacter(String(getRandomId()))

            character.data && cards.push(character.data)
        }
    }

    const updateDeck = async (deck: CharacterType[]) => {
        if(deck.length >= DECK_LENGTH) return

        const character = await getCharacter(String(getRandomId))

        return [...deck, character.data]
    }

    return { getDeck, updateDeck }
}

export default useDeck
