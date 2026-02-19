"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { 
  Users, Layers, Calendar, Handshake, Layout, Plus, LogOut, Trash2, Edit, Save, X, Search,
  ExternalLink, Globe, Tag as TagIcon, Code, Award, Check, ChevronsUpDown, ChevronLeft,
  ChevronRight, Link as LinkIcon, MapPin, Clock, Briefcase, Trophy, Type, Upload,
  Loader2, Image as ImageIcon, MessageSquare, HelpCircle, Mail, Radio, Settings2,
  FileText, TrendingUp, DollarSign, Eye, RefreshCw, ShieldCheck
} from "lucide-react"
import { uploadImage } from "@/app/actions/cloudinary"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput as CommandInputPrimitive, CommandItem, CommandList } from "@/components/ui/command"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

// --- Global UI Components ---

function AdminLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="loader"></div>
      <p className="mt-6 text-iris font-serif italic animate-pulse text-lg tracking-wide">Syncing...</p>
    </div>
  )
}

function ViewModal({ title, content, isOpen, onClose }: { title: string, content: string, isOpen: boolean, onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background border-border/40 sm:max-w-2xl rounded-[2rem] shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">{title}</DialogTitle>
        </DialogHeader>
        <div className="py-6 max-h-[60vh] overflow-y-auto custom-scrollbar pr-4">
          <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {content}
          </p>
        </div>
        <div className="flex justify-end">
          <Button onClick={onClose} className="rounded-xl bg-iris text-white">Close Preview</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function FormGroup({ label, icon, children }: { label: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] font-black text-muted-foreground ml-1">
        <div className="text-iris opacity-60">{icon}</div>
        {label}
      </Label>
      {children}
    </div>
  )
}

function TagInput({ tags, setTags, placeholder = "Add item..." }: { tags: string[], setTags: (tags: string[]) => void, placeholder?: string }) {
  const [input, setInput] = useState("")
  const addTag = () => {
    const trimmed = input.trim()
    if (trimmed && !tags.includes(trimmed)) { setTags([...tags, trimmed]); setInput(""); }
  }
  const removeTag = (tagToRemove: string) => { setTags(tags.filter(t => t !== tagToRemove)); }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {tags.map(tag => (
            <motion.span key={tag} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="inline-flex items-center gap-1.5 bg-iris/10 text-iris px-3 py-1.5 rounded-xl text-xs font-semibold border border-iris/20 shadow-sm">
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="hover:text-destructive transition-colors"><X className="w-3.5 h-3.5" /></button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
      <div className="relative flex gap-2">
        <Input placeholder={placeholder} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }} className="bg-secondary/30 border-border/40 h-11 rounded-xl focus:ring-iris/20 flex-1" />
        <Button type="button" onClick={addTag} variant="secondary" className="h-11 w-11 rounded-xl bg-iris/10 border border-iris/20 text-iris hover:bg-iris hover:text-white transition-all"><Plus className="w-5 h-5" /></Button>
      </div>
    </div>
  )
}

function ImageUpload({ value, onChange, label = "Upload Image" }: { value: string, onChange: (val: string) => void, label?: string }) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setIsUploading(true); const formData = new FormData(); formData.append("file", file);
    try { const url = await uploadImage(formData); onChange(url as string); toast.success("Uploaded!"); }
    catch (error) { toast.error("Upload failed"); }
    finally { setIsUploading(false); }
  }

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border/40 group">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button type="button" variant="secondary" size="sm" className="rounded-xl" onClick={() => fileInputRef.current?.click()}>Change</Button>
            <Button type="button" variant="destructive" size="sm" className="rounded-xl" onClick={() => onChange("")}>Remove</Button>
          </div>
        </div>
      ) : (
        <Button type="button" variant="outline" className="w-full h-32 border-dashed border-2 border-border/40 rounded-2xl bg-secondary/10 hover:bg-secondary/20 flex flex-col gap-2" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
          {isUploading ? <Loader2 className="w-8 h-8 animate-spin text-iris" /> : <Upload className="w-8 h-8 text-muted-foreground" />}
          <span className="text-sm font-medium text-muted-foreground">{isUploading ? "Uploading..." : label}</span>
        </Button>
      )}
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
    </div>
  )
}

const TABS = [
  { id: "members", label: "Members", icon: Users },
  { id: "projects", label: "Projects", icon: Layers },
  { id: "events", label: "Events", icon: Calendar },
  { id: "partners", label: "Partners", icon: Handshake },
  { id: "site", label: "Site", icon: Layout },
]

const presetRoles = [
  "Rust Developer", "Frontend Developer", "Fullstack Developer", "UI/UX Designer",
  "Graphic Designer", "Content Creator", "Writer", "Growth Marketer",
  "Product Manager", "Community Manager", "Chapter Lead", "Core Team"
]

