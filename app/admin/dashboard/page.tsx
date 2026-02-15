"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { 
  Users, 
  Layers, 
  Calendar, 
  Handshake, 
  Layout, 
  Plus, 
  LogOut, 
  Trash2, 
  Edit,
  Save,
  X,
  Search,
  ExternalLink,
  Globe,
  Tag as TagIcon,
  Code,
  Award,
  Check,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Link as LinkIcon,
  MapPin,
  Clock,
  Briefcase,
  Trophy,
  Type,
  Upload,
  Loader2,
  Image as ImageIcon
} from "lucide-react"
import { uploadImage } from "@/app/actions/cloudinary"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput as CommandInputPrimitive,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// --- Components ---

function AdminLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="loader"></div>
      <p className="mt-6 text-iris font-serif italic animate-pulse text-lg">Syncing ecosystem...</p>
    </div>
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
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed])
      setInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove))
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {tags.map(tag => (
            <motion.span
              key={tag}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="inline-flex items-center gap-1.5 bg-iris/10 text-iris px-3 py-1.5 rounded-xl text-xs font-semibold border border-iris/20 shadow-sm"
            >
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="hover:text-destructive transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
      <div className="relative group">
        <Input
          placeholder={placeholder}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault()
              addTag()
            }
          }}
          className="bg-secondary/30 border-border/40 h-11 rounded-xl focus:ring-iris/20"
        />
      </div>
    </div>
  )
}

const presetRoles = [
  "Rust Developer", "Frontend Developer", "Fullstack Developer", "UI/UX Designer",
  "Graphic Designer", "Content Creator", "Writer", "Growth Marketer",
  "Product Manager", "Community Manager", "Chapter Lead", "Core Team"
]

