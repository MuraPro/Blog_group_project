export type DateConversionType = (date: string) => string;

export type ArticleCardType = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  tags?: string[];
  uploads?: unknown[];
  date: string;
  author: {
    avatarImage: string;
    userName: string;
  };
};

// POST http://localhost:3001/blogs
export type CardBlogPropertiesType = {
  id: number;
  title: string;
  backgroundImage: string;
  date: string;
  author: {
    userName: string;
    avatarImage: string;
  };
};

// GET http://localhost:3001/blogs/
export type TArrayBlog = TQueryBlog[];

// GET http://localhost:3001/blogs/{blogId}
export type TQueryBlog = {
  title: string;
  backgroundImage: string;
  author: {
    userName: string;
    avatarImage: string;
  };
  createdAt: number;
  id: string;
};

// POST http://localhost:3001/blogs/{blogId}/articles
export type TMutationArticle = {
  title: string;
  body: string;
  tags: string[];
  uploads: string[];
  author: {
    userName: string;
    avatarImage: string;
  };
};

// GET http://localhost:3001/blogs/{blogId}/articles
export type TArrayArticle = TQueryArticle[];

// GET http://localhost:3001/blogs/{blogId}/articles/{articleId}
export type TQueryArticle = {
  blogId: string;
  id: string;
  title: string;
  body: string;
  createdAt: string;
  tags: string[];
  uploads: string[];
  author: {
    userName: string;
    avatarImage: string;
  };
};

// POST /articles/{articleId}/comments
export type TMutationComment = {
  body: string;
  author: {
    userName: string;
    avatarImage: string;
  };
};

// GET /articles/{articleId}/comments
export type TArrayComment = TQueryComment[];

// GET /articles/{articleId}/comments/{commentId}
export type TQueryComment = {
  id: number;
  articleId: string;
  body: string;
  author: {
    userName: string;
    avatarImage: string;
  };
};
