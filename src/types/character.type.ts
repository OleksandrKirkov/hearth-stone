export type CharacterType = {
    id: string
    name: string
    powerstats: PowerstatsType
    biography: BiographyType
    appearance: AppearanceType
    work: WorkType
    connections: ConnectionsType
    image: ImageType
}

export type PowerstatsType = {
    intelligence: string
    strength: string
    speed: string
    durability: string
    power: string
    combat: string
}

export type BiographyType = {
    'full-name': string
    'alter-egos': string
    'aliases': string[]
    'place-of-birth': string
    'first-apperance': string
    'publisher': string
    'alignment': string
}

export type AppearanceType = {
    gender: string
    race: string
    height: string[]
    weight: string[]
    'eye-color': string
    'hair-color': string
}

export type WorkType = {
    occupation: string
    base: string
}

export type ConnectionsType = {
    'group-affiliation': string
    'relatives': string
}

export type ImageType = {
    url: string
}
