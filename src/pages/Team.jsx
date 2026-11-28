import PageTransition from '../components/PageTransition.jsx';
import Reveal from '../components/Reveal.jsx';
import CTASection from '../components/CTASection.jsx';
import useSeo from '../hooks/useSeo.js';
import { teamMembers } from '../data/team.js';
import { siteConfig } from '../data/site.js';
import '../styles/team.css';

export default function Team() {
  useSeo({
    title: 'Our Team | Shanmugavel G, Chartered Accountant',
    description: `Meet our team at ${siteConfig.name}. Practicing Chartered Accountants with Big 4 and corporate tax, audit, and compliance experience.`,
    keywords:
      'Chartered Accountants Team, CA Shanmugavel G, Makhima, Tax Advisors, Audit Experts',
  });

  return (
    <PageTransition>
      <div className="kvk-page-container">
        <div className="kvk-profile-wrapper">
          {teamMembers.map((member, index) => (
            <article key={member.id} className="kvk-profile-card">
              <div className="kvk-main-grid">
                {/* Left Column: Portrait & Name */}
                <Reveal className="kvk-left-col" delay={index * 0.1}>
                  <div className="kvk-portrait-frame">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={`${member.name} - ${member.designation}`}
                        className="kvk-portrait-frame__img"
                      />
                    ) : (
                      <>
                        <span className="kvk-portrait-frame__monogram">{member.monogram}</span>
                        <span className="kvk-portrait-frame__caption">{member.name}</span>
                      </>
                    )}
                  </div>
                  <h2 className="kvk-left-col__name">{member.name}</h2>
                  <span className="kvk-left-col__badge">{member.designation}</span>
                </Reveal>

                {/* Right Column: Narrative + KVK Experience / Qualifications / Awards */}
                <div className="kvk-right-col">
                  {/* About me */}
                  <Reveal className="kvk-block" delay={0.15}>
                    <h3 className="kvk-block__title">About me</h3>
                    <p className="kvk-block__desc">{member.aboutMe}</p>
                  </Reveal>

                  {/* Work Experience */}
                  <Reveal className="kvk-block" delay={0.2}>
                    <h3 className="kvk-block__title">Work Experience</h3>
                    <ul className="kvk-block__list">
                      {member.workExperience.map((exp, eIdx) => (
                        <li key={eIdx} className="kvk-block__item">
                          {exp}
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  {/* Qualifications */}
                  <Reveal className="kvk-block" delay={0.25}>
                    <h3 className="kvk-block__title">Qualifications</h3>
                    <ul className="kvk-block__list">
                      {(member.qualifications || member.alumni || []).map((qual, qIdx) => (
                        <li key={qIdx} className="kvk-block__item">
                          {qual}
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  {/* Awards and Achievements */}
                  <Reveal className="kvk-block" delay={0.3}>
                    <h3 className="kvk-block__title">Awards and Achievements</h3>
                    <ul className="kvk-block__list">
                      {member.awardsAndAchievements.map((award, awIdx) => (
                        <li key={awIdx} className="kvk-block__item">
                          {award}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <CTASection
        title="Talk to Us About Your Requirements"
        text="Discuss your tax planning, business structuring, or statutory audit requirements with our team."
        actions={[
          { label: 'Schedule Consultation', to: '/contact#enquiry', variant: 'gold' },
          { label: 'Explore Our Services', to: '/services', variant: 'outline-light' },
        ]}
      />
    </PageTransition>
  );
}
