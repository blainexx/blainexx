import { useMemo, useState } from 'react'
import { normalizeMediaFiles, type MediaItem } from './media'

const mediaModules = import.meta.glob<string>('./media/**/*.{AVIF,GIF,JPEG,JPG,MOV,MP4,PNG,SVG,WEBM,WEBP,avif,gif,jpeg,jpg,mov,mp4,png,svg,webm,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
})

const featured = [
  { number: '01', name: 'Signal / Noise', type: 'Identity & motion', hue: 'coral' },
  { number: '02', name: 'After Image', type: 'Editorial system', hue: 'blue' },
  { number: '03', name: 'Good Trouble', type: 'Campaign direction', hue: 'lime' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null)
  const media = useMemo(() => normalizeMediaFiles(mediaModules), [])

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Blaine home">BLAINE<span>XX</span></a>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>
          {menuOpen ? 'Close' : 'Index'} <span>↗</span>
        </button>
        {menuOpen && (
          <nav className="overlay-nav" aria-label="Primary navigation">
            <a href="#work" onClick={() => setMenuOpen(false)}>Selected work</a>
            <a href="#archive" onClick={() => setMenuOpen(false)}>The archive</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="mailto:hello@blainexx.com">Say hello</a>
          </nav>
        )}
      </header>

      <section className="hero" id="top">
        <p className="eyebrow">Independent creative practice<br />Based wherever ideas happen</p>
        <h1>Somewhere<br />between <em>idea</em><br />and <span>impact.</span></h1>
        <div className="hero-bottom">
          <p>Brand worlds, visual systems, and occasional beautiful messes for people with something to say.</p>
          <a href="#work" className="round-link" aria-label="View selected work">↓</a>
        </div>
        <div className="scribble">Not<br />boring.</div>
      </section>

      <section className="marquee" aria-label="Capabilities">
        <div>Art direction <i>✦</i> Design systems <i>✦</i> Brand identities <i>✦</i> Digital experiences <i>✦</i> Art direction <i>✦</i></div>
      </section>

      <section className="work section" id="work">
        <div className="section-head"><span>(01)</span><h2>Selected<br /><em>signals</em></h2><span>2024—now</span></div>
        <div className="featured-grid">
          {featured.map((project) => (
            <article className={`project-card ${project.hue}`} key={project.number}>
              <div className="project-art" aria-hidden="true"><span>{project.number}</span><b>{project.name.slice(0, 1)}</b></div>
              <div className="project-meta"><span>{project.type}</span><h3>{project.name}</h3><span>↗</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="archive section" id="archive">
        <div className="section-head"><span>(02)</span><h2>Open<br /><em>archive</em></h2><span>{media.length.toString().padStart(2, '0')} files</span></div>
        <p className="archive-intro">A living shelf for posters, experiments, frames, and fragments. Drop your files into <code>src/media</code> and they will show up here.</p>
        {media.length > 0 ? (
          <div className="media-grid">
            {media.map((item, index) => (
              <button className={`media-item media-${(index % 5) + 1}`} key={item.source} onClick={() => setActiveMedia(item)} type="button">
                {item.isVideo ? <video src={item.source} muted playsInline preload="metadata" /> : <img src={item.source} alt={item.name} loading="lazy" />}
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="empty-archive"><span>⌁</span><p>Your visual archive starts here.<br />Add an image or video to <code>src/media</code>.</p></div>
        )}
      </section>

      <section className="about section" id="about">
        <span>(03)</span>
        <p>I believe a sharp point of view beats a loud one. I build identities and experiences with enough texture to be remembered.</p>
        <a href="mailto:hello@blainexx.com">Let’s make a mark <span>↗</span></a>
      </section>

      <footer><span>© {new Date().getFullYear()} Blaine</span><span>Made with intent, not templates.</span><a href="#top">Back up ↑</a></footer>

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
