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
var currentCard = document.getElementById('current')
var helpCards = document.getElementById("helpCards");
var player1Score = document.getElementsByClassName("score1")[0];
var player2Score = document.getElementsByClassName("score2")[0];
var dealButton = document.getElementById("dealButton");
resetButton = document.getElementById("reset");

//EVENTLISTENERS================================================================================================================

document.addEventListener('DOMContentLoaded', function () {
    startButton = document.getElementById('dealButton')
    fetch(deckurl).then(function (response) {
        return response.json()
    }).then(function (data) {
        deckID = data.deck_id
        player1Deckurl = "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=20";
        player2Deckurl = "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=20";
        helpCardsurl = "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=12";
    })
    startButton.addEventListener('click', dealPlayer1)
    startButton.addEventListener('click', dealPlayer2)
    startButton.addEventListener('click', dealHelp)
    resetButton.addEventListener('click', function (e) {
        reset();
    })
    helpCards.addEventListener('click', activateHelp)

    //PLAYER 1 PLAYS==========================================================================================================================================

    player1Hand.addEventListener('click', function (e) {
        var cardIndex = e.target.id.charAt(e.target.id.length - 1);
        var clickedCard = player1.hand[cardIndex];
        // Check to see if this is a valid choice
        if ((values[clickedCard.value] === values[(currentCards[currentCards.length - 1].value)]) ||
            (values[(currentCards[currentCards.length - 1]).value] + 1 === values[clickedCard.value]) ||
            (values[clickedCard.value] - values[(currentCards[currentCards.length - 1].value)] === -12)) {
            // adding a card to the hand
            // make sure to splice card from player hand and push into currentCards array
            // do the below to switch image on top of currentCards in display
            currentCard.src = e.target.src;
            let newcard = player1.deck.pop();
            currentCards.push(player1.hand[cardIndex]);
            player1.hand[cardIndex] = newcard;
            e.target.src = newcard.images.png;
            endGame();
        }
    })
})
//PLAYER 2 (AI) PLAYS====================================================================================================      

function player2Plays() {
    var topCard = currentCards[currentCards.length - 1]
    if (!topCard) {
    }
    var i = 0;
    for (var card of player2.hand) {
        if (values[card.value] === values[topCard.value]
            || (values[topCard.value] + 1 === values[card.value])
            || (values[card.value] - values[topCard.value] === -12)) {
            // card matches, play it
            // i is the index of which card the ai is playing
            // take card from hand
            currentCard.src = card.image;
            currentCards.push(card);
            let newcard2 = player2.deck.pop();
            currentCards.push(player2.hand[i]);
            player2.hand[i] = newcard2;
            player2Hand.children[i].src = newcard2.image;
            // add to pile
            // replace card in hard with one from draw pile
        } else {
            // card doesn't match
            i++;
        }
        if (i == 4) {
            activateHelp();
            topCard = currentCards[0];
        }
    }
    endGame();
}
//FUNCTIONS==============================================================================================    
function dealPlayer1() {
    fetch(player1Deckurl).then(function (response) {
        return response.json()
    }).then(function (data) {
        player1.deck = data.cards.splice(0, 15);
        player1.hand = data.cards.splice(0, 5);
        for (let i = 0; i < player1.hand.length; i++) {
            player1Hand.children[i].src = player1.hand[i].image;
        }
    })
}
function dealPlayer2() {
    fetch(player2Deckurl).then(function (response) {
        return response.json()
    }).then(function (data) {
        player2.deck = data.cards.splice(0, 15);
        player2.hand = data.cards.splice(0, 5);
        for (let i = 0; i < player2.hand.length; i++) {
            player2Hand.children[i].src = player2.hand[i].image;
        }
    })
}
function dealHelp() {
    fetch(helpCardsurl).then(function (response) {
        return response.json()
    }).then(function (data) {
        helpDeck = data.cards;
    })
}
function activateHelp(e) {
    var card = helpDeck.pop()
    if (!card) {
        document.getElementById("winMessage1").textContent = "TIE TIE TIE!!!";
        clearInterval(ai);
        reset();
    } else {
        currentCards.push(card);
        currentCard.src = card.images.png;
        if (helpCards.length == 12) {
            helpCards.removeEventListener('click', function (e) {
            })
        }
        if (!ai) {
            ai = setInterval(player2Plays, 5000);
        }
    }
};
//END OF GAME==========================================================================================
function endGame() {
    if (player1Hand.length === 0 && player1Deck.length === 0) {
        score1++;
        player1Score.textContent = score1;
        document.getElementById("winMessage1").textContent = "Player 1 WON!";
        clearInterval(ai);
    }
    else if (player2Hand.length === 0 && player2Deck.length === 0) {
        score2++;
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

    fetch(deckurl).then(function (response) {
        return response.json()
    }).then(function (data) {
        deckID = data.deck_id
        player1Deckurl = "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=10";
        player2Deckurl = "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=10";
        helpCardsurl = "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=12";
    }).then(function () {
        dealPlayer1()
        dealPlayer2()
        dealHelp()
    })
}                                                                                                                                  