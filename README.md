# News-machine
_Дипломная работа курса веб-разработчик **Яндекс Практикум**_. Проект создан в учебных целях и используется для сохранения интересных новостей. Сейчас реализовано:
- [x] Создать backend
- [x] Сверстать сайт
- [x] Написать скрипт и подружить все части _сайта_ вместе

## Информация о сайте:
  * **домен:** news-machine.ml
  * **поддомен:** api.news-machine.ml
  * **IP сервера:** 84.201.128.169

## Ссылки:
  * [http://api.news-machine.ml](http://api.news-machine.ml)
  * [https://api.news-machine.ml](https://api.news-machine.ml)

___

## В работе использовались:
- **Node js**,
- **Express**,
- **MongoDB**,
- **Mongoose**.

___

## Установка проекта:
1. Скопируйте репозиторий на ваш компьютер:
`git clone https://github.com/andrburl2/news-machine-api.git`
2. Иницилизируйте npm `npm i`
* Запуск сервера c nodemon
`npm run dev`
* Запуск сервера через node
`npm run start`

___

## Испольование проекта: (Проект по-умолчанию открывается на 3000 localhost)
1. Необходимо зарегистрироваться. Для этого отправьте **POST-запрос** по адресу localhost/signup с телом:
  * name: строка от 2 до 30 символов;
  * email: валидный email;
  * password: должен состоять как минимум из 6 символов.
2. Для входа отправьте **POST-запрос** по адресу localhost/signin с телом:
  * email: email, указанный при регистрации;
  * password: пароль, тоже указанный при регистрации.
3. Теперь можно полноценно работать с api:

|Метод    |Адрес              |Тело запроса                       |Назначение                         |
|:-------:|:-----------------:|:---------------------------------:|:---------------------------------:|
|`GET`    |/users/me          |                                   |Возвращает имя и email пользователя|
|`GET`    |/articles          |                                   |Возвращает все добавленные статьи  |
|`POST`   |/articles          |**keyword:** "Ключевое слово", **title:** "Название статьи", **text:** "Текст статьи", **date:** "Дата написания", **source:** "Источник статьи",	**link:** "Ссылка на статью", **image:** "Ссылка на обложку статьи"                 |Добавляет новую статью             |
|`DELETE` |/articles/articleId|                                   |Удаляет выбранную статью           |
