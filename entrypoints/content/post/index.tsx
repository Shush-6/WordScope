import { useState } from "react";
import { useFormData } from "@/entrypoints/hooks/FormData";
import Header from "../common/header";
import { extractJsonListFromMarkdown, type IPost } from "../scripts/scrap";
import Search from "../common/search";
import axios from "axios";
import { CustomToast } from "../common/CustomToast";

export default function PostModal({
  posts,
  onRemove,
}: {
  posts: IPost[];
  onRemove: () => void;
}) {
  const { FormData } = useFormData();
  const [loading, setLoading] = useState(false);
  const [geminiResponse, setGeminiResponse] = useState<IPost[] | null>(null);

  const handlePostClick = (post: IPost) => {
    if (post.link) {
      window.open(post.link, "_blank", "noopener,noreferrer");
    }
  };

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setGeminiResponse(null);
      return;
    }

    if (!FormData?.apiKey) {
      CustomToast({
        message: "Gemini API key is missing. Check your settings.",
        status: "error",
      });
      return;
    }

    setLoading(true);

const DEFAULT_BASE = "https://generativelanguage.googleapis.com/v1beta";
const MODEL = "gemini-flash-latest";

let base = FormData?.endpoint?.trim() || DEFAULT_BASE;
base = base.replace(/\/models\/.*$/, "").replace(/\/+$/, "");

const endpoint = `${base}/models/${MODEL}:generateContent`;
const url = `${endpoint}?key=${encodeURIComponent(FormData.apiKey.trim())}`;

    const payload = {
      systemInstruction: {
  parts: [
    {
      text: "You are a post matching assistant. Match user prompts against a dataset of posts and return matching posts as a raw JSON array.",
    },
  ],
},
      generationConfig: {
        responseMimeType: "application/json",
      },
      contents: [
        {
          parts: [
            {
              text: `Search query: "${searchQuery}"\n\nDataset: ${JSON.stringify(posts)}`,
            },
          ],
        },
      ],
    };

    try {
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const rawText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (rawText) {
        // Fallback safely to JSON.parse if raw JSON is returned without markdown block tags
        let extractData: IPost[] = [];
        try {
          extractData = JSON.parse(rawText);
        } catch {
          extractData = extractJsonListFromMarkdown(rawText) as IPost[];
        }

        console.info("Extracted Data:", extractData);
        setGeminiResponse(Array.isArray(extractData) ? extractData : []);
      } else {
        setGeminiResponse([]);
      }
    } catch (error: any) {
      console.error("Gemini Error:", error?.response?.data || error);
      
      const apiErrorMessage = error?.response?.data?.error?.message;
      CustomToast({
        message: apiErrorMessage || "An error occurred while fetching Gemini response.",
        status: "error",
      });
      setGeminiResponse([]);
    } finally {
      setLoading(false);
    }
  };

  const displayPosts = geminiResponse !== null ? geminiResponse : posts;

  return (
    <div className="w-[700px] max-h-[700px] bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
      <Header
        title="Post Insights"
        count={displayPosts.length}
        onRemove={onRemove}
      />

      <Search handleSearch={handleSearch} />

      <div className="max-h-[620px] overflow-y-auto p-4">
        {loading ? (
          <div className="text-center text-gray-400 py-8">Searching posts...</div>
        ) : displayPosts.length === 0 ? (
          <div className="text-center text-gray-400 py-8">No matching posts found.</div>
        ) : (
          displayPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => handlePostClick(post)}
              className="bg-gray-800 hover:bg-gray-700 cursor-pointer rounded-lg p-4 mb-4 transition-colors"
            >
              <div className="text-sm text-gray-400 mb-2">
                {post.tag}
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">
                {post.title}
              </h3>

              {post.description && (
                <p className="text-gray-300 mb-3">
                  {post.description}
                </p>
              )}

              <span className="text-sm text-gray-400">
                Score: {post.score}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}