import { supabase } from "@/lib/supabase"
import { ProductsContent } from "./products-content"

export const dynamic = 'force-dynamic'

async function getProducts() {
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
  return data || []
}

export default async function ProductsPage() {
  const products = await getProducts()
  
  return <ProductsContent initialData={products} />
}
