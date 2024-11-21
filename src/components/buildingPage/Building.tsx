import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import buildingsInfo from '../../storage/buildingsInfo.json';

const Building = () => {
    const { buildingName } = useParams<{ buildingName: string }>();
    const navigate = useNavigate();
    const building = buildingsInfo[buildingName];
    const [selectedFloor, setSelectedFloor] = useState(0);

    if (!building) {
        return <div>Building not found</div>;
    }

    return (
        <div>
            <button onClick={() => navigate(-1)}>Back</button>
            <h1>{buildingName.toUpperCase()} Building</h1>
            <img src={building.image} alt={`Building ${buildingName}`} />
            <p>Number of Floors: {building.numberOfFloors}</p>

            {/* Horizontal List for Floors */}
            <div className="floor-selector">
                {building.floors.map((_, index) => (
                    <button
                        key={index}
                        className={selectedFloor === index ? 'selected' : ''}
                        onClick={() => setSelectedFloor(index)}
                    >
                        Floor {index + 1}
                    </button>
                ))}
            </div>

            {/* Display Rooms Based on Selected Floor */}
            <div className="rooms-list">
                {building.floors[selectedFloor].rooms.map((room, index) => (
                    <div
                        key={index}
                        className="room-card"
                        onClick={() => navigate(`/building/${buildingName}/room/${room.name}`)}
                    >
                        <h3>{room.name}</h3>
                        <p>{room.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Building;