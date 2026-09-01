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
    const author =
      el.getAttribute("author") || "Anonymous";

    const score =
      el.getAttribute("score") || "0";

    const relativePermalink =
      el.getAttribute("permalink");

    const permalink = relativePermalink
      ? `https://www.reddit.com${relativePermalink}`
      : "";

    const id =
      el.getAttribute("thingid") ||
      el.getAttribute("id") ||
      "";

    const commentBody =
      el.querySelector('[slot="comment"]')
        ?.textContent?.trim() ||
      el.querySelector("p")
        ?.textContent?.trim() ||
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