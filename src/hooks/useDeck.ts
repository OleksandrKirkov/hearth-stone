import { CHARACTER_COUNT } from "@/contstants/api"
import { DECK_LENGTH } from "@/contstants/game"
import { getCharacter } from "@/services/Api"
import { CARD_CLASS, CardType } from "@/types/card.type"

const getRandomId = () => {
    return Math.floor(Math.random() * CHARACTER_COUNT) + 1
}

const useDeck = () => {
    const getDeck = async (): Promise<CardType[]> => {
        const cards: CardType[] = []

        for (let i = 1; i <= DECK_LENGTH; i++) {
            const character = await getCharacter(String(getRandomId()))

            character.data && cards.push({
                id: Number(character.data.id),
                data: character.data,
                class: CARD_CLASS.rush,
                health: 6,
                attack: 3,
                attackPerTurn: 3,
                isAttack: false,
                isDeck: true,
                mana: 1
            })
        }

        return cards
    }

    const updateDeck = async (deck: CardType[]): Promise<CardType[]> => {
        if (deck.length >= DECK_LENGTH) return deck

        const character = await getCharacter(String(getRandomId))

        if (character.data) {
            return [...deck, {
                id: Number(character.data?.id),
                data: character.data,
                class: CARD_CLASS.rush,
                health: 6,
                attack: 3,
                attackPerTurn: 3,
                isAttack: false,
                isDeck: true,
                mana: 3
            }]
        } else return deck
    }

    return { getDeck, updateDeck }
}

export default useDeck
