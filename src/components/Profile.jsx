import { useEffect, useState } from "react";
import { api, getUser } from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const user = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, []);

  const change = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await api("/auth/change-password", { method: "POST", body: { user_id: user.user_id, old_password: oldPassword, new_password: newPassword } });
      setMsg("Password updated");
      setOldPassword("");
      setNewPassword("");
    } catch (e) {
      setMsg("Failed to update password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 grid place-items-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-bold mb-4">Profile</h1>
        <form onSubmit={change} className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Old password</label>
            <input value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} type="password" className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">New password</label>
            <input value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} type="password" className="w-full border rounded px-3 py-2" />
          </div>
          <button className="w-full bg-indigo-600 text-white py-2 rounded">Update password</button>
        </form>
        {msg && <div className="mt-3 text-sm text-gray-700">{msg}</div>}
      </div>
    </div>
  );
}
