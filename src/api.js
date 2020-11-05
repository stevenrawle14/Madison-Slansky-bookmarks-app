// API action functions // 
import bookmarks from './bookmarks.js'
import store from './STORE.js'
import $ from 'jquery';


function createBookmark(bookmark) {
  fetch('https://thinkful-list-api.herokuapp.com/madisonslansky/bookmarks', {
    method: "POST",
    body: JSON.stringify(bookmark),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(json => {
      if (json.message) {
        window.alert(json.message);
      } else if (json.id) {
        bookmarks.refreshStartPage();
      }
    });
}

function readBookmarks() {
  fetch('https://thinkful-list-api.herokuapp.com/madisonslansky/bookmarks')
    .then(response => response.json())
    .then(data =>
      store.bookmarks = data
    ).then(bookmarks.renderStartPage)
}


function deleteBookmark(id) {
  fetch(
    `https://thinkful-list-api.herokuapp.com/madisonslansky/bookmarks/${id}`
    , {
      method: "DELETE"
    }).then(bookmarks.refreshStartPage)
}


export default {
  createBookmark,
  readBookmarks,
  deleteBookmark
}