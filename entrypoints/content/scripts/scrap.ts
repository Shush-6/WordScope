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

    const relativePermalink = postElement.getAttribute("permalink");

    const link = relativePermalink
      ? `https://www.reddit.com${relativePermalink}`
      : "";

    const comment = postElement.getAttribute("comment-count") || null;

    const tag =
      postElement.getAttribute("subreddit-prefixed-name") ||
      postElement.getAttribute("subreddit-name") ||
      null;

    const paragraphs = postElement.querySelectorAll(
      "shreddit-post-text-body p"
    );

    const description =
      Array.from(paragraphs)
        .map((p) => p.textContent?.trim() || "")
        .join("\n\n") || null;

    const score = postElement.getAttribute("score") || null;

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
    const author = el.getAttribute("author") || "Anonymous";
    const score = el.getAttribute("score") || "0";
    const id =
      el.getAttribute("thingid") ||
      el.getAttribute("id") ||
      "";

    const relativePermalink = el.getAttribute("permalink");
    const permalink = relativePermalink
      ? `https://www.reddit.com${relativePermalink}`
      : "";

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

/**
 * Robust JSON extraction function that handles:
 * 1. Markdown code blocks (```json [...] ``` or ``` [...] ```)
 * 2. Pure raw JSON strings ([...] or {...})
 */
export function extractJsonListFromMarkdown(markdown: string): IPost[] {
  if (!markdown || typeof markdown !== "string") {
    return [];
  }

  const trimmed = markdown.trim();

  // 1. Try direct JSON parse (for raw JSON or responseMimeType outputs)
  try {
    const parsed = JSON.parse(trimmed);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    // Continue to fallback parsing strategies if direct parse fails
  }

  // 2. Extract content from code blocks: ```json ... ``` or ``` ... ```
  const codeBlockRegex = /```(?:json)?\s*\n?([\s\S]*?)\n?```/i;
  const match = trimmed.match(codeBlockRegex);

  if (match && match[1]) {
    try {
      const parsed = JSON.parse(match[1].trim());
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (error) {
      console.error("Failed to parse JSON inside markdown block:", error);
    }
  }

  // 3. Fallback: Search for outer brackets [...] in unformatted text
  const bracketMatch = trimmed.match(/\[\s*\{[\s\S]*\}\s*\]/);
  if (bracketMatch) {
    try {
      const parsed = JSON.parse(bracketMatch[0]);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      // Ignore fallback failures
    }
  }

  return [];
}