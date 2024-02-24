import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import dotenv from "dotenv";

// Initialize configuration
dotenv.config();

const NEWS_API_KEY: string | undefined = process.env.NEWS_API_KEY;
const NEWS_API_URL: string | undefined = process.env.NEWS_API_URL;
const NEWS_API_COUNTRY: string | undefined = process.env.NEWS_API_COUNTRY;

if (!NEWS_API_KEY) throw new Error("NewsAPI Key not defined");
if (!NEWS_API_URL) throw new Error("NewsAPI URL not defined");
if (!NEWS_API_COUNTRY) throw new Error("NewsAPI Country not defined");

export const axiosInstance = axios.create({
  baseURL: NEWS_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

if (!NEWS_API_KEY) throw new Error("NewsAPI not defined");

axiosInstance.interceptors.request.use(
  (
    req: InternalAxiosRequestConfig<any>,
  ):
    | InternalAxiosRequestConfig<any>
    | Promise<InternalAxiosRequestConfig<any>> => {
    function addQueryParams(
      url: string | undefined,
      key: string,
      value: string,
    ): string | undefined {
      if (!url?.includes(key)) {
        url += url?.includes("?") ? "&" : "?";
        url += `${key}=${value}`;
      }
      return url;
    }

    req.url = addQueryParams(req.url, "apiKey", NEWS_API_KEY);
    req.url = addQueryParams(req.url, "country", NEWS_API_COUNTRY);

    return req;
  },
);

export function getCategories(): Array<string> {
  return [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];
}

function checkCategory(category: string): boolean {
  const categories = getCategories();
  return categories.includes(category);
}

function joinCategories(categories: string[]): string {
  return categories.join(",");
}

export async function getTopHeadlines(
  categories: string[],
): Promise<AxiosResponse<any, any> | undefined> {
  const validCategories = categories.filter(checkCategory);
  const joinedCategories = joinCategories(validCategories);
  try {
    const response = await axiosInstance.get("/top-headlines", {
      params: {
        source: "the-next-web",
        sortBy: "latest",
        category: joinedCategories,
      },
    });
    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return err.response;
    }
  }
}
