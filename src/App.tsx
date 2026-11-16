import { useMemo, useState } from 'react'
import heroProfile from './assets/hero-profile.png'
import heroSunflower from './assets/hero-sunflower.png'
import heroSunflowerMask from './assets/hero-sunflower-mask.svg'
import { normalizeMediaFiles, type MediaItem } from './media'

const mediaModules = import.meta.glob<string>('./media/**/*.{AVIF,GIF,JPEG,JPG,MOV,MP4,PNG,SVG,WEBM,WEBP,avif,gif,jpeg,jpg,mov,mp4,png,svg,webm,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
})

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null)
  const media = useMemo(() => normalizeMediaFiles(mediaModules), [])

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Blaine home">BLAINE<span>XX</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-profile" aria-hidden="true">
          <div className="hero-slab-wrap"><div className="hero-slab" /></div>
          <div className="hero-plane-wrap"><div className="hero-plane" /></div>
          <div className="hero-cutout-wrap"><div className="hero-cutout" /></div>
          <img className="hero-portrait" src={heroProfile} alt="" />
          <div className="hero-sunflower" style={{ maskImage: `url(${heroSunflowerMask})`, WebkitMaskImage: `url(${heroSunflowerMask})` }}>
            <img src={heroSunflower} alt="" />
          </div>
        </div>
        <div className="hero-message" aria-label="Visual Direction, Distinction, Curation">
          <span className="hero-visual">Visual</span>
          <span className="hero-direction">Direction</span>
          <span className="hero-distinction">Distinction</span>
          <span className="hero-curation">Curation</span>
        </div>
        <div className="hero-bottom">
          <p>XXX</p>
          <a href="#archive" className="round-link" aria-label="View archive">↓</a>
        </div>
      </section>

      <section className="marquee" aria-label="Capabilities">
        <div>Art direction <i>✦</i> Identity <i>✦</i> Digital <i>✦</i> Art direction <i>✦</i> Identity <i>✦</i> Digital <i>✦</i></div>
      </section>

      <section className="archive section" id="archive">
        <div className="section-head stripped-head"><span>(01)</span><span>{media.length.toString().padStart(2, '0')} files</span></div>
        {media.length > 0 ? (
          <div className="media-grid">
            {media.map((item) => (
              <button className="media-item" key={item.source} onClick={() => setActiveMedia(item)} type="button">
                {item.isVideo ? <video src={item.source} muted playsInline preload="metadata" /> : <img src={item.source} alt={item.name} loading="lazy" />}
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="empty-archive"><span>⌁</span><p>Archive is empty.</p></div>
        )}
      </section>

      <section className="about section" id="about">
        <span>(02)</span>
        <p>Visual worlds for ideas in motion.</p>
        <a href="mailto:hello@blainexx.com">Say hello <span>↗</span></a>
      </section>

      <footer><span>© {new Date().getFullYear()} Blaine</span><a href="#top">Back up ↑</a></footer>

      {activeMedia && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={activeMedia.name} onClick={() => setActiveMedia(null)}>
          <button type="button" aria-label="Close media" onClick={() => setActiveMedia(null)}>×</button>
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            {activeMedia.isVideo ? <video src={activeMedia.source} controls autoPlay /> : <img src={activeMedia.source} alt={activeMedia.name} />}
            <p>{activeMedia.name}</p>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
