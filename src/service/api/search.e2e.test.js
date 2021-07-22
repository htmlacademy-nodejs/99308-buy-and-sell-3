'use strict';

const express = require(`express`);
const request = require(`supertest`);

const search = require(`./search`);
const DataService = require(`../data-service/search`);

const mockData = [
  {
    "id": `m0puTP`,
    "category": [`Животные`, `Книги`],
    "description": `Бонусом отдам все аксессуары. Даю недельную гарантию. Продаю с болью в сердце... Если товар не понравится — верну всё до последней копейки.`,
    "picture": `item02.jpg`,
    "title": `Куплю породистого кота`,
    "type": `sale`,
    "sum": 90335,
    "comments": [
      {
        "id": `SnxPHy`,
        "text": `Неплохо, но дорого. А где блок питания? Почему в таком ужасном состоянии?`
      },
      {
        "id": `5x70qD`,
        "text": `Продаю в связи с переездом. Отрываю от сердца.`
      },
    ]
  },
  {
    "id": `PeCJrD`,
    "category": [`Книги`, `Игры`],
    "description": `Продаю с болью в сердце... Пользовались бережно и только по большим праздникам. Таких предложений больше нет! Бонусом отдам все аксессуары.`,
    "picture": `item09.jpg`,
    "title": `Куплю породистого кота`,
    "type": `offer`,
    "sum": 4651,
    "comments": [
      {
        "id": `wCouNc`,
        "text": `Почему в таком ужасном состоянии?`
      }
    ]
  },
  {
    "id": `NQjofs`,
    "category": [`Разное`],
    "description": `Таких предложений больше нет! Бонусом отдам все аксессуары. Если товар не понравится — верну всё до последней копейки. Товар в отличном состоянии.`,
    "picture": `item10.jpg`,
    "title": `Куплю породистого кота`,
    "type": `offer`,
    "sum": 74496,
    "comments": [
      {
        "id": `N88XvN`,
        "text": `С чем связана продажа? Почему так дешёво?`
      },
      {
        "id": `HqFtQ5`,
        "text": `А где блок питания?`
      }
    ]
  }
];

const app = express();
app.use(express.json());
search(app, new DataService(mockData));
