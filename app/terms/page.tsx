import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { FooterSection } from "@/components/sections/footer-section"

export const dynamic = 'force-dynamic'

async function getTerms() {
  const { data } = await supabase
    .from('site_content')
    .select('content')
    .eq('key', 'terms_of_service')
    .single()
  return data?.content || { title: "Terms of Service", body: "Please set terms in Admin Dashboard." }
}

export default async function TermsPage() {
  const terms = await getTerms()

  return (
    <main className="bg-background min-h-screen">
      <nav className="px-6 py-6 border-b border-border/40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back Home</span>
          </Link>
          <span className="font-archivo font-bold text-foreground text-sm">
            superteam<span className="text-iris ml-1">🇲🇾</span>
          </span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-5xl md:text-7xl font-serif text-foreground mb-12">{terms.title}</h1>
        <div 
          className="prose prose-invert max-w-none text-muted-foreground leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{ __html: terms.body }}
        />
      </div>
      <FooterSection />
    </main>
  )
}