function RoleSelector({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-secondary/30 border-border/40 font-normal h-11 rounded-xl"
        >
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
            {value || "Select or type role..."}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 border-border/40 rounded-xl overflow-hidden" align="start">
        <Command className="bg-background">
          <CommandInputPrimitive 
            placeholder="Search or type custom role..." 
            onValueChange={setSearchValue}
            className="h-11"
          />
          <CommandList className="max-h-[200px] custom-scrollbar">
            <CommandEmpty className="p-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-xs h-9 rounded-lg"
                onClick={() => {
                  onChange(searchValue)
                  setOpen(false)
                }}
              >
                <Plus className="w-3.5 h-3.5 mr-2" /> Use custom: &quot;{searchValue}&quot;
              </Button>
            </CommandEmpty>
            <CommandGroup heading="Role Suggestions">
              {presetRoles.map((role) => (
                <CommandItem
                  key={role}
                  value={role}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                  className="flex items-center gap-2 cursor-pointer py-3"
                >
                  <Check className={cn("h-4 w-4 text-iris", value === role ? "opacity-100" : "opacity-0")} />
                  {role}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function ImageUpload({ value, onChange, label = "Upload Image" }: { value: string, onChange: (val: string) => void, label?: string }) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const url = await uploadImage(formData)
      onChange(url as string)
      toast.success("Image uploaded successfully!")
    } catch (error) {
      toast.error("Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border/40 group">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button 
              type="button" 
              variant="secondary" 
              size="sm" 
              className="rounded-xl h-9"
              onClick={() => fileInputRef.current?.click()}
            >
              Change
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              size="sm" 
              className="rounded-xl h-9"
              onClick={() => onChange("")}
            >
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="w-full h-32 border-dashed border-2 border-border/40 rounded-2xl bg-secondary/10 hover:bg-secondary/20 flex flex-col gap-2"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? (
            <Loader2 className="w-8 h-8 animate-spin text-iris" />
          ) : (
            <Upload className="w-8 h-8 text-muted-foreground" />
          )}
          <span className="text-sm font-medium text-muted-foreground">
            {isUploading ? "Uploading..." : label}
          </span>
        </Button>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
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

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState("members")
  const [isLoading, setIsLoading] = useState(true)
  const [isSectionLoading, setIsSectionLoading] = useState(false)
  
  const tabIndex = TABS.findIndex(t => t.id === activeTab)
  const handlePrevTab = () => { if (tabIndex > 0) setActiveTab(TABS[tabIndex - 1].id) }
  const handleNextTab = () => { if (tabIndex < TABS.length - 1) setActiveTab(TABS[tabIndex + 1].id) }

  const [members, setMembers] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])
  const [partners, setPartners] = useState<any[]>([])
  
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
    await Promise.all([fetchMembers(), fetchProjects(), fetchEvents(), fetchPartners()])
    setIsSectionLoading(false)
  }

  const fetchMembers = async () => {
    const { data } = await supabase.from('members').select('*').order('created_at', { ascending: false })
    setMembers(data || [])
  }

  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    setProjects(data || [])
  }

  const fetchEvents = async () => {
    const { data } = await supabase.from('events').select('*').order('date', { ascending: false })
    setEvents(data || [])
  }

  const fetchPartners = async () => {
    const { data } = await supabase.from('partners').select('*').order('display_order', { ascending: true })
    setPartners(data || [])
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin")
  }

  if (isLoading || !isAuthenticated) {
    return <div className="min-h-screen bg-background flex items-center justify-center p-6"><AdminLoader /></div>
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-archivo font-bold text-lg hover:opacity-80 transition-opacity">
            superteam<span className="text-iris ml-1">🇲🇾</span>
            <span className="ml-2 px-2 py-0.5 bg-iris/10 text-iris text-[10px] uppercase tracking-widest rounded-full font-sans">Admin</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive rounded-xl">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 pb-32">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif mb-3 tracking-tight">
            Ecosystem <em className="italic text-iris">Management</em>
          </h1>
          <p className="text-muted-foreground text-lg">Control center for Superteam Malaysia assets.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-10">
          {/* Floating Bottom Navigation */}
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-fit">
            {/* Mobile Single Tab Navigator */}
            <div className="lg:hidden flex items-center justify-between bg-background/80 backdrop-blur-2xl border border-border/40 rounded-2xl p-2 shadow-2xl shadow-black/20">
              <Button variant="ghost" size="icon" onClick={handlePrevTab} disabled={tabIndex === 0} className="rounded-xl h-12 w-12">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="flex flex-col items-center px-8 min-w-[140px]">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-0.5">Section</span>
                <div className="flex items-center gap-2 text-iris font-semibold">
                  {React.createElement(TABS[tabIndex].icon, { className: "w-4 h-4" })}
                  {TABS[tabIndex].label}
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleNextTab} disabled={tabIndex === TABS.length - 1} className="rounded-xl h-12 w-12">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Desktop Tab List */}
            <div className="hidden lg:block">
              <TabsList className="bg-background/80 backdrop-blur-2xl border border-border/40 p-1.5 h-16 rounded-3xl flex gap-1.5 shadow-2xl shadow-black/20">
                {TABS.map(tab => (
                  <TabsTrigger key={tab.id} value={tab.id} className="data-[state=active]:bg-iris data-[state=active]:text-white data-[state=active]:shadow-lg rounded-2xl px-8 h-full gap-2.5 transition-all text-sm font-medium">
                    <tab.icon className="w-4 h-4" /> {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isSectionLoading ? (
              <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><AdminLoader /></motion.div>
            ) : (
              <motion.div key={activeTab} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                <TabsContent value="members" className="mt-0 space-y-8">
                  <SectionHeader title="Members" desc="Manage builders in the directory." action={<AddMemberDialog onAdd={fetchMembers} />} />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {members.map(m => <AdminCard key={m.id} title={m.name} subtitle={m.role} icon={<Users className="w-5 h-5" />} onDelete={() => handleDelete('members', m.id, fetchMembers)} />)}
                  </div>
                </TabsContent>

                <TabsContent value="projects" className="mt-0 space-y-8">
                  <SectionHeader title="Projects" desc="Showcase ecosystem dApps." action={<AddProjectDialog onAdd={fetchProjects} />} />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(p => <AdminCard key={p.id} title={p.name} subtitle={p.category} icon={<Layers className="w-5 h-5" />} onDelete={() => handleDelete('projects', p.id, fetchProjects)} />)}
                  </div>
                </TabsContent>

                <TabsContent value="events" className="mt-0 space-y-8">
                  <SectionHeader title="Events" desc="Manage community happenings." action={<AddEventDialog onAdd={fetchEvents} />} />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map(e => <AdminCard key={e.id} title={e.title} subtitle={`${e.date} • ${e.status}`} icon={<Calendar className="w-5 h-5" />} onDelete={() => handleDelete('events', e.id, fetchEvents)} />)}
                  </div>
                </TabsContent>

                <TabsContent value="partners" className="mt-0 space-y-8">
                  <SectionHeader title="Partners" desc="Manage ecosystem logos." action={<AddPartnerDialog onAdd={fetchPartners} />} />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {partners.map(p => <AdminCard key={p.id} title={p.name} subtitle="Partner" image={p.logo_url} onDelete={() => handleDelete('partners', p.id, fetchPartners)} />)}
                  </div>
                </TabsContent>

                <TabsContent value="site" className="mt-0 py-32 text-center border-2 border-dashed border-border/40 rounded-[2.5rem] bg-secondary/10">
                  <div className="w-20 h-20 bg-iris/5 rounded-3xl flex items-center justify-center mx-auto mb-6"><Layout className="w-10 h-10 text-iris/30" /></div>
                  <h3 className="text-2xl font-serif mb-2">Visual CMS Ready Soon</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto text-sm">Directly editing landing page sections is currently being optimized.</p>
                </TabsContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Tabs>
      </main>
    </div>
  )
}

// --- Specialized UI Fragments ---

async function handleDelete(table: string, id: string, refresh: () => void) {
  if (confirm(`Permanently delete this entry?`)) {
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (!error) { toast.success("Deleted"); refresh(); }
    else toast.error("Error deleting entry")
  }
}

function SectionHeader({ title, desc, action }: { title: string, desc: string, action: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div><h2 className="text-3xl font-serif">{title}</h2><p className="text-muted-foreground mt-1">{desc}</p></div>
      {action}
    </div>
  )
}

function AdminCard({ title, subtitle, icon, image, onDelete }: { title: string, subtitle: string, icon?: React.ReactNode, image?: string, onDelete: () => void }) {
  return (
    <Card className="bg-secondary/20 border-border/40 hover:bg-secondary/30 transition-all group rounded-[2rem] overflow-hidden">
      <CardContent className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {image ? (
            <div className="w-12 h-12 rounded-2xl bg-white p-2 border border-border/20 overflow-hidden shadow-sm">
              <img src={image} className="w-full h-full object-contain" alt="" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-2xl bg-iris/10 flex items-center justify-center text-iris shadow-sm">{icon}</div>
          )}
          <div>
            <p className="font-bold text-base tracking-tight">{title}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-0.5">{subtitle}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onDelete} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-colors">
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

// --- Enhanced Dialogs ---

function AddMemberDialog({ onAdd }: { onAdd: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [skillTags, setSkillTags] = useState<string[]>([])
  const [achievementTags, setAchievementTags] = useState<string[]>([])
  const [projectTags, setProjectTags] = useState<string[]>([])
  const [formData, setFormData] = useState({ name: "", role: "", twitter: "", bio: "", photo_url: "" })

  const handleSubmit = async (e: any) => {
    e.preventDefault(); setIsSaving(true)
    const { error } = await supabase.from('members').insert([{ ...formData, skills: skillTags, achievements: achievementTags, projects: projectTags }])
    if (!error) { 
      toast.success("Builder Added"); onAdd(); setIsOpen(false); 
      setFormData({ name: "", role: "", twitter: "", bio: "" , photo_url: ""}); setSkillTags([]); setAchievementTags([]); setProjectTags([]); 
    }
    setIsSaving(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild><Button className="bg-iris hover:bg-iris/90 rounded-2xl h-14 px-8 shadow-lg shadow-iris/20"><Plus className="w-5 h-5 mr-2" /> Add Builder</Button></DialogTrigger>
      <DialogContent className="bg-background border-border/40 sm:max-w-md max-h-[75vh] flex flex-col p-0 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-8 pb-4"><DialogHeader><DialogTitle className="text-3xl font-serif">Add Builder</DialogTitle></DialogHeader></div>
        <div className="flex-1 overflow-y-auto px-8 py-2 custom-scrollbar">
          <form id="member-form" onSubmit={handleSubmit} className="space-y-6 pb-8">
            <FormGroup label="Profile Photo" icon={<ImageIcon className="w-4 h-4" />}>
              <ImageUpload value={formData.photo_url} onChange={url => setFormData({...formData, photo_url: url})} label="Upload Avatar" />
            </FormGroup>
            <FormGroup label="Full Name" icon={<Type className="w-4 h-4" />}><Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="bg-secondary/30 border-border/40 h-11 rounded-xl" /></FormGroup>
            <FormGroup label="Primary Role" icon={<Briefcase className="w-4 h-4" />}><RoleSelector value={formData.role} onChange={val => setFormData({...formData, role: val})} /></FormGroup>
            <FormGroup label="Twitter / X" icon={<LinkIcon className="w-4 h-4" />}><Input placeholder="@username" value={formData.twitter} onChange={e => setFormData({...formData, twitter: e.target.value})} className="bg-secondary/30 border-border/40 h-11 rounded-xl" /></FormGroup>
            <FormGroup label="Skills" icon={<Code className="w-4 h-4" />}><TagInput tags={skillTags} setTags={setSkillTags} placeholder="Add skills..." /></FormGroup>
            <FormGroup label="Achievements" icon={<Trophy className="w-4 h-4" />}><TagInput tags={achievementTags} setTags={setAchievementTags} placeholder="e.g. Hackathon Winner" /></FormGroup>
            <FormGroup label="Projects Built" icon={<Layers className="w-4 h-4" />}><TagInput tags={projectTags} setTags={setProjectTags} placeholder="e.g. SolPay MY" /></FormGroup>
            <FormGroup label="Short Bio" icon={<Type className="w-4 h-4" />}><Input value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="bg-secondary/30 border-border/40 h-11 rounded-xl" /></FormGroup>
          </form>
        </div>
        <div className="p-8 pt-4 border-t border-border/10 bg-secondary/5"><Button form="member-form" type="submit" disabled={isSaving} className="w-full bg-iris h-14 rounded-2xl font-bold shadow-lg shadow-iris/20 group">{isSaving ? "Saving..." : <><Save className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" /> Save Profile</>}</Button></div>
      </DialogContent>
    </Dialog>
  )
}

function AddProjectDialog({ onAdd }: { onAdd: () => void }) {
  const [isOpen, setIsOpen] = useState(false); const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({ name: "", category: "", description: "", twitter_url: "", website_url: "", image_url: "" })

  const handleSubmit = async (e: any) => {
    e.preventDefault(); setIsSaving(true)
    const { error } = await supabase.from('projects').insert([formData])
    if (!error) { toast.success("Project Added"); onAdd(); setIsOpen(false); setFormData({ name: "", category: "", description: "", twitter_url: "", website_url: "", image_url: "" }); }
    setIsSaving(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild><Button className="bg-iris hover:bg-iris/90 rounded-2xl h-14 px-8 shadow-lg shadow-iris/20"><Plus className="w-5 h-5 mr-2" /> Add Project</Button></DialogTrigger>
      <DialogContent className="bg-background border-border/40 sm:max-w-md max-h-[75vh] flex flex-col p-0 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-8 pb-4"><DialogHeader><DialogTitle className="text-3xl font-serif">New Project</DialogTitle></DialogHeader></div>
        <div className="flex-1 overflow-y-auto px-8 py-2 custom-scrollbar">
          <form id="project-form" onSubmit={handleSubmit} className="space-y-6 pb-8">
            <FormGroup label="Project Name" icon={<Layers className="w-4 h-4" />}><Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="bg-secondary/30 h-11 rounded-xl" /></FormGroup>
            <FormGroup label="Category" icon={<TagIcon className="w-4 h-4" />}><Input placeholder="e.g. DeFi, RWA" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required className="bg-secondary/30 h-11 rounded-xl" /></FormGroup>
            <FormGroup label="Description" icon={<Type className="w-4 h-4" />}><Input value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="bg-secondary/30 h-11 rounded-xl" /></FormGroup>
            <FormGroup label="Website" icon={<Globe className="w-4 h-4" />}><Input placeholder="https://..." value={formData.website_url} onChange={e => setFormData({...formData, website_url: e.target.value})} className="bg-secondary/30 h-11 rounded-xl" /></FormGroup>
            <FormGroup label="Twitter" icon={<LinkIcon className="w-4 h-4" />}><Input placeholder="https://x.com/..." value={formData.twitter_url} onChange={e => setFormData({...formData, twitter_url: e.target.value})} className="bg-secondary/30 h-11 rounded-xl" /></FormGroup>
            <FormGroup label="Thumbnail URL" icon={<ImageIcon className="w-4 h-4" />}><Input placeholder="Image link" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="bg-secondary/30 h-11 rounded-xl" /></FormGroup>
          </form>
        </div>
        <div className="p-8 pt-4 border-t border-border/10 bg-secondary/5"><Button form="project-form" type="submit" disabled={isSaving} className="w-full bg-iris h-14 rounded-2xl font-bold group">{isSaving ? "Saving..." : <><Save className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" /> Save Project</>}</Button></div>
      </DialogContent>
    </Dialog>
  )
}

function AddEventDialog({ onAdd }: { onAdd: () => void }) {
  const [isOpen, setIsOpen] = useState(false); const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({ title: "", date: "", location: "", luma_url: "", time_range: "", status: "Upcoming" })

  const handleSubmit = async (e: any) => {
    e.preventDefault(); setIsSaving(true)
    const { error } = await supabase.from('events').insert([formData])
    if (!error) { toast.success("Event Created"); onAdd(); setIsOpen(false); setFormData({ title: "", date: "", location: "", luma_url: "", time_range: "", status: "Upcoming" }); }
    setIsSaving(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild><Button className="bg-iris hover:bg-iris/90 rounded-2xl h-14 px-8 shadow-lg shadow-iris/20"><Plus className="w-5 h-5 mr-2" /> Add Event</Button></DialogTrigger>
      <DialogContent className="bg-background border-border/40 sm:max-w-md max-h-[75vh] flex flex-col p-0 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-8 pb-4"><DialogHeader><DialogTitle className="text-3xl font-serif">New Event</DialogTitle></DialogHeader></div>
        <div className="flex-1 overflow-y-auto px-8 py-2 custom-scrollbar">
          <form id="event-form" onSubmit={handleSubmit} className="space-y-6 pb-8">
            <FormGroup label="Event Title" icon={<Type className="w-4 h-4" />}><Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required className="bg-secondary/30 h-11 rounded-xl" /></FormGroup>
            <div className="grid grid-cols-2 gap-4">
              <FormGroup label="Date" icon={<Calendar className="w-4 h-4" />}><Input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required className="bg-secondary/30 h-11 rounded-xl" /></FormGroup>
              <FormGroup label="Time" icon={<Clock className="w-4 h-4" />}><Input placeholder="e.g. 8PM - 10PM" value={formData.time_range} onChange={e => setFormData({...formData, time_range: e.target.value})} className="bg-secondary/30 h-11 rounded-xl" /></FormGroup>
            </div>
            <FormGroup label="Location" icon={<MapPin className="w-4 h-4" />}><Input placeholder="Virtual or Venue" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="bg-secondary/30 h-11 rounded-xl" /></FormGroup>
            <FormGroup label="Luma Link" icon={<LinkIcon className="w-4 h-4" />}><Input placeholder="https://lu.ma/..." value={formData.luma_url} onChange={e => setFormData({...formData, luma_url: e.target.value})} className="bg-secondary/30 h-11 rounded-xl" /></FormGroup>
            <FormGroup label="Status" icon={<Check className="w-4 h-4" />}>
              <Select onValueChange={(v) => setFormData({...formData, status: v})} defaultValue="Upcoming">
                <SelectTrigger className="bg-secondary/30 border-border/40 h-11 rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-background border-border/40 rounded-xl"><SelectItem value="Upcoming">Upcoming</SelectItem><SelectItem value="Past">Past</SelectItem></SelectContent>
              </Select>
            </FormGroup>
          </form>
        </div>
        <div className="p-8 pt-4 border-t border-border/10 bg-secondary/5"><Button form="event-form" type="submit" disabled={isSaving} className="w-full bg-iris h-14 rounded-2xl font-bold group shadow-lg shadow-iris/20">{isSaving ? "Saving..." : <><Save className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" /> Create Event</>}</Button></div>
      </DialogContent>
    </Dialog>
  )
}

function AddPartnerDialog({ onAdd }: { onAdd: () => void }) {
  const [isOpen, setIsOpen] = useState(false); const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({ name: "", initials: "", logo_url: "" })

  const handleSubmit = async (e: any) => {
    e.preventDefault(); setIsSaving(true)
    const { error } = await supabase.from('partners').insert([formData])
    if (!error) { toast.success("Partner Added"); onAdd(); setIsOpen(false); setFormData({ name: "", initials: "", logo_url: "" }); }
    setIsSaving(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild><Button className="bg-iris hover:bg-iris/90 rounded-2xl h-14 px-8 shadow-lg shadow-iris/20"><Plus className="w-5 h-5 mr-2" /> Add Partner</Button></DialogTrigger>
      <DialogContent className="bg-background border-border/40 sm:max-w-md p-0 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-8 pb-4"><DialogHeader><DialogTitle className="text-3xl font-serif">Add Partner</DialogTitle></DialogHeader></div>
        <form onSubmit={handleSubmit} className="p-8 pt-2 space-y-6 pb-8">
          <FormGroup label="Partner Name" icon={<Type className="w-4 h-4" />}><Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="bg-secondary/30 h-11 rounded-xl" /></FormGroup>
          <FormGroup label="Initials" icon={<Type className="w-4 h-4" />}><Input placeholder="e.g. ST" value={formData.initials} onChange={e => setFormData({...formData, initials: e.target.value})} required className="bg-secondary/30 h-11 rounded-xl" /></FormGroup>
          <FormGroup label="Logo URL" icon={<ImageIcon className="w-4 h-4" />}><Input placeholder="CDN link" value={formData.logo_url} onChange={e => setFormData({...formData, logo_url: e.target.value})} className="bg-secondary/30 h-11 rounded-xl" /></FormGroup>
          <Button type="submit" disabled={isSaving} className="w-full bg-iris h-14 rounded-2xl font-bold group shadow-lg shadow-iris/20">{isSaving ? "Saving..." : <><Save className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" /> Save Partner</>}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
