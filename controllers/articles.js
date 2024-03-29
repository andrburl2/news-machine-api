const Card = require('../models/article');

const Unauthorized = require('../errors/unauthorized');
const NotFound = require('../errors/not-found');

module.exports.getArticles = (req, res, next) => {
  Card.find({ owner: req.user._id })
    .then((articles) => res.send({ status: 200, data: articles }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Card.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.status(201).send({
      status: 201,
      keyword: article.keyword,
      title: article.title,
      text: article.text,
      date: article.date,
      source: article.source,
      link: article.link,
      image: article.image,
      id: article.id,
    }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Card.findById(req.params.articleId)
    .select('+owner')
    .then((article) => {
      if (article) {
        if (req.user._id.toString() === article.owner.toString()) {
          Card.deleteOne(article)
            .then(() => res.send({ status: 200 }));
        } else {
          throw new Unauthorized('Нельзя удалить чужую статью');
        }
      } else {
        throw new NotFound('Не удается найти статью');
      }
    })
    .catch(next);
};