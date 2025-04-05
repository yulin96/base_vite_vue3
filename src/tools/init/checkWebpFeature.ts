import { supportsWebp } from '@/utils/check'

supportsWebp().then((support) => {
  if (support) document.documentElement.classList.add('webp')
})
