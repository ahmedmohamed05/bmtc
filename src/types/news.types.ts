export type News = {
    id: number;
    title: string;
    content: string;
    thumbnail_url: string | null;
    creatorId: number;
    updaterId: number;
    createdAt: Date;
    updatedAt: Date;
    viewsCounter: number;
}

export type NewsQueryRequest = {
    limit: number;
    offset: number;
};

export type NewsQueryResponse = {
    news: News[];
    limit: number;
    offset: number;
    hasMore: boolean;
    totalNewsLength: number;
};

export type NewsCountResponse = {
    count: number;
};

export type TopViewedNews = {
    id: number;
    title: string;
    viewsCounter: number;
    createdAt: string | Date;
};

export type NewsTopViewsResponse = {
    topViews: TopViewedNews[];
};
