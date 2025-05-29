// src/pages/PaymentOptions.jsx
import { useLocation, useNavigate } from 'react-router-dom'

function PaymentOptions() {
  const location = useLocation()
  const navigate = useNavigate()
  const { event, quantity } = location.state || {}

  if (!event || !quantity) {
    return <p className="text-center text-red-500 mt-10">Missing event or quantity info.</p>
  }

  const total = quantity * event.price

  const handlePayment = (method) => {
    // Simulate payment process
    alert(`Payment via ${method} for ${quantity} tickets completed.`)
    navigate('/dashboard')
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Choose Your Payment Method</h2>
      <div className="text-gray-700 space-y-2 mb-6">
        <p><strong>Event:</strong> {event.title}</p>
        <p><strong>Quantity:</strong> {quantity}</p>
        <p><strong>Price per Ticket:</strong> ${event.price}</p>
        <p><strong>Total:</strong> ${total}</p>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => handlePayment('eSewa')}
          className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 w-full mr-2"
        >
          Pay with eSewa
        </button>
        <button
          onClick={() => handlePayment('Khalti')}
          className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 w-full ml-2"
        >
          Pay with Khalti
        </button>
      </div>
    </div>
  )
}

export default PaymentOptions
