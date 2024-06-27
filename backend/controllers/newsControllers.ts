import axios from "axios";

const API_KEY = process.env.NEWS_API_KEY || "";

interface News {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  content: string;
}

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth()).padStart(2, "0"); // getMonth() returns 0-11
const day = String(currentDate.getDate()).padStart(2, "0");
const today = `${year}-${month}-${day}`;
export const newsControllers = {
  getNews: async ({ coinName }: { coinName: string }) => {
    try {
      const news = await axios.get(
        `https://newsapi.org/v2/everything?q=${coinName}&from=${today}&sortBy=publishedAt&apiKey=${API_KEY}`
      );
      console.log(today, API_KEY, coinName);
      //   console.log(news, "this is the news");

      const newsData: News[] = news.data.articles;
      console.log(newsData);
    } catch (error) {
      console.log(error);
    }
  },
};
