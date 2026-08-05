import { Reveal } from '@/components/ui'
import { site, studios } from '@/data/site'
import { EnquiryForm } from './EnquiryForm'
import { StudioCard } from './StudioCard'
import './ContactDetails.css'

export function ContactDetails() {
  return (
    <section className="contact section--tight">
      <div className="shell contact__inner">
        <aside className="contact__aside">
          <Reveal>
            <h2 className="display d4 contact__asidetitle">
              Or simply <em>write</em> to us.
            </h2>
            <ul className="contact__direct">
              <li>
                <span className="mono">Email</span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <span className="mono">Telephone</span>
                <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
              </li>
              <li>
                <span className="mono">Hours</span>
                <span>Mon – Fri, 9am – 6pm AEST</span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="contact__studios">
            <h3 className="eyebrow">Studios</h3>
            {studios.map((s) => (
              <StudioCard key={s.city} {...s} />
            ))}
          </Reveal>

          <Reveal delay={0.15} className="contact__promise">
            <p>
              Every enquiry is read by one of the six of us. If we are not the right studio for your trip, we will say
              so in the first reply and point you at someone who is.
            </p>
          </Reveal>
        </aside>

        <div className="contact__form">
          <EnquiryForm />
        </div>
      </div>
    </section>
  )
}
