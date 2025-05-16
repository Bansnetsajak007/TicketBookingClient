import EventList from '../components/events/EventList'

function Home() {
  return (
    <div>
      <div className="bg-blue-600 text-white py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Event Booking</h1>
        <p className="text-lg">Discover and book tickets for your favorite events!</p>
      </div>
      <EventList />
    </div>
  )
}

export default Home