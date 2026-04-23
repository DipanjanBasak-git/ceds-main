'use client'

import { useEffect, useState } from 'react'
import { Mail, Linkedin, Phone } from 'lucide-react'

interface Mentor {
  id: number
  name: string
  email: string
  contact: string
  linkedin: string
  expertise: string
  status: string
  image: string
}

export default function MentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>([])

  useEffect(() => {
    fetch('/data/mentors.json')
      .then((res) => res.json())
      .then(setMentors)
      .catch(() => { })
  }, [])

  const currentMentors = mentors.filter((m) => m.status === 'mentor')
  const exMentors = mentors.filter((m) => m.status === 'ex-mentor')

  return (
    <>
      {/* Page Header */}
      <section className="page-header pt-28 pb-16 px-6" style={{ backgroundImage: 'url(/images/bg-mentors.png)' }}>
        <div className="container-main">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-3">
            People
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Our Mentors
          </h1>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            Experienced faculty and researchers guiding students towards excellence in data science.
          </p>
        </div>
      </section>

      {/* Mentors Grid */}
      <section className="section-padding bg-white" style={{ backgroundImage: 'url(/images/bg-pattern-topo.png)', backgroundSize: 'auto', backgroundRepeat: 'repeat', backgroundPosition: 'top left' }}>
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {currentMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="group rounded-2xl border border-gray-100 bg-white overflow-hidden card-hover"
              >
                {/* Photo */}
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  {mentor.image ? (
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-5xl font-bold">
                      {mentor.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{mentor.name}</h3>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">{mentor.expertise}</p>

                  {/* Links */}
                  <div className="flex items-center gap-3">
                    {mentor.email && (
                      <a
                        href={`mailto:${mentor.email}`}
                        className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        title="Email"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {mentor.linkedin && (
                      <a
                        href={mentor.linkedin.startsWith('http') ? mentor.linkedin : `https://${mentor.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {mentor.contact && (
                      <a
                        href={`tel:${mentor.contact}`}
                        className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        title="Phone"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ex. Mentors Section */}
          {exMentors.length > 0 && (
            <div className="mt-20">
              {/* Divider + heading */}
              <div className="flex items-center gap-4 mb-10">
                <div className="flex-1 h-px bg-gray-200" />
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800">Ex. Mentors</h2>
                </div>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Ex-mentor cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
                {exMentors.map((mentor) => (
                  <div
                    key={mentor.id}
                    className="group rounded-2xl border border-gray-100 bg-white overflow-hidden card-hover"
                  >
                    {/* Photo */}
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      {mentor.image ? (
                        <img
                          src={mentor.image}
                          alt={mentor.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-5xl font-bold">
                          {mentor.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">{mentor.name}</h3>
                      <p className="text-xs text-gray-500 mb-4 leading-relaxed">{mentor.expertise}</p>

                      {/* Links */}
                      <div className="flex items-center gap-3">
                        {mentor.email && (
                          <a
                            href={`mailto:${mentor.email}`}
                            className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                            title="Email"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {mentor.linkedin && (
                          <a
                            href={mentor.linkedin.startsWith('http') ? mentor.linkedin : `https://${mentor.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                            title="LinkedIn"
                          >
                            <Linkedin className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {mentor.contact && (
                          <a
                            href={`tel:${mentor.contact}`}
                            className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                            title="Phone"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
