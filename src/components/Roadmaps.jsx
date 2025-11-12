import { useEffect, useState } from "react";
import { api, getUser } from "../lib/api";
import { Link, useNavigate } from "react-router-dom";

export default function Roadmaps() {
  const [items, setItems] = useState([]);
  const user = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    api("/roadmaps").then(setItems);
  }, []);

  const choose = async (domain) => {
    if (!user) return navigate("/login");
    await api(`/user/domain?user_id=${user.user_id}`, { method: "POST", body: { domain } });
    navigate(`/roadmaps/${domain}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Choose your domain</h1>
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((it) => (
            <div key={it._id} className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold">{it.title}</h2>
              <p className="text-sm text-gray-600 mb-3">{it.description}</p>
              <div className="flex justify-between">
                <Link to={`/roadmaps/${it.domain}`} className="text-indigo-700">View roadmap</Link>
                <button onClick={() => choose(it.domain)} className="px-3 py-2 bg-indigo-600 text-white rounded">Select</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
