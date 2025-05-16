import { useState, useEffect } from 'react'
import axios from 'axios'
import EventCard from './EventCard'
import Spinner from '../common/Spinner'

function EventList() {
  const [events, setEvents] = useState([])
  const [filters, setFilters] = useState({
    type: '',
    date: '',
    location: '',
    minPrice: '',
    maxPrice: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      try {
        const query = new URLSearchParams(filters).toString()
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/events?${query}`)
        setEvents(response.data)
      } catch (err) {
        console.error('Error fetching events:', err)
      }
      setLoading(false)
    }
    fetchEvents()
  }, [filters])

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Events</h2>
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <input
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          placeholder="Type (e.g., Concert)"
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          name="date"
          type="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          placeholder="Location (e.g., Arena)"
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          name="minPrice"
          type="number"
          value={filters.minPrice}
          onChange={handleFilterChange}
          placeholder="Min Price"
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          name="maxPrice"
          type="number"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          placeholder="Max Price"
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length ? (
            events.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <p className="text-gray-600">No events found.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default EventList