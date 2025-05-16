import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import EventCard from '../components/events/EventCard'
import Spinner from '../components/common/Spinner'

function Dashboard() {
  const { user } = useAuth()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      try {
        const endpoint =
          user.role === 'organizer' ? '/events/my-events' : '/events'
        const response = await axios.get(`${import.meta.env.VITE_API_URL}${endpoint}`)
        setEvents(response.data)
      } catch (err) {
        console.error('Error fetching events:', err)
      }
      setLoading(false)
    }
    fetchEvents()
  }, [user])

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/events/${eventId}`)
        setEvents(events.filter((event) => event.id !== eventId))
      } catch (err) {
        console.error('Error deleting event:', err)
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        {user.role === 'organizer' ? 'Your Events' : 'Available Events'}
      </h2>
      {user.role === 'organizer' && (
        <Link
          to="/events/create"
          className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 mb-6"
        >
          Create New Event
        </Link>
      )}
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length ? (
            events.map((event) => (
              <div key={event.id} className="relative">
                <EventCard event={event} />
                {user.role === 'organizer' && (
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600">
              {user.role === 'organizer'
                ? 'No events created yet.'
                : 'No events available.'}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default Dashboard