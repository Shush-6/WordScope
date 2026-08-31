import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import Header from "../common/header";

export default function CommentModal({
  posts,
  comments,
  onRemove,
}: {
  posts: any;
  comments: any;
  onRemove: () => void;
}) {
  const [loading] = useState(false);

  const commentData = [
    {
      id: 1,
      author: "Technology",
      comment: "Revolution",
      score: 450,
    },
  ];

  const markdownContent = `
Hello world!

- Item 1
- Item 2
- Item 3
`;

  return React.createElement(
    "div",
    { className: "dark bg-gray-900 w-[700px]" },
    React.createElement(
      "div",
      {
        id: "reddit-modal",
        className: "bg-card dark:bg-card-dark rounded-lg shadow-lg p-4",
      },
      React.createElement(Header, {
        title: "Comments Insights",
        count: commentData.length,
        onRemove,
      }),
      loading &&
        React.createElement(
          "p",
          { className: "text-gray-500 dark:text-gray-400" },
          "Loading..."
        ),
      React.createElement(
        "div",
        { className: "overflow-y-auto p-4 text-gray-700 dark:text-gray-300" },
        React.createElement(ReactMarkdown, null, markdownContent)
      ),
      React.createElement(
        "div",
        { className: "px-2 flex-1 overflow-auto" },
        ...commentData.map((comment: any) =>
          React.createElement(
            "div",
            {
              key: comment.id,
              className: "bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4",
            },
            React.createElement(
              "div",
              { className: "flex items-center justify-between mb-2" },
              React.createElement(
                "span",
                { className: "font-semibold text-sm text-gray-500 dark:text-gray-400" },
                comment.author
              ),
              React.createElement(
                "span",
                { className: "text-sm text-gray-500 dark:text-gray-400" },
                `Score: ${comment.score}`
              )
            ),
            React.createElement(
              "p",
              { className: "text-gray-700 dark:text-gray-300" },
              comment.comment
            )
          )
        )
      )
    )
  );
}