import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import './App.css'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { LoginForm } from './components/login-form'
import LoginPage from './app/login/page'


function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <LoginPage />
      {/* <ModeToggle />
      <Button>Click me</Button> */}
    </ThemeProvider>
  )
}

export default App