function RoleSelector({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const [open, setOpen] = useState(false); const [searchValue, setSearchValue] = useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between bg-secondary/30 border-border/40 font-normal h-11 rounded-xl">
          <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-muted-foreground" />{value || "Select or type role..."}</div>
          <Check className={cn("ml-2 h-4 w-4 shrink-0 opacity-50", value ? "opacity-100" : "opacity-0")} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 border-border/40 rounded-xl overflow-hidden" align="start">
        <Command className="bg-background">
          <CommandInputPrimitive placeholder="Search or type custom role..." onValueChange={setSearchValue} className="h-11" />
          <CommandList className="max-h-[200px] custom-scrollbar">
            <CommandEmpty className="p-2">
              <Button variant="ghost" className="w-full justify-start text-xs h-9 rounded-lg" onClick={() => { onChange(searchValue); setOpen(false); }}>
                <Plus className="w-3.5 h-3.5 mr-2" /> Use custom: "{searchValue}"
              </Button>
            </CommandEmpty>
            <CommandGroup heading="Role Suggestions">
              {presetRoles.map((role) => (
                <CommandItem key={role} value={role} onSelect={(currentValue) => { onChange(currentValue === value ? "" : currentValue); setOpen(false); }} className="flex items-center gap-2 cursor-pointer py-3">
                  <Check className={cn("h-4 w-4 text-iris", value === role ? "opacity-100" : "opacity-0")} />{role}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

// --- Main Dashboard ---

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState("members")
  const [isLoading, setIsLoading] = useState(true)
  const [isSectionLoading, setIsSectionLoading] = useState(false)
  const [editingView, setEditingView] = useState<string | null>(null)
  const [editingData, setEditingData] = useState<any>(null)
  
  // View Modal State
  const [viewModalData, setViewModalData] = useState<{ title: string, content: string } | null>(null)

  const [data, setData] = useState<any>({
    members: [], projects: [], events: [], partners: [], testimonials: [], faqs: [], inquiries: [], settings: []
  })
  
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) router.push("/admin")
      else { setIsAuthenticated(true); fetchAllData(); }
      setIsLoading(false)
    }
    checkUser()
  }, [router])

  const fetchAllData = async () => {
    setIsSectionLoading(true)
    const [m, pr, ev, pa, t, f, i, s] = await Promise.all([
      supabase.from('members').select('*').order('created_at', { ascending: false }),
      supabase.from('projects').select('*').order('created_at', { ascending: false }),
      supabase.from('events').select('*').order('date', { ascending: false }),
      supabase.from('partners').select('*').order('display_order', { ascending: true }),
      supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
      supabase.from('faqs').select('*').order('display_order', { ascending: true }),
      supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
      supabase.from('site_content').select('*')
    ])
    setData({ members: m.data || [], projects: pr.data || [], events: ev.data || [], partners: pa.data || [], testimonials: t.data || [], faqs: f.data || [], inquiries: i.data || [], settings: s.data || [] })
    setIsSectionLoading(false)
  }

  const tabIndex = TABS.findIndex(t => t.id === activeTab)
  const handlePrevTab = () => { if (tabIndex > 0) setActiveTab(TABS[tabIndex - 1].id) }
  const handleNextTab = () => { if (tabIndex < TABS.length - 1) setActiveTab(TABS[tabIndex + 1].id) }
  const handleLogout = async () => { await supabase.auth.signOut(); router.push("/admin"); }

  if (isLoading || !isAuthenticated) return <div className="min-h-screen bg-background flex items-center justify-center p-6"><AdminLoader /></div>

  // --- Specialized Editing Screen ---
  if (editingView) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans flex flex-col items-center">
        <header className="w-full border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-center text-center">
          <div className="max-w-4xl w-full flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => { setEditingView(null); setEditingData(null); }} className="rounded-xl px-4">
              <ChevronLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <div className="font-archivo font-bold text-lg flex-1 text-center">
              <span className="text-iris capitalize">{editingView.replace(/_/g, ' ')}</span>
            </div>
            <div className="w-20 hidden md:block" />
          </div>
        </header>
        <main className="max-w-4xl w-full px-6 py-12 flex flex-col items-center">
          <div className="w-full max-w-2xl">
            <EditScreenComponent 
              key={`${editingView}-${editingData?.id || 'new'}`}
              view={editingView} 
              data={editingData} 
              fullData={data}
              onNavigate={(v, d) => { setEditingView(v); setEditingData(d); }}
              onView={(title, content) => setViewModalData({ title, content })}
              onSuccess={() => { fetchAllData(); setEditingView(null); setEditingData(null); }} 
              onCancel={() => { setEditingView(null); setEditingData(null); }}
            />
          </div>
        </main>
        {viewModalData && <ViewModal title={viewModalData.title} content={viewModalData.content} isOpen={!!viewModalData} onClose={() => setViewModalData(null)} />}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col items-center">
      <header className="w-full border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-center">
        <div className="max-w-7xl w-full flex items-center justify-between">
          <Link href="/" className="font-archivo font-bold text-lg hover:opacity-80 transition-opacity">
            superteam<span className="text-iris ml-1">🇲🇾</span>
            <span className="ml-2 px-2 py-0.5 bg-iris/10 text-iris text-[10px] uppercase tracking-widest rounded-full font-sans">Admin</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive rounded-xl">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl w-full px-6 py-12 pb-32 flex flex-col items-center text-center">
        <div className="w-full max-w-5xl mb-12">
          <h1 className="text-4xl md:text-5xl font-serif mb-3 tracking-tight text-center">Ecosystem <em className="italic text-iris">Management</em></h1>
          <p className="text-muted-foreground text-lg opacity-60 text-center">Control center for Superteam Malaysia assets.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col items-center space-y-10">
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-fit">
            <div className="lg:hidden flex items-center justify-between bg-background/80 backdrop-blur-2xl border border-border/40 rounded-2xl p-2 shadow-2xl">
              <Button variant="ghost" size="icon" onClick={handlePrevTab} disabled={tabIndex === 0} className="rounded-xl h-12 w-12"><ChevronLeft className="w-5 h-5" /></Button>
              <div className="flex flex-col items-center px-8 min-w-[140px]"><span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-0.5 opacity-40 text-center w-full tracking-tighter">Navigation</span><div className="flex items-center gap-2 text-iris font-semibold tracking-tight">{React.createElement(TABS[tabIndex].icon, { className: "w-4 h-4" })} {TABS[tabIndex].label}</div></div>
              <Button variant="ghost" size="icon" onClick={handleNextTab} disabled={tabIndex === TABS.length - 1} className="rounded-xl h-12 w-12"><ChevronRight className="w-5 h-5" /></Button>
            </div>
            <div className="hidden lg:block overflow-x-auto max-w-screen-xl mx-auto no-scrollbar">
              <TabsList className="bg-background/80 backdrop-blur-2xl border border-border/40 p-1.5 h-16 rounded-3xl flex gap-1.5 shadow-2xl">
                {TABS.map(tab => (
                  <TabsTrigger key={tab.id} value={tab.id} className="data-[state=active]:bg-iris data-[state=active]:text-white data-[state=active]:shadow-lg rounded-2xl px-6 h-full gap-2 transition-all text-xs font-bold uppercase tracking-wider">
                    <tab.icon className="w-4 h-4" /> {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isSectionLoading ? <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex justify-center"><AdminLoader /></motion.div> : (
              <motion.div key={activeTab} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-5xl flex flex-col items-center">
                
                <TabsContent value="members" className="mt-0 space-y-8 w-full">
                  <SectionHeader title="Meet the members" desc="Manage builders directory." action={<Button className="bg-iris rounded-2xl h-12 px-6 text-white" onClick={() => { setEditingData({}); setEditingView('member'); }}><Plus className="w-4 h-4 mr-2" /> Add Member</Button>} />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.members.map((m: any) => <AdminCard key={m.id} title={m.name} subtitle={m.role} image={m.photo_url} onEdit={() => { setEditingData(m); setEditingView('member'); }} onDelete={() => handleDelete('members', m.id, fetchAllData)} />)}
                  </div>
                </TabsContent>

                <TabsContent value="projects" className="mt-0 space-y-8 w-full">
                  <SectionHeader title="Our members are building..." desc="Showcase ecosystem dApps." action={<Button className="bg-iris rounded-2xl h-12 px-6 text-white" onClick={() => { setEditingData({}); setEditingView('project'); }}><Plus className="w-4 h-4 mr-2" /> Add Project</Button>} />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.projects.map((p: any) => <AdminCard key={p.id} title={p.name} subtitle={p.category} image={p.image_url} onEdit={() => { setEditingData(p); setEditingView('project'); }} onDelete={() => handleDelete('projects', p.id, fetchAllData)} />)}
                  </div>
                </TabsContent>

                <TabsContent value="events" className="mt-0 space-y-8 w-full">
                  <SectionHeader title="What's happening" desc="Manage community happenings." action={<Button className="bg-iris rounded-2xl h-12 px-6 text-white" onClick={() => { setEditingData({}); setEditingView('event'); }}><Plus className="w-4 h-4 mr-2" /> Add Event</Button>} />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.events.map((e: any) => <AdminCard key={e.id} title={e.title} subtitle={`${e.date} • ${e.status}`} image={e.image_url} onEdit={() => { setEditingData(e); setEditingView('event'); }} onDelete={() => handleDelete('events', e.id, fetchAllData)} />)}
                  </div>
                </TabsContent>

                <TabsContent value="partners" className="mt-0 space-y-8 w-full">
                  <SectionHeader title="Powered by our partners" desc="Manage ecosystem logos." action={<Button className="bg-iris rounded-2xl h-12 px-6 text-white" onClick={() => { setEditingData({}); setEditingView('partner'); }}><Plus className="w-4 h-4 mr-2" /> Add Partner</Button>} />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.partners.map((p: any) => <AdminCard key={p.id} title={p.name} subtitle="Partner" image={p.logo_url} onEdit={() => { setEditingData(p); setEditingView('partner'); }} onDelete={() => handleDelete('partners', p.id, fetchAllData)} />)}
                  </div>
                </TabsContent>

                <TabsContent value="site" className="mt-0 space-y-8 w-full">
                  <SectionHeader title="Website Content" desc="Manage global values and specific section content." action={null} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <SettingTriggerCard title="Wall of Love" desc="Manage community testimonials." icon={<MessageSquare className="w-5 h-5 text-iris" />} onClick={() => setEditingView('testimonials_list')} />
                    <SettingTriggerCard title="Frequently Asked Questions" desc="Manage section accordion." icon={<HelpCircle className="w-5 h-5 text-iris" />} onClick={() => setEditingView('faqs_list')} />
                    <SettingTriggerCard title="Luma Live Feed" desc="Configure calendar embed URL." icon={<Radio className="w-5 h-5 text-iris" />} onClick={() => setEditingView('luma')} />
                    <SettingTriggerCard title="Impact Metrics" desc="Manage counts and values." icon={<TrendingUp className="w-5 h-5 text-iris" />} onClick={() => setEditingView('stats')} />
                    <SettingTriggerCard title="Manifesto Visuals" desc="Manage carousel and corner images." icon={<ImageIcon className="w-5 h-5 text-iris" />} onClick={() => setEditingView('manifesto_visuals')} />
                    <SettingTriggerCard title="Contact Submissions" desc="View form messages." icon={<Mail className="w-5 h-5 text-iris" />} onClick={() => setEditingView('inquiries')} />
                    <SettingTriggerCard title="Privacy Policy" desc="Update your privacy terms." icon={<ShieldCheck className="w-5 h-5 text-iris" />} onClick={() => { setEditingData({}); setEditingView('privacy'); }} />
                    <SettingTriggerCard title="Terms of Service" desc="Update your site terms." icon={<FileText className="w-5 h-5 text-iris" />} onClick={() => { setEditingData({}); setEditingView('terms'); }} />
                  </div>
                </TabsContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Tabs>
      </main>
    </div>
  )
}

