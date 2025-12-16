import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { NewspaperIcon, MegaphoneIcon } from '@heroicons/react/24/outline'
import { supabase } from '../lib/supabaseClient'

function Admin() {
  const navigate = useNavigate()

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession()
      const ok = !!data.session || localStorage.getItem('adminLoggedIn') === 'true'
      if (!ok) navigate('/login')
    }
    check()
  }, [navigate])

  return (
    <div className="px-3 mt-4 space-y-4 max-w-md mx-auto">
      <div className="text-sm font-bold text-gray-800">Admin</div>
      <div className="grid grid-cols-2 gap-3">
        <Link to="/admin/publicacoes" className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm text-xs font-semibold text-gray-800 flex items-center justify-center gap-2">
          <NewspaperIcon className="w-5 h-5 text-[#33C6C5]" />
          <span>Publicações</span>
        </Link>
        <Link to="/admin/informativos" className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm text-xs font-semibold text-gray-800 flex items-center justify-center gap-2">
          <MegaphoneIcon className="w-5 h-5 text-[#33C6C5]" />
          <span>Informativos</span>
        </Link>
      </div>
    </div>
  )
}

export default Admin

