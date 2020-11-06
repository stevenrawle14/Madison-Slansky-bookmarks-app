import $ from 'jquery';
import './main.css';
import bookmarks from './bookmarks.js'
import handles from './handle.js'


function eventHandlers() {
  $("main").on("click", ".add-bookmark-button", handles.handleAddNewBookmark)
  $("main").on("click", ".bookmark-cancel-button", handles.handleCancelNewBookmark)
  $("main").on("click", ".bookmark-create-button", handles.handleCreateBookmark)
  $("main").on("click", ".rating-star", handles.handleStarRating)
  $("main").on("click", ".delete-bookmark", handles.handleDeleteBookmark)
  $("main").on("click", ".star-rating-filter", handles.handleStarRatingFilter)
  $("main").on("click", ".expanded-view", handles.handleExpandedView)
  $("main").on("click", ".dropbtn", (evt) => evt.preventDefault())
}

function main() {
  bookmarks.refreshStartPage();
  eventHandlers();
}
main();