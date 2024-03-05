import HeaderImage from '../assets/game-logo.png';

export default function Header() {
    return (
        <header>
            <img src={HeaderImage} alt="Tic-Tac-Toa" />
            <h1>Tic-Tac-Toa</h1>
        </header>
    );
}