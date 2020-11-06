// API action functions // 
import bookmarks from './bookmarks.js'
import store from './STORE.js'
import $ from 'jquery';


function createBookmark(bookmark) {
  return fetch('https://thinkful-list-api.herokuapp.com/madisonslansky/bookmarks', {
    method: "POST",
    body: JSON.stringify(bookmark),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

function readBookmarks() {
  return fetch('https://thinkful-list-api.herokuapp.com/madisonslansky/bookmarks')

}


function deleteBookmark(id) {
  const url = `https://thinkful-list-api.herokuapp.com/madisonslansky/bookmarks/${id}`
  return fetch(url, { method: "DELETE" })
}


export default {
  createBookmark,
  readBookmarks,
  deleteBookmark
}