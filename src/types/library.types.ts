export type Book = {
  id: number;
  title: string;
  author: string;
  description: string;
  coverUrl: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  viewsCounter: number;
};

export type LibraryQueryRequest = {
  limit: number;
  offset: number;
};

export type LibraryQueryResponse = {
  books: Book[];
  limit: number;
  offset: number;
  hasMore: boolean;
  totalBooksLength: number;
};

export type LibraryCountResponse = {
  count: number;
};

export type TopViewedBook = {
  id: number;
  title: string;
  author: string;
  viewsCounter: number;
  createdAt: string | Date;
};

export type LibraryTopViewsResponse = {
  topViews: TopViewedBook[];
};
