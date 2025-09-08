"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Check, Palette } from "lucide-react"

interface Theme {
  name: string
  label: string
  description: string
}

interface ThemeSelectorProps {
  themes: Theme[]
  selectedTheme: string
  onThemeChange: (theme: string) => void
}

export default function ThemeSelector({ themes, selectedTheme, onThemeChange }: ThemeSelectorProps) {
  const [open, setOpen] = useState(false)
  
  const currentTheme = themes.find(theme => theme.name === selectedTheme) || themes[0]

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="h-4 w-4" />
          {currentTheme?.label || "Theme"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.name}
            onClick={() => {
              onThemeChange(theme.name)
              setOpen(false)
            }}
            className="flex items-center justify-between"
          >
            <div className="flex flex-col">
              <span className="font-medium">{theme.label}</span>
              <span className="text-xs text-muted-foreground">{theme.description}</span>
            </div>
            {selectedTheme === theme.name && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
