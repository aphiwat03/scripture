export interface Parameter {
  name: string
  type: string
  required: boolean
  description: string
}

export interface CodeExample {
  title?: string
  code: string
  language?: string // default: 'javascript'
  output?: string
}

export interface Command {
  id: string // URL slug e.g. "split"
  name: string // Display name e.g. ".split()"
  description: string // Thai description (short, clear)
  syntax: string // Syntax string
  parameters?: Parameter[]
  examples: CodeExample[]
  notes?: string // Thai notes / warnings / comparisons
  seeAlso?: string[] // command IDs
  tags?: string[] // for search
}

export interface Category {
  id: string // URL slug e.g. "array"
  name: string // Display name e.g. "Array"
  icon?: string // emoji
  description: string // Thai description
  commands: Command[]
}

export type TechType = 'language' | 'framework' | 'tool'

export interface Language {
  id: string // URL slug e.g. "javascript"
  name: string // Display name e.g. "JavaScript"
  type: TechType // Language, Framework, or Tool
  icon: string // emoji (fallback)
  image?: string // local image path e.g. "/picture/javascript.png"
  color: string // brand color (Tailwind CSS class fragment e.g. "yellow-400")
  description: string // Thai description
  categories: Category[]
}

export interface SearchResult {
  langId: string
  langName: string
  categoryId: string
  categoryName: string
  commandId: string
  commandName: string
  description: string
  url: string
}
