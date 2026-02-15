import { supabase } from "@/lib/supabase"
import { MembersContent } from "./members-content"

export const dynamic = 'force-dynamic'

async function getMembers() {
  const { data } = await supabase
    .from('members')
    .select('*')
    .order('created_at', { ascending: false })
  return data || []
}

export default async function MembersPage() {
  const members = await getMembers()
  
  return <MembersContent initialData={members} />
}
