import { useState } from "react";
import { useFormData } from "@/entrypoints/hooks/FormData";
import Header from "../common/header";

export default function PostModal({
  posts,
  onRemove,
}: {
  posts: any;
  onRemove: () => void;
}) {
  const { FormData } = useFormData();
  const [loading, setLoading] = useState(false);

  console.log("formData", FormData);

  const postData = [
    {
      id: 1,
      tag: "Technology",
      title: "Revolution",
      description: "Explore",
      score: 450,
    },
  ];

  return (
    <div className="dark bg-gray-900 w-[700px]">
      <div
        id="reddit-modal"
        className="bg-card dark:bg-card-dark rounded-lg shadow-lg p-4"
      >
        <Header
          title="Post Insights"
          count={postData.length}
          onRemove={onRemove}
        />

        {loading && (
          <p className="text-gray-500 dark:text-gray-400">
            Loading...
          </p>
        )}

        <div className="px-2 flex-1 overflow-auto">
          {postData.map((post) => (
            <div
              key={post.id}
              className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4"
            >
              <div className="flex flex-col relative">
                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">{post.tag}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2">
                {post.title}
              </h3>

              <span className="text-gray-700 dark:text-gray-300">
                {post.description}
              </span>

              <span className="block text-sm text-gray-500 dark:text-gray-400">
                Score: {post.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}