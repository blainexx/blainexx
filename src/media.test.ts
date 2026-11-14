import { describe, expect, it } from 'vitest'
import { normalizeMediaFiles } from './media'

describe('normalizeMediaFiles', () => {
  it('keeps supported image and video files regardless of extension casing', () => {
    const media = normalizeMediaFiles({
      './media/poster.PNG': '/poster.png',
      './media/reel.Mp4': '/reel.mp4',
      './media/notes.txt': '/notes.txt',
      './media/untitled': '/untitled',
    })

    expect(media).toEqual([
      { name: 'poster', source: '/poster.png', isVideo: false },
      { name: 'reel', source: '/reel.mp4', isVideo: true },
    ])
  })

  it('normalizes nested paths and display names without changing source URLs', () => {
    const media = normalizeMediaFiles({
      './media/campaigns/[CAS]_Ghost-in_the-Shell__Screening.PNG': '/ghost.png',
    })

    expect(media).toEqual([
      { name: '[CAS] Ghost in the Shell Screening', source: '/ghost.png', isVideo: false },
    ])
  })

  it('sorts normalized media names and supplies a title for blank names', () => {
    const media = normalizeMediaFiles({
      './media/zebra.webp': '/zebra.webp',
      './media/.png': '/blank.png',
      './media/alpha.svg': '/alpha.svg',
    })

    expect(media.map(({ name }) => name)).toEqual(['alpha', 'Untitled', 'zebra'])
  })
})
