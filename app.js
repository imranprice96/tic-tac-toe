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
    const printBoard = () => console.table(board);
    return {
        changeCell,
        printBoard,
        resetBoard
    };
})();