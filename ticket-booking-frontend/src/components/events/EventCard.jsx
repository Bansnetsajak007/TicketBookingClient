import { Link } from 'react-router-dom'

function EventCard({ event }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
      <p className="text-gray-600 mt-2">Type: {event.type}</p>
      <p className="text-gray-600">Date: {new Date(event.event_date).toLocaleString()}</p>
      <p className="text-gray-600">Location: {event.location}</p>
      <p className="text-gray-600">Price: ${event.price}</p>
      <p className="text-gray-600">Tickets Available: {event.availability}</p>
      <Link
        to={`/events/purchase/${event.id}`}
        className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Buy Tickets
      </Link>
    </div>
  )
}

export default EventCard