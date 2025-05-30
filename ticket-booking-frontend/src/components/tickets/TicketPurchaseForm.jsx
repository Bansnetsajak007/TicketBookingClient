// src/pages/TicketPurchaseForm.jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../common/Spinner'

function TicketPurchaseForm() {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/events`)
        const foundEvent = response.data.find((e) => e.id === parseInt(eventId))
        setEvent(foundEvent)
      } catch (err) {
        setError('Error fetching event')
      }
    }
    fetchEvent()
  }, [eventId])

  const handleProceed = (e) => {
    e.preventDefault()
    navigate(`/events/payment/${eventId}`, {
      state: { event, quantity }
    })
  }

  if (!event) return <Spinner />

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Buy Tickets for {event.title}</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="space-y-4">
        <p className="text-gray-600">Price: ${event.price}</p>
        <p className="text-gray-600">Tickets Available: {event.availability}</p>
        <form onSubmit={handleProceed} className="space-y-4">
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              min="1"
              max={event.availability}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  )
}

export default TicketPurchaseForm
