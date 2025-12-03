import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// Login local fixo, sem Supabase Auth

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  const FIXED_USER = 'matrizcc'
  const FIXED_PASS = 'admin123'
  const FIXED_EMAIL = 'matrizcc'

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    const input = email.trim()
    const pass = password.trim()
    if (!((input === FIXED_USER || input === FIXED_EMAIL) && pass === FIXED_PASS)) {
      setErr('Credenciais inválidas')
      return
    }
    localStorage.setItem('adminLoggedIn', 'true')
    navigate('/admin')
  }

  return (
    <div className="px-3 mt-4 space-y-3">
      <h1 className="text-xl font-bold text-gray-800">Login</h1>
      {err && <div className="p-2 rounded-md bg-red-100 text-red-700 text-xs">{err}</div>}
      <form className="space-y-2" onSubmit={onSubmit}>
        <input className="w-full p-2 text-xs rounded-md border border-gray-300" placeholder="Usuário ou e-mail" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full p-2 text-xs rounded-md border border-gray-300" placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="bg-[#33C6C5] text-white text-xs font-semibold px-4 py-2 rounded-md">Entrar</button>
      </form>
    </div>
  )
}

export default Login
