import { URL } from '@/contstants/api'
import { CharacterType } from '@/types/character.type'

export type ResponseType = {
    response: 'success' | 'error'
    error?: string
} | CharacterType

export const getCharacter = async (
    id: string
): Promise<{data: CharacterType | null, error: string | null}> => {
    try {
        const response = await fetch(`${URL}/${id}`)

        if(!response.ok) {
            return { data: null, error: `Error ${response.status}: ${response.statusText}` }
        }

        const data: ResponseType = await response.json()

        if('response' in data && data.response === 'error')
            return { data: null, error: "Invalid data received" }

        return { data: data as CharacterType, error: null }
    } catch(error: unknown) {
        if (error instanceof Error)
            return { data: null, error: error.message }
        else
            return { data: null, error: "An unknown error occurred" }
    }
}
