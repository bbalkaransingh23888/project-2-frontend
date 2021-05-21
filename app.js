const deployedURL = "https://first-app-bs23.herokuapp.com"
const URL = deployedURL ? deployedURL : "http://localhost:3000";

// Hamburger Menu
$(document).ready(function() {
  $('.hamburger-icon').on('click', function() {
      $('nav').toggle(500)
  });
});


//GLOBAL VARIABLES
const $quoteInput = $("#createinputquote");
const $quoteWhoSaid = $("#createinputwhosaid");
const $quoteQuoteUse = $("#createinputquoteuse");
const $quoteSelect = $("#createselect");
const $movieTitleInput = $("#createMovieTitleInput");
const $movieDirectorInput = $("#createMovieDirectorInput");
const $movieActorsInput = $("#createMovieActorsInput");
const $movieReleaseYearInput = $("#createMovieReleaseYearInput");
const $button = $("#createQuote");
const $button2 = $("#createMovie");
const $editQuoteInput = $("#editinputquote");
const $editQuoteWhoSaid = $("#editinputwhosaid");
const $editQuoteQuoteUse = $("#editinputquoteuse")
const $quoteEditSelect = $("#editselect");
const $editButton = $(".editbutton");
const $ul = $(".quoteList");


//FUNCTIONS

//GET Quotes from API and populate
const getQuotes = async () => {
    const response = await fetch(`${URL}/moviequotes/quotes`)
    const data = await response.json();
    //Populate selector with retrieved data
    for (let i=0; i<data.length; i++) {
      const quote = data[i]
      //appends quote data grabbed from backend to the ul created to show the create functionality in frontend
      const $li = $("<li>").text(
        `${quote.quote} came from the movie ${quote.quoteSourceType.title}, directed by ${quote.quoteSourceType.director}, starring ${quote.quoteSourceType.actors}, and released in the year ${quote.quoteSourceType.releaseYear}`)
        //creates delete button for each quote object
        $li.append(
          $("<button>").text("delete").attr("id", quote._id).on("click", deleteQuote)
      );
        //creates edit button for each quote object - should populate respective fields in the Edit Quote form
      $li.append(
          $("<button>").text("edit").on("click", (event) => {
            //console.log(quote)
              $editQuoteInput.val(quote.quote);
              $editQuoteWhoSaid.val(quote.whoSaid);
              $editQuoteQuoteUse.val(quote.quoteUse);
              $quoteEditSelect.val(quote.quoteSourceType._id);
              $editButton.attr("id", quote._id)
          })
      );
        $ul.append($li)
        }
    //Populate selector with retrieved data
};

//GET Movies from API and populate
const getMovies = async () => {
    //get movies
    const response = await fetch(`${URL}/moviequotes/movies`);
    const data = await response.json();
    data.forEach((movies) => {
      //appends movies from backend database to my frontend dropdown menu
        const $option = $("<option>").attr("value", movies._id).text(movies.title)
        $quoteSelect.append($option);
        const $option2 = $("<option>").attr("value", movies._id).text(movies.title)
        $quoteEditSelect.append($option2);
    });
};

//CREATE New Quote
const createQuote = async (event) => {
    //Create New Quote from Form Data
    const newQuote = {
        quote: $quoteInput.val(),
        whoSaid: $quoteWhoSaid.val(),
        quoteUse: $quoteQuoteUse.val(),
        quoteSourceType: $quoteSelect.val()
    };
    //Send request to API to create quote
    const response = await fetch(`${URL}/moviequotes/quotes`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuote),
    });
    const data = response.json();
    //update the DOM
    $ul.empty();
    getQuotes();
  };

//CREATE New Movie

const createMovie = async (event) => {
  //Create New Movie from Form Data
  const newMovie = {
      title: $movieTitleInput.val(),
      director: $movieDirectorInput.val(),
      actors: $movieActorsInput.val(),
      releaseYear: $movieReleaseYearInput.val()
  };
  //Send request to API to create movie
  const response = await fetch(`${URL}/moviequotes/movies`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMovie),
  });
  const data = response.json();
  data.forEach((movies) => {
    //appends newly created movie(s) from backend database after API request to my frontend dropdown menu
    const $option = $("<option>").attr("value", movies._id).text(movies.title)
    $quoteSelect.append($option);
    const $option2 = $("<option>").attr("value", movies._id).text(movies.title)
    $quoteEditSelect.append($option2);
  });
};
//console.log(createMovie())

//DELETE Quote

const deleteQuote = async (event) => {
    //make request to delete the quote object to the API
    const response = await fetch(`${URL}/moviequotes/quotes/${event.target.id}`, {
      method: "delete",
    });
    //update the dom
    $ul.empty();
    getQuotes();
  };

//UPDATE Quote

const updateQuote = async (event) => {
  //Populates the respective fields for the Edit Quote form after clicking the edit button on the individual quote populated in the quote list
  const updatedQuote = {
      quote: $editQuoteInput.val(),
      whoSaid: $editQuoteWhoSaid.val(),
      quoteUse: $editQuoteQuoteUse.val(),
      quoteSourceType: $quoteEditSelect.val()
    } 
    //Send request to API to update the quote object
    const response = await fetch(`${URL}/moviequotes/quotes/${event.target.id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedQuote),
    })
    const data = response.json();
    //update the DOM
    $ul.empty();
    getQuotes();
  }




//MAIN APPLICATION LOGIC
//Get movie for selector
getMovies();
//initially get existing quotes
getQuotes();
//add create quote function to button click
$button.on("click", createQuote);
//add create movie function to button click
$button2.on("click", createMovie);
//add Update function to edit submit button
$editButton.on("click", updateQuote);





