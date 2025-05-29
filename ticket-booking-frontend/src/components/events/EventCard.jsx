import { Link } from 'react-router-dom'
import { Calendar, MapPin, DollarSign, Ticket, Tag } from 'lucide-react'

function EventCard({ event }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-blue-50 cursor-pointer">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 transition-opacity duration-300 ease-in-out">
        {event.title}
      </h3>

      <div className="space-y-2 text-gray-600 transition-opacity duration-300 ease-in-out">
        <p className="flex items-center gap-2">
          <Tag size={18} /> Type: {event.type}
        </p>
        <p className="flex items-center gap-2">
          <Calendar size={18} /> Date: {new Date(event.event_date).toLocaleString()}
        </p>
        <p className="flex items-center gap-2">
          <MapPin size={18} /> Location: {event.location}
        </p>
        <p className="flex items-center gap-2">
          <DollarSign size={18} /> Price: ${event.price}
        </p>
        <p className="flex items-center gap-2">
          <Ticket size={18} /> Tickets: {event.availability}
        </p>
      </div>

      <Link
        to={`/events/purchase/${event.id}`}
        className="mt-6 inline-block bg-blue-600 text-white py-2 px-5 rounded-md hover:bg-blue-700 transition-all duration-300"
      >
        Buy Tickets
      </Link>
    </div>
  )
}

export default EventCard
