import { useMemo, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Btn } from '@/components/ui'
import { destinations } from '@/data/destinations'
import { PACES } from '@/data/journeys'
import { site } from '@/data/site'
import { EASE_OUT } from '@/lib/easing'
import { cx, money } from '@/lib/utils'
import './EnquiryForm.css'

const MONTHS = [
  'Not sure yet',
  'Jan 2027',
  'Feb 2027',
  'Mar 2027',
  'Apr 2027',
  'May 2027',
  'Jun 2027',
  'Jul 2027',
  'Aug 2027',
  'Sep 2027',
  'Oct 2027',
  'Nov 2027',
  'Dec 2027',
  'Later than that',
]

const STEPS = [
  { n: '01', label: 'You', hint: 'So we know who we are writing to.' },
  { n: '02', label: 'Where', hint: 'Pick as many as you like, or none at all.' },
  { n: '03', label: 'When', hint: 'Rough is fine. Nothing here is binding.' },
  { n: '04', label: 'Anything else', hint: 'The details that never fit a form.' },
]

type FormState = {
  name: string
  email: string
  phone: string
  places: string[]
  other: string
  month: string
  nights: number
  travellers: number
  budget: number
  pace: string
  notes: string
  source: string
}

const INITIAL: FormState = {
  name: '',
  email: '',
  phone: '',
  places: [],
  other: '',
  month: 'Not sure yet',
  nights: 10,
  travellers: 2,
  budget: 9000,
  pace: 'Balanced',
  notes: '',
  source: '',
}

