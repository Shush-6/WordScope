export interface IPost {
  title: string;
  link: string;
  comment: string | null;
  tag: string | null;
  description: string | null;
  score: string | null;
  id: number;
}

export interface IComment {
  author: string;
  comment: string;
  permalink: string;
  id: string;
  score: string;
}

export function extractRedditPostsFromDOM(): IPost[] {
  const postElements =
    document.querySelectorAll<HTMLElement>("shreddit-post");

  const postData: IPost[] = [];

  postElements.forEach((postElement, index) => {
    const title =
      postElement.getAttribute("post-title")?.trim() ||
      postElement.querySelector('[slot="title"]')?.textContent?.trim() ||
      "";

    const relativePermalink =
      postElement.getAttribute("permalink");

    const link = relativePermalink
      ? `https://www.reddit.com${relativePermalink}`
      : "";

    const comment =
      postElement.getAttribute("comment-count") || null;

    const tag =
      postElement.getAttribute("subreddit-prefixed-name") ||
      postElement.getAttribute("subreddit-name") ||
      null;

    const paragraphs =
      postElement.querySelectorAll(
        "shreddit-post-text-body p"
      );

    const description =
      Array.from(paragraphs)
        .map((p) => p.textContent?.trim() || "")
        .join("\n\n") || null;

    const score =
      postElement.getAttribute("score") || null;

    postData.push({
      title,
      link,
      comment,
      tag,
      description,
      score,
      id: index + 1,
    });
  });

  return postData;
}

export function extractRedditCommentsFromDOM(): IComment[] {
  const commentElements =
    document.querySelectorAll<HTMLElement>("shreddit-comment");

  const commentData: IComment[] = [];

  commentElements.forEach((el) => {
    // 1. Author attribute
    const author = el.getAttribute("author") || "Anonymous";

    // 2. Score attribute
    const score = el.getAttribute("score") || "0";

    // 3. ID / thingid attribute
    const id =
      el.getAttribute("thingid") ||
      el.getAttribute("id") ||
      "";

    // 4. Permalink construction
    const relativePermalink = el.getAttribute("permalink");
    const permalink = relativePermalink
      ? `https://www.reddit.com${relativePermalink}`
      : "";

    // 5. Extract Comment Content
    // Prefers slot="comment" content; falls back to paragraph text or overall content container text
    const commentContainer =
      el.querySelector('[slot="comment"]') ||
      el.querySelector('[id*="-comment-rtjson-content"]');

    const commentBody =
      commentContainer?.textContent?.trim() ||
      el.querySelector("p")?.textContent?.trim() ||
      "";

    commentData.push({
      author,
      comment: commentBody,
      permalink,
      id,
      score,
    });
  });

  return commentData;
}