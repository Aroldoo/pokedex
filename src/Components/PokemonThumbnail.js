import React, { useState } from "react";
import Description from "./Description"; 

const PokemonThumbnail = ({
    id,
    name,
    image,
    type,
    height,
    weight,
    stats
}) => {
    const [show, setShow] = useState(false);

    const handleToggleDescription = () => {
        setShow(!show);
    };

    return (
        <div className="pokemon-card">
            <div className="pokemon-header">
                <div className="pokemon-number">
                    <small>#{id.toString().padStart(3, '0')}</small>
                </div>
                <h3 className="pokemon-name">{name.toUpperCase()}</h3>
            </div>
            <img className="pokemon-image" src={image} alt={name} />
            <div className="pokemon-details">
                <p className="pokemon-type">Type: {type}</p>
                <button className="toggle-description" onClick={handleToggleDescription}>
                    {show ? "Hide Details" : "Show Details"}
                </button>
                {show && (
                    <Description
                        weightpok={weight}
                        heightpok={height}
                        stats={stats}
                    />
                )}
            </div>
        </div>
    );
};

export default PokemonThumbnail;
