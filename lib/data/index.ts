import { Language, SearchResult } from './types'
import { javascript } from './javascript'
import { nextjs } from './nextjs'
import { nestjsLanguage } from './nestjs'
import { typescript } from './typescript'
import { csharp } from './csharp'
import { zustandLanguage } from './zustand'
import { redisLanguage } from './redis'
import { reactLanguage } from './react'
import { prismaLanguage } from './prisma'
import { postgresqlLanguage } from './postgresql'
import { mysqlLanguage } from './mysql'
import { databaseLanguage } from './database'
import { sqlLanguage } from './sql'
import { dotnetLanguage } from './dotnet'

// รายชื่อภาษาทั้งหมดในแอป เรียงตาม Language -> Framework -> Tool
export const languages: Language[] = [csharp, javascript, typescript, sqlLanguage, databaseLanguage, reactLanguage, nextjs, nestjsLanguage, dotnetLanguage, zustandLanguage, redisLanguage, prismaLanguage, postgresqlLanguage, mysqlLanguage]

// Helper: หา language จาก id
export function getLanguage(langId: string): Language | undefined {
  return languages.find(lang => lang.id === langId)
}

// Helper: หา category จาก langId + categoryId
export function getCategory(langId: string, categoryId: string) {
  const lang = getLanguage(langId)
  return lang?.categories.find(cat => cat.id === categoryId)
}

// Helper: หา command จาก langId + categoryId + commandId
export function getCommand(langId: string, categoryId: string, commandId: string) {
  const cat = getCategory(langId, categoryId)
  return cat?.commands.find(cmd => cmd.id === commandId)
}

// สร้าง flat search index จากทุกภาษา
export function buildSearchIndex(): SearchResult[] {
  const index: SearchResult[] = []
  for (const lang of languages) {
    for (const cat of lang.categories) {
      for (const cmd of cat.commands) {
        index.push({
          langId: lang.id,
          langName: lang.name,
          categoryId: cat.id,
          categoryName: cat.name,
          commandId: cmd.id,
          commandName: cmd.name,
          description: cmd.description,
          url: `/docs/${lang.id}/${cat.id}/${cmd.id}`,
        })
      }
    }
  }
  return index
}

// Pre-built search index (ใช้ใน server component ส่งให้ SearchBar)
export const searchIndex = buildSearchIndex()