export function EnquiryForm() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(INITIAL)
  const [touched, setTouched] = useState(false)
  const [sent, setSent] = useState(false)

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }))

  const togglePlace = (slug: string) =>
    setForm((f) => ({
      ...f,
      places: f.places.includes(slug) ? f.places.filter((p) => p !== slug) : [...f.places, slug],
    }))

  const valid = useMemo(() => {
    if (step === 0) return form.name.trim().length > 1 && /\S+@\S+\.\S+/.test(form.email)
    if (step === 1) return form.places.length > 0 || form.other.trim().length > 1
    return true
  }, [step, form])

  const next = () => {
    if (!valid) {
      setTouched(true)
      return
    }
    setTouched(false)
    setStep((s) => Math.min(STEPS.length - 1, s + 1))
  }

  const back = () => {
    setTouched(false)
    setStep((s) => Math.max(0, s - 1))
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!valid) {
      setTouched(true)
      return
    }
    setSent(true)
  }

  if (sent) {
    return (
      <motion.div
        className="enquiry enquiry--done"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
      >
        <span className="eyebrow">Received</span>
        <p className="display d3">
          Thank you, {form.name.split(' ')[0]}. We will write back <em>properly</em> — usually within one working day.
        </p>
        <p className="muted">
          A real person is reading this, not a queue. If it is urgent, call{' '}
          <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a> and ask for the duty planner.
        </p>
        <Btn
          onClick={() => {
            setForm(INITIAL)
            setStep(0)
            setSent(false)
          }}
          variant="outline"
        >
          Send another enquiry
        </Btn>
      </motion.div>
    )
  }

  return (
    <form className="enquiry" onSubmit={submit} noValidate>
      <div className="enquiry__steps">
        {STEPS.map((s, i) => (
          <button
            key={s.n}
            type="button"
            className={cx('enquiry__step', i === step && 'is-active', i < step && 'is-done')}
            onClick={() => i < step && setStep(i)}
            aria-current={i === step ? 'step' : undefined}
          >
            <span className="mono">{s.n}</span>
            <span className="enquiry__steplabel">{s.label}</span>
          </button>
        ))}
        <span className="enquiry__track" aria-hidden="true">
          <motion.i
            initial={{ scaleX: 1 / STEPS.length }}
            animate={{ scaleX: (step + 1) / STEPS.length }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          />
        </span>
      </div>

      <p className="enquiry__hint mono">{STEPS[step].hint}</p>

      <div className="enquiry__stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 26 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -26 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="enquiry__panel"
          >
            {step === 0 && (
              <div className="field-grid">
                <label className="field field--full">
                  <span className="field__label">Your name</span>
                  <input
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="Eleanor Whitcombe"
                    autoComplete="name"
                  />
                </label>

                <label className="field">
                  <span className="field__label">Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    placeholder="you@somewhere.com"
                    autoComplete="email"
                  />
                </label>

                <label className="field">
                  <span className="field__label">
                    Phone <i>optional</i>
                  </span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    placeholder="+61 …"
                    autoComplete="tel"
                  />
                </label>
              </div>
            )}

            {step === 1 && (
              <div className="chips">
                <div className="chips__set">
                  {destinations.map((d) => {
                    const on = form.places.includes(d.slug)
                    return (
                      <button
                        key={d.slug}
                        type="button"
                        className={cx('chip', on && 'is-on')}
                        onClick={() => togglePlace(d.slug)}
                        aria-pressed={on}
                      >
                        <span>{d.name}</span>
                        <i className="chip__country">{d.country}</i>
                      </button>
                    )
                  })}
                </div>

                <label className="field field--full">
                  <span className="field__label">Somewhere else entirely</span>
                  <input
                    value={form.other}
                    onChange={(e) => set('other', e.target.value)}
                    placeholder="Patagonia, the Faroes, a river in Laos…"
                  />
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="field-grid">
                <label className="field">
                  <span className="field__label">Roughly when</span>
                  <div className="select">
                    <select value={form.month} onChange={(e) => set('month', e.target.value)}>
                      {MONTHS.map((m) => (
                        <option key={m}>{m}</option>
                      ))}
                    </select>
                    <svg viewBox="0 0 10 6" width="10" height="6" fill="none" aria-hidden="true">
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </div>
                </label>

                <label className="field">
                  <span className="field__label">Preferred pace</span>
                  <div className="select">
                    <select value={form.pace} onChange={(e) => set('pace', e.target.value)}>
                      {PACES.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                    <svg viewBox="0 0 10 6" width="10" height="6" fill="none" aria-hidden="true">
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </div>
                </label>

                <div className="field">
                  <span className="field__label">
                    Nights away <b>{form.nights}</b>
                  </span>
                  <input
                    className="range"
                    type="range"
                    min={4}
                    max={30}
                    step={1}
                    value={form.nights}
                    onChange={(e) => set('nights', Number(e.target.value))}
                  />
                  <span className="field__scale mono">
                    <i>4</i>
                    <i>30</i>
                  </span>
                </div>

                <div className="field">
                  <span className="field__label">
                    Travellers <b>{form.travellers}</b>
                  </span>
                  <input
                    className="range"
                    type="range"
                    min={1}
                    max={12}
                    step={1}
                    value={form.travellers}
                    onChange={(e) => set('travellers', Number(e.target.value))}
                  />
                  <span className="field__scale mono">
                    <i>1</i>
                    <i>12</i>
                  </span>
                </div>

                <div className="field field--full">
                  <span className="field__label">
                    Budget per traveller, excluding flights <b>{money(form.budget)}</b>
                  </span>
                  <input
                    className="range"
                    type="range"
                    min={3000}
                    max={40000}
                    step={500}
                    value={form.budget}
                    onChange={(e) => set('budget', Number(e.target.value))}
                  />
                  <span className="field__scale mono">
                    <i>$3,000</i>
                    <i>$40,000+</i>
                  </span>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="field-grid">
                <label className="field field--full">
                  <span className="field__label">What would make this trip worth taking?</span>
                  <textarea
                    rows={6}
                    value={form.notes}
                    onChange={(e) => set('notes', e.target.value)}
                    placeholder="Anniversary. She walks, he doesn't. Neither of us wants to see another cathedral."
                  />
                </label>

                <label className="field field--full">
                  <span className="field__label">
                    How did you hear about us? <i>optional</i>
                  </span>
                  <input
                    value={form.source}
                    onChange={(e) => set('source', e.target.value)}
                    placeholder="A friend, the journal, somewhere unexpected…"
                  />
                </label>

                <div className="enquiry__summary">
                  <h4 className="eyebrow">Your enquiry</h4>
                  <dl>
                    <div>
                      <dt className="mono">Name</dt>
                      <dd>{form.name || '—'}</dd>
                    </div>
                    <div>
                      <dt className="mono">Interested in</dt>
                      <dd>
                        {form.places.length
                          ? form.places
                              .map((p) => destinations.find((d) => d.slug === p)?.name)
                              .filter(Boolean)
                              .join(', ')
                          : form.other || '—'}
                      </dd>
                    </div>
                    <div>
                      <dt className="mono">Shape</dt>
                      <dd>
                        {form.nights} nights · {form.travellers} travelling · {form.pace} pace
                      </dd>
                    </div>
                    <div>
                      <dt className="mono">Timing & budget</dt>
                      <dd>
                        {form.month} · around {money(form.budget)} each
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {touched && !valid && (
        <p className="enquiry__error mono">
          {step === 0 ? 'A name and a working email, and we can move on.' : 'Pick a place, or tell us your own.'}
        </p>
      )}

      <div className="enquiry__actions">
        <button type="button" className="enquiry__back" onClick={back} disabled={step === 0}>
          Back
        </button>

        {step < STEPS.length - 1 ? <Btn onClick={next}>Continue</Btn> : <Btn type="submit">Send enquiry</Btn>}
      </div>

      <p className="enquiry__legal mono">
        No mailing list, no automated follow-up. We reply once, from a real address.
      </p>
    </form>
  )
}
