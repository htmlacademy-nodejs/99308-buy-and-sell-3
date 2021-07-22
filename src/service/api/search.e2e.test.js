'use strict';

const express = require(`express`);
const request = require(`supertest`);
const {HttpCode} = require(`../../constants`);

const search = require(`./search`);
const DataService = require(`../data-service/search`);

const mockData = [
  {
    "id": `m0puTP`,
    "category": [`Животные`, `Книги`],
    "description": `Бонусом отдам все аксессуары. Даю недельную гарантию. Продаю с болью в сердце... Если товар не понравится — верну всё до последней копейки.`,
    "picture": `item02.jpg`,
    "title": `Продам отличную подборку фильмов на VHS`,
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
    "title": `Продам книги Стивена Кинга`,
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

describe(`API returns offer based on search query`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `Куплю породистого кота`
      });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`1 offer found`, () => expect(response.body.length).toBe(1));
  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`NQjofs`));
});

test(`API returns code 404 if nothing is found`,
    () => request(app)
      .get(`/search`)
      .query({
        query: `Продам свою душу`
      })
      .expect(HttpCode.NOT_FOUND)
);

test(`API returns 400 when query string is absent`,
    () => request(app)
      .get(`/search`)
      .expect(HttpCode.BAD_REQUEST)
);
