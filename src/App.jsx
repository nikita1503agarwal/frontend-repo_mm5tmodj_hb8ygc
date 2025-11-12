import { Link } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Lernify Road</h1>
        <p className="text-gray-600 mb-6">Choose a domain, follow a roadmap, watch recommended videos, and complete step-by-step assessments to track your progress.</p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/login" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Login</Link>
          <Link to="/register" className="px-4 py-2 bg-gray-200 rounded-lg">Register</Link>
          <Link to="/roadmaps" className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg">Browse Roadmaps</Link>
        </div>
      </div>
    </div>
  );
}

export default App
