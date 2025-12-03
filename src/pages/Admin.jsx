import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Admin() {
  const navigate = useNavigate()

  useEffect(() => {
    const ok = localStorage.getItem('adminLoggedIn') === 'true'
    if (!ok) navigate('/login')
  }, [navigate])

  return (
    <div className="px-3 mt-4 space-y-4 max-w-md mx-auto">
      <div className="text-sm font-bold text-gray-800">Admin</div>
      <div className="grid grid-cols-2 gap-3">
        <Link to="/admin/publicacoes" className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm text-center text-xs font-semibold text-gray-800">Publicações</Link>
        <Link to="/admin/informativos" className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm text-center text-xs font-semibold text-gray-800">Informativos</Link>
      </div>
    </div>
  )
}

export default Admin

