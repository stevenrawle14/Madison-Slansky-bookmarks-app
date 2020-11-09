import bookmarks from './bookmarks.js'
import api from './api.js'
import store from './STORE.js'
import $ from 'jquery';



// Handle Functions //
function handleCancelNewBookmark() {
  $("main").on("click", ".bookmark-cancel-button", function (evt) {
    evt.preventDefault();
    bookmarks.refreshStartPage();
  });
}

function handleAddNewBookmark() {
  $("main").on("click", ".add-bookmark-button", function (evt) {
    evt.preventDefault();
    bookmarks.renderNewBookmarkTemplate();
  });
}

function handleCreateBookmark() {
  $("main").on("click", ".bookmark-create-button", function (evt) {
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
          bookmarks.renderNewBookmarkTemplate();
        }
        else {
          bookmarks.refreshStartPage();
        }
      });
  });
}

function handleStarRating() {
  $("main").on("click", ".rating-star-button", function (evt) {
    evt.preventDefault();
    let rating = $(this).attr("rating")
    document.querySelector('input[name="bookmark-rating"]').value = rating;
    bookmarks.renderStarRating();
  });
}

function handleStarRatingFilter() {
  $("main").on("change", ".star-rating-filter-select", function (evt) {
    let rating = $(this).val();
    store.bookmarks = store.bookmarks.map(bookmark => {
      bookmark.hidden = bookmark.rating < rating;
      return bookmark
    })
    bookmarks.renderStartPage();
  });
}

function handleExpandedView() {
  $("main").on("click", ".expanded-view", function (evt) {
    let bookmarkId = $(this).attr("bookmarkId");
    store.bookmarks = store.bookmarks.map(bookmark => {
      bookmark.expanded = (bookmark.id == bookmarkId && !bookmark.expanded);
      return bookmark
    })
    bookmarks.renderStartPage();
  });
}

function handleDeleteBookmark() {
  $("main").on("click", ".delete-bookmark", function (evt) {
    let bookmarkId = $(this).attr("bookmarkId")
    api.deleteBookmark(bookmarkId).then(bookmarks.refreshStartPage);
  });
}

function handleDropButton() {
  $("main").on("click", ".dropbtn", (evt) => evt.preventDefault());
}


export default {
  handleCancelNewBookmark,
  handleAddNewBookmark,
  handleCreateBookmark,
  handleDeleteBookmark,
  handleStarRating,
  handleStarRatingFilter,
  handleExpandedView,
  handleDropButton
}
