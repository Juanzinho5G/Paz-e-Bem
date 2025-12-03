import { useEffect, useState } from 'react'
import EventCard from '../components/EventCard'
import Divider from '../components/Divider'
import { supabase } from '../lib/supabaseClient'

function Publicacoes() {
  const [items, setItems] = useState([])
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('publicacoes')
        .select('id,title,scheduled_at,image_url,description,created_at')
        .order('created_at', { ascending: false })
      if (!mounted) return
      if (error) {
        setErr(error.message)
      } else {
        setItems(data || [])
      }
      setLoading(false)
    })()
    return () => {
      mounted = false
    }
  }, [])

  const fmtTime = (iso) => new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  const fmtDate = (iso) => new Date(iso).toLocaleDateString('pt-BR')
  

  return (
    <div className="px-3 mt-4 space-y-4">
      {err && <div className="p-2 rounded-md bg-red-100 text-red-700 text-xs">{err}</div>}
      {loading && (
        <>
          {[1,2,3].map(i => (
            <div key={i} className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex gap-4">
                <div className="shimmer w-24 h-20 rounded-md" />
                <div className="flex-1 space-y-2">
                  <div className="shimmer h-3 w-40 rounded-md" />
                  <div className="shimmer h-3 w-24 rounded-md" />
                  <div className="shimmer h-3 w-28 rounded-md" />
                  <div className="shimmer h-6 w-24 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      {items.map(i => (
        <EventCard key={i.id} title={i.title} time={fmtTime(i.scheduled_at)} date={fmtDate(i.scheduled_at)} image={i.image_url || '/logo.png'} detailsTo={`/publicacoes/${i.id}`} />
      ))}
    </div>
  )
}

export default Publicacoes
