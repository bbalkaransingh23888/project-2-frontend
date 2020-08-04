const deployedURL = first-app-bs23.herokuapp.com
const URL = deployedURL ? deployedURL : "http://localhost:3000";


//GLOBAL VARIABLES
const $nameInput = $("#createinput");
const $quoteSelect = $("#createselect");
const $button = $("#createbutton");
const $quoteEditInput = $("#editinput");
const $quoteEditSelect = $("#editselect");
const $editButton = $("#editbutton");
const $ul = $("ul");


//FUNCTIONS

//GET Quotes from API and populate
const getQuotes = async () => {
    const response = await fetch(`${URL}/quotes`)
    const data = await response.json();
    //Populate selector with retrieved data
    data.forEach((quotes) => {
        const $option = $("<option>").attr("value", Quotes._id).text(Quotes)
        $quoteSelect.append($option);
        const $option2 = $("<option>").attr("value", Quotes._id).text(Quotes)
        $quoteEditSelect.append($option2);
    });
};

//GET Movies from API and populate
const getMovies = async () => {
    //get movies
    const response = await fetch(`${URL}/movies`);
    const data = await response.json();
    console.log(data);
    data.forEach((Movies) => {
        const $li = $("<li>").text(
            `${Quotes.quote} came from the movie ${Movies.title}, directed by ${Movies.director}, starring ${Movies.actors}, and released in the year ${Movies.releaseYear}`
        );
        $li.append(
            $("<button>").text("delete").attr("id", Quotes._id).on("click", deleteQuote)
        );

        $li.append(
            $("<button>").text("edit").on("click", (event) => {
                $quoteEditInput.val(Quotes.name);
                $quoteEditSelect.val(Quotes.quoteSourceType._id);
                $editButton.attr("id", Quotes._id)
            })
        );
        $ul.append($li);
});
};


//CREATE New Quote
const createQuote = async (event) => {
    //Create to New Quote from Form Data
    const newQuote = {
      name: $nameInput.val(),
      quote: $quoteSelect.val(),
    };
    //Send request to api to create rat
    const response = await fetch(`${URL}/quotes`, {
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
    const response = await fetch(`${URL}/quote/${event.target.id}`, {
      method: "delete",
    });
    //update the dom
    $ul.empty();
    getQuotes();
  };

//DELETE Movie?

//UPDATE Quote

const updateQuote = async (event) => {
    const updatedQuote = {
      name: $quoteEditInput.val(),
      pizza: $quoteEditSelect.val()
    }
    const response = await fetch(`${URL}/quotes/${event.target.id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedQuote),
    })
    //update the DOM
    $ul.empty();
    getQuotes();
  }




//MAIN APPLICATION LOGIC
//Get movie for selector
getMovies();
//initially get existing rats
getQuotes();
//add create function to button click
$button.on("click", createQuote);
//add Update function to edit submit button
$editButton.on("click", updateQuote)




