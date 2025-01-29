'use client'
import { createContext, useContext } from "react"

const DictionaryContext = createContext()

export default function DictionaryProvider({
  t,
  children,
}) {
  return (
    <DictionaryContext.Provider value={t}>
      {children}
    </DictionaryContext.Provider>
  )
}

export function useDictionary() {
  const t = useContext(DictionaryContext)
  if (t === null) {
    throw new Error('useDictionary hook must be used within DictionaryProvider')
  }

  return t
}