import { Btn, Lines, Reveal, SectionHead } from '@/components/ui'
import { process } from '@/data/site'
import './Method.css'

export function Method() {
  return (
    <section className="method section">
      <div className="shell method__inner">
        <div className="method__sticky">
          <SectionHead index="03 / 04" eyebrow="How it works">
            <Lines as="h2" className="display d2" lines={[<>Four steps,</>, <>and a lot of <em>listening</em>.</>]} />
          </SectionHead>

          <Reveal delay={0.2} className="method__note">
            <p>
              Planning fee of $600, credited in full against the journey. It exists so that we can spend forty hours on
              a proposal without needing you to book.
            </p>
            <Btn to="/contact" variant="outline">
              Book the conversation
            </Btn>
          </Reveal>
        </div>

        <ol className="method__steps">
          {process.map((p, i) => (
            <Reveal as="li" key={p.n} delay={i * 0.05} className="method__step">
              <span className="method__n mono">{p.n}</span>
              <div>
                <h3 className="display d4">{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
