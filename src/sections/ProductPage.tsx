import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, QrCode, Calendar, User, FlaskConical, Wind, Heart } from 'lucide-react'
import type { Perfume } from '../data/perfumes'
import { perfumes } from '../data/perfumes'

interface ProductPageProps {
  perfume: Perfume
}

const ProductPage = ({ perfume }: ProductPageProps) => {
  const navigate = useNavigate()
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.scroll-reveal')
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [perfume])

  // Get related perfumes (same category or brand, excluding current)
  const relatedPerfumes = perfumes
    .filter((p) => p.id !== perfume.id && (p.category === perfume.category || p.brand === perfume.brand))
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm">Back</span>
          </button>

          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">Lux</span>
            <span className="text-xl font-bold gold-shimmer">Scent</span>
          </Link>

          <div className="flex items-center gap-2 text-white/40">
            <QrCode size={16} />
            <span className="text-xs hidden sm:inline">Scanned</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="scroll-reveal relative">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
                <img
                  src={perfume.image}
                  alt={perfume.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ background: `linear-gradient(135deg, ${perfume.accentColor}40, transparent)` }}
                />
              </div>
              {/* Floating accent */}
              <div
                className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full blur-[80px] opacity-30"
                style={{ backgroundColor: perfume.accentColor }}
              />
              <div
                className="absolute -top-6 -left-6 w-24 h-24 rounded-full blur-[60px] opacity-20"
                style={{ backgroundColor: perfume.accentColor }}
              />
            </div>

            {/* Info */}
            <div className="scroll-reveal" style={{ transitionDelay: '100ms' }}>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  perfume.category === 'Women'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/20'
                    : perfume.category === 'Men'
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/20'
                    : 'bg-purple-500/20 text-purple-300 border border-purple-500/20'
                }`}>
                  {perfume.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/70 border border-white/10">
                  {perfume.concentration}
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium border"
                  style={{
                    backgroundColor: `${perfume.accentColor}15`,
                    color: perfume.accentColor,
                    borderColor: `${perfume.accentColor}30`
                  }}
                >
                  {perfume.fragranceFamily}
                </span>
              </div>

              <p className="text-sm text-white/40 uppercase tracking-widest mb-2">{perfume.brand}</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {perfume.name}
              </h1>

              <p className="text-white/60 text-lg leading-relaxed mb-8">
                {perfume.description}
              </p>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-white/40">
                  <Calendar size={16} />
                  <span className="text-sm">Launched {perfume.year}</span>
                </div>
                {perfume.perfumer && (
                  <div className="flex items-center gap-2 text-white/40">
                    <User size={16} />
                    <span className="text-sm">{perfume.perfumer}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-white/40">
                  <FlaskConical size={16} />
                  <span className="text-sm">{perfume.concentration}</span>
                </div>
              </div>

              {/* QR CTA */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <QrCode size={20} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-white/70 font-medium">Scanned from your mini bottle</p>
                  <p className="text-xs text-white/40">You're exploring {perfume.name} by {perfume.brand}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fragrance Notes Pyramid */}
      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <Wind size={24} className="text-amber-400/60 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Fragrance <span className="gold-shimmer">Notes</span>
            </h2>
            <p className="text-white/50 max-w-lg mx-auto">
              A carefully crafted olfactory journey through top, heart, and base notes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Top Notes */}
            <div className="scroll-reveal" style={{ transitionDelay: '0ms' }}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/10 flex items-center justify-center border border-amber-400/20">
                  <span className="text-2xl">✦</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">Top Notes</h3>
                <p className="text-xs text-white/40">The First Impression</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {perfume.topNotes.map((note) => (
                  <span key={note} className="note-pill px-4 py-2 rounded-full text-sm text-white/80">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Heart Notes */}
            <div className="scroll-reveal" style={{ transitionDelay: '100ms' }}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-400/20 to-rose-600/10 flex items-center justify-center border border-rose-400/20">
                  <Heart size={24} className="text-rose-400/60" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">Heart Notes</h3>
                <p className="text-xs text-white/40">The Soul</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {perfume.heartNotes.map((note) => (
                  <span key={note} className="note-pill px-4 py-2 rounded-full text-sm text-white/80">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Base Notes */}
            <div className="scroll-reveal" style={{ transitionDelay: '200ms' }}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-violet-400/20 to-violet-600/10 flex items-center justify-center border border-violet-400/20">
                  <span className="text-2xl">◆</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">Base Notes</h3>
                <p className="text-xs text-white/40">The Lasting Impression</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {perfume.baseNotes.map((note) => (
                  <span key={note} className="note-pill px-4 py-2 rounded-full text-sm text-white/80">
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fragrance Profile */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="scroll-reveal grid sm:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-xl font-semibold text-white mb-4">About {perfume.brand}</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {perfume.brand} is a renowned name in the world of luxury fragrances, 
                known for creating iconic scents that stand the test of time. 
                Each fragrance is a masterpiece of olfactory artistry, crafted with 
                the finest ingredients and meticulous attention to detail.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-xl font-semibold text-white mb-4">Fragrance Profile</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/50">Longevity</span>
                    <span className="text-white/80">Long Lasting</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[80%] bg-gradient-to-r from-amber-400/60 to-amber-500/80 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/50">Sillage</span>
                    <span className="text-white/80">Moderate to Heavy</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[70%] bg-gradient-to-r from-rose-400/60 to-rose-500/80 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/50">Versatility</span>
                    <span className="text-white/80">All Occasions</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-gradient-to-r from-violet-400/60 to-violet-500/80 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Perfumes */}
      {relatedPerfumes.length > 0 && (
        <section className="py-20 px-6 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 scroll-reveal">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                You May Also <span className="gold-shimmer">Like</span>
              </h2>
              <p className="text-white/50">Explore similar fragrances from our collection</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPerfumes.map((related, index) => (
                <Link
                  key={related.id}
                  to={`/perfume/${related.id}`}
                  className="scroll-reveal group"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="perfume-card-hover relative bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 gradient-overlay opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-1">{related.brand}</p>
                      <h3 className="text-base font-semibold text-white group-hover:text-amber-300 transition-colors duration-300">
                        {related.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center scroll-reveal">
          <QrCode size={32} className="text-amber-400/60 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Want to Explore <span className="gold-shimmer">More?</span>
          </h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">
            Discover our full collection of luxury mini perfumes, each with its own unique story and character.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-amber-50 transition-all duration-300 hover:scale-105"
          >
            View Full Collection
            <ArrowLeft size={18} className="rotate-180" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">Lux</span>
            <span className="text-2xl font-bold gold-shimmer">Scent</span>
          </div>
          <p className="text-white/30 text-sm text-center">
            Premium Miniature Perfume Collection. Each bottle is a journey into luxury.
          </p>
          <div className="flex items-center gap-2 text-white/30 text-sm">
            <QrCode size={14} />
            <span>Scan to Explore</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ProductPage
