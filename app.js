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
const $button = $("#createbutton");
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
      const $li = $("<li>").text(
        `${quote.quote} came from the movie ${quote.quoteSourceType.title}, directed by ${quote.quoteSourceType.director}, starring ${quote.quoteSourceType.actors}, and released in the year ${quote.quoteSourceType.releaseYear}`)
        $li.append(
          $("<button>").text("delete").attr("id", quote._id).on("click", deleteQuote)
      );

      $li.append(
          $("<button>").text("edit").on("click", (event) => {
              $editQuoteInput.val(quote.name);
              $quoteEditSelect.val(quote.quoteSourceType._id);
              $editButton.attr("id", quote._id)
          })
      );
        $ul.append($li)
        }
    //Populate selector with retrieved data
    /*data.forEach((quotes) => {
        const $li = $("<li>").text(
            `${quotes.quote} came from the movie ${quotes.quoteSourceType.title}, directed by ${quotes.quoteSourceType.director}, starring ${quotes.quoteSourceType.actors}, and released in the year ${quotes.quoteSourceType.releaseYear}`
        );
        $li.append(
            $("<button>").text("delete").attr("id", quotes._id).on("click", deleteQuote)
        );

        $li.append(
            $("<button>").text("edit").on("click", (event) => {
                $quoteEditInput.val(quotes.name);
                $quoteEditSelect.val(quotes.quoteSourceType._id);
                $editButton.attr("id", quotes._id)
            })
        );
        $ul.append($li);
        console.log(response)
});*/
};

//GET Movies from API and populate
const getMovies = async () => {
    //get movies
    const response = await fetch(`${URL}/moviequotes/movies`);
    const data = await response.json();
    data.forEach((movies) => {
        const $option = $("<option>").attr("value", movies._id).text(movies.title)
        $quoteSelect.append($option);
        const $option2 = $("<option>").attr("value", movies._id).text(movies.title)
        $quoteEditSelect.append($option2);
    });
};

//CREATE New Quote
const createQuote = async (event) => {
    //Create to New Quote from Form Data
    const newQuote = {
        quote: $quoteInput.val(),
        whoSaid: $quoteWhoSaid.val(),
        quoteUse: $quoteQuoteUse.val(),
        quoteSourceType: $quoteSelect.val(),
    };
    //Send request to api to create rat
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


//CREATE New Movie?

//DELETE Quote

const deleteQuote = async (event) => {
    //make request to delete quote
    const response = await fetch(`${URL}/moviequotes/quotes/${event.target.id}`, {
      method: "delete",
    });
    //update the dom
    $ul.empty();
    getQuotes();
  };

//UPDATE Quote

const updateQuote = async (event) => {
  const updatedQuote = {
      quote: $editQuoteInput.val(),
      whoSaid: $editQuoteWhoSaid.val(),
      quoteUse: $editQuoteQuoteUse.val(),
      quoteSourceType: $quoteEditSelect.val()
    } 
    console.log(updatedQuote)
    const response = await fetch(`${URL}/moviequotes/quotes/${event.target.id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedQuote),
    })
    const data = response.json();
    for (let i=0; i<data.length; i++) {
      const quote = data[i]
      console.log(quote)
    $li.append(
      $("<button>").text("update").attr("id", quote._id).on("click", updateQuote)
    )}
    //update the DOM
    $ul.empty();
    getQuotes();
  }




//MAIN APPLICATION LOGIC
//Get movie for selector
getMovies();
//initially get existing quotes
getQuotes();
//add create function to button click
$button.on("click", createQuote);
//add delete function to button click
$button.on("click", deleteQuote) 
//add Update function to edit submit button
updateQuote()





