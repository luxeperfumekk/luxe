import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { perfumes } from '../data/perfumes'
import { QrCode, Sparkles, ArrowRight } from 'lucide-react'

const HomePage = () => {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
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
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="scroll-reveal mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-amber-300/80">
              <Sparkles size={14} />
              Premium Miniature Collection
            </span>
          </div>
          <h1 className="scroll-reveal text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-6">
            <span className="text-white">LUXE</span>
            <span className="gold-shimmer">PERFUME</span>
          </h1>
          <p className="scroll-reveal text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-4 leading-relaxed">
            Discover our curated collection of luxury mini perfumes. Each bottle is a gateway to the world's most iconic fragrances, designed for those who appreciate the art of scent.
          </p>
          <p className="scroll-reveal text-sm text-amber-400/60 mb-10 flex items-center justify-center gap-2">
            <QrCode size={16} />
            Scan the QR code on your bottle to explore its story
          </p>
          <div className="scroll-reveal flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#collection"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-amber-50 transition-all duration-300 hover:scale-105"
            >
              Explore Collection
              <ArrowRight size={18} />
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs">
          <span>Scroll to discover</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* Collection Section */}
      <section id="collection" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Our <span className="gold-shimmer">Collection</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Twenty exquisite fragrances, each carefully selected from the world's most prestigious houses. Every mini bottle tells a unique story.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {perfumes.map((perfume, index) => (
              <Link
                key={perfume.id}
                to={`/perfume/${perfume.id}`}
                className="scroll-reveal group"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="perfume-card-hover relative bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden h-full">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={perfume.image}
                      alt={perfume.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 gradient-overlay opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        perfume.category === 'Women'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/20'
                          : perfume.category === 'Men'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/20'
                          : 'bg-purple-500/20 text-purple-300 border border-purple-500/20'
                      }`}>
                        {perfume.category}
                      </span>
                    </div>

                    {/* Concentration Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/70 border border-white/10">
                        {perfume.concentration}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">{perfume.brand}</p>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300">
                      {perfume.name}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {[...perfume.topNotes.slice(0, 2), ...perfume.heartNotes.slice(0, 1)].map((note) => (
                        <span key={note} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/50">
                          {note}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/30">{perfume.fragranceFamily}</span>
                      <ArrowRight size={16} className="text-white/30 group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              How It <span className="gold-shimmer">Works</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Your mini perfume bottle comes with a unique QR code that unlocks a world of fragrance discovery.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Scan Your Bottle',
                description: 'Use your phone to scan the QR code on your LUXE PERFUME mini perfume bottle.'
              },
              {
                step: '02',
                title: 'Discover the Story',
                description: 'Instantly access the fragrance page with detailed notes, brand history, and scent profile.'
              },
              {
                step: '03',
                title: 'Explore & Enjoy',
                description: 'Learn about the perfumer, fragrance family, and the inspiration behind your scent.'
              }
            ].map((item, index) => (
              <div
                key={item.step}
                className="scroll-reveal text-center p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <span className="text-5xl font-bold text-white/10 block mb-4">{item.step}</span>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">Lux</span>
            <span className="text-2xl font-bold gold-shimmer">Scent</span>
          </div>
          <p className="text-white/30 text-sm">
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

export default HomePage
