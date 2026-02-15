"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { ArrowRight, Lock, Mail, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"

function FallingLEDs() {
  const [leds, setLeds] = useState<any[]>([])

  useEffect(() => {
    const newLeds = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 5}s`,
    }))
    setLeds(newLeds)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {leds.map((led) => (
        <div
          key={led.id}
          className="led-light"
          style={{
            left: led.left,
            "--duration": led.duration,
            animationDelay: led.delay,
          } as any}
        />
      ))}
    </div>
  )
}

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      toast.success("Welcome back, Lead!")
      router.push("/admin/dashboard")
    } catch (error: any) {
      toast.error(error.message || "Invalid credentials")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <FallingLEDs />
      
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-iris/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex justify-center mb-12">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-iris rounded-2xl flex items-center justify-center shadow-lg shadow-iris/20">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <span className="font-archivo font-bold text-foreground text-2xl tracking-tighter">
              superteam<span className="text-iris ml-1">🇲🇾</span>
            </span>
          </motion.div>
        </div>

        <Card className="border-border/40 bg-background/40 backdrop-blur-2xl shadow-2xl overflow-hidden rounded-3xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-iris to-transparent opacity-50" />
          
          <CardHeader className="text-center pt-8">
            <CardTitle className="text-3xl font-serif tracking-tight">Admin Portal</CardTitle>
          </CardHeader>
          
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-5 px-8">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-iris transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@superteam.my"
                    className="pl-10 h-12 bg-secondary/30 border-border/40 rounded-xl focus:ring-iris/20 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" title="Enter password" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-iris transition-colors" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-12 bg-secondary/30 border-border/40 rounded-xl focus:ring-iris/20 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-8">
              <Button 
                type="submit" 
                className="w-full bg-iris hover:bg-iris/90 text-white h-14 rounded-2xl text-base font-semibold group shadow-lg shadow-iris/20 transition-all active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </div>
                ) : (
                  <>
                    Enter Dashboard
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <p className="text-center mt-8 text-sm text-muted-foreground/40">
          Superteam Malaysia Ecosystem Management
        </p>
      </motion.div>
    </div>
  )
}
