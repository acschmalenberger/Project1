var apiKey = "10206952649931006";
var baseUrl = "https://superheroapi.com/api.php/";
var omdbAPIKey= "3e9920ff";
var omdbQueryURL="https://www.omdbapi.com/?s=";
var omdbIDURL = " http://www.omdbapi.com/?i=";

function renderCharCard (attrName, searchResponse, aV){
  var p4 = $("<p>").text(attrName); 
          var durNum = searchResponse.results[aV].powerstats[attrName.toLowerCase()] +"%";
          var d4 = $("<div>").attr("class", "progress blue lighten-4 tooltipped").attr("data-position", "top")
          var d4a = $("<div>").attr("class", "determinate blue").css("width", durNum).text(searchResponse.results[aV].powerstats[attrName.toLowerCase()]+"%");
          d4.append(d4a);
          return {body: d4, p: p4};
}
//var omdbIMGQueryURL: "http://img.omdbapi.com/?s="
//https://www.omdbapi.com/?s=thor&apikey=3e9920ff
//"https://superheroapi.com/api/10206952649931006/search/thor"

function userInput (characterName) {

$.ajax({
  url: baseUrl + apiKey + "/search/" + characterName,
  method: "GET"
}).then(function(searchResponse) {
  if (searchResponse.response === "success") {
  
  console.log(searchResponse);
  //Dynamically creating a div to house the search results title
    $("#body").empty();
    var searchResultsOutputText = $("<h2>").text("Halt mortal, select the character you meant:").attr("class", "halt-text");
    $("#body").append(searchResultsOutputText);
    var row = $("<div>").attr("class", "row");
    $("#body").append(row);

      for (var i = 0; i < searchResponse.results.length; i++) {
        //create a div for each item in the search array
        var searchResultDiv = $("<div>").attr("class", "searchResult col s4");
        //Creating a tilte for reach result in the search arry
        var charNameSearchResult = $("<h4>").text(searchResponse.results[i].name);
        //adding the title to the search array div
        searchResultDiv.append(charNameSearchResult);
        //creating an img for each character in the earch array with a data, alt, and src tag
        var imgURL = searchResponse.results[i].image.url;
        var num =  $("img").length;
        var searchResultImg = $("<img>").attr("src", imgURL).attr("class", "click").attr("style", "width: 100%").attr("data-name", searchResponse.results[i].name).attr("data-arrayValue", num).attr("data-id", searchResponse.results[i].id).attr("alt" , searchResponse.results[i].name + " image");
        //adding the img to the search array div
        searchResultDiv.append(searchResultImg);
        $("#body>.row").append(searchResultDiv);
        //test console log to CYA
        //console.log(searchResponse.results[i].name);
        //console.log(searchResponse.results[i].id);
      }}
      else{
        $("#body>.row").empty();

        var stopImg = $("<img>").attr("src", "./assets/Stop.png").attr("class", "searchFailImg");
        $("#body>.row").append(stopImg);
      };

      $("img").click(function (event) {
        event.preventDefault ();
        //passes the attr to the omdb call
        userChoice($(this).attr("data-name"));
        var aV = $(this).attr("data-arrayValue")
        //var id = $(this).attr("data-id");
        //console.log($(this).attr("data-id"));
        //console.log(searchResponse);
        
        
        $("#body>.row").empty();
        //var row = $("<div>").attr("class", "row");      
        var imgCol = $("<div>").attr("class", "col s4");
        var statCol = $("<div>"). attr("class", "col s8");
        var charIdName = $("<h2>").text(searchResponse.results[aV].name);      
        $("#body>.row").append(charIdName, imgCol, statCol);
        //var idImgURL = baseUrl + apiKey +"/" + id + "/image";
          var charImg = $("<img>").attr("src", searchResponse.results[aV].image.url).attr("style", "width: 100%");
        
          //Need to finish character Bio. Check on bracket notation
          var pA = $("<p>").attr("id", "styling").text("Full Name: " + searchResponse.results[aV].biography["full-name"]);


        //   <div class="progress blue lighten-4 tooltipped" data-position="top" data-tooltip="Progress was at 50% when tested">
				// 	<span>Progress</span>
				// 	<div class="determinate blue" style="width: 50%; animation: grow 2s;">50%</div>
        // </div>
        
          var {body:d1, p:p1} = renderCharCard("Intelligence", searchResponse, aV);
          var {body:d2, p:p2} = renderCharCard("Strength", searchResponse, aV);
          var {body:d3, p:p3} = renderCharCard("Speed", searchResponse, aV);
          var {body:d4, p:p4} = renderCharCard("Durability", searchResponse, aV);
          var {body:d5, p:p5} = renderCharCard("Power", searchResponse, aV);
          var {body:d6, p:p6} = renderCharCard("Combat", searchResponse, aV);

          var p7 = $("<p>").text("First Apperence: " + searchResponse.results[aV].biography["first-appearance"]);
          statCol.append(pA, p1, d1, p2, d2, p3, d3, p4, d4, p5, d5, p6, d6, p7);
          imgCol.append(charImg);

        })})};

function userChoice (name) {
// var name = $(this).attr("data-name");
//console.log(name);
  $.ajax({
  url: omdbQueryURL + name + "&apikey="+ omdbAPIKey,
  method: "GET"
}).then(function(clickResponse) {
  var other = $("<h3>").text("Other places you can find this character:");
        $("#body").append(other);
var row2 = $("<div>").attr("class", "row");
$("#body").append(row2);
  //clickResponse = //will be its own function
  //character picked on previous screen will be search for OMDB, activated by click
   for (var j = 0; j < clickResponse.Search.length; j++) {
        //var j = 0
        console.log(clickResponse.Search[j])
      //set up variables
        var movieImgUrl = clickResponse.Search[j].Poster;
        var imdbID = clickResponse.Search[j].imdbID
        
        console.log(omdbIDURL + imdbID + "&apikey="+ omdbAPIKey);

    $.ajax({
      url: omdbIDURL + imdbID + "&apikey="+ omdbAPIKey,
      method: "GET"
    }).then(function(idResponse) {
      
      console.log(idResponse);
      if (idResponse.Genre.includes("Action"))
        {
          var movieResultsIMG = $("<img>").attr("src", movieImgUrl).attr("alt", clickResponse.Search[j].Title).attr("data-imdbID", clickResponse.Search[j].imdbID).attr("style", "width: 25%");
          row2.append(movieResultsIMG);
        } 
      else {console.log("bad")};
    })}
  })     
};
          
   
     // console.log(movieResultsDiv)
  //   //other variables that will be used and appended to movie object
  //   var movieTitle = clickResponse.Search[j].Title

  //   var movieRelease = clickResponse.Search[j].Year
  // }



//userInput();

//This is to retrieve data for the search bar on the index page. 

$("#scour").click(function (event) {
  //prevents the page from refreshikng when a button is clicked  
  event.preventDefault();
  // This line of code will grab the input from the form and sanitize it
    
  var characterName = $("#search").val().trim();
  console.log(characterName);
  userInput(characterName);
  });

  $(document).ready(function(){
    $('.tooltipped').tooltip();
    $('.collapsible').collapsible();
  });