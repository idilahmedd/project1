var deckurl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
var deckID;
var player1Deckurl;
var player2Deckurl;

var currentCardsurl;
var helpCardsurl;
var gameOver;

var score;
var dealButton;
var currentCards = [];
var helpDeck = [];
var player1 = {
    deck: [],
    hand: []
}
var player2 = {
    deck: [],
    hand: []
}
const values = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "JACK": 11,
    "ACE": 1,
    "KING": 13,
    "QUEEN": 12
}

//========================================
//DOM
var player1Hand = document.getElementsByClassName("hand1")[0];
var player2Hand = document.getElementsByClassName("hand2")[0];
var player1Deck = document.getElementById("player1Deck");
var player2Deck = document.getElementById("player2Deck");
// var currentCards = document.getElementById("curentCards");
var currentCard = document.getElementById('current')
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
        helpCardsurl = "https://deckofcardsapi.com/api/deck/"+ deckID + "/draw/?count=12";
        console.log(helpCardsurl);
    })

    startButton.addEventListener('click', function() {
        fetch(player1Deckurl).then( function(response) {
            return response.json()
        }).then( function(data){

            player1.deck = data.cards.splice(0, 15);
            player1.hand = data.cards.splice(0, 5);
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
            player2.deck = data.cards.splice(0, 15);
            player2.hand = data.cards.splice(0, 5);
            console.log(player2.deck["1"], player2.hand["0"]);
            console.log(typeof player2.deck);
        })
    })
    startButton.addEventListener('click', function() {
        fetch(helpCardsurl).then( function(response) {
            return response.json()
        }).then( function(data){
            helpDeck = data.cards;
            console.log(helpDeck);
            // for (let i = 0; i < helpDeck.length; i++) {
            // console.log("num children", player1Hand.children.length)
            // helpDeck.src = helpDeck.image;
            // console.log("plaeyer1 hand:", player1.hand);
        // }
        })
    })

    helpCards.addEventListener('click', function(e) {
        // console.log('help!')
        var card = helpDeck.pop()
        currentCards.unshift(card);
        currentCard.src = card.images.png;
        console.log(currentCards[0]);

    });
    
    player1Hand.addEventListener('click', function(e) {
        console.log('help!')
        var cardIndex = e.target.id.charAt(e.target.id.length - 1);
        var clickedCard = player1.hand[cardIndex];
        console.log("they clicked this card:", clickedCard);
        console.log("the currentCard is:", currentCards[currentCards.length - 1]);
        // Check to see if this is a valid choice
        console.log(values[clickedCard.value], values[(currentCards[0].value)]);
        if ((values[clickedCard.value] === values[(currentCards[0].value)]) || (values[(currentCards[0]).value ] + 1 === values[clickedCard.value]) || (values[clickedCard.value] - values[(currentCards[0].value)] === -12) ){

        //    currentCard = currentCards[currentCards.length - 1];
           // adding a card to the hand
           // make sure to splice card from player hand and push into currentCards array
           // do the below to switch image on top of currentCards in display
           currentCard.src = e.target.src;
           
           // currentCards.push(value[clickedCard.value]);
            let newcard  = player1.deck.pop();
            currentCards.unshift(player1.hand[cardIndex]);
            player1.hand[cardIndex] = newcard;
            e.target.src = newcard.images.png;
            console.log(currentCards[0]);
        }
            

            
         
        // values[clickedCard.value] === values[currentCards[0].value]
        // currentCard.src = e.target.src;
        // e.target.src = player1.deck.pop().images.png;
        
    })
})



    




    
