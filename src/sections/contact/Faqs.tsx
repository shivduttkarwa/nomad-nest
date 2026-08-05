import { Accordion, Lines, SectionHead } from '@/components/ui'
import { faqs } from '@/data/site'
import './Faqs.css'

export function Faqs() {
  return (
    <section className="faq section">
      <div className="shell">
        <SectionHead index="01 / 01" eyebrow="Before you ask">
          <Lines as="h2" className="display d2" lines={[<>The questions</>, <>we get <em>most</em>.</>]} />
        </SectionHead>

        <Accordion
          numbered
          defaultOpen={faqs[0].q}
          items={faqs.map((f) => ({
            key: f.q,
            heading: f.q,
            body: <p className="faq__answer">{f.a}</p>,
          }))}
        />
      </div>
    </section>
  )
}
