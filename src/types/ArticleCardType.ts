export type ArticleCardType = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  tags?: string[];
  uploads?: unknown[];
  author: {
    avatarImage: string;
    userName: string;
  };
};
