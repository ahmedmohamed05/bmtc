
export type Event = {
  id: number;
  title: string;
  content: string;
  eventDate: Date;
  createdAt: Date;
  updatedAt: Date;
  viewsCounter: number;
  images: string[];
};

export type EventQueryRequest = {
  limit: number;
  offset: number;
};

export type EventQueryResponse = {
  events: Event[];
  limit: number;
  offset: number;
  hasMore: boolean;
  totalEventsLength: number;
};

export type EventCountResponse = {
  total: number;
  upcoming: number;
  passed: number;
};

export type TopViewedEvent = Omit<Event, "images">;

export type EventsTopViewsResponse = {
  topViews: TopViewedEvent[];
};
