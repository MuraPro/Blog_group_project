export type TUploadFile = {
  uid: string;
  name: string;
  url: string;
  type: string;
  status: string;
};

// POST http://localhost:3001/api/blogs
export type TMutationBlog = {
  title: string;
  backgroundImage: TUploadFile;
  userId: string;
};

// GET http://localhost:3001/api/blogs
export type TArrayBlog = TQueryBlog[];

// GET http://localhost:3001/api/blogs/{blogId}
export type TQueryBlog = {
  title: string;
  backgroundImage: TUploadFile;
  userId: string;
  createdAt: number;
  id: string;
};

// POST http://localhost:3001/api/blogs/{blogId}/articles
export type TMutationArticle = {
  title: string;
  body: string;
  tags: string[];
  uploads: TUploadFile[];
  userId: string;
};

// GET http://localhost:3001/api/blogs/{blogId}/articles
export type TArrayArticle = TQueryArticle[];

// GET http://localhost:3001/api/blogs/{blogId}/articles/{articleId}
export type TQueryArticle = {
  blogId: string;
  id: string;
  title: string;
  body: string;
  createdAt: string;
  tags: string[];
  uploads: TUploadFile[];
  userId: string;
};

// POST http://localhost:3001/api/articles/{articleId}/comments
export type TMutationComment = {
  body: string;
  userId: string;
};

// GET http://localhost:3001/api/articles/{articleId}/comments
export type TArrayComment = TQueryComment[];

// GET http://localhost:3001/api/articles/{articleId}/comments/{commentId}
export type TQueryComment = {
  articleId: string;
  id: string;
  body: string;
  userId: string;
  createdAt: string;
};

// GET http://localhost:3001/api/users/{userId}
export type TQueryUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarImage?: string;
  password: string;
};

// POST http://localhost:3001/api/users/{userId}
// POST http://localhost:3001/api/login
// POST http://localhost:3001/api/register
export type TMutationUser = {
  email: string;
  firstName: string;
  lastName: string;
  avatarImage: string;
};

export type TUserResponse = {
  accessToken: string;
  user: TQueryUser;
};

// POST http://localhost:3001/register
export type TRegistrationUser = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};
// POST http://localhost:3001/signin
export type TAuthorizationUser = {
  email: string;
  password: string;
};
