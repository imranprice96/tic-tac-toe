const gameBoard = (() => {
    'use strict';
    let board = [
        {cell:1, marker:''},
        {cell:2, marker:''},
        {cell:3, marker:''},
        {cell:4, marker:''},
        {cell:5, marker:''},
        {cell:6, marker:''},
        {cell:7, marker:''},
        {cell:8, marker:''},
        {cell:9, marker:''}
    ];

    const resetBoard = () => board = [
        {cell:1, marker:''},
        {cell:2, marker:''},
        {cell:3, marker:''},
        {cell:4, marker:''},
        {cell:5, marker:''},
        {cell:6, marker:''},
        {cell:7, marker:''},
        {cell:8, marker:''},
        {cell:9, marker:''}
    ];
    const getCell = (cell) => cell-1;
    const changeCell = (cell, mark) => {
        board[getCell(cell)].marker = mark;
    };
    const cellIsEmpty = (cell) => {
        return (board[getCell(cell)].marker == '');
    };

    const checkForTie = () =>{
        if(
            board[0].marker != '' &&
            board[1].marker != '' &&
            board[2].marker != '' &&
            board[3].marker != '' &&
            board[4].marker != '' &&
            board[5].marker != '' &&
            board[6].marker != '' &&
            board[7].marker != '' &&
            board[8].marker != ''
        ){
            return true;
        }
    }

    const checkMatchingRows = () => {
        if(
            ((board[0].marker != '' && board[1].marker != '' && board[2].marker != '' )
                &&
            (board[0].marker == board[1].marker && board[1].marker == board[2].marker))
            ||
            ((board[3].marker != '' && board[4].marker != '' && board[5].marker != '' )
                &&
            (board[3].marker == board[4].marker && board[4].marker == board[5].marker))
            ||
            ((board[6].marker != '' && board[7].marker != '' && board[8].marker != '' )
                &&
            (board[6].marker == board[7].marker && board[7].marker == board[8].marker))
        ){
            return true;
        };
    };

    const checkMatchingColumns = () => {
        if(
            ((board[0].marker != '' && board[3].marker != '' && board[6].marker != '' )
                &&
            (board[0].marker == board[3].marker && board[3].marker == board[6].marker))
            ||
            ((board[1].marker != '' && board[4].marker != '' && board[7].marker != '' )
                &&
            (board[1].marker == board[4].marker && board[4].marker == board[7].marker))
            ||
            ((board[2].marker != '' && board[5].marker != '' && board[8].marker != '' )
                &&
            (board[2].marker == board[5].marker && board[5].marker == board[8].marker))
        ){
            return true;
        };
    };

    const checkMatchingDiagonals = () => {
        if(
            ((board[0].marker != '' && board[4].marker != '' && board[8].marker != '' )
                &&
            (board[0].marker == board[4].marker && board[4].marker == board[8].marker))
            ||
            ((board[2].marker != '' && board[4].marker != '' && board[6].marker != '' )
                &&
            (board[2].marker == board[4].marker && board[4].marker == board[6].marker))
        ){
            return true;
        }else{ return false;};
    }

    const checkForWinner = () => {
        return (checkMatchingRows() || checkMatchingColumns() || checkMatchingDiagonals());
    }

    const printBoard = () => console.table(board);
    return {
        changeCell,
        printBoard,
        resetBoard,
        cellIsEmpty,
        checkForWinner,
        checkForTie
    };
})();

const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;

    return{getName, getMark};
};

const gameController = (() => {
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');
    const cells = document.querySelectorAll('.cell');

    let player1Turn = true;
    const changeTurn = () => player1Turn = !player1Turn;

    const resetGame = () => {
        const winnerPopup = document.getElementById('winner');
        winnerPopup.style.display = 'none';
        winnerPopup.innerHTML = '';
        gameBoard.resetBoard();
        player1Turn = true;
        cells.forEach((cell => {
            cell.innerHTML = '';
        }));
    };

    const displayWinner = (playerName) =>{
        const winnerPopup = document.getElementById('winner');
        let msg = document.createTextNode(`${playerName} is the winner!`);
        let p = document.createElement('p');
        p.appendChild(msg);
        winnerPopup.appendChild(p);
        winnerPopup.style.display = 'flex';

        let reset = document.createElement('button');
        reset.setAttribute('class', 'reset-btn');
        reset.appendChild(document.createTextNode('Play Again?'));
        reset.addEventListener('click', (e) => {
            resetGame(e);
        });
        winnerPopup.appendChild(reset);
    }

    const displayDraw = () => {
        const winnerPopup = document.getElementById('winner');
        let msg = document.createTextNode('Draw!');
        let p = document.createElement('p');
        p.appendChild(msg);
        winnerPopup.appendChild(p);
        winnerPopup.style.display = 'flex';

        let reset = document.createElement('button');
        reset.setAttribute('class', 'reset-btn');
        reset.appendChild(document.createTextNode('Play Again?'));
        reset.addEventListener('click', (e) => {
            resetGame(e);
        });
        winnerPopup.appendChild(reset);
    };

    cells.forEach(cell => cell.addEventListener('click', (e) => {
        cellIndex = parseInt(e.target.getAttribute('id'));
        if(gameBoard.cellIsEmpty(cellIndex)){
            if(!gameBoard.checkForWinner()){
                if(player1Turn){
                gameBoard.changeCell(cellIndex, player1.getMark())
                e.target.innerHTML = player1.getMark();
                if(gameBoard.checkForWinner()) displayWinner(player1.getName());
                if(gameBoard.checkForTie()) displayDraw();
                changeTurn();
            }else{
                gameBoard.changeCell(cellIndex, player2.getMark())
                e.target.innerHTML = player2.getMark();
                if(gameBoard.checkForWinner()) displayWinner(player2.getName());
                if(gameBoard.checkForTie()) displayDraw();
                changeTurn();
                }
            }
            
        }
    }));

    return {resetGame, displayWinner};
})();