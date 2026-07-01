"use client"

import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  // On mount, read saved preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("ai-interviewer-theme")
    if (savedTheme === "dark") {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    } else {
      setDarkMode(false)
      document.documentElement.classList.remove("dark")
    }
    setMounted(true)
  }, [])

  // Whenever darkMode changes (after mount), update DOM and localStorage
  useEffect(() => {
    if (!mounted) return
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("ai-interviewer-theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("ai-interviewer-theme", "light")
    }
  }, [darkMode, mounted])

  const toggleDarkMode = () => setDarkMode((prev) => !prev)

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used within ThemeProvider")
  return context
}
