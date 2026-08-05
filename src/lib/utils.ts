export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max)
}

export function pad(n: number, width = 2) {
  return String(n).padStart(width, '0')
}

export function asset(path: string) {
  return path.startsWith('/') ? `${import.meta.env.BASE_URL}${path.slice(1)}` : path
}

export function img(id: string, w = 1600, ratio?: number) {
  if (id.startsWith('http://') || id.startsWith('https://')) return id
  if (id.startsWith('/')) return asset(id)

  const base = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`
  return ratio ? `${base}&h=${Math.round(w * ratio)}` : base
}

export function money(n: number) {
  return `$${n.toLocaleString('en-US')}`
}
