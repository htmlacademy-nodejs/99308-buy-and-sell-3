'use strict';

const nanoid = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class CommentService {
  constructor(offers) {
    this._offers = offers;
  }

  create(offerId, comment) {
    const newComment = {
      id: nanoid(MAX_ID_LENGTH),
      text: comment
    };
    const currentOffer = this._offers.filter((item) => item.id === offerId);
    currentOffer.comments.push(newComment);
    return newComment;
  }

  async drop(offerId, commentId) {
    const currentOffer = this._offers.filter((item) => item.id === offerId);
    const comment = currentOffer.comments.filter(
        (item) => item.id === commentId);
    currentOffer.comments = currentOffer.comments.filter(
        (item) => item.id !== commentId);
    return comment;
  }

  findAll(offerId) {
    const currentOffer = this._offers.filter((item) => item.id === offerId);
    return currentOffer.comments;
  }

}

module.exports = CommentService;
