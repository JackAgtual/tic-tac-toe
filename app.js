const gameboard = (doc => {
    const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const _boardSize = board.length; // assuming board is square

    const _linearIdx2RowColIdx = linearIdx => {
        // row major linear indexing to row and column indexing
        // row major linear indexing: [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
        return [Math.floor(linearIdx / _boardSize), linearIdx % _boardSize];
    }

    const addMarkerToBoard = (marker, idx) => {
        const [row, col] = _linearIdx2RowColIdx(idx);
        
        // make sure move is valid
        const curMarker = board[row][col];
        if (curMarker.length !== 0) return;

        board[row][col] = marker;
        _renderBoardElement(idx);
    };

    const _renderBoardElement = idx => {
        const grid = doc.querySelector(`.box[data-idx="${idx}"]`);
        const [row, col] = _linearIdx2RowColIdx(idx);
        grid.innerText = `${board[row][col]}`
    };

    return {
        board,
        addMarkerToBoard
    }
})(document);

const Player = (side) => {

};


// game boxes
const boxes = document.querySelectorAll('.box');
boxes.forEach(box => {
    box.addEventListener('click', () => {
        const marker = 'X';
        gameboard.addMarkerToBoard(marker, Number(box.dataset.idx));
    });
});