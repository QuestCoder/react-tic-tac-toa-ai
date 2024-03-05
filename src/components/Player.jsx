import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChange }) {
    const [name, setName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing((editing) => !editing);
        if (isEditing) {
            onChange(symbol, playerName);
        }
    }

    function handleChange(event) {
        setName(event.target.value);
    }

    let playerName = <span className="player-name">{name}</span>;
    let btnText = "Edit";

    if (isEditing) {
        playerName = <input type="text" required value={name} onChange={handleChange} />;
        btnText = "Save";
    }

    return (
        <li className={isActive ? "active" : null}>
            <span className="player">
                { playerName }
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{btnText}</button>
        </li>
    );
}