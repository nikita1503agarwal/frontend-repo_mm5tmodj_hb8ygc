import { useEffect, useMemo, useState } from "react";
import { api, getUser } from "../lib/api";
import { useNavigate, useParams } from "react-router-dom";

export default function RoadmapDetail() {
  const { domain } = useParams();
  const [rm, setRm] = useState(null);
  const [error, setError] = useState("");
  const user = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    api(`/roadmaps/${domain}`).then(setRm).catch(()=>setError("Roadmap not found"));
  }, [domain]);

  const startAssessment = async (step, answerIndex) => {
    if (!user) return navigate("/login");
    try {
      const res = await api(`/assessment/submit`, {
        method: "POST",
        body: {
          user_id: user.user_id,
          domain,
          step_index: step.index,
          answer_index: answerIndex,
        },
      });
      alert(`Score: ${res.score}. ${res.passed ? "Passed" : "Try again"}`);
    } catch (e) {
      alert("Error: " + (e.message || "Submission failed"));
    }
  };

  if (!rm) return (
    <div className="min-h-screen grid place-items-center">
      <div className="text-gray-600">Loading roadmap...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">{rm.title}</h1>
        <p className="text-gray-600 mb-6">{rm.description}</p>
        <div className="space-y-4">
          {rm.steps.map((s) => (
            <div key={s.index} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{s.index + 1}. {s.title}</h3>
                  <p className="text-sm text-gray-600">{s.description}</p>
                </div>
                {s.youtube_url && (
                  <a className="text-indigo-600" href={s.youtube_url} target="_blank">Watch</a>
                )}
              </div>
              {s.assessment_question && (
                <div className="mt-3">
                  <div className="text-sm font-medium">Assessment:</div>
                  <div className="text-sm mb-2">{s.assessment_question}</div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {s.assessment_options?.map((opt, idx) => (
                      <button key={idx} onClick={() => startAssessment(s, idx)} className="px-3 py-2 border rounded hover:bg-gray-50 text-left">
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
