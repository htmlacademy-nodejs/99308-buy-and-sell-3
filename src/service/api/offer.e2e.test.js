'use strict';

const express = require(`express`);
const request = require(`supertest`);
const {HttpCode} = require(`../../constants`);

const offer = require(`./offer`);
const DataService = require(`../data-service/offer`);
const CommentService = require(`../data-service/comment`);

const mockData = [
  {
    "id": `MoA8nc`,
    "category": [`Животные`, `Журналы`],
    "description": `Даю недельную гарантию. Товар в отличном состоянии. Это настоящая находка для коллекционера! При покупке с меня бесплатная доставка в черте города.`,
    "picture": `item15.jpg`,
    "title": `Продам книги Стивена Кинга`,
    "type": `sale`,
    "sum": 12065,
    "comments": [
      {
        "id": `QvchfR`,
        "text": `Неплохо, но дорого. Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        "id": `gf4roy`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. Почему в таком ужасном состоянии?`
      }
    ]
  },
  {
    "id": `yo2E22`,
    "category": [`Журналы`],
    "description": `Если товар не понравится — верну всё до последней копейки. При покупке с меня бесплатная доставка в черте города. Пользовались бережно и только по большим праздникам. Даю недельную гарантию.`,
    "picture": `item15.jpg`,
    "title": `Продам новую приставку Sony Playstation 5`,
    "type": `offer`,
    "sum": 42252,
    "comments": [
      {
        "id": `rWFs3J`,
        "text": `Совсем немного... Неплохо, но дорого.`
      },
      {
        "id": `lnm20e`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. Почему в таком ужасном состоянии?`
      },
      {
        "id": `M_gOUM`,
        "text": `А где блок питания? С чем связана продажа? Почему так дешёво? А сколько игр в комплекте?`
      }
    ]
  },
  {
    "id": `E992Wi`,
    "category": [`Игры`],
    "description": `Если найдёте дешевле — сброшу цену. Пользовались бережно и только по большим праздникам. Бонусом отдам все аксессуары. При покупке с меня бесплатная доставка в черте города.`,
    "picture": `item13.jpg`,
    "title": `Продам новую приставку Sony Playstation 5`,
    "type": `sale`,
    "sum": 3139,
    "comments": [
      {
        "id": `UrOU-Q`,
        "text": `А сколько игр в комплекте?`
      }
    ]
  }
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  offer(app, new DataService(cloneData), new CommentService());
  return app;
};

describe(`API returns a list of all offers`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns a list of 3 offers`, () => expect(response.body.length).toBe(3));
  test(`First offer's id equals "MoA8nc"`, () => expect(response.body[0].id).toBe(`MoA8nc`));
});

describe(`API returns an offer with given id`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers/MoA8nc`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Offer's title is "Продам книги Стивена Кинга"`, () => expect(response.body.title).toBe(`Продам книги Стивена Кинга`));
});

describe(`API creates an offer if data is valid`, () => {
  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `offer`,
    sum: 100500
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/offers`)
      .send(newOffer);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Returns offer created`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));
  test(`Offers count is changed`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(4))
  );
});

describe(`API refuses to create an offer if data is invalid`, () => {
  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `offer`,
    sum: 100500
  };
  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newOffer)) {
      const badOffer = {...newOffer};
      delete badOffer[key];
      await request(app)
        .post(`/offers`)
        .send(badOffer)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`API changes existent offer`, () => {
  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `offer`,
    sum: 100500
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/offers/MoA8nc`)
      .send(newOffer);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns changed offer`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));
  test(`Offer is really changed`, () => request(app)
    .get(`/offers/MoA8nc`)
    .expect((res) => expect(res.body.title).toBe(`Дам погладить котика`))
  );
});

test(`API returns status code 404 when trying to change non-existent offer`, () => {
  const app = createAPI();

  const validOffer = {
    category: `Это`,
    title: `валидный`,
    description: `объект`,
    picture: `объявления`,
    type: `однако`,
    sum: 404
  };

  return request(app)
    .put(`/offers/NOEXST`)
    .send(validOffer)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an offer with invalid data`, () => {
  const app = createAPI();

  const invalidOffer = {
    category: `Это`,
    title: `невалидный`,
    description: `объект`,
    picture: `объявления`,
    type: `нет поля sum`
  };

  return request(app)
    .put(`/offers/NOEXST`)
    .send(invalidOffer)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an offer`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/offers/E992Wi`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns deleted offer`, () => expect(response.body.id).toBe(`E992Wi`));
  test(`Offer count is 2 now`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(2))
  );
});

test(`API refuses to delete non-existent offer`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/offers/NOEXST`)
    .expect(HttpCode.NOT_FOUND);
});


describe(`API returns a list of comments to given offer`, () => {
  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .get(`/offers/MoA8nc/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of 2 comments`, () => expect(response.body.length).toBe(2));
  test(`First comment's text is "Неплохо, но дорого. Продаю в связи с переездом. Отрываю от сердца."`,
      () => expect(response.body[0].text).toBe(`Неплохо, но дорого. Продаю в связи с переездом. Отрываю от сердца.`));
});


describe(`API creates a comment if data is valid`, () => {
  const newComment = {
    text: `Валидному комментарию достаточно этих полей`
  };
  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .post(`/offers/MoA8nc/comments`)
      .send(newComment);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Comments count is changed`, () => request(app)
    .get(`/offers/MoA8nc/comments`)
    .expect((res) => expect(res.body.length).toBe(3))
  );
});

test(`API refuses to create a comment to non-existent offer and returns status code 404`, async () => {
  const app = await createAPI();

  return request(app)
    .post(`/offers/20/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, async () => {
  const invalidComment = {};

  const app = await createAPI();

  return request(app)
    .post(`/offers/MoA8nc/comments`)
    .send(invalidComment)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes a comment`, () => {
  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .delete(`/offers/MoA8nc/comments/QvchfR`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Comments count is 1 now`, () => request(app)
    .get(`/offers/MoA8nc/comments`)
    .expect((res) => expect(res.body.length).toBe(1))
  );
});

test(`API refuses to delete non-existent comment`, async () => {
  const app = await createAPI();

  return request(app)
    .delete(`/offers/MoA8nc/comments/100`)
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to delete a comment to non-existent offer`, async () => {
  const app = await createAPI();

  return request(app)
    .delete(`/offers/20/comments/1`)
    .expect(HttpCode.NOT_FOUND);
});
