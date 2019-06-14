//GLOBAL VARIABLES============================================================================================
var deckurl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
var deckID;
var player1Deckurl;
var player2Deckurl;
var ai = null;
var currentCardsurl;
var helpCardsurl;
var gameOver = false;
var resetButton;
var score1 = 0;
var score2 = 0;
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
//DOM===============================================================================================================

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
resetButton = document.getElementById("reset");

//EVENTLISTENERS================================================================================================================

document.addEventListener('DOMContentLoaded', function() {
    startButton = document.getElementById('dealButton')
    fetch(deckurl).then( function(response) {
        return response.json()
    }).then( function(data){
        deckID = data.deck_id
        player1Deckurl = "https://deckofcardsapi.com/api/deck/"+ deckID + "/draw/?count=20";
        player2Deckurl = "https://deckofcardsapi.com/api/deck/"+ deckID + "/draw/?count=20";
        helpCardsurl = "https://deckofcardsapi.com/api/deck/"+ deckID + "/draw/?count=12";
        console.log(helpCardsurl);
    })

    startButton.addEventListener('click', dealPlayer1)
    startButton.addEventListener('click', dealPlayer2)
    startButton.addEventListener('click', dealHelp) 


    resetButton.addEventListener('click', function(e) {
       console.log("resetgame");
        reset();
    })
     helpCards.addEventListener('click', activateHelp) 
   
//PLAYER 1 PLAYS==========================================================================================================================================
    
    player1Hand.addEventListener('click', function(e) {
        console.log('help!')
        var cardIndex = e.target.id.charAt(e.target.id.length - 1);
        var clickedCard = player1.hand[cardIndex];
        console.log("they clicked this card:", clickedCard);
        console.log("the currentCard is:", currentCards[currentCards.length - 1]);
        // Check to see if this is a valid choice
        console.log(values[clickedCard.value], values[(currentCards[currentCards.length-1].value)]);
        console.log(currentCards[currentCards.length-1]);
        if ((values[clickedCard.value] === values[(currentCards[currentCards.length-1].value)]) ||
            (values[(currentCards[currentCards.length-1]).value ] + 1 === values[clickedCard.value]) || 
            (values[clickedCard.value] - values[(currentCards[currentCards.length-1].value)] === -12) ){
           console.log("found a match");
           // adding a card to the hand
           // make sure to splice card from player hand and push into currentCards array
           // do the below to switch image on top of currentCards in display
           currentCard.src = e.target.src;
           
           // currentCards.push(value[clickedCard.value]);
        
            let newcard  = player1.deck.pop();
            currentCards.push(player1.hand[cardIndex]);
            player1.hand[cardIndex] = newcard;
            e.target.src = newcard.images.png;
            
            console.log(currentCards[0]);
            endGame();
        }
        
    })
})
//PLAYER 2 (AI) PLAYS====================================================================================================      

function player2Plays() {

    var topCard = currentCards[currentCards.length - 1]
    if (!topCard) {
        console.log(currentCards);
        console.log(currentCards.length);
    }
    var i = 0;
    for (var card of player2.hand) {
        console.log("topCard:", topCard);
        console.log("card:", card);
        if (values[card.value] === values[topCard.value]
        || (values[topCard.value] + 1 === values[card.value])
        || (values[card.value] - values[topCard.value] === -12) ){
            console.log("we got a valid play!!!");
            // card matches, play it
            // i is the index of which card the ai is playing
            // take card from hand
            // console.log("currentCard:", currentCard);
            // console.log("card:", card);
            console.log("assigning ai card to pile");
            currentCard.src = card.image;
            currentCards.push(card);
        
            // currentCards.push(value[clickedCard.value]);
            
            console.log("drawing new card from p2 deck");
                let newcard2 = player2.deck.pop();
                console.log("this is the card the ai is playing:", player2.hand[i]);
                currentCards.push(player2.hand[i]);
                player2.hand[i] = newcard2;
                console.log(player2Hand.children[i]);
                console.log(newcard2.image);
                player2Hand.children[i].src = newcard2.image;
                console.log(currentCards[0]);  
            // add to pile
            // replace card in hard with one from draw pile
        } else {
            // card doesn't match
            
            console.log("ai found no valid plays");
            i++;
        }
        if (i == 4) {
            activateHelp();
            topCard = currentCards[0];
        }
    }
    endGame();
    
    //NEEDS HELP+===========================================================================================  
    //  else {
    //             // use help cards
    //         }
        // check player2.hand to see if any cards are topCard.value + 1 or topCard.value
            // if hand contains a card that fits 
            // remove card from player2.hand
            // push card to currentCards
            // change image on currentCards
            // pop deck into hand
            // else 
            // use help card
    
}   
//FUNCTIONS==============================================================================================    
function dealPlayer1() {
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
}
function dealPlayer2() {
    fetch(player2Deckurl).then( function(response) {
        return response.json()
    }).then( function(data){
        player2.deck = data.cards.splice(0, 15);
        player2.hand = data.cards.splice(0, 5);
        for (let i = 0; i < player2.hand.length; i++) {
            // console.log("num children", player1Hand.children.length)
            player2Hand.children[i].src = player2.hand[i].image;
            // console.log("plaeyer1 hand:", player1.hand);
        }
        console.log(player2.deck["1"], player2.hand["0"]);
        console.log(typeof player2.deck);
    })
}
function dealHelp() {
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
    }
    function activateHelp(e) {
        
        // console.log('help!')
        var card = helpDeck.pop()
        if (!card) {
            document.getElementById("winMessage1").textContent = "TIE TIE TIE!!!";
            clearInterval(ai);
            reset();
        } else {
            currentCards.push(card);
            currentCard.src = card.images.png;
            if (helpCards.length == 12) {
                helpCards.removeEventListener('click', function(e){
                    console.log(true);
                })
            }
            if (!ai) {
                ai = setInterval(player2Plays, 10000);
            }
        }
    };
//END OF GAME==========================================================================================
function endGame() {
    if (player1Hand.length === 0 && player1Deck.length === 0) {
        score1++ ;
        player1Score.textContent = score1;
        document.getElementById("winMessage1").textContent = "Player 1 WON!";
        console.log('the score is', score1);
        clearInterval(ai);
    }
    else if (player2Hand.length === 0 && player2Deck.length === 0) {
        score2++ ;
        player2Score.textContent = score2;
        document.getElementById("winMessage2").textContent = "Player 2 WON!";
        clearInterval(ai);
    }
} 
//RESET GAME===============================================================================================
function reset() {
    gameOver = false;
    score1 = 0;
    score2 = 0;
    player1.hand.length = 0
    player1.deck.length = 0
    player2.hand.length = 0
    player2.deck.length = 0
    currentCards.length = 0
    
    // document.getElementById("winMEssage1").textContent = "";
    // document.getElementById("winMessage2").textContent = "";
    
    fetch(deckurl).then( function(response) {
        return response.json()
    }).then( function(data){
        deckID = data.deck_id
        player1Deckurl = "https://deckofcardsapi.com/api/deck/"+ deckID + "/draw/?count=10";
        player2Deckurl = "https://deckofcardsapi.com/api/deck/"+ deckID + "/draw/?count=10";
        helpCardsurl = "https://deckofcardsapi.com/api/deck/"+ deckID + "/draw/?count=12";
        console.log('reset clicked');
    }).then( function() {
        dealPlayer1()
        dealPlayer2()
        dealHelp()
    })
}                                                                                                                                  