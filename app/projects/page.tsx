'use client'

import { useEffect, useState } from 'react'
import {
  Clock,
  CheckCircle2,
  Users,
  IndianRupee,
  Download,
  Lock,
  Database,
  ArrowUpRight,
} from 'lucide-react'

interface Project {
  id: number
  title: string
  type: string
  description: string
  startDate: string
  endDate: string
  funding: string
  team: string[]
  status: 'ongoing' | 'completed'
  progress: number
  currentPhase: string
  outcomes: string[]
}

interface Dataset {
  id: number
  name: string
  type: 'public' | 'private'
  description: string
  size: string
  format: string
  domain: string
  lastUpdated: string
  downloadUrl?: string
  accessRequirement?: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [datasets, setDatasets] = useState<Dataset[]>([])
  const [activeTab, setActiveTab] = useState<'ongoing' | 'completed' | 'collaborative' | 'grant-in-aid'>('ongoing')

  useEffect(() => {
    fetch('/data/projects.json')
      .then((res) => res.json())
      .then(setProjects)
      .catch(() => {})
    fetch('/data/datasets.json')
      .then((res) => res.json())
      .then(setDatasets)
      .catch(() => {})
  }, [])

  const filtered = projects.filter((p) => {
    if (activeTab === 'ongoing' || activeTab === 'completed') {
      return p.status === activeTab
    }
    return p.type === activeTab
  })

  return (
    <>
      {/* Page Header */}
      <section className="page-header pt-28 pb-16 px-6" style={{ backgroundImage: 'url(/images/bg-projects.png)' }}>
        <div className="container-main">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Research
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Projects & Datasets
          </h1>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            Our ongoing and completed research projects, along with publicly available datasets.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="section-padding bg-white" style={{ backgroundImage: 'url(/images/bg-pattern-topo.png)', backgroundSize: 'auto', backgroundRepeat: 'repeat', backgroundPosition: 'top left' }}>
        <div className="container-main">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Research Projects</h2>

          {/* Tabs */}
          <div className="flex gap-1 mb-10 bg-gray-100 rounded-xl p-1 w-fit flex-wrap">
            {(['ongoing', 'completed', 'collaborative', 'grant-in-aid'] as const).map((tab) => {
              let label = tab.charAt(0).toUpperCase() + tab.slice(1);
              if (tab === 'collaborative') label = 'Collaborative Projects';
              if (tab === 'grant-in-aid') label = 'Grant-in-Aid Projects';
              
              const count = projects.filter((p) => {
                if (tab === 'ongoing' || tab === 'completed') return p.status === tab;
                return p.type === tab;
              }).length;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {label}
                  <span className="ml-2 text-xs text-gray-400">
                    ({count})
                  </span>
                </button>
              )
            })}
          </div>

          {/* Project cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-children">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl border border-gray-100 bg-white card-hover overflow-hidden flex flex-col"
              >
                {project.image && (
                  <div className="w-full h-48 sm:h-56 bg-gray-100 relative overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                  </div>
                )}
                <div className="p-7 flex-1 flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium ${
                        project.status === 'ongoing'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {project.status === 'ongoing' ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                        {project.currentPhase}
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-500 capitalize">
                        {project.type.replace('-', ' ')}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-5 leading-relaxed">{project.description}</p>

                {/* Team / Mentors */}
                {project.team && project.team.length > 0 && (
                  <div className="mb-5">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Mentors / Team</p>
                    <div className="flex flex-wrap gap-2">
                      {project.team.map((member, i) => (
                        <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-primary/5 text-primary border border-primary/10">
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Progress bar (ongoing) */}
                {project.status === 'ongoing' && (
                  <div className="mb-5">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-900 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Outcomes (completed) */}
                {project.status === 'completed' && project.outcomes.length > 0 && (
                  <div className="mb-5">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Key Outcomes</p>
                    <ul className="space-y-1.5">
                      {project.outcomes.slice(0, 3).map((outcome, i) => (
                        <li key={i} className="text-xs text-gray-500 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-50 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5" />
                    {project.funding}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {project.team.length} members
                  </div>
                  <div>{project.startDate} — {project.endDate}</div>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Datasets */}
      <section className="section-padding bg-gray-50" style={{ backgroundImage: 'url(/images/bg-pattern-topo.png)', backgroundSize: 'auto', backgroundRepeat: 'repeat', backgroundPosition: 'top left' }}>
        <div className="container-main">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Datasets</h2>
            <p className="text-gray-500 text-sm">Public and private datasets available for research purposes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {datasets.map((ds) => (
              <div
                key={ds.id}
                className="p-6 rounded-2xl border border-gray-100 bg-white card-hover"
              >
                {/* Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium ${
                    ds.type === 'public'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-orange-50 text-orange-700'
                  }`}>
                    {ds.type === 'public' ? <Database className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                    {ds.type.charAt(0).toUpperCase() + ds.type.slice(1)}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-500">
                    {ds.domain}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-gray-900 mb-2">{ds.name}</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{ds.description}</p>

                <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-4">
                  <span>{ds.size}</span>
                  <span>•</span>
                  <span>{ds.format}</span>
                  <span>•</span>
                  <span>Updated {ds.lastUpdated}</span>
                </div>

                {ds.type === 'public' && ds.downloadUrl ? (
                  <a
                    href={ds.downloadUrl}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                ) : (
                  <p className="text-xs text-gray-400 italic">{ds.accessRequirement}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
