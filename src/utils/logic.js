export function deriveActivePlayer(gameTurns) {
    let currentPlayer = "X";
  
    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
      currentPlayer = "O";
    }
  
    return currentPlayer;
}

export function checkForWinner(board) {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
            return board[i][0]; // Return the winner
        }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
        if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
            return board[0][i]; // Return the winner
        }
    }

    // Check diagonals
    if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
        return board[0][0]; // Return the winner
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
        return board[0][2]; // Return the winner
    }

    // Check for tie
    let isTie = true;
    for (let row of board) {
        for (let cell of row) {
            if (!cell) {
                isTie = false;
                break;
            }
        }
        if (!isTie) break;
    }
    if (isTie) return "tie";

    // If no winner or tie, return null
    return null;
}

export function makeAiMove(board, ai = "O") {
    // Check for any winning moves for the AI
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!board[i][j]) {
                board[i][j] = ai;
                if (checkForWinner(board) === ai) {
                    return { row: i, col: j };
                }
                board[i][j] = null;
            }
        }
    }

    // Check for any winning moves for the player and block them
    let opponent = (ai === "X") ? "O" : "X";
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!board[i][j]) {
                board[i][j] = opponent;
                if (checkForWinner(board) === opponent) {
                    board[i][j] = ai;
                    return { row: i, col: j };
                }
                board[i][j] = null;
            }
        }
    }

    // If no winning moves, make a random move
    let availableMoves = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!board[i][j]) {
                availableMoves.push({ row: i, col: j });
            }
        }
    }
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}