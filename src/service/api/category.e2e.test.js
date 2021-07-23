'use strict';

const express = require(`express`);
const request = require(`supertest`);
const {HttpCode} = require(`../../constants`);

const category = require(`./category`);
const DataService = require(`../data-service/category`);

const mockData = [
  {
    "id": `V7tdvh`,
    "category": [`Разное`, `Животные`],
    "description": `Даю недельную гарантию. Товар в отличном состоянии. Продаю с болью в сердце... При покупке с меня бесплатная доставка в черте города.`,
    "picture": `item14.jpg`,
    "title": `Куплю породистого кота`,
    "type": `sale`,
    "sum": 81083,
    "comments": [
      {
        "id": `LknenG`,
        "text": `Почему в таком ужасном состоянии?`},
      {
        "id": `Q90xVU`,
        "text": `Неплохо, но дорого. С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца.`
      }
    ]
  },
  {
    "id": `zZbCzu`,
    "category": [`Посуда`, `Разное`],
    "description": `Таких предложений больше нет! Пользовались бережно и только по большим праздникам. Если товар не понравится — верну всё до последней копейки. Бонусом отдам все аксессуары.`,
    "picture": `item04.jpg`,
    "title": `Продам отличную подборку фильмов на VHS`,
    "type": `sale`,
    "sum": 11254,
    "comments": [
      {
        "id": `flN14W`,
        "text": `Оплата наличными или перевод на карту?`
      }
    ]
  },
  {
    "id": `Gecz49`,
    "category": [`Игры`],
    "description": `Продаю с болью в сердце... Это настоящая находка для коллекционера! Если найдёте дешевле — сброшу цену. Пользовались бережно и только по большим праздникам.`,
    "picture": `item10.jpg`,
    "title": `Продам книги Стивена Кинга`,
    "type": `offer`,
    "sum": 14170,
    "comments": [
      {
        "id": `AVz9dO`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. Совсем немного...`
      },
      {
        "id": `uhp2yw`,
        "text": `Вы что?! В магазине дешевле. Почему в таком ужасном состоянии? А сколько игр в комплекте?`
      }
    ]
  }
];

const app = express();
app.use(express.json());
category(app, new DataService(mockData));

describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/category`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of 4 categories`, () => expect(response.body.length).toBe(4));
  test(`Category names are "Разное", "Животные", "Посуда", "Игры"`,
      () => expect(response.body).toEqual(
          expect.arrayContaining([`Разное`, `Животные`, `Посуда`, `Игры`])
      )
  );
});
