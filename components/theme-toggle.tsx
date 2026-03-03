"use client"

import * as React from "react"
import { Moon, Sun, Monitor, Check } from "lucide-react"
import { useTheme } from "next-themes"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const isMobile = useIsMobile()
  const [open, setOpen] = React.useState(false)

  const themes = [
    { name: "light", icon: Sun, label: "Light" },
    { name: "dark", icon: Moon, label: "Dark" },
    { name: "system", icon: Monitor, label: "System" },
  ]

  const ThemeOptions = () => (
    <div className="grid gap-2 p-4">
      {themes.map((t) => (
        <Button
          key={t.name}
          variant={theme === t.name ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-between h-14 rounded-2xl px-6 text-base font-medium transition-all duration-300",
            theme === t.name ? "bg-iris/10 text-iris ring-1 ring-iris/20" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
          )}
          onClick={() => {
            setTheme(t.name)
            setOpen(false)
          }}
          data-clickable
        >
          <div className="flex items-center gap-4">
            <t.icon className={cn("h-5 w-5", theme === t.name ? "text-iris" : "text-muted-foreground")} />
            {t.label}
          </div>
          {theme === t.name && (
            <div className="bg-iris rounded-full p-1">
              <Check className="h-3 w-3 text-white" />
            </div>
          )}
        </Button>
      ))}
    </div>
  )

  const trigger = (
    <Button variant="ghost" size="icon-sm" className="h-9 w-9 rounded-xl border border-border/10 bg-background/20 backdrop-blur-sm hover:bg-background/40 transition-all" data-clickable>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          {trigger}
        </DrawerTrigger>
        <DrawerContent className="bg-background/95 backdrop-blur-xl border-t border-border/50 pb-8">
          <DrawerHeader className="text-center border-b border-border/10 pb-4">
            <DrawerTitle className="text-lg font-serif">Appearance</DrawerTitle>
          </DrawerHeader>
          <ThemeOptions />
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-background/95 backdrop-blur-xl border border-border/50 rounded-[2.5rem] p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="p-6 pb-2 border-b border-border/10">
          <DialogTitle className="text-2xl font-serif text-center">Appearance</DialogTitle>
        </DialogHeader>
        <div className="pb-4">
          <ThemeOptions />
        </div>
      </DialogContent>
    </Dialog>
  )
}
