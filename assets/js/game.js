/**
 * 2C = Two of Clubs (Treboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */


//Patron Modulo


const miModulo = (() => {
    'use strict';


    let deck = [];
    const types = ['C', 'D', 'H', 'S'],
        specials = ['A', 'J', 'Q', 'K'];

    let pointsPlayers = [];

    //Referencias HTML

    const btnOrder = document.querySelector('#btnOrder'),
        btnStop = document.querySelector('#btnStop'),
        btnNew = document.querySelector('#btnNew');


    const divCardsPlayers = document.querySelectorAll('.divCards'),
        pointsHTML = document.querySelectorAll('small');


    let name = prompt('What\'s your name? ');




    const initializeGame = (numPlayers = 2) => {
        deck = buildDeck();

        pointsPlayers = [];

        for (let i = 0; i < numPlayers; i++) {
            pointsPlayers.push(0);
        }

        pointsHTML.forEach(elem => elem.innerText = 0);
        divCardsPlayers.forEach(elem => elem.innerHTML = '');

        btnOrder.disabled = false;
        btnStop.disabled = false;

    }


    const buildDeck = () => {

        deck = [];

        for (let i = 2; i <= 10; i++) {
            for (let type of types) {
                deck.push(i + type);
            }

        }

        for (let type of types) {
            for (let spe of specials) {
                deck.push(spe + type)

            }

        }




        return _.shuffle(deck);
    }




    //Pedir Cartas


    const orderCard = () => {

        if (deck.length === 0) {
            throw 'No cards in the deck';
        }

        return deck.pop();

    }


    

    const cardValue = (card) => {

        const value = card.substring(0, card.length - 1);
        
        return (isNaN(value)) ?
            (value === 'A') ? 11 : 10
            : value * 1;



    }


    //Turno: 0 Jugador primer jugador y ultimo computadora
    const accumulatePoints = (card, shift) => {

        pointsPlayers[shift] = pointsPlayers[shift] + cardValue(card);

        pointsHTML[shift].innerText = pointsPlayers[shift];

        return pointsPlayers[shift];

    }

    const createCard = (card, shift) => {
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cartas/${card}.png`;
        imgCard.classList.add('carta');
        divCardsPlayers[shift].append(imgCard);


    }

    const determineWinner = () => {

        const [minimumPoints, pointsBot] = pointsPlayers;

        setTimeout(() => {
            if (pointsBot === minimumPoints) {
                alert('Drawn');
            } else if (minimumPoints > 21) {
                alert('Bot Win');
            } else if (pointsBot > 21) {
                alert(`${name} Win!`);
            } else {
                alert('Bot Win');
            }
        }, 14);

    }

    //Turno Computadora

    const botShift = (minimumPoints) => {

        let pointsBot = 0;
        do {

            const card = orderCard();

            pointsBot = accumulatePoints(card, pointsPlayers.length - 1);
            createCard(card, pointsPlayers.length - 1);




        } while ((pointsBot < minimumPoints) && minimumPoints <= 21);


        determineWinner();

    }



    //Eventos



    btnOrder.addEventListener('click', () => {

        const card = orderCard();

        const pointsPlayer = accumulatePoints(card, 0);
        createCard(card, 0);




        if (pointsPlayer > 21) {
            console.warn(`${name} lose`);
            btnOrder.disabled = true;
            btnStop.disabled = true;
            botShift(pointsPlayer);
        } else if (pointsPlayer === 21) {
            console.warn('21, Cool!');
            btnOrder.disabled = true;
            btnStop.disabled = true;
            botShift(pointsPlayer);
        }

    })


    btnStop.addEventListener('click', () => {

        btnOrder.disabled = true;
        btnStop.disabled = true;

        botShift(pointsPlayers[0]);


    })



    btnNew.addEventListener('click', () => {


        initializeGame();



    })

    return {

        newGame: initializeGame,

    }

})();



