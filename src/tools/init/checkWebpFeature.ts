import { checkWebpFeature } from '@/utils/checkWebpFeature'

checkWebpFeature((_, result) => {
  if (result) document.documentElement.classList.add('webp')
}, 'lossless')
