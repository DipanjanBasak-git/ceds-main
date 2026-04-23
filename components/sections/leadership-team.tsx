'use client'

import Image from 'next/image'
import { useReveal } from '@/hooks/useReveal'

const leaders = [
  {
    name: 'Prof. Banani Chakrabarti',
    role: 'President',
    department: 'President, IEM-UEM Group',
    image: '/data/images/Banani.jpg',
    featured: true,
  },
  {
    name: 'Prof. (Dr.) Satyajit Chakrabarti',
    role: 'Director',
    department: 'Director, IEM-UEM Group',
    image: '/data/images/Prof Dr Satyajit C.jpg',
    featured: true,
  },
  {
    name: 'Prof. (Dr.) Amartya Mukherjee',
    role: 'Convener',
    department: 'HOD, Dept. of CSE(AIML)',
    image: '/data/images/Amartya Mukherjee.jpg',
    featured: false,
  },
  {
    name: 'Prof. (Dr.) Subhadip Chandra',
    role: 'Centre-In-Charge',
    department: 'Asst. Prof, Dept. of CSE(AIML), CSBS',
    image: '/data/images/g12169sc (2) - subhadip chandra.jpg',
    featured: false,
  },
  {
    name: 'Prof. Ankita Ray Chowdhury',
    role: 'Coordinator',
    department: 'Asst. Prof, Dept. of CSE(AIML), CSBS',
    image: '/data/images/ankita - ANKITA RAY CHOWDHURY.jpg',
    featured: false,
  },
]

export default function LeadershipTeam() {
  const revealRef = useReveal()

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ background: 'var(--surface-dark)' }}
      ref={revealRef}
    >
      {/* Gradient mesh */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 40%, rgba(37, 99, 235, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, rgba(124, 58, 237, 0.06) 0%, transparent 50%)
          `,
        }}
      />

      <div className="container-main relative z-10">
        <div className="text-center mb-14 reveal">
          <p className="eyebrow !text-primary/60 mb-4">Governance</p>
          <h2 className="heading-display text-[clamp(2rem,4.5vw,3.25rem)] !text-white">
            Leadership Team
          </h2>
        </div>

        {/* Top row — featured leaders */}
        <div className="flex flex-wrap justify-center gap-6 mb-6 reveal">
          {leaders
            .filter((l) => l.featured)
            .map((leader) => (
              <div
                key={leader.role}
                className="w-[280px] p-6 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm text-center group hover:bg-white/[0.07] transition-all duration-300"
              >
                <div className="w-30 h-30 rounded-full overflow-hidden mx-auto mb-5 ring-2 ring-primary/30">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="inline-block px-3 py-1 rounded-full text-[0.625rem] font-bold tracking-[0.15em] uppercase bg-primary text-white">
                  {leader.role}
                </span>
                <h3 className="text-[1rem] font-bold text-white mb-1">
                  {leader.name}
                </h3>
                <p className="text-[0.75rem] text-white/40">
                  {leader.department}
                </p>
              </div>
            ))}
        </div>

        {/* Bottom row — other leaders */}
        <div className="flex flex-wrap justify-center gap-5 reveal">
          {leaders
            .filter((l) => !l.featured)
            .map((leader) => (
              <div
                key={leader.role}
                className="w-[240px] p-5 rounded-2xl border border-white/8 bg-white/[0.03] text-center group hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="w-30 h-30 rounded-full overflow-hidden mx-auto mb-4 ring-2 ring-accent/20">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[0.5625rem] font-bold tracking-[0.15em] uppercase bg-accent text-white mb-2">
                  {leader.role}
                </span>
                <h3 className="text-[0.9375rem] font-bold text-white mb-1">
                  {leader.name}
                </h3>
                <p className="text-[0.6875rem] text-white/35">
                  {leader.department}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
