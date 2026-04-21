import type { EventCountResponse, EventQueryRequest, EventQueryResponse, EventsTopViewsResponse } from "../types/events.types";
import apiClient from "./api-client.services";
export default class EventsServices {
  private static endpoint_m = "/events";

  static async getEvents(query: EventQueryRequest) {
    const { limit, offset } = query;
    const endpoint = this.endpoint_m + `/?limit=${limit}&offset=${offset}`;

    const ret = await apiClient<EventQueryResponse>(endpoint);

    return ret;
  }

  static async getEventsCount() {
    const endpoint = this.endpoint_m + "/count";
    const ret = await apiClient<EventCountResponse>(endpoint);
    return ret;
  }

  static async getTopViewedEvents() {
    const endpoint = this.endpoint_m + "/top-views";
    return apiClient<EventsTopViewsResponse>(endpoint, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    });
  }
}
