const gameboard = (doc => {
    let board = [
        ['A', 'B', 'C'],
        ['D', 'E', 'F'],
        ['G', 'H', 'I']
    ];

    const _boardSize = board.length; // assuming board is square

    const _linearIdx2RowColIdx = linearIdx => {
        // row major linear indexing to row and column indexing
        // row major linear indexing: [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
        return [Math.floor(linearIdx / _boardSize), linearIdx % _boardSize];
    }

    const renderBoard = () => {
        const grids = doc.querySelectorAll('.box');
        grids.forEach((grid, idx) => {
            [row, col] = _linearIdx2RowColIdx(idx);
            grid.innerText = `${board[row][col]}`
        });
    };

    return {
        board,
        renderBoard
    }
})(document);

console.log(gameboard.board)
gameboard.renderBoard()