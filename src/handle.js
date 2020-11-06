import bookmarks from './bookmarks.js'
import api from './api.js'
import store from './STORE.js'
import $ from 'jquery';



// Handle Functions //
function handleCancelNewBookmark(evt) {
  evt.preventDefault();
  bookmarks.refreshStartPage();
}

function handleAddNewBookmark(evt) {
  evt.preventDefault();
  bookmarks.renderNewBookmarkTemplate();
}

function handleCreateBookmark(evt) {
  evt.preventDefault();
  let newUrl = document.querySelector('input[name="bookmark-url"]').value;
  let newTitle = document.querySelector('input[name="bookmark-title"]').value;
  let newDescription = document.querySelector('textarea[name="bookmark-description"]').value;
  let newRating = document.querySelector('input[name="bookmark-rating"]').value;
  let bookmark = {
    "title": newTitle,
    "url": newUrl,
    "desc": newDescription,
    "rating": newRating
  };
  api.createBookmark(bookmark)
    .then(response => {
      if (!response.ok) {
        store.error = true
        //response.json().then(bookmarks.generateNewBookmarkTemplate)
        response.json().then(() => bookmarks.generateNewBookmarkTemplate());
      }
      else if (json.id) {
        bookmarks.refreshStartPage();
      }
    });
}

function handleStarRating(evt) {
  let rating = $(this).attr("rating")
  document.querySelector('input[name="bookmark-rating"]').value = rating;
  bookmarks.renderStarRating();
}

function handleStarRatingFilter(evt) {
  let rating = $(this).attr("rating");
  store.bookmarks = store.bookmarks.map(bookmark => {
    bookmark.hidden = bookmark.rating < rating;
    return bookmark
  })
  bookmarks.renderStartPage();
}

function handleExpandedView(evt) {
  let bookmarkId = $(this).attr("bookmarkId");
  store.bookmarks = store.bookmarks.map(bookmark => {
    bookmark.expanded = (bookmark.id == bookmarkId && !bookmark.expanded);
    return bookmark
  })
  bookmarks.renderStartPage();
}

function handleDeleteBookmark() {
  let bookmarkId = $(this).attr("bookmarkId")
  api.deleteBookmark(bookmarkId).then(bookmarks.refreshStartPage);

}



export default {
  handleCancelNewBookmark,
  handleAddNewBookmark,
  handleCreateBookmark,
  handleDeleteBookmark,
  handleStarRating,
  handleStarRatingFilter,
  handleExpandedView,

}
