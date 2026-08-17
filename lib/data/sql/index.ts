import { Language } from '../types'
import { basicCategory } from './basic'
import { dmlCategory } from './dml'
import { ddlCategory } from './ddl'
import { functionsCategory } from './functions'
import { performanceCategory } from './performance'
import { securityCategory } from './security'
import { interviewCategory } from './interview'

export const sqlLanguage: Language = {
  id: 'sql',
  name: 'SQL',
  type: 'language',
  icon: '🗄️',
  color: 'orange',
  description: 'ภาษาคิวรีฐานข้อมูลมาตรฐาน (ANSI‑SQL) พร้อมตัวอย่างเชิงลึก',
  categories: [
    basicCategory,
    dmlCategory,
    ddlCategory,
    functionsCategory,
    performanceCategory,
    securityCategory,
    interviewCategory
  ],
}
