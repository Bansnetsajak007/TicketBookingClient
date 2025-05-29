import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../common/Spinner'

function EventForm() {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    event_date: '',
    location: '',
    price: '',
    availability: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/events/create`, {
        ...formData,
        price: parseFloat(formData.price),
        availability: parseInt(formData.availability),
      })
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event')
    }
    setLoading(false)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create Event</h2>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
        {/* Form Fields */}
        {[
          { id: 'title', label: 'Title', type: 'text' },
          { id: 'type', label: 'Type', type: 'text' },
          { id: 'event_date', label: 'Date & Time', type: 'datetime-local' },
          { id: 'location', label: 'Location', type: 'text' },
          { id: 'price', label: 'Price', type: 'number', min: 0, step: 0.01 },
          { id: 'availability', label: 'Available Tickets', type: 'number', min: 0 },
        ].map(({ id, label, ...rest }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              id={id}
              name={id}
              value={formData[id]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              required
              {...rest}
            />
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 disabled:bg-blue-400"
        >
          {loading ? <Spinner /> : 'Create Event'}
        </button>
      </form>
    </div>
  )
}

export default EventForm
