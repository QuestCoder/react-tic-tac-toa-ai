export default function Log({ turns }) {
    function turnElement(turn) {
        const { player, square } = turn;
        const { row, col } = square;
        const coord = `${row+1},${col+1}`;
        // Generate log element
        return <li key={coord}>{player} selected {coord}</li>
    }

    return (
        <ol id="log">
            { turns.map((turn) => turnElement(turn)) }
        </ol>
    );
}