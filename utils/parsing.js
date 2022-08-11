const cheerio = require("cheerio");

const theGuardianParser = (html) => {
  let theGuardianNews = [];
  const $ = cheerio.load(html);

  $("div.fc-item__container")
    .map((i, item) => {
      const obj = {
        title: $(item).find("a.fc-item__link").text().trim(),
        url: $(item).find("a.fc-item__link").attr("href"),
        summary: $(item).find("div.fc-item__standfirst").text().trim(),
        image: $(item).find("img.responsive-img").attr("src"),
        source: "The Guardian",
      };

      theGuardianNews.push(obj);
    })
    .get();

  return theGuardianNews;
};

const alJazeeraParser = (html) => {
  let alJazeeraNews = [];
  const base = "https://www.aljazeera.com";
  const $ = cheerio.load(html);

  $("article.gc--type-post")
    .map((i, item) => {
      const obj = {
        title: $(item).find("a.u-clickable-card__link").text().trim(),
        url: base + $(item).find("a.u-clickable-card__link").attr("href"),
        summary: $(item).find("div.gc__excerpt").find("p").text().trim(),
        image:
          base +
          $(item)
            .find("div.gc__image-wrap")
            .find("div.responsive-image")
            .find("img.gc__image")
            .attr("src"),
        source: "Al Jazeera",
      };

      alJazeeraNews.push(obj);
    })
    .get();
  return alJazeeraNews;
};

const bbcParser = (html) => {
  let bbcNews = [];
  const base = "https://www.bbc.com";
  const $ = cheerio.load(html);

  $("div.gs-c-promo")
    .map((i, item) => {
      // Check if url includes 'bbc.com'
      let isCompleteUrl = $(item)
        .find("a.gs-c-promo-heading")
        .attr("href")
        .includes(base);

      const obj = {
        title: $(item).find("h3.gs-c-promo-heading__title").text(),
        url: isCompleteUrl
          ? $(item).find("a.gs-c-promo-heading").attr("href")
          : base + $(item).find("a.gs-c-promo-heading").attr("href"),
        summary: $(item).find("p.gs-c-promo-summary").text(),
        image: $(item)
          .find("div.gs-c-promo-image")
          .find("div.gs-o-media-island")
          .find("div.gs-o-responsive-image")
          .find("img")
          .attr("data-src"),
        source: "BBC",
      };

      bbcNews.push(obj);
    })
    .get();

  return bbcNews;
};

module.exports = { bbcParser, theGuardianParser, alJazeeraParser };
