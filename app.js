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
        return (board[cell].marker == '');
    }
    const printBoard = () => console.table(board);
    return {
        changeCell,
        printBoard,
        resetBoard,
        cellIsEmpty
    };
})();

const row = (index) => {
    let newRow = [
        {cell: index, marker: ''},
        {cell: index+1, marker: ''},
        {cell: index+2, marker: ''},
    ];
    return newRow;
};

const column = (index) =>{
    let newColumn = [
        {cell: index, marker: ''},
        {cell: index+3, marker: ''},
        {cell: index+6, marker: ''},
    ];
    return newColumn;
};

const diagonal = (cell1,cell2,cell3) =>{
    let newDiagonal = [
        {cell: cell1, marker: ''},
        {cell: cell2, marker: ''},
        {cell: cell3, marker: ''},
    ];
    return newDiagonal;
}

const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;

    return{getName, getMark};
};

const gameController = (() => {
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');

    let player1Turn = true;

    let row1 = row(1);
    let row2 = row(4);
    let row3 = row(7);
    let col1 = column(1);
    let col2 = column(2);
    let col3 = column(3);
    let diag1 = diagonal(1,5,9);
    let diag2 = diagonal(3,5,7);
    const checkWin = (line) =>{
        if(line[0].marker != ''){
            return (
                (line[0].marker == line[1].marker) && (line[1].marker == line[2].marker)
            );
        }
        return false;
    }
    
    const updateBoardState = () => {

    }

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('click', (e) => {
        cellIndex = parseInt(e.target.getAttribute('id'));
        console.log(cellIndex);
        if(gameBoard.cellIsEmpty(cellIndex)){
            console.log('empty');
            if(player1Turn){
                gameBoard.changeCell(cellIndex, player1.getMark())
                gameBoard.printBoard();
                console.log(player1.getMark());
            }
        }
    }));

})();
