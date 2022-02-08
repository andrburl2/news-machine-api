const articleRouter = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

const { validateArticle, validateObjectId } = require('../assets/joi-schemes');

articleRouter.get('/', getArticles);
articleRouter.post('/', validateArticle, createArticle);
articleRouter.delete('/:articleId', validateObjectId, deleteArticle);

module.exports = articleRouter;