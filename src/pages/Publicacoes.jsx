import EventCard from '../components/EventCard'
import Divider from '../components/Divider'

function Publicacoes() {
  return (
    <div className="px-3 mt-4 space-y-4">
      <div className="text-sm font-bold text-gray-800">Hoje</div>
      <EventCard
        title="Missa de Hoje"
        time="09:00"
        date="31/07/2021"
        image="https://images.unsplash.com/photo-1525874684015-52a3f98b5cb5?q=80&w=400&auto=format&fit=crop"
      />
      <Divider />
      <div className="text-sm font-bold text-gray-800">Amanhã</div>
      <EventCard
        title="Grupo de Oração"
        time="19:30"
        date="01/08/2021"
        image="https://images.unsplash.com/photo-1519681393784-5f0a935f07bf?q=80&w=400&auto=format&fit=crop"
      />
    </div>
  )
}

export default Publicacoes
