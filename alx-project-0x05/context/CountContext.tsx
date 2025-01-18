import { createContext, useContext, useState, ReactNode } from 'react'

// ['increment: () => void;', 'decrement: () => void;']

interface CountContextProps {
  increment: () => void
  decrement: () => void
  count: number
}

export const CountContext = createContext<CountContextProps | undefined>(
  undefined
)

export const CountProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState<number>(0)

  const increment = () => setCount((count) => count + 1)
  const decrement = () => setCount((count) => (count > 0 ? count - 1 : 0))

  return (
    <CountContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CountContext.Provider>
  )
}

export const useCount = () => {
  const context = useContext(CountContext)

  if (!context) {
    throw new Error('useCount must be within a Count Provider')
  }

  return context
}