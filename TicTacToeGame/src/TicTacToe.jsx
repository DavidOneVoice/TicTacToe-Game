import { useState } from "react";
import "./TicTacToe.css";
import Copyrights from './Copyrights'

export default function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null)); // Initialize board with 9 empty spots
    const [isXNext, setIsXNext] = useState(true); // Track whose turn it is
    const [winner, setWinner] = useState(null);  // Track winner

    const handleClick = (index) => {
        if (board[index] || winner) return;  // Ignore clicks if the spot is already filled or game is over
        
        const newBoard = [...board];
        newBoard[index] = isXNext ? "X" : "O";  // Set X or O based on turn
        setBoard(newBoard);
        
        setIsXNext(!isXNext);  // Switch turns
        
        checkWinner(newBoard);  // Check if the game is won
    };

    const checkWinner = (newBoard) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
            [0, 4, 8], [2, 4, 6]              // Diagonals
        ];

        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
                setWinner(newBoard[a]);
                return;
            }
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));  // Clear board
        setIsXNext(true);               // X starts first
        setWinner(null);                // Reset winner
    };

    return (
        <div className="main">
            <h1>Tic Tac Toe Game</h1>
            
            {winner ? (
                <h2>{winner} Wins!</h2>
            ) : (
                <h2>{isXNext ? "X" : "O"}'s Turn</h2>
            )}
            
            <div id="board">
                {board.map((value, index) => (
                    <button key={index} onClick={() => handleClick(index)} className="square">
                        {value}
                    </button>
                ))}
            </div>

            {winner && (
                <button onClick={resetGame} className="reset-button">Play Again</button>
            )}
            <Copyrights />
        </div>
        
    );
}
