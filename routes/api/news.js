const express = require("express");
const router = express.Router();
const { fetchAndParseAllNews } = require("../../utils/async");
const { outlets } = require("../../utils/news_outlets");

const articles = fetchAndParseAllNews(outlets);

// @route  GET news
// @desc   Get all news
// @access Public

router.get("/", (req, res) => {
  res.json({ message: "request received", data: articles });
});

// @route  GET news/:newspaperSlug
// @desc   Get specific news
// @access Public

router.get("/:newspaperSlug", (req, res) => {
  try {
    const filteredNewspaper = outlets.filter(
      (newspaper) => newspaper.slug == req.params.newspaperSlug
    )[0];

    if (!filteredNewspaper) {
      return res
        .status(404)
        .json({ msg: "Couldn't find any newspapers with this id" });
    }

    const specificArticles = articles.filter(
      (article) => article.source == filteredNewspaper.name
    );

    res
      .json({ message: "request received", data: specificArticles })
      .catch((err) => console.log(err));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
