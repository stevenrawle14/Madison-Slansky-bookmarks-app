import api from './api.js'
import store from './STORE.js'
import $ from 'jquery';



function generateStartPage() {

  let html = `<div class="header">
    <h1>Galaxy Bookmarks</h1>
  </div>

  <div class="form-buttons">
    <form id = "add-bookmark-form">
      <button class="add-bookmark-button">Add New</button>
    </form>

    <form id = "dropdown-search">
      <div class="dropdown">
        <button class="dropbtn">Filter by :</button>
        <select class="dropdown-content">
          <option class="star-rating-filter" rating="0">No filter</option>
          <option class="star-rating-filter" rating="1">1 Star</option>
          <option class="star-rating-filter" rating="2">2 Stars</option>
          <option class="star-rating-filter" rating="3">3 Stars</option>
          <option class="star-rating-filter" rating="4">4 Stars</option>
          <option class="star-rating-filter" rating="5">5 Stars</option>
        </select>
      </div>
    </form>
  </div>
  
  <div class="bookmark-list">
    ${generateBookmarkList()}
  </div>
  `;
  return html;
}


function generateBookmarkList() {
  let bookmarks = store.bookmarks;
  if (!bookmarks) { return ""; }
  bookmarks = bookmarks.filter(x => !x.hidden)

  let html = bookmarks.map(bookmark => {
    let expandedView = "";
    if (bookmark.expanded) {
      expandedView = generateExpandedView(bookmark)
    }

    return `<h1>${bookmark.title}</h1>
    <div class="bookmark-stars-empty">${generateStarRating(bookmark.rating)}</div>
      <div class="expanded-view" bookmarkId="${bookmark.id}">
        <button>Expand</button>
      <hr>
      </div>
    ${expandedView}
    `
  }).join("<br/>")
  return html;
}

function generateStarRating(rating) {
  let filledStar = "https://img.icons8.com/plasticine/100/000000/starburst-shape.png";
  let emptyStar = "https://img.icons8.com/carbon-copy/100/000000/starburst-shape.png";

  let starFillings = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      starFillings.push(filledStar);
    } else {
      starFillings.push(emptyStar);
    }
  }
  return `
  <button><img class="rating-star" rating="1" src="${starFillings[0]}" alt="rating-star-image"/></button>
  <button><img class="rating-star" rating="2" src="${starFillings[1]}" alt="rating-star-image"/></button>
  <button><img class="rating-star" rating="3" src="${starFillings[2]}" alt="rating-star-image"/></button>
  <button><img class="rating-star" rating="4" src="${starFillings[3]}" alt="rating-star-image"/></button>
  <button><img class="rating-star" rating="5" src="${starFillings[4]}" alt="rating-star-image"/></button>
  `;
}

function generateNewBookmarkTemplate() {
  return `
  <form>
    <h1>My Bookmarks</h1>
    <div class="bookmark-url-container">
      <label for="bookmark-url">Add New Bookmark:</label>
    </div>
    <div class="input-url">
      <input name="bookmark-url" placeholder="Paste URL Here:"/>
    </div>

    <div class="title">
    <label for="bookmark-title"> Type your Title Here</label>
      <input id="bookmark-title" name="bookmark-title" placeholder="Title your Bookmark:"/>
    </div>
    <div class="description-box">
    <label for="bookmark-description"> Write a description</label>
      <textarea name="bookmark-description" placeholder="Description:"></textarea>
    </div>

    <h2>Rank this bookmark: </h2>
    </br>
    <div class ="rankings-flexbox">
      <label for="bookmark-rating"> Rate your Bookmark</label>
      <input name="bookmark-rating" value=0 hidden="true"/>
      <div class="bookmark-stars-empty">${generateStarRating(0)}</div>
    </div>

    <div class ="bookmark-buttons-flexbox">
      <div class ="bookmark-cancel-button">
        <button>Cancel</button>
      </div>
      <div class= "bookmark-create-button">
        <button>Create</button>
      </div>
    </div>
  </form>
  `;
}


function generateExpandedView(bookmark) {
  return `
  <div class ="lines">
  <div class = "visit-site">
  <a href="${bookmark.url}" target="_blank">
    <button>Visit Site</button>
  </a>
  </div>
  <div class="description-view">
    ${bookmark.desc}
  </div>
    <div class="delete-bookmark" bookmarkId="${bookmark.id}">
      <button>Delete</button>
    </div>
  <hr>
  </div>
  `
}


// Render Functions //
function renderNewBookmarkTemplate() {
  $('main').html(generateNewBookmarkTemplate());
}


function renderStarRating() {
  let rating = document.querySelector('input[name="bookmark-rating"]').value;
  $(".bookmark-stars-empty").html(generateStarRating(rating))
}


function refreshStartPage() {
  api.readBookmarks()
    .then(response => response.json())
    .then(data => { store.bookmarks = data })
    .then(renderStartPage)
}


function renderStartPage() {
  $("main").html(generateStartPage());
}


export default {
  renderNewBookmarkTemplate,
  renderStarRating,
  refreshStartPage,
  renderStartPage
}

