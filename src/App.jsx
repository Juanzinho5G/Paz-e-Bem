
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { NewspaperIcon, MegaphoneIcon, InformationCircleIcon, UserIcon } from '@heroicons/react/24/outline'
import Header from './components/Header.jsx'
import Publicacoes from './pages/Publicacoes.jsx'
import Informativos from './pages/Informativos.jsx'
import Sobre from './pages/Sobre.jsx'
import Login from './pages/Login.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F5F7FA] text-gray-900 font-sans">
        <Header />
        <main className="pb-20">
          <Routes>
            <Route path="/" element={<Publicacoes />} />
            <Route path="/informativos" element={<Informativos />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <nav className="fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-gray-200">
          <div className="max-w-md mx-auto h-full flex">
            <NavLink to="/" end className="flex-1 flex flex-col items-center justify-center text-xs gap-1">
              {({ isActive }) => (
                <>
                  <NewspaperIcon className={`w-5 h-5 ${isActive ? 'text-[#33C6C5]' : 'text-gray-700'}`} />
                  <span className={isActive ? 'font-semibold text-[#33C6C5]' : 'text-gray-700'}>Publicações</span>
                </>
              )}
            </NavLink>
            <NavLink to="/informativos" className="flex-1 flex flex-col items-center justify-center text-xs gap-1">
              {({ isActive }) => (
                <>
                  <MegaphoneIcon className={`w-5 h-5 ${isActive ? 'text-[#33C6C5]' : 'text-gray-700'}`} />
                  <span className={isActive ? 'font-semibold text-[#33C6C5]' : 'text-gray-700'}>Informativos</span>
                </>
              )}
            </NavLink>
            <NavLink to="/sobre" className="flex-1 flex flex-col items-center justify-center text-xs gap-1">
              {({ isActive }) => (
                <>
                  <InformationCircleIcon className={`w-5 h-5 ${isActive ? 'text-[#33C6C5]' : 'text-gray-700'}`} />
                  <span className={isActive ? 'font-semibold text-[#33C6C5]' : 'text-gray-700'}>Sobre</span>
                </>
              )}
            </NavLink>
            <NavLink to="/login" className="flex-1 flex flex-col items-center justify-center text-xs gap-1">
              {({ isActive }) => (
                <>
                  <UserIcon className={`w-5 h-5 ${isActive ? 'text-[#33C6C5]' : 'text-gray-700'}`} />
                  <span className={isActive ? 'font-semibold text-[#33C6C5]' : 'text-gray-700'}>Login</span>
                </>
              )}
            </NavLink>
          </div>
        </nav>
      </div>
    </BrowserRouter>
  )
}

export default App
