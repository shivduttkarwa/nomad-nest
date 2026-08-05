import { Reveal } from './Motion'
import './EmptyState.css'

export function EmptyState({ title, note }: { title: string; note: string }) {
  return (
    <Reveal className="empty">
      <p className="display d4">{title}</p>
      <p className="muted">{note}</p>
    </Reveal>
  )
}
