let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
//searchResultsEl.classList.add("d-flex","flex-row");
let spinnerEl = document.getElementById("spinner");

function createAndAppend(eachItem) {
    let {
        imageLink,
        author
    } = eachItem;
    spinnerEl.classList.add("d-none");
    let singleEl = document.createElement("div");
    singleEl.classList.add("col-5", "m-2");
    searchResultsEl.appendChild(singleEl);

    let imgEl = document.createElement("img");
    imgEl.src = imageLink;
    singleEl.appendChild(imgEl);
    //searchResultsEl.appendChild(imgEl);

    let authorName = document.createElement("p");
    authorName.classList.add("response-message");
    authorName.textContent = author;
    singleEl.appendChild(authorName);
    //searchResultsEl.appendChild(titleEl);
}

function displaySearchResult(searchResult) {
    let headingEl = document.createElement("h1");
    headingEl.classList.add("response-message");
    searchResultsEl.appendChild(headingEl);
    if (searchResult.length === 0) {
        headingEl.textContent = "No results found"
    } else {
        for (let eachItem of searchResult) {
            headingEl.textContent = "Popular Books";
            createAndAppend(eachItem);
        }
    }
}

function getResult(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        let searchInputElval = searchInputEl.value;
        let url = "https://apis.ccbp.in/book-store?title=" + searchInputElval;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsondata) {
                //console.log(data);

                displaySearchResult(jsondata.search_results);
            });
    }
}
searchInputEl.addEventListener("keydown", getResult);