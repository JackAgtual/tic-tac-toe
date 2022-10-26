const gameboard = (doc => {
    const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    let turn = 'X'

    let winner = '';
    
    const _markerOptions = ['X', 'O'];

    const _boardSize = board.length; // assuming board is square

    const _winnerEl  = document.querySelector('#game-winner');

    const _linearIdx2RowColIdx = linearIdx => {
        // row major linear indexing to row and column indexing
        // row major linear indexing: [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
        return [Math.floor(linearIdx / _boardSize), linearIdx % _boardSize];
    }

    const _getCurrentPlayer = playerList => {
        for (let i = 0; i < playerList.length; i++) {
            if (playerList[i].marker === turn) {
                return playerList[i];
            }
        }
    }

    const playTurn = (playerList, idx) => {
        if (winner.length > 0) return;
        
        const curPlayer = _getCurrentPlayer(playerList);
        _addMarkerToBoard(curPlayer.marker, idx);
    }

    const _moveIsValid = (marker, row, col) => {
        // check if tile is already filled
        const curMarker = board[row][col];
        if (curMarker.length !== 0) return false;

        // check if it's player's turn
        if (marker !== turn) return false;

        return true;
    }

    const _addMarkerToBoard = (marker, idx) => {
        const [row, col] = _linearIdx2RowColIdx(idx);
        
        if (!_moveIsValid(marker, row, col)) return;

        // toggle turn
        turn = turn.toUpperCase() === 'X' ? turn = 'O' : turn = 'X';
        
        board[row][col] = marker;
        _renderBoardElement(idx);
        winner = _getGameWinner();
        _renderGameWinner();
    };

    const _renderBoardElement = idx => {
        const grid = doc.querySelector(`.box[data-idx="${idx}"]`);
        const [row, col] = _linearIdx2RowColIdx(idx);
        grid.innerText = `${board[row][col]}`
    };

    const _comboIsWinner = (comboArray, marker) => comboArray.filter(el => el === marker).length === _boardSize;

    const _boardIsFull = () => {
        for (let i = 0; i < _boardSize; i++) {
            for (let j = 0; j < _boardSize; j++) {
                if (board[i][j].length === 0) return false;
            }
        }
        return true;
    }

    const _getGameWinner = () => {
        // Will return marker for winner of game
        // if there is no winner, return an empty string
        // tie game: return a string of length 2 with both markers

        for (const marker of _markerOptions) {
            for (let i = 0; i < _boardSize; i++) {
                let row = board[i];
                let col = board.map(row => row[i]);

                if(_comboIsWinner(row, marker) || _comboIsWinner(col, marker)) return marker;
            }
        
            const diag1 = [board[0][0], board[1][1], board[2][2]];
            const diag2 = [board[0][2], board[1][1], board[2][0]];

            if (_comboIsWinner(diag1, marker) || _comboIsWinner(diag2, marker)) return marker;
        }

        // check if game is tie
        if (_boardIsFull()) return _markerOptions.join('');
        
        return '';
    }

    const _renderGameWinner = () => {
        if (winner.length === 0) return;

        if (winner.length === 2) {
            _winnerEl.innerText = 'TIE';
            return;
        }

        _winnerEl.innerText = winner;
    }

    return {
        playTurn
    }
})(document);

const Player = (marker) => {

    return {
        marker
    }
};

const player1 = Player('X');
const player2 = Player('O');

// game boxes
const boxes = document.querySelectorAll('.box');
boxes.forEach(box => {
    box.addEventListener('click', () => {
        gameboard.playTurn([player1, player2], Number(box.dataset.idx))
    });
});