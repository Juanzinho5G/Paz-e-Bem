function Login() {
  return (
    <div className="px-3 mt-4 space-y-3">
      <h1 className="text-xl font-bold text-gray-800">Login</h1>
      <form className="space-y-2">
        <input className="w-full p-2 text-xs rounded-md border border-gray-300" placeholder="E-mail" />
        <input className="w-full p-2 text-xs rounded-md border border-gray-300" placeholder="Senha" type="password" />
        <button className="bg-[#33C6C5] text-white text-xs font-semibold px-4 py-2 rounded-md">Entrar</button>
      </form>
    </div>
  )
}

export default Login
