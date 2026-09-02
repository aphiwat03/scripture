import { Language } from '../types'
import { gettingStartedCategory } from './getting-started'
import { architectureCategory } from './architecture'
import { routingCategory } from './routing'
import { fileConventionsCategory } from './file-conventions'
import { dataFetchingCategory } from './data-fetching'
import { componentsCategory } from './components'
import { stylingOptimizationCategory } from './styling-and-optimization'
import { apiConfigCategory } from './api-and-config'
import { functionsCategory } from './functions'
import { deepRenderingCategory } from './deep-rendering'
import { deepDataCategory } from './deep-data'
import { deepActionsCategory } from './deep-actions'
import { deepEcosystemCategory } from './deep-ecosystem'

export const nextjs: Language = {
  id: 'nextjs',
  name: 'Next.js',
  type: 'framework',
  icon: '▲',
  image: '/picture/nextjs.png',
  color: 'gray',
  description: 'React Framework สำหรับสร้างเว็บแอปพลิเคชันแบบ Full-stack',
  categories: [
    gettingStartedCategory,
    architectureCategory,
    routingCategory,
    fileConventionsCategory,
    dataFetchingCategory,
    componentsCategory,
    stylingOptimizationCategory,
    apiConfigCategory,
    functionsCategory,
    deepRenderingCategory,
    deepDataCategory,
    deepActionsCategory,
    deepEcosystemCategory
  ],
}