// --- Dynamic Editing Components ---

function EditScreenComponent({ view, data, fullData, onNavigate, onView, onSuccess, onCancel }: { view: string, data: any, fullData: any, onNavigate: (v: string, d: any) => void, onView: (t: string, c: string) => void, onSuccess: () => void, onCancel: () => void }) {
  const [isSaving, setIsSaving] = useState(false)
  const [skillTags, setSkillTags] = useState<string[]>(data?.skills || [])
  const [achievementTags, setAchievementTags] = useState<string[]>(data?.achievements || [])
  const [projectTags, setProjectTags] = useState<string[]>(data?.projects || [])
  const [formData, setFormData] = useState<any>(data || {})

  // Initial Fetch for singletons
  useEffect(() => {
    if (view === 'manifesto_visuals') {
      const settings = fullData.settings.find((s: any) => s.key === 'manifesto_visuals')
      if (settings?.content) setFormData(settings.content)
    }
    if (view === 'stats') {
      const settings = fullData.settings.find((s: any) => s.key === 'site_stats')
      if (settings?.content) setFormData(settings.content)
    }
    if (view === 'luma') {
      const settings = fullData.settings.find((s: any) => s.key === 'luma_settings')
      if (settings?.content) setFormData(settings.content)
    }
    if (view === 'privacy') {
      const settings = fullData.settings.find((s: any) => s.key === 'privacy_policy')
      if (settings?.content) setFormData(settings.content)
    }
    if (view === 'terms') {
      const settings = fullData.settings.find((s: any) => s.key === 'terms_of_service')
      if (settings?.content) setFormData(settings.content)
    }
  }, [view, fullData])

  // Specialized Lists
  if (view === 'testimonials_list') {
    return (
      <div className="space-y-6 w-full text-left">
        <SectionHeader title="Wall of Love" desc="Community testimonials." action={<Button className="bg-iris rounded-xl h-10 px-4 text-white" onClick={() => onNavigate('testimonial_form', {})}><Plus className="w-4 h-4 mr-2" /> Add Tweet</Button>} />
        <div className="grid grid-cols-1 gap-4 mt-8">
          {fullData.testimonials.map((t: any) => (
            <AdminCard key={t.id} title={t.name} subtitle={t.handle} onDelete={() => handleDelete('testimonials', t.id, onSuccess)} onEdit={() => onNavigate('testimonial_form', t)} onView={() => onView(t.name, t.content)} icon={<MessageSquare className="w-4 h-4" />} />
          ))}
        </div>
      </div>
    )
  }

  if (view === 'faqs_list') {
    return (
      <div className="space-y-6 w-full text-left">
        <SectionHeader title="Frequently Asked Questions" desc="Manage accordion questions." action={<Button className="bg-iris rounded-xl h-10 px-4 text-white" onClick={() => onNavigate('faq_form', {})}><Plus className="w-4 h-4 mr-2" /> Add FAQ</Button>} />
        <div className="grid grid-cols-1 gap-4 mt-8">
          {fullData.faqs.map((f: any) => (
            <AdminCard key={f.id} title={f.question} subtitle={`Order: ${f.display_order}`} onDelete={() => handleDelete('faqs', f.id, onSuccess)} onEdit={() => onNavigate('faq_form', f)} onView={() => onView(f.question, f.answer)} icon={<HelpCircle className="w-4 h-4" />} />
          ))}
        </div>
      </div>
    )
  }

  if (view === 'inquiries') {
    return (
      <div className="space-y-6 w-full text-left">
        <SectionHeader title="Contact Submissions" desc="User form messages." action={null} />
        <div className="space-y-4 mt-8">
          {fullData.inquiries.map((i: any) => (
            <Card key={i.id} className="bg-secondary/20 border-border/40 rounded-[1.5rem] text-left">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-iris/10 flex items-center justify-center text-iris"><Mail className="w-5 h-5" /></div>
                  <div><p className="font-bold">{i.email}</p><p className="text-[10px] text-muted-foreground uppercase font-black">{new Date(i.created_at).toLocaleString()}</p></div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => onView("Inquiry Email", i.email)}><Eye className="w-4 h-4" /></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setIsSaving(true)
    let table = ""
    let payload = { ...formData }
    
    if (view === 'member') { table = 'members'; payload.skills = skillTags; payload.achievements = achievementTags; payload.projects = projectTags; }
    else if (view === 'project') { table = 'projects'; }
    else if (view === 'event') { table = 'events'; }
    else if (view === 'partner') { table = 'partners'; }
    else if (view === 'testimonial_form') { table = 'testimonials'; }
    else if (view === 'faq_form') { table = 'faqs'; }
    else {
      // Handle singletons in site_content
      const key = view === 'luma' ? 'luma_settings' : 
                  view === 'stats' ? 'site_stats' : 
                  view === 'manifesto_visuals' ? 'manifesto_visuals' :
                  view === 'privacy' ? 'privacy_policy' : 'terms_of_service';
      
      // Add title to payload for legal pages
      if (view === 'privacy') payload.title = "Privacy Policy"
      if (view === 'terms') payload.title = "Terms of Service"
      
      const { error } = await supabase.from('site_content').upsert({ key, content: payload, updated_at: new Date().toISOString() })
      if (!error) { toast.success("Saved!"); onSuccess(); } else { toast.error("Error"); }
      setIsSaving(false); return;
    }

    const { error } = data?.id ? await supabase.from(table).update(payload).eq('id', data.id) : await supabase.from(table).insert([payload])
    if (!error) { toast.success("Success!"); onSuccess(); } else { toast.error("Error saving"); }
    setIsSaving(false)
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24 text-left">
      {view === 'member' && (
        <div className="space-y-6">
          <FormGroup label="Profile Photo" icon={<ImageIcon className="w-4 h-4" />}><ImageUpload value={formData.photo_url || ""} onChange={url => setFormData({...formData, photo_url: url})} label="Upload Avatar" /></FormGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormGroup label="Full Name" icon={<Type className="w-4 h-4" />}><Input value={formData.name || ""} onChange={e => setFormData({...formData, name: e.target.value})} required className="bg-secondary/30 h-12 rounded-xl" /></FormGroup>
            <FormGroup label="Role" icon={<Briefcase className="w-4 h-4" />}><RoleSelector value={formData.role || ""} onChange={val => setFormData({...formData, role: val})} /></FormGroup>
          </div>
          <FormGroup label="Twitter" icon={<LinkIcon className="w-4 h-4" />}><Input placeholder="@username" value={formData.twitter || ""} onChange={e => setFormData({...formData, twitter: e.target.value})} className="bg-secondary/30 h-12 rounded-xl" /></FormGroup>
          <FormGroup label="Skills" icon={<Code className="w-4 h-4" />}><TagInput tags={skillTags} setTags={setSkillTags} placeholder="Add skill..." /></FormGroup>
          <FormGroup label="Achievements" icon={<Trophy className="w-4 h-4" />}><TagInput tags={achievementTags} setTags={setAchievementTags} placeholder="Add achievement..." /></FormGroup>
          <FormGroup label="Projects Built" icon={<Layers className="w-4 h-4" />}><TagInput tags={projectTags} setTags={setProjectTags} placeholder="Add project..." /></FormGroup>
          <FormGroup label="Bio" icon={<Type className="w-4 h-4" />}><Input value={formData.bio || ""} onChange={e => setFormData({...formData, bio: e.target.value})} className="bg-secondary/30 h-12 rounded-xl" /></FormGroup>
        </div>
      )}

      {(view === 'privacy' || view === 'terms') && (
        <div className="space-y-6">
          <FormGroup label="Page Content (Markdown / HTML supported)" icon={<FileText className="w-4 h-4" />}><Textarea value={formData.body || ""} onChange={e => setFormData({...formData, body: e.target.value})} className="bg-secondary/30 min-h-[400px] rounded-[1.5rem] border-border/40 p-6 leading-relaxed" placeholder="Enter policy text..." /></FormGroup>
        </div>
      )}

      {view === 'testimonial_form' && (
        <div className="space-y-6">
          <FormGroup label="Author Name" icon={<Type className="w-4 h-4" />}><Input value={formData.name || ""} onChange={e => setFormData({...formData, name: e.target.value})} required className="bg-secondary/30 h-12 rounded-xl" /></FormGroup>
          <FormGroup label="Handle" icon={<LinkIcon className="w-4 h-4" />}><Input placeholder="@username" value={formData.handle || ""} onChange={e => setFormData({...formData, handle: e.target.value})} required className="bg-secondary/30 h-12 rounded-xl" /></FormGroup>
          <FormGroup label="Tweet ID" icon={<LinkIcon className="w-4 h-4" />}><Input placeholder="Optional" value={formData.tweet_id || ""} onChange={e => setFormData({...formData, tweet_id: e.target.value})} className="bg-secondary/30 h-12 rounded-xl" /></FormGroup>
          <FormGroup label="Testimonial Content" icon={<Type className="w-4 h-4" />}><Textarea value={formData.content || ""} onChange={e => setFormData({...formData, content: e.target.value})} required className="bg-secondary/30 min-h-[150px] rounded-xl" /></FormGroup>
        </div>
      )}

      {view === 'faq_form' && (
        <div className="space-y-6">
          <FormGroup label="Question" icon={<HelpCircle className="w-4 h-4" />}><Input value={formData.question || ""} onChange={e => setFormData({...formData, question: e.target.value})} required className="bg-secondary/30 h-12 rounded-xl" /></FormGroup>
          <FormGroup label="Answer" icon={<Type className="w-4 h-4" />}><Textarea value={formData.answer || ""} onChange={e => setFormData({...formData, answer: e.target.value})} required className="bg-secondary/30 min-h-[150px] rounded-xl" /></FormGroup>
          <FormGroup label="Display Order" icon={<Type className="w-4 h-4" />}><Input type="number" value={formData.display_order || 0} onChange={e => setFormData({...formData, display_order: parseInt(e.target.value)})} className="bg-secondary/30 h-12 rounded-xl" /></FormGroup>
        </div>
      )}

      {view === 'manifesto_visuals' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormGroup label="Slide 1" icon={<ImageIcon className="w-4 h-4" />}><ImageUpload value={formData.image1 || ""} onChange={url => setFormData({...formData, image1: url})} label="Main Slide 1" /></FormGroup>
            <FormGroup label="Slide 2" icon={<ImageIcon className="w-4 h-4" />}><ImageUpload value={formData.image2 || ""} onChange={url => setFormData({...formData, image2: url})} label="Main Slide 2" /></FormGroup>
            <FormGroup label="Slide 3" icon={<ImageIcon className="w-4 h-4" />}><ImageUpload value={formData.image3 || ""} onChange={url => setFormData({...formData, image3: url})} label="Main Slide 3" /></FormGroup>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-border/10 pt-8">
            <FormGroup label="Bottom Left" icon={<ImageIcon className="w-4 h-4" />}><ImageUpload value={formData.corner_left || ""} onChange={url => setFormData({...formData, corner_left: url})} label="Left Anchored" /></FormGroup>
            <FormGroup label="Bottom Right" icon={<ImageIcon className="w-4 h-4" />}><ImageUpload value={formData.corner_right || ""} onChange={url => setFormData({...formData, corner_right: url})} label="Right Anchored" /></FormGroup>
          </div>
        </div>
      )}

      {view === 'project' && (
        <div className="space-y-6">
          <FormGroup label="Cover" icon={<ImageIcon className="w-4 h-4" />}><ImageUpload value={formData.image_url || ""} onChange={url => setFormData({...formData, image_url: url})} label="Upload Cover" /></FormGroup>
          <FormGroup label="Name" icon={<Layers className="w-4 h-4" />}><Input value={formData.name || ""} onChange={e => setFormData({...formData, name: e.target.value})} required className="bg-secondary/30 h-12 rounded-xl" /></FormGroup>
          <FormGroup label="Category" icon={<TagIcon className="w-4 h-4" />}><Input placeholder="e.g. DeFi, RWA" value={formData.category || ""} onChange={e => setFormData({...formData, category: e.target.value})} required className="bg-secondary/30 h-12 rounded-xl" /></FormGroup>
          <FormGroup label="Description" icon={<Type className="w-4 h-4" />}><Input value={formData.description || ""} onChange={e => setFormData({...formData, description: e.target.value})} className="bg-secondary/30 h-12 rounded-xl" /></FormGroup>
          <FormGroup label="Website" icon={<Globe className="w-4 h-4" />}><Input placeholder="https://..." value={formData.website_url || ""} onChange={e => setFormData({...formData, website_url: e.target.value})} className="bg-secondary/30 h-12 rounded-xl" /></FormGroup>
          <FormGroup label="Twitter" icon={<LinkIcon className="w-4 h-4" />}><Input placeholder="https://x.com/..." value={formData.twitter_url || ""} onChange={e => setFormData({...formData, twitter_url: e.target.value})} className="bg-secondary/30 h-12 rounded-xl" /></FormGroup>
        </div>
      )}

      {view === 'event' && (
        <div className="space-y-6">
          <FormGroup label="Poster" icon={<ImageIcon className="w-4 h-4" />}><ImageUpload value={formData.image_url || ""} onChange={url => setFormData({...formData, image_url: url})} label="Upload Poster" /></FormGroup>
          <FormGroup label="Title" icon={<Type className="w-4 h-4" />}><Input value={formData.title || ""} onChange={e => setFormData({...formData, title: e.target.value})} required className="bg-secondary/30 h-12 rounded-xl" /></FormGroup>
          <div className="grid grid-cols-2 gap-6">
            <FormGroup label="Date" icon={<Calendar className="w-4 h-4" />}><Input type="date" value={formData.date || ""} onChange={e => setFormData({...formData, date: e.target.value})} required className="bg-secondary/30 h-12 rounded-xl" /></FormGroup>
            <FormGroup label="Time" icon={<Clock className="w-4 h-4" />}><Input value={formData.time_range || ""} onChange={e => setFormData({...formData, time_range: e.target.value})} className="bg-secondary/30 h-12 rounded-xl" /></FormGroup>
          </div>
          <FormGroup label="Location" icon={<MapPin className="w-4 h-4" />}><Input value={formData.location || ""} onChange={e => setFormData({...formData, location: e.target.value})} className="bg-secondary/30 h-12 rounded-xl" /></FormGroup>
          <FormGroup label="Luma Link" icon={<LinkIcon className="w-4 h-4" />}><Input placeholder="https://lu.ma/..." value={formData.luma_url || ""} onChange={e => setFormData({...formData, luma_url: e.target.value})} className="bg-secondary/30 h-12 rounded-xl" /></FormGroup>
        </div>
      )}

      {view === 'partner' && (
        <div className="space-y-6">
          <FormGroup label="Logo" icon={<ImageIcon className="w-4 h-4" />}><ImageUpload value={formData.logo_url || ""} onChange={url => setFormData({...formData, logo_url: url})} label="Upload Logo" /></FormGroup>
          <FormGroup label="Name" icon={<Type className="w-4 h-4" />}><Input value={formData.name || ""} onChange={e => setFormData({...formData, name: e.target.value})} required className="bg-secondary/30 h-12 rounded-xl" /></FormGroup>
          <FormGroup label="Initials" icon={<Type className="w-4 h-4" />}><Input value={formData.initials || ""} onChange={e => setFormData({...formData, initials: e.target.value})} className="bg-secondary/30 h-12 rounded-xl" /></FormGroup>
        </div>
      )}

      {view === 'luma' && (
        <div className="space-y-6">
          <FormGroup label="Calendar Embed URL" icon={<LinkIcon className="w-4 h-4" />}><Input placeholder="https://lu.ma/embed/calendar/..." value={formData.calendar_url || ""} onChange={e => setFormData({...formData, calendar_url: e.target.value})} className="bg-secondary/30 h-12 rounded-xl" /></FormGroup>
        </div>
      )}

      {view === 'stats' && (
        <div className="space-y-6">
          <FormGroup label="Bounties Completed" icon={<Trophy className="w-4 h-4" />}><Input type="number" value={formData.bounties || ""} onChange={e => setFormData({...formData, bounties: e.target.value})} className="bg-secondary/30 h-12 rounded-xl" /></FormGroup>
          <FormGroup label="Total Earned Value" icon={<DollarSign className="w-4 h-4" />}><Input placeholder="$50k+" value={formData.earned || ""} onChange={e => setFormData({...formData, earned: e.target.value})} className="bg-secondary/30 h-12 rounded-xl" /></FormGroup>
          <FormGroup label="Next Event Fallback (Day #)" icon={<Calendar className="w-4 h-4" />}><Input type="number" value={formData.luma_fallback || ""} onChange={e => setFormData({...formData, luma_fallback: e.target.value})} className="bg-secondary/30 h-12 rounded-xl" /></FormGroup>
        </div>
      )}

      <div className="flex gap-4 pt-8">
        <Button type="submit" disabled={isSaving} className="flex-1 bg-iris h-14 rounded-2xl font-bold shadow-lg shadow-iris/20 group text-white">
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : <><Save className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" /> Save Changes</>}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="h-14 rounded-2xl px-8 border-border/40">Cancel</Button>
      </div>
    </form>
  )
}

// --- List UI Components ---

async function handleDelete(table: string, id: string, refresh: () => void) {
  if (confirm(`Permanently delete this?`)) {
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (!error) { toast.success("Deleted"); refresh(); }
    else toast.error("Error")
  }
}

function SectionHeader({ title, desc, action }: { title: string, desc: string, action: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-center md:text-left w-full">
      <div><h2 className="text-3xl font-serif">{title}</h2><p className="text-muted-foreground mt-1 text-sm opacity-60 font-medium">{desc}</p></div>
      {action}
    </div>
  )
}

function AdminCard({ title, subtitle, icon, image, onEdit, onView, onDelete }: { title: string, subtitle: string, icon?: React.ReactNode, image?: string, onEdit: () => void, onView?: () => void, onDelete: () => void }) {
  return (
    <Card className="bg-secondary/20 border-border/40 hover:bg-secondary/30 transition-all group rounded-[2rem] overflow-hidden text-left shadow-sm">
      <CardContent className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-4 min-w-0">
          {image ? (
            <div className="w-12 h-12 rounded-2xl bg-white p-2 border border-border/20 overflow-hidden shadow-sm flex-shrink-0">
              <img src={image} className="w-full h-full object-contain" alt="" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-2xl bg-iris/10 flex items-center justify-center text-iris shadow-sm flex-shrink-0">{icon}</div>
          )}
          <div className="min-w-0"><p className="font-bold text-base tracking-tight text-left truncate">{title}</p><p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-0.5 opacity-60 truncate">{subtitle}</p></div>
        </div>
        <div className="flex gap-1 flex-shrink-0 ml-4">
          {onView && <Button variant="ghost" size="icon" onClick={onView} className="text-muted-foreground hover:text-iris hover:bg-iris/10 rounded-xl transition-colors"><Eye className="w-4 h-4" /></Button>}
          <Button variant="ghost" size="icon" onClick={onEdit} className="text-muted-foreground hover:text-iris hover:bg-iris/10 rounded-xl transition-colors"><Edit className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon" onClick={onDelete} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></Button>
        </div>
      </CardContent>
    </Card>
  )
}

function SettingTriggerCard({ title, desc, icon, onClick }: { title: string, desc: string, icon: React.ReactNode, onClick: () => void }) {
  return (
    <Card className="bg-secondary/20 border-border/40 hover:bg-secondary/30 transition-all group cursor-pointer rounded-[2.5rem] overflow-hidden shadow-sm" onClick={onClick}>
      <CardContent className="p-8 flex items-center gap-6 text-left">
        <div className="w-14 h-14 rounded-2xl bg-background flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">{icon}</div>
        <div className="text-left">
          <h3 className="font-bold text-lg tracking-tight">{title}</h3>
          <p className="text-sm text-muted-foreground opacity-60 font-medium leading-relaxed">{desc}</p>
        </div>
      </CardContent>
    </Card>
  )
}
