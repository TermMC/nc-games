import axios from "axios";

const api = axios.create({
  baseURL: "http://nc-bg-reviews.herokuapp.com/api/",
});

export const getCategories = () => {
  return api.get("/categories").then((res) => res.data.categories);
};

export const getAllReviews = (queries) => {
  if (Object.entries(queries).length !== 0) {
    const queryArr = [];
    for (let query in queries) {
      queryArr.push(`${query}=${queries[query]}`);
    }
    return api
      .get(`/reviews?${queryArr.join("&")}`)
      .then((res) => res.data.reviews);
  } else {
    return api.get("/reviews").then((res) => res.data.reviews);
  }
};
export const getOneReview = (review_id) => {
  return api.get(`/reviews/${review_id}`).then((res) => res.data.review);
};

export const getCommentsOnReview = (review_id) => {
  return api
    .get(`/reviews/${review_id}/comments`)
    .then((res) => res.data.comments);
};

export const patchVotes = (inc, endpoint, id) => {
  return api
    .patch(`/${endpoint}s/${id}`, { inc_votes: inc })
    .then((res) => res.data[endpoint]);
};

export const postComment = (id, comment) => {
  return api
    .post(`/reviews/${id}/comments`, comment)
    .then((res) => res.data.comment);
};

export const getUser = (username) => {
  return api.get(`/users/${username}`).then((res) => res.data.user);
};

export const deleteComment = (comment_id) => {
  return api.delete(`/comments/${comment_id}`);
};
