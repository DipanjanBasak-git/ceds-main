'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowRight } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'

interface Mentor {
  id: number
  name: string
  email: string
  expertise: string
  status: string
  image: string
}

export default function MentorsPreview() {
  const [mentors, setMentors] = useState<Mentor[]>([])
  const revealRef = useReveal([mentors])

  useEffect(() => {
    fetch('/data/mentors.json')
      .then((res) => res.json())
      .then(setMentors)
      .catch(() => {})
  }, [])

  const featured = mentors.filter((m) => m.status === 'mentor').slice(0, 4)

  if (featured.length === 0) return null

  return (
    <section className="section-padding" style={{ background: 'var(--secondary)' }} ref={revealRef}>
      <div className="container-main">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 reveal">
          <div>
            <p className="eyebrow mb-4">Our Team</p>
            <h2 className="heading-display text-[clamp(2rem,4.5vw,3.25rem)]">
              Personnel & Faculties
            </h2>
          </div>
          <Link
            href="/mentors"
            className="group flex items-center gap-2 text-[0.875rem] font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            View all mentors
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
          </Link>
        </div>

        {/* Magazine-style asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {featured.map((mentor, i) => {
            // First mentor: large hero card spanning 6 cols x 2 rows
            const isHero = i === 0
            const gridClass = isHero
              ? 'md:col-span-6 md:row-span-2'
              : 'md:col-span-6'

            return (
              <div
                key={mentor.id}
                className={`group rounded-2xl border bg-white overflow-hidden transition-all duration-400 hover:shadow-lg hover:-translate-y-1 reveal ${gridClass}`}
                style={{ borderColor: 'var(--border)' }}
              >
                {isHero ? (
                  // Hero card — full layout
                  <div className="h-full flex flex-col">
                    <div className="flex-1 overflow-hidden" style={{ background: 'var(--secondary)', minHeight: 280 }}>
                      {mentor.image ? (
                        <img
                          src={mentor.image}
                          alt={mentor.name}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-7xl font-bold"
                          style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', opacity: 0.1 }}
                        >
                          {mentor.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="p-7">
                      <h3 className="text-[1.125rem] font-bold text-foreground mb-2">
                        {mentor.name}
                      </h3>
                      <p className="text-[0.8125rem] text-muted-foreground leading-relaxed mb-4">
                        {mentor.expertise}
                      </p>
                      {mentor.email && (
                        <a
                          href={`mailto:${mentor.email}`}
                          className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          {mentor.email}
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  // Standard cards — horizontal layout
                  <div className="flex flex-col sm:flex-row h-full">
                    <div className="w-full sm:w-[180px] flex-shrink-0 overflow-hidden" style={{ background: 'var(--secondary)' }}>
                      {mentor.image ? (
                        <img
                          src={mentor.image}
                          alt={mentor.name}
                          className="w-full h-[200px] sm:h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        />
                      ) : (
                        <div
                          className="w-full h-[200px] sm:h-full flex items-center justify-center text-5xl font-bold"
                          style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', opacity: 0.1 }}
                        >
                          {mentor.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col justify-center">
                      <h3 className="text-[0.9375rem] font-bold text-foreground mb-1.5 leading-tight">
                        {mentor.name}
                      </h3>
                      <p className="text-[0.75rem] text-muted-foreground leading-relaxed mb-3">
                        {mentor.expertise}
                      </p>
                      {mentor.email && (
                        <a
                          href={`mailto:${mentor.email}`}
                          className="inline-flex items-center gap-2 text-[0.75rem] font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          Email
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Ex. Mentors Section */}
        <ExMentorsSection mentors={mentors} />
      </div>
    </section>
  )
}

function ExMentorsSection({ mentors }: { mentors: Mentor[] }) {
  const exMentors = mentors.filter((m) => m.status === 'ex-mentor')

  if (exMentors.length === 0) return null

  return (
    <div className="mt-20 reveal">
      {/* Divider + heading */}
      <div className="flex items-center gap-4 mb-10">
        <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        <div className="text-center">
          <p className="eyebrow mb-1 !text-muted-foreground/60">Alumni</p>
          <h3 className="text-[1.5rem] font-bold" style={{ color: 'var(--foreground)' }}>
            Ex. Mentors
          </h3>
        </div>
        <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {exMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="group w-[200px] rounded-2xl border bg-white overflow-hidden text-center p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 ring-2 ring-gray-200">
              {mentor.image ? (
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-2xl font-bold"
                  style={{ color: 'var(--primary)', opacity: 0.3 }}
                >
                  {mentor.name.charAt(0)}
                </div>
              )}
            </div>
            <h4 className="text-[0.875rem] font-bold leading-tight mb-1" style={{ color: 'var(--foreground)' }}>
              {mentor.name}
            </h4>
            {mentor.expertise && (
              <p className="text-[0.6875rem] leading-snug" style={{ color: 'var(--muted-foreground)' }}>
                {mentor.expertise}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
