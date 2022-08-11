const axios = require("axios");
// Local imports
const { bbcParser, theGuardianParser, alJazeeraParser } = require("./parsing");

function fetchNews(url) {
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((err) => console.log(err));
}

const fetchAndParseAllNews = (newspapers) => {
  const articles = [];

  newspapers.forEach((outlet) => {
    fetchNews(outlet.url).then((data) => {
      switch (outlet.slug) {
        case "bbc":
          const bbcArticles = bbcParser(data);
          articles.push(...bbcArticles);
          break;
        case "guardian":
          const theGuardianArticles = theGuardianParser(data);
          articles.push(...theGuardianArticles);
          break;
        case "aljazeera":
          const alJazeeraArticles = alJazeeraParser(data);
          articles.push(...alJazeeraArticles);
          break;
        default:
          break;
      }
    });
  });

  return articles;
};

module.exports = { fetchNews, fetchAndParseAllNews };
