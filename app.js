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

    const checkMatchingRows = () => {
        if(
            (board[0].marker == board[1].marker && board[1].marker == board[2].marker)
            ||
            (board[3].marker == board[4].marker && board[4].marker == board[5].marker)
            ||
            (board[6].marker == board[7].marker && board[7].marker == board[8].marker)
        ){
            return true;
        };
    };

    const checkMatchingColumns = () => {
        if(
            (board[0].marker == board[3].marker && board[3].marker == board[6].marker)
            ||
            (board[1].marker == board[4].marker && board[4].marker == board[7].marker)
            ||
            (board[2].marker == board[5].marker && board[5].marker == board[8].marker)
        ){
            return true;
        };
    };

    const checkMatchingDiagonals = () => {
        if(
            (board[0].marker == board[4].marker && board[4].marker == board[8].marker)
            ||
            (board[2].marker == board[4].marker && board[4].marker == board[6].marker)
        ){
            return true;
        };
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
        checkForWinner
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

    let player1Turn = true;
    const changeTurn = () => player1Turn = !player1Turn;


    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('click', (e) => {
        cellIndex = parseInt(e.target.getAttribute('id'));
        console.log(cellIndex);
        if(gameBoard.cellIsEmpty(cellIndex)){
            console.log('empty');
            if(player1Turn){
                gameBoard.changeCell(cellIndex, player1.getMark())
                gameBoard.printBoard();
                e.target.innerHTML = player1.getMark();
                changeTurn();
                console.log(gameBoard.checkForWinner());
            }else{
                gameBoard.changeCell(cellIndex, player2.getMark())
                gameBoard.printBoard();
                e.target.innerHTML = player2.getMark();
                changeTurn();
                console.log(gameBoard.checkForWinner());
            }
        }
    }));

})();
