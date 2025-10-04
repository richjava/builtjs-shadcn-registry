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

interface DesignSystem {
  name: string
  label: string
  description: string
}

interface DesignSystemSelectorProps {
  designSystems: DesignSystem[]
  selectedDesignSystem: string
  onDesignSystemChange: (designSystem: string) => void
}

export default function DesignSystemSelector({ designSystems, selectedDesignSystem, onDesignSystemChange }: DesignSystemSelectorProps) {
  const [open, setOpen] = useState(false)
  
  const currentDesignSystem = designSystems.find(designSystem => designSystem.name === selectedDesignSystem) || designSystems[0]

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="h-4 w-4" />
          {currentDesignSystem?.label || "Design System"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {designSystems.map((designSystem) => (
          <DropdownMenuItem
            key={designSystem.name}
            onClick={() => {
              onDesignSystemChange(designSystem.name)
              setOpen(false)
            }}
            className="flex items-center justify-between"
          >
            <div className="flex flex-col">
              <span className="font-medium">{designSystem.label}</span>
              <span className="text-xs text-muted-foreground">{designSystem.description}</span>
            </div>
            {selectedDesignSystem === designSystem.name && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
