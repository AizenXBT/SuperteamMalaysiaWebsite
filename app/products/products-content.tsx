"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LenisProvider } from "@/components/lenis-provider"
import { CustomCursor } from "@/components/custom-cursor"
import { FooterSection } from "@/components/sections/footer-section"
import { 
  ArrowLeft, 
  Search, 
  Twitter, 
  ExternalLink, 
  Layers, 
  Globe,
  Tag,
  Menu,
  ArrowRight
} from "lucide-react"
import Link from "next/link"
import { 
  CommandDialog, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem 
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  Drawer, 
  DrawerContent, 
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle 
} from "@/components/ui/drawer"
import { supabase } from "@/lib/supabase"

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Pillars", href: "/#pillars" },
  { label: "Events", href: "/#events" },
  { label: "Members", href: "/members" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/#projects" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Earn", href: "/#earn" },
  { label: "FAQ", href: "/#faq" },
]

const categories = [
  "All",
  "Analytics",
  "Yield",
  "Vaults",
  "RWA",
  "DeFi",
  "Infrastructure",
  "Gaming"
]

const initialProducts = [
  {
    id: "1",
    name: "Chaindex",
    category: "Analytics",
    description: "Making trading data on Solana easy, fast & cheap ⚔️ built with possibly the youngest dev 😉",
    image_url: "/media/images/project/chaindex.jpg",
    twitter_url: "https://x.com/chaindex_xyz",
    tags: ["Data", "Real-time", "Trading"]
  },
  {
    id: "2",
    name: "Yields",
    category: "Yield",
    description: "Invest in bundled yields, simple & powerful 📈",
    image_url: "/media/images/project/yielddotso.jpg",
    twitter_url: "https://x.com/yieldsdotso",
    tags: ["Yield Aggregator", "Passive Income"]
  },
  {
    id: "3",
    name: "MirrorFi",
    category: "Vaults",
    description: "Copy top yield strategies with permissionless vaults 🪞",
    image_url: "/media/images/project/mirrorfi.jpg",
    twitter_url: "https://x.com/mirrorfi_xyz",
    tags: ["Social Trading", "Vaults"]
  }
]

function ProductCard({ product, index }: { product: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-secondary/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/20 hover:border-iris/30 transition-all flex flex-col"
      data-clickable
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image_url || "/media/images/project/chaindex.jpg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-iris border border-iris/20">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-serif text-foreground group-hover:text-iris transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <a 
              href={product.twitter_url || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a 
              href={product.website_url || product.twitter_url || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
          {product.description}
        </p>

        {product.tags && product.tags.length > 0 && (
          <div className="mt-auto pt-4 flex flex-wrap gap-2 border-t border-border/10">
            {product.tags.map((tag: string) => (
              <span key={tag} className="flex items-center gap-1 text-[10px] text-muted-foreground/80 font-medium">
                <Tag className="w-3 h-3 text-iris/40" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function ProductsContent({ initialData }: { initialData: any[] }) {
  const [open, setOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [search, setSearch] = useState("")
  
  const products = initialData && initialData.length > 0 ? initialData : (initialData?.length === 0 ? [] : initialProducts)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const Logo = () => (
    <Link href="/" className="flex items-center gap-2">
      <span className="font-archivo font-bold text-foreground text-sm md:text-base tracking-tight">
        superteam<span className="text-iris ml-1">🇲🇾</span>
      </span>
    </Link>
  )

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                         p.description?.toLowerCase().includes(search.toLowerCase()) ||
                         p.tags?.some((t: string) => t.toLowerCase().includes(search.toLowerCase()))
    const matchesCategory = activeCategory === "All" || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <LenisProvider>
      <main className="custom-cursor bg-background min-h-screen font-sans">
        <CustomCursor />
        
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput 
            placeholder="Search products, categories, or tags..." 
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No products found.</CommandEmpty>
            <CommandGroup heading="Products">
              {products.map((product) => (
                <CommandItem
                  key={product.id || product.name}
                  onSelect={() => {
                    setSearch(product.name)
                    setOpen(false)
                  }}
                  className="flex items-center gap-2"
                >
                  <Layers className="w-4 h-4" />
                  <span>{product.name}</span>
                  <span className="text-muted-foreground text-xs ml-auto">{product.category}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>

        {/* Header */}
        <nav className="px-6 py-6 flex items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors" data-clickable>
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          
          <Logo />

          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle />
            
            {/* Mobile Hamburger with Bottom Drawer */}
            <div className="md:hidden">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="ghost" size="icon-sm" className="h-9 w-9">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="bg-background/95 backdrop-blur-xl border-t border-border/50 pb-12">
                  <DrawerHeader className="text-center border-b border-border/10 pb-6">
                    <DrawerTitle className="flex justify-center">
                      <Logo />
                    </DrawerTitle>
                  </DrawerHeader>
                  <div className="flex flex-col gap-1 p-6 max-h-[60vh] overflow-y-auto">
                    {navLinks.map((link, i) => (
                      <Link
                        key={i}
                        href={link.href}
                        className="text-xl font-serif text-foreground hover:text-iris transition-colors py-3 text-center"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <div className="mt-6 pt-6 border-t border-border/50">
                      <a
                        href="https://t.me/SuperteamMY"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex bg-iris text-primary-foreground px-6 py-4 rounded-2xl text-lg font-medium hover:bg-iris/90 transition-colors items-center justify-between group"
                      >
                        <span>Join Community</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
            
            <div className="hidden md:block w-4" />
          </div>
        </nav>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-4">
                Product <em className="italic text-iris">Directory</em>
              </h1>
              <p className="text-muted-foreground text-lg">
                Discover the best dApps and tools built by the Superteam Malaysia community.
              </p>
            </motion.div>

            <Button
              variant="outline"
              className="relative w-full md:w-64 justify-start text-muted-foreground h-12 px-4 rounded-xl border-border/50 bg-secondary/50 hover:bg-secondary transition-all"
              onClick={() => setOpen(true)}
              data-clickable
            >
              <Search className="mr-2 h-4 w-4" />
              <span>Search products...</span>
              <Kbd className="absolute right-3 top-1/2 -translate-y-1/2">
                <span className="text-[10px]">⌘</span>K
              </Kbd>
            </Button>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-4 mb-12">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-widest mb-2">
              <Globe className="w-3.5 h-3.5 text-iris" />
              Filter by Category
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                    activeCategory === category
                      ? "bg-iris text-white border-iris shadow-lg shadow-iris/20"
                      : "bg-secondary/50 text-muted-foreground border-border/50 hover:border-iris/30 hover:text-iris"
                  }`}
                  data-clickable
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id || i} product={product} index={i} />
              ))}
            </AnimatePresence>
          </div>

          {filteredProducts.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 bg-secondary/30 rounded-3xl border border-dashed border-border"
            >
              <div className="w-16 h-16 bg-iris/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-iris/40" />
              </div>
              <p className="text-muted-foreground font-medium">No products found matching your search</p>
              <Button 
                variant="link" 
                onClick={() => {setSearch(""); setActiveCategory("All")}}
                className="mt-2 text-iris"
              >
                Clear all filters
              </Button>
            </motion.div>
          )}
        </section>

        <FooterSection />
      </main>
    </LenisProvider>
  )
}
