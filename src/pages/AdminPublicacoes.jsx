import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

function AdminPublicacoes() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')
  const [scheduledAt, setScheduledAt] = useState('')
  const [scheduledEndAt, setScheduledEndAt] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [err, setErr] = useState('')
  const [confirm, setConfirm] = useState(null)

  const load = async () => {
    const { data, error } = await supabase
      .from('publicacoes')
      .select('id,title,scheduled_at,image_url,description')
      .order('scheduled_at', { ascending: true })
    if (error) setErr(error.message)
    else setItems(data || [])
  }

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession()
      const ok = !!data.session || localStorage.getItem('adminLoggedIn') === 'true'
      if (!ok) { navigate('/login'); return }
    }
    check()
    let active = true
    supabase
      .from('publicacoes')
      .select('id,title,scheduled_at,image_url,description')
      .order('scheduled_at', { ascending: true })
      .then(({ data, error }) => {
        if (!active) return
        if (error) setErr(error.message)
        else setItems(data || [])
      })
    return () => { active = false }
  }, [navigate])

  const createItem = async () => {
    setErr('')
    let imageUrl = null
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
      scheduled_end_at: scheduledEndAt ? new Date(scheduledEndAt).toISOString() : null,
      image_url: imageUrl,
      description,
    }
    const { error } = await supabase.from('publicacoes').insert(payload)
    if (error) { setErr(error.message); return }
    try {
      const link = `${window.location.origin}/publicacoes`
      await supabase.functions.invoke('notify', {
        body: {
          type: 'publicacao',
          title,
          url: link,
        },
      })
    } catch (e) {
      console.error(e)
    }
    setTitle('')
    setScheduledAt('')
    setDescription('')
    setFile(null)
    await load()
  }


  const deleteItem = async (item) => {
    setErr('')
    if (item.image_url && item.image_url.includes('/images/')) {
      const idx = item.image_url.indexOf('/images/')
      const path = item.image_url.slice(idx + 8)
      await supabase.storage.from('images').remove([path])
    }
    const { error } = await supabase.from('publicacoes').delete().eq('id', item.id)
    if (error) { setErr(error.message); return }
    await load()
  }

  return (
    <div className="px-3 mt-4 space-y-4 max-w-md mx-auto">
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold text-gray-800">Admin • Publicações</div>
        <button className="bg-[#33C6C5] text-white text-xs font-semibold px-4 py-2 rounded-md" onClick={() => navigate('/admin')}>Voltar</button>
      </div>
      {err && <div className="p-2 rounded-md bg-red-100 text-red-700 text-xs">{err}</div>}
      <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm space-y-2">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-gray-700">Título</div>
          <input className="w-full p-2 text-xs rounded-md border border-gray-300 text-gray-800 placeholder-gray-400" placeholder="Título da publicação" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="space-y-1">
          <div className="text-xs font-semibold text-gray-700">Início do evento</div>
          <input className="w-full p-2 text-xs rounded-md border border-gray-300 text-gray-800 placeholder-gray-400" type="datetime-local" value={scheduledAt} onChange={e => setScheduledAt(e.target.value)} />
        </div>
        <div className="space-y-1">
          <div className="text-xs font-semibold text-gray-700">Fim do evento (opcional)</div>
          <input className="w-full p-2 text-xs rounded-md border border-gray-300 text-gray-800 placeholder-gray-400" type="datetime-local" value={scheduledEndAt} onChange={e => setScheduledEndAt(e.target.value)} />
        </div>
        <div className="space-y-1">
          <div className="text-xs font-semibold text-gray-700">Descrição</div>
          <textarea className="w-full p-2 text-xs rounded-md border border-gray-300 text-gray-800 placeholder-gray-400 min-h-40 resize-y" placeholder="Detalhes da publicação" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="space-y-1">
          <div className="text-xs font-semibold text-gray-700">Imagem (opcional)</div>
          <input className="w-full text-xs text-gray-800" type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
        </div>
        <button className="bg-[#33C6C5] text-white text-xs font-semibold px-4 py-2 rounded-md" onClick={createItem}>Criar</button>
      </div>
      <div className="space-y-3">
        {items.map(i => (
          <div key={i.id} className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm space-y-2">
            <div className="text-xs font-semibold text-gray-800">{i.title}</div>
            <div className="flex gap-2">
              <button className="bg-[#33C6C5] text-white text-xs font-semibold px-3 py-1 rounded-md" onClick={() => navigate(`/admin/publicacoes/${i.id}`)}>Editar</button>
              <button className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md" onClick={() => setConfirm(i)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
      {confirm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl w-80 space-y-3 border border-gray-200">
            <div className="text-sm font-semibold text-gray-800">Confirmar exclusão</div>
            <div className="text-xs text-gray-700">Deseja excluir "{confirm.title}"?</div>
            <div className="flex justify-end gap-2">
              <button className="px-3 py-1 text-xs rounded-md border border-gray-300" onClick={() => setConfirm(null)}>Cancelar</button>
              <button className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md" onClick={() => { deleteItem(confirm); setConfirm(null) }}>Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPublicacoes
