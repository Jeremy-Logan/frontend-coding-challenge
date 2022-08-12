/**
 * A terrible database + repository implementation to back the API endpoints
 * This is intentionally implemented in Javascript instead of Typescript to prevent the client code from
 *   depending on types describing API data. The client code should treat the API like a black-box since
 *   that is how we currently work with our backend implemented in Laravel
 */

import axios from "axios";
import fs from "fs";

const CACHE_FILE = "dbCache.json";

// Default store: replaced by file-system cache
let store = {
  users: [],
  posts: [],
  comments: [],
};

// In order to prevent the DB resetting every time Next.js does a Fast Refresh, we have to persist the in-memory DB to disk
// The cache file is removed automatically when running `yarn dev`
const loadStore = () => {
  if (fs.existsSync(CACHE_FILE))
    store = JSON.parse(fs.readFileSync(CACHE_FILE, { encoding: "utf-8" }));
};
loadStore();

const saveStore = () => {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(store), { encoding: "utf-8" });
};

export const users = {
  get: async () => {
    // We only need to fetch the data from the third-party API once
    if (store.users.length > 0) return store.users;

    store.users = await axios
      .get("http://jsonplaceholder.typicode.com/users")
      .then((resp) =>
        resp.data.map((user) => ({
          ...user,
          avatar:
            Math.random() > 0.5
              ? `https://joeschmoe.io/api/v1/${user.username}`
              : null,
        }))
      );
    saveStore();
    return store.users;
  },
  getById: async (id) => {
    return (await users.get()).find((user) => user.id === id);
  },
};

export const comments = {
  get: async () => {
    // We only need to fetch the data from the third-party API once
    if (store.comments.length > 0) return store.comments;

    store.comments = await axios
      .get("http://jsonplaceholder.typicode.com/comments")
      .then(({ data: baseComments }) => {
        const comments = baseComments.map(({ name, email, ...comment }) => ({
          ...comment,
          userId: Math.ceil(Math.random() * 10),
        }));

        const postIdToDrop = Math.ceil(Math.random() * 100);
        return comments.filter(
          // Drop all the comments from a single post to guarantee the 0-comments case
          // Randomly drop all other comments for some variety in the data
          (c) => c.postId !== postIdToDrop && Math.random() > 0.5
        );
      });

    saveStore();
    return store.comments;
  },
  getByPostId: async (postId) => {
    return (await comments.get()).filter((cmt) => cmt.postId === postId);
  },
  getById: async (commentId) => {
    return (await comments.get()).find((cmt) => cmt.id === commentId);
  },
  create: async (comment) => {
    const nextId =
      (await comments.get()).reduce((acc, c) => (c.id > acc ? c.id : acc), 0) +
      1;
    const nextComment = { id: nextId, ...comment };
    store.comments.push(nextComment);
    saveStore();
    return nextComment;
  },
  edit: (comment) => {
    store.comments = store.comments.map((c) =>
      c.id === comment.id ? comment : c
    );
    saveStore();
  },
  delete: (commentId) => {
    store.comments = store.comments.filter((c) => c.id !== commentId);
    saveStore();
  },
};

export const posts = {
  get: async () => {
    // Because comments can be added and removed, we have to recalculate the comment aggregation on every query
    // Of course this is not very efficient, but it really doesn't matter for this purpose
    const getEnhancedPosts = async () => {
      const postComments = await comments.get();
      return store.posts.map((post) => ({
        ...post,
        commentCount: postComments.filter(
          (comment) => comment.postId === post.id
        ).length,
      }));
    };

    // // We only need to fetch the data from the third-party API once
    if (store.posts.length > 0) return await getEnhancedPosts();

    store.posts = await axios("http://jsonplaceholder.typicode.com/posts").then(
      (resp) =>
        // Our posts won't have a title and body may not be added
        resp.data.map(({ title, body, ...basePost }) => {
          // Randomly add image to basePost
          if (Math.random() > 0.5) {
            basePost.image = `https://picsum.photos/id/${basePost.id}/200/300`;
          }

          // If the basePost doesn't have an image, then it must have a body
          if (!basePost.image || Math.random() > 0.6) {
            basePost.body = body;
          }

          return basePost;
        })
    );

    saveStore();
    return await getEnhancedPosts();
  },
  getById: async (id) => {
    return (await posts.get()).find((post) => post.id === id);
  },
};
