// API action functions // 
function createBookmark(bookmark) {
  fetch('https://thinkful-list-api.herokuapp.com/madisonslansky/bookmarks', {
    method: "POST",
    body: JSON.stringify(bookmark),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => console.log(response)).then(renderStartPage)
}

function readBookmarks() {
  fetch('https://thinkful-list-api.herokuapp.com/madisonslansky/bookmarks')
    .then(response => response.json())
    .then(data =>
      store.bookmarks = data
    ).then(renderStartPage)
}

function updateBookmark() {

}

function deleteBookmark() {
  $(".bookmark-delete-button").on("click", function (evt) {
    evt.preventDefault();
    let template = `<p>${generateBookmarkList()}</p>
        <div class= "bookmark-delete-button">
          <button>Delete</button>
        </div>`

  })
}
