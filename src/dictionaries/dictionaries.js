import { i18n } from '@/middleware'
import 'server-only'
 
const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  tr: () => import('@/dictionaries/tr.json').then((module) => module.default),
  de: () => import('@/dictionaries/de.json').then((module) => module.default),
  no: () => import('@/dictionaries/no.json').then((module) => module.default),
  fr: () => import('@/dictionaries/fr.json').then((module) => module.default),
}
 
export const getDictionary = async (locale) => dictionaries[i18n.locales.includes(locale) ? locale : i18n.defaultLocale]()

