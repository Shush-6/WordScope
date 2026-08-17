import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useFormData } from "@/entrypoints/hooks/FormData";
import { toast } from "react-hot-toast";
export default function ApiCredentialsForm() {
  const { FormData, setFormData} = useFormData();
  const [endpoint, setEndpoint] = useState(FormData?.endpoint);
  const [apiKey, setApiKey] = useState(FormData?.apiKey);
  const [showKey, setShowKey] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!endpoint || !apiKey) {
      toast.error("Please fill in both fields");
      return;
    }

    setError("");
    setSaving(true);

    const data = {
    endpoint,
    apiKey
  };

  await chrome.storage.local.set({
    FormData: data
  });

  setFormData(data);

  setTimeout(()=>setSaving(false), 2000);
  setSaved(true);
  setTimeout(()=>toast.success("Saved successfully!"), 2000);
  setSaved(false);
  setTimeout(()=>setEndpoint(""), 2000);
  setTimeout(()=>setApiKey(""), 2000);
  // setTimeout(() => setSaved(false), 2000);
  };
console.log(FormData);

  return (
    <div className="w-[400px] p-6">
      <h2 className="text-lg font-semibold mb-1">API Settings</h2>
      <p className="text-sm text-gray-500 mb-4">Connect to your API</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1" htmlFor="endpoint">
            Endpoint URL
          </label>
          <input
            id="endpoint"
            type="text"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="https://api.example.com"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1" htmlFor="apiKey">
            API Key
          </label>
          <div className="relative">
            <input
              id="apiKey"
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              className="w-full border border-gray-300 rounded px-3 py-2 pr-9 text-sm focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-2 top-2.5 text-gray-400"
            >
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white rounded px-3 py-2 text-sm hover:bg-blue-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : saved ? "Saved!" : "Save"}
        </button>
      </form>
    </div>
  );
}
