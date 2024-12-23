import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import './App.css'
import { ModeToggle } from '@/components/ui/mode-toggle'


function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle />
      <Button>Click me</Button>
    </ThemeProvider>
  )
}

export default App
