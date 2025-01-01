//a70790f630344454af4217955baa770a
// https://newsapi.org/docs

import { useState, useEffect } from 'react';
import './news.scss';

const News = () => {
  const [stockNews, setStockNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_KEY = 'a70790f630344454af4217955baa770a';
  
  const fetchNews = async (query) => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      
      const data = await response.json();
      return data.articles.slice(0, 5); // Get top 5 latest news items
    } catch (err) {
      throw new Error(`Error fetching ${query} news: ${err.message}`);
    }
  };

  useEffect(() => {
    const fetchAllNews = async () => {
      setLoading(true);
      try {
        const [stockResults] = await Promise.all([
          fetchNews('(RELIANCE OR TATA OR INFOSYS) AND stocks')
        ]);
        setStockNews(stockResults);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllNews();
    
    // Refresh news every 5 minutes
    const interval = setInterval(fetchAllNews, 300000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="trending-news__loading">Loading latest news...</div>;
  }

  if (error) {
    return <div className="trending-news__error">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="trending-news__section">
        <h2 className="trending-news__heading">Indian Stock Market News</h2>
        {stockNews.map((article, index) => (
          <div key={index} className="trending-news__card">
            <h3 className="trending-news__title">{article.title}</h3>
            <p className="trending-news__description">{article.description}</p>
            <p className="trending-news__metadata">
              {article.author ? `By ${article.author} • ` : ''}
              {new Date(article.publishedAt).toLocaleDateString()}
            </p>
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="trending-news__link"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;