const Card = require('../models/article');

const UnauthorizedError = require('../errors/unauthorized-error');
const NotFoundError = require('../errors/not-found-error');

module.exports.getArticles = (req, res, next) => {
  Card.find({})
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Card.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.send({
      keyword: article.keyword,
      title: article.title,
      text: article.text,
      date: article.date,
      source: article.source,
      link: article.link,
      image: article.image,
    }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Card.findById(req.params.articleId).select('+owner')
    .then((article) => {
      if (article) {
        if (req.user._id.toString() === article.owner.toString()) {
          Card.deleteOne(article)
            .then(() => res.send(article));
        } else {
          throw new UnauthorizedError('Нельзя удалить чужую статью');
        }
      } else {
        throw new NotFoundError('Не удается найти статью');
      }
    })
    .catch(next);
};
