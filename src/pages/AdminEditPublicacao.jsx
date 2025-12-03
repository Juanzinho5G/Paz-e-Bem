import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

function AdminEditPublicacao() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [title, setTitle] = useState('')
  const [scheduledAt, setScheduledAt] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [err, setErr] = useState('')

  useEffect(() => {
    const ok = localStorage.getItem('adminLoggedIn') === 'true'
    if (!ok) { navigate('/login'); return }
    let active = true
    supabase
      .from('publicacoes')
      .select('id,title,scheduled_at,image_url,description')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (!active) return
        if (error) setErr(error.message)
        else {
          setItem(data)
          setTitle(data.title || '')
          setScheduledAt(new Date(data.scheduled_at).toISOString().slice(0,16))
          setDescription(data.description || '')
        }
      })
    return () => { active = false }
  }, [id, navigate])

  const save = async () => {
    setErr('')
    let imageUrl = item?.image_url || null
    if (file) {
      const path = `publicacoes/${Date.now()}-${file.name}`
      const up = await supabase.storage.from('images').upload(path, file)
      if (up.error) { setErr(up.error.message); return }
      const pub = supabase.storage.from('images').getPublicUrl(path)
      imageUrl = pub.data.publicUrl
    }
    const payload = {
      title,
      scheduled_at: scheduledAt ? new Date(scheduledAt).toISOString() : new Date().toISOString(),
      description,
      image_url: imageUrl,
    }
    const { error } = await supabase.from('publicacoes').update(payload).eq('id', id)
    if (error) { setErr(error.message); return }
    navigate('/admin/publicacoes')
  }

  return (
    <div className="px-3 mt-4 space-y-4 max-w-md mx-auto">
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold text-gray-800">Admin • Editar Publicação</div>
        <button className="bg-[#33C6C5] text-white text-xs font-semibold px-4 py-2 rounded-md" onClick={() => navigate('/admin/publicacoes')}>Voltar</button>
      </div>
      {err && <div className="p-2 rounded-md bg-red-100 text-red-700 text-xs">{err}</div>}
      {item && (
        <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm space-y-2">
          <input className="w-full p-2 text-xs rounded-md border border-gray-300" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} />
          <input className="w-full p-2 text-xs rounded-md border border-gray-300" type="datetime-local" value={scheduledAt} onChange={e => setScheduledAt(e.target.value)} />
          <textarea className="w-full p-2 text-xs rounded-md border border-gray-300" placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} />
          <input className="w-full text-xs" type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
          <div className="flex gap-2">
            <button className="bg-[#33C6C5] text-white text-xs font-semibold px-4 py-2 rounded-md" onClick={save}>Salvar</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminEditPublicacao

