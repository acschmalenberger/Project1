var apiKey = "10206952649931006";
var baseUrl = "https://superheroapi.com/api.php/";
var characterName = "thor";
var omdbAPIKey= "3e9920ff";
var omdbQueryURL="https://www.omdbapi.com/?s=";
//var omdbIMGQueryURL: "http://img.omdbapi.com/?s="


//https://www.omdbapi.com/?s=thor&apikey=3e9920ff
//"https://superheroapi.com/api/10206952649931006/search/thor"

// function userInput () {

// $.ajax({
//   url: baseUrl + apiKey + "/search/" + characterName,
//   method: "GET"
// }).then(function(searchResponse) {
//   //checking to see if the API call is working
//   console.log(searchResponse);
//   //Dynamically creating a div to house the search results title
//     $("#body").empty();
//     var searchResultsOutputText = $("<h2>").text("Halt mortal, did you mean:");
//     $("#body").append(searchResultsOutputText);
//     var row = $("<div>").attr("class", "row");
//     $("#body").append(row);

//       for (var i = 0; i < searchResponse.results.length; i++) {
//         //create a div for each item in the search array
//         var searchResultDiv = $("<div>").attr("id", "searchResult").attr("class", "col s4");
//         //Creating a tilte for reach result in the search arry
//         var charNameSearchResult = $("<h3>").text(searchResponse.results[i].name);
//         //adding the title to the search array div
//         searchResultDiv.append(charNameSearchResult);
//         //creating an img for each character in the earch array with a data, alt, and src tag
//         var imgURL = searchResponse.results[i].image.url; 
//         var searchResultImg = $("<img>").attr("src", imgURL).attr("style", "width: 100%").attr("data-name", searchResponse.results[i].name).attr("alt" , searchResponse.results[i].name + " image");
//         //adding the img to the search array div
//         searchResultDiv.append(searchResultImg);
//         $(".row"). append(searchResultDiv);
//       //test console log to CYA
//         console.log(searchResponse.results[i].name);
//         }
//         // userChoice(characterName);
//       });
// }
// onclick function
function userChoice (){
$.ajax({
  url: omdbQueryURL + characterName + "&apikey="+ omdbAPIKey,
  method: "GET"
}).then(function(clickResponse) {
  console.log(clickResponse);
  //$("#body").empty();
  
  var row2=$("<div>").attr("class","row");
  $("#body").append(row2);

  //clickResponse = //will be its own function
  //character picked on previous screen will be search for OMDB, activated by click
  for (var j = 0; j < clickResponse.Search.length; j++){
    console.log(clickResponse.Search[j])
    //create div for array
    var clickResultDiv= $("<div>").attr("id","userChoice").attr("class", "col s4");

    //create card for each item in array
    // .attr("class", "card")
    // var divCard = ("<div>"); 
      //create movie image and append to card
      var movieImgUrl = clickResponse.Search[j].Poster;
      console.log(movieImgUrl);
      var movieResultsImg= $("<img>").attr("src", movieImgUrl).attr("style", "width: 100%").attr("data-name",clickResponse.Search[j].Title).attr("alt", clickResponse.Search[j].Title + "image").attr("class", "card-image");
      
      
      // //create movie title and append to card
      // var movieTitle = (clickResponse.Search[j].Title).attr("class", "card-content");

      
      // //create movie release and append to card
      // var movieRelease = (clickResponse.Search[j].Year).attr("class", "card-content");

    //attach cards to column and column to row
    // "Title: "+movieTitle, "Year: "+movieRelease);
    // (divCard).append();
    (clickResultDiv).append(movieResultsImg); 
    (row2).append(clickResultDiv);
    
  
  }


});
}
// userInput();

userChoice();

//This is to retrieve data for the search bar on the index page. 

// $("#city-submitdata").on("click", function (event) {
//   //prevents the page from refreshikng when a button is clicked  
//   event.preventDefault();
  
//   // This line of code will grab the input from the textbox and sanitize it
//       var cityInput = $("#cityInput").val().trim();
//   //This takes the input from the form and addes it to an array that will be displayed
//       inputCitiesArray.push(cityInput);
//       localStorage.setItem("cityArray", JSON.stringify (inputCitiesArray));
//   //after the data from the form is transfered into a usable object, the data is passed to the ajax call. 
//       sanitizeCityInput(cityInput);  
//   //calling the function that wil create the aside elements
//       renderCityInfo(cityInput);
  
//     // Calling renderButtons which handles the processing of our movie array
//     //renderButtons();
//   });





