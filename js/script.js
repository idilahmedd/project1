var deckurl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
var deckID;
var player1Deckurl;
var player2Deckurl;

var currentCardsurl;
var helpCardsurl;


var score;
var dealButton;
var currentCard = [];
var helpCards = [];
var player1 = {
    deck: [],
    hand: []
}
var player2 = {
    deck: [],
    hand: []
}

//========================================
//DOM
var player1Hand = document.getElementsByClassName("hand1")[0];
var player2Hand = document.getElementsByClassName("hand2")[0];
var player1Deck = document.getElementById("player1Deck");
var player2Deck = document.getElementById("player2Deck");
var currentCards = document.getElementById("curentCards");
var helpCards = document.getElementById("helpCards");
var player1Score = document.getElementsByClassName("score1")[0];
var player2Score = document.getElementsByClassName("score2")[0];
var dealButton = document.getElementById("dealButton");

//==========================================
//EventListeners

document.addEventListener('DOMContentLoaded', function() {
    startButton = document.getElementsByTagName('button')[0]
    fetch(deckurl).then( function(response) {
        return response.json()
    }).then( function(data){
        deckID = data.deck_id
        player1Deckurl = "https://deckofcardsapi.com/api/deck/"+ deckID + "/draw/?count=20";
        player2Deckurl = "https://deckofcardsapi.com/api/deck/"+ deckID + "/draw/?count=20";
        hsurl = "https://deckofcardsapi.com/api/deck/"+ deckID + "/draw/?count=12";
        console.log(helpCardsurl);
    })

    startButton.addEventListener('click', function() {
        fetch(player1Deckurl).then( function(response) {
            return response.json()
        }).then( function(data){

            player1.deck = data.cards.slice(0, 15);
            player1.hand = data.cards.slice(15);
            console.log(player1.hand);
            for (let i = 0; i < player1.hand.length; i++) {
                // console.log("num children", player1Hand.children.length)
                player1Hand.children[i].src = player1.hand[i].image;
                // console.log("plaeyer1 hand:", player1.hand);
            }
            
        })
    })
    startButton.addEventListener('click', function() {
        fetch(player2Deckurl).then( function(response) {
            return response.json()
        }).then( function(data){
            player2.deck = data.cards.slice(0,15);
            player2.hand = data.cards.slice(15);
            console.log(player2.deck, player2.hand);
        })
    })
    startButton.addEventListener('click', function() {
        fetch(helpCardsurl).then( function(response) {
            return response.json()
        }).then( function(data){
            helpCards = data.cards;
            console.log(helpCards);
            for (let i = 0; i < helpCards.length; i++) {
            // console.log("num children", player1Hand.children.length)
            helpCards.src = helpCards.image;
            // console.log("plaeyer1 hand:", player1.hand);
        }
        })
    })
})




    
    
//     //==========================================
//     //Fetch
    
//     fetch(deckurl)
//     .then(function(responseData){
//         console.log('get cards');
//         return responseData.json();
//     })
//     .then(function(jsonData){
//         console.log(jsonData);
//         deckID = jsonData.deck_id
//         player1Deckurl = "https://deckofcardsapi.com/api/"+ deckID + "/new/draw/?count=15";
//         player2Deckurl = "https://deckofcardsapi.com/api/"+ deckID + "/new/draw/?count=15";
//     })
//     .then(function() {

//         fetch(player1Deckurl)
//             .then(function(responseData){
//                 return responseData.json();
//             })
//             .then( function(data) {
//                 player1Deck = data.json.cards;
//                 console.log('success')
//             })
//             // fetch(player2Deckurl)
//             //         .then(function(responseData) {
//             //             return responseData.json();
//             //         })
//             //         .then( function(data) {
//             //             player2Deck = data.json.player2Deckurl;
//             //             console.log(data)
//             //         })
//             })
// });
//==========================================
//Functions