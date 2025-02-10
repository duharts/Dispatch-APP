import './App.css';
import React, { useState } from 'react';
import { Bell, Menu, MapPin, Clock, Search, AlertTriangle, CheckCircle, Radio, Users } from 'lucide-react';

const vehicles = [
  { id: 1, name: "Hope House Vehicle", status: "available", driver: "John Doe", location: "Hope House", lastUpdate: "2 mins ago" },
  { id: 2, name: "House East Vehicle", status: "enroute", driver: "Jane Smith", location: "House East", lastUpdate: "5 mins ago" },
  { id: 3, name: "Icahn House Vehicle", status: "available", driver: "Mike Johnson", location: "Icahn House", lastUpdate: "1 min ago" }
];

const requests = [
  { id: 1, requester: "David Miller", pickup: "Hope House", time: "10:30 AM", status: "pending", priority: "high", notes: "Medical appointment" },
  { id: 2, requester: "Sarah Chen", pickup: "Icahn House", time: "11:15 AM", status: "pending", priority: "normal", notes: "Staff transport" }
];

const trips = [
  { id: 1, requester: "Alice", pickup: "Office A", dropoff: "Airport", status: "assigned", vehicle: "Hope House Vehicle", eta: "15 mins" },
  { id: 2, requester: "Bob", pickup: "Warehouse", dropoff: "Port", status: "pending", vehicle: null, eta: "Pending assignment" }
];

export default function DispatchPrototype() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [newTrip, setNewTrip] = useState({ pickup: "", dropoff: "", time: "" });

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col">
        <header className="flex items-center justify-between p-4 bg-slate-800 text-white">
          <div>
            <h1 className="text-xl font-bold">CRF Fleet Dispatch</h1>
            <p className="text-sm text-slate-300">3 Active Vehicles • 2 Pending Requests</p>
          </div>
          <button 
            className="p-2 hover:bg-slate-700 rounded-full relative" 
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </header>

        <main className={`flex-1 overflow-y-auto ${showNotifications ? 'hidden' : 'block'}`}>
          <div className="p-4 space-y-4">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-slate-800 text-white rounded-lg hover:bg-slate-900 flex items-center justify-center gap-2">
                <Radio className="h-4 w-4" />
                New Trip
              </button>
              <button className="p-3 bg-slate-100 text-slate-800 rounded-lg hover:bg-slate-200 flex items-center justify-center gap-2">
                <Users className="h-4 w-4" />
                Team Status
              </button>
            </div>

            {/* New Trip */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
              <h3 className="text-lg font-semibold mb-4">New Trip</h3>
              <div className="space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    className="w-full pl-10 pr-4 py-2 border rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500"
                    placeholder="Pickup Location"
                    value={newTrip.pickup}
                    onChange={(e) => setNewTrip({...newTrip, pickup: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    className="w-full pl-10 pr-4 py-2 border rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500"
                    placeholder="Dropoff Location"
                    value={newTrip.dropoff}
                    onChange={(e) => setNewTrip({...newTrip, dropoff: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    className="w-full pl-10 pr-4 py-2 border rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500"
                    type="datetime-local"
                    value={newTrip.time}
                    onChange={(e) => setNewTrip({...newTrip, time: e.target.value})}
                  />
                </div>
                <button className="w-full py-2.5 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors">
                  Create Trip Request
                </button>
              </div>
            </div>

            {/* Open Requests */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Open Requests</h3>
                  <p className="text-sm text-slate-500">2 pending assignments</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input 
                    className="pl-9 pr-4 py-1.5 border rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500"
                    placeholder="Search requests..." 
                  />
                </div>
              </div>
              <div className="space-y-3">
                {requests.map(request => (
                  <div key={request.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">{request.requester}</p>
                          {request.priority === 'high' && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs font-medium">
                              High Priority
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{request.pickup} • {request.time}</p>
                        <p className="text-xs text-slate-600 mt-2">{request.notes}</p>
                      </div>
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full font-medium">
                        {request.status}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 px-3 border border-slate-300 rounded-lg hover:bg-slate-100 text-sm font-medium transition-colors">
                        Ping Team
                      </button>
                      <button className="flex-1 py-2 px-3 bg-slate-800 text-white rounded-lg hover:bg-slate-900 text-sm font-medium transition-colors">
                        Assign Driver
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Trips */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
              <h3 className="text-lg font-semibold mb-4">Active Trips</h3>
              <div className="space-y-3">
                {trips.map(trip => (
                  <div key={trip.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">{trip.requester}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-slate-400" />
                          <p className="text-xs text-slate-500">ETA: {trip.eta}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        trip.status === 'assigned' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {trip.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                      <MapPin className="h-3 w-3" />
                      <p>{trip.pickup} → {trip.dropoff}</p>
                    </div>
                    {trip.vehicle && (
                      <div className="mt-3 pt-3 border-t flex items-center justify-between">
                        <p className="text-xs font-medium">{trip.vehicle}</p>
                        <button className="text-xs text-slate-500 hover:text-slate-800">Track</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicle List */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Vehicle List</h3>
                  <p className="text-sm text-slate-500">2 available • 1 en route</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input 
                    className="pl-9 pr-4 py-1.5 border rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500"
                    placeholder="Search vehicles..." 
                  />
                </div>
              </div>
              <div className="space-y-2">
                {vehicles.map(vehicle => (
                  <div 
                    key={vehicle.id}
                    className={`p-4 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer transition-all ${
                      selectedVehicle?.id === vehicle.id ? 'ring-2 ring-slate-800' : 'hover:bg-slate-100'
                    }`}
                    onClick={() => setSelectedVehicle(vehicle)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          vehicle.status === 'available' ? 'bg-green-500' : 
                          vehicle.status === 'enroute' ? 'bg-blue-500' : 
                          'bg-orange-500'
                        }`} />
                        <div>
                          <p className="font-medium text-sm">{vehicle.name}</p>
                          <p className="text-xs text-slate-500">{vehicle.location}</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400">{vehicle.lastUpdate}</p>
                    </div>
                    {selectedVehicle?.id === vehicle.id && (
                      <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-2">
                        <button className="py-1.5 px-3 text-sm border rounded-lg hover:bg-slate-100">
                          View Details
                        </button>
                        <button className="py-1.5 px-3 text-sm bg-slate-800 text-white rounded-lg hover:bg-slate-900">
                          Assign Trip
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Notifications Panel */}
        <div className={`absolute inset-0 bg-white ${showNotifications ? 'block' : 'hidden'}`}>
          <div className="p-4 border-b flex items-center justify-between bg-slate-800 text-white">
            <h3 className="font-semibold">Notifications</h3>
            <button className="p-2 hover:bg-slate-700 rounded-full" onClick={() => setShowNotifications(false)}>
              <Menu className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 space-y-3">
            <div className="p-3 bg-red-50 text-red-800 rounded-lg text-sm border border-red-100 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 flex-shrink-0" />
              <p>Vehicle maintenance required for Park Overlook Vehicle</p>
            </div>
            <div className="p-3 bg-green-50 text-green-800 rounded-lg text-sm border border-green-100 flex items-start gap-3">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <p>Hope House Vehicle arrived at pickup location</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg text-sm border border-slate-200">
              Driver Mike Johnson started shift
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
