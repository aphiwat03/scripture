import { Language } from '../types'
import { routingCategory } from './routing'
import { fileConventionsCategory } from './file-conventions'
import { componentsCategory } from './components'
import { functionsCategory } from './functions'

export const nextjs: Language = {
  id: 'nextjs',
  name: 'Next.js',
  type: 'framework',
  icon: '▲',
  image: '/picture/nextjs.png',
  color: 'gray',
  description: 'React Framework สำหรับสร้างเว็บแอปพลิเคชันแบบ Full-stack',
  categories: [routingCategory, fileConventionsCategory, componentsCategory, functionsCategory],
}
