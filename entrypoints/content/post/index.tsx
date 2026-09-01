import { useState } from "react";
import { useFormData } from "@/entrypoints/hooks/FormData";
import Header from "../common/header";
import type { IPost } from "../scripts/scrap";

export default function PostModal({
  posts,
  onRemove,
}: {
  posts: IPost[];
  onRemove: () => void;
}) {
  const { FormData } = useFormData();
  const [loading, setLoading] = useState(false);

 return (
  <div className="w-[700px] max-h-[700px] bg-gray-900 rounded-lg shadow-2xl overflow-hidden">

    <Header
      title="Post Insights"
      count={posts.length}
      onRemove={onRemove}
    />

    <div className="max-h-[620px] overflow-y-auto p-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-gray-800 rounded-lg p-4 mb-4"
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
      ))}
    </div>

  </div>
);
}