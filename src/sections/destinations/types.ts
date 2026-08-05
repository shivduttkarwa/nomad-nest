export const SORTS = ['Curated', 'Price', 'Duration', 'A – Z'] as const

export type Sort = (typeof SORTS)[number]

export type View = 'grid' | 'index'
