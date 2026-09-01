import React from "react";
import Header from "../common/header";
import type { IComment, IPost } from "../scripts/scrap";
import Search from "../common/search";
export default function CommentModal({
  posts,
  comments,
  onRemove,
}: {
  posts: IPost[];
  comments: IComment[];
  onRemove: () => void;
}) {
  return React.createElement(
    "div",
    {
      style: {
        width: "700px",
        maxHeight: "700px",
        backgroundColor: "#111827",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
      },
    },
    React.createElement(Header, {
      title: "Comments Insights",
      count: comments.length,
      onRemove,
    }),
    React.createElement(Search, { handleSearch: () => {} }),
    React.createElement(
      "div",
      {
        style: {
          maxHeight: "640px",
          overflowY: "auto",
          padding: "16px",
        },
      },
      comments.map((comment) =>
        React.createElement(
          "div",
          {
            key: comment.id,
            style: {
              backgroundColor: "#1f2937",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px",
            },
          },
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              },
            },
            React.createElement(
              "span",
              {
                style: {
                  color: "#9ca3af",
                  fontSize: "14px",
                  fontWeight: 600,
                },
              },
              comment.author
            ),
            React.createElement(
              "span",
              {
                style: {
                  color: "#9ca3af",
                  fontSize: "14px",
                },
              },
              `Score: ${comment.score}`
            )
          ),
          React.createElement(
            "p",
            {
              style: {
                color: "#d1d5db",
                margin: 0,
                lineHeight: "1.5",
              },
            },
            comment.comment
          )
        )
      )
    )
  );
}
