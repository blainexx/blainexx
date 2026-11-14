export type MediaItem = {
  name: string
  source: string
  isVideo: boolean
}

const imageExtensions = new Set(['avif', 'gif', 'jpeg', 'jpg', 'png', 'svg', 'webp'])
const videoExtensions = new Set(['mov', 'mp4', 'webm'])

function fileNameFromPath(path: string) {
  return path.split(/[\\/]/).pop()!
}

function extensionFromPath(path: string) {
  const fileName = fileNameFromPath(path)
  const extensionIndex = fileName.lastIndexOf('.')
  return extensionIndex === -1 ? '' : fileName.slice(extensionIndex + 1).toLowerCase()
}

function titleFromPath(path: string) {
  const fileName = fileNameFromPath(path)
  const extension = extensionFromPath(path)
  const name = fileName.slice(0, -(extension.length + 1))
  return name.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim() || 'Untitled'
}

export function normalizeMediaFiles(files: Record<string, string>): MediaItem[] {
  return Object.entries(files)
    .flatMap(([path, source]) => {
      const extension = extensionFromPath(path)
      const isImage = imageExtensions.has(extension)
      const isVideo = videoExtensions.has(extension)

      return isImage || isVideo ? [{ name: titleFromPath(path), source, isVideo }] : []
    })
    .sort((first, second) => first.name.localeCompare(second.name))
}
