import type {
  NewsCountResponse,
  NewsQueryRequest,
  NewsQueryResponse,
  NewsTopViewsResponse,
} from "../types/news.types";
import apiClient from "./api-client.services";

export default class NewsServices {
  private static endpoint_m = "/news";


  static async getNews(query: NewsQueryRequest) {
    const { limit, offset } = query;
    const endpoint = this.endpoint_m + `/?limit=${limit}&offset=${offset}`;

    const ret = await apiClient<NewsQueryResponse>(endpoint);

    return ret;
  }

  static async getNewsCount() {
    const endpoint = this.endpoint_m + "/count";
    const ret = await apiClient<NewsCountResponse>(endpoint);
    return ret;
  }

  static async getTopViewedNews() {
    const endpoint = this.endpoint_m + "/top-views";
    return apiClient<NewsTopViewsResponse>(endpoint, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    });
  }
}
