import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },

  // getWorkouts: function(userEmail) {
  //   return axios.get("/api/books/" + userEmail);
  // },

  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  testUserRouter: function(){
    return axios.get("/api/user/test");
  },
  login: function(userData){
    return axios.post("/api/user/login", userData);
  },
  logout: function(){
    return axios.get("/api/user/logout");
  },
  signup: function(userData){
    return axios.post("/api/user/signup", userData);
  },
  getUser: function(){
    return axios.get("/api/user/data");
  },

  getWorkoutGiphy: function() {
    return axios.get("http://api.giphy.com/v1/gifs/search?api_key=Pl3uRuvUVj6UBRLiWpwxXeAEkXGBnzWu&q=workout&limit=5");

  }

};
