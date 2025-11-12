import { useEffect, useState } from "react";
import { api, getUser, logout } from "../lib/api";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const user = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/login");
    api(`/user/${user.user_id}/dashboard`).then(setData).catch(()=>{});
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Welcome, {data?.profile?.name || user.name}</h1>
          <div className="space-x-2">
            <Link to="/roadmaps" className="px-3 py-2 bg-indigo-600 text-white rounded">Browse Roadmaps</Link>
            <button onClick={()=>{logout();navigate('/login');}} className="px-3 py-2 bg-gray-200 rounded">Logout</button>
          </div>
        </div>
        {data?.roadmap ? (
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">{data.roadmap.title}</h2>
                <p className="text-sm text-gray-600">Progress: {data.roadmap.progress_percent}%</p>
              </div>
              <Link to={`/roadmaps/${data.profile.domain}`} className="px-3 py-2 bg-indigo-50 text-indigo-700 rounded">Continue</Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="mb-4">You haven't selected a domain yet.</p>
            <Link to="/roadmaps" className="px-4 py-2 bg-indigo-600 text-white rounded">Choose a domain</Link>
          </div>
        )}
      </div>
    </div>
  );
}
