import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import buildingsInfo from '../../storage/buildingsInfo.json';
import translations from '../../storage/translations.json';
import './RoomInfo.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getUser } from "../../session/session.js";
import languageJson from '../../storage/language.json';



const language = languageJson['language'];

let valueSelected: String = '';
let roomIndex: number = 0;

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 4 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 3,
        slidesToSlide: 3 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 767, min: 464 },
        items: 2,
        slidesToSlide: 1 // optional, default to 1.
    }
};




const RoomInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedOption, setSelectedOption] = useState(translations[language].roomInfo.buttonRoomInfo);
    const { buildingName, roomName } = useParams<{ buildingName: string; roomName: string }>();
    const building = buildingsInfo[buildingName];
    const [roomInfo] = buildingsInfo[buildingName];
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

    const findFloorIndex = (buildingName: string, roomName: string): number | null => {
        const building = buildingsInfo[buildingName];
        if (!building) {
            console.log('Building not found');
            return null;
        }
    
        for (let floorIndex = 0; floorIndex < building.floors.length; floorIndex++) {
            const floor = building.floors[floorIndex];
            for (let roomIndex = 0; roomIndex < floor.rooms.length; roomIndex++) {
                const room = floor.rooms[roomIndex];
                if (room.name === roomName) {
                    return floorIndex;
                }
            }
        }
    
        console.log('Room not found in the building');
        return null;
    };

    const [currentIndex, setCurrentIndex] = useState(findFloorIndex(buildingName, roomName));

    const findRoomIndex = (buildingName: string, roomName: string): number | null => {
        const building = buildingsInfo[buildingName];
        if (!building) {
            console.log('Building not found');
            return null;
        }

        for (let floorIndex = 0; floorIndex < building.floors.length; floorIndex++) {
            const floor = building.floors[floorIndex];
            for (let roomIndex = 0; roomIndex < floor.rooms.length; roomIndex++) {
                const room = floor.rooms[roomIndex];
                if (room.name === roomName) {
                    return roomIndex;
                }
            }
        }

        console.log('Room not found in the building');
        return null;
    };

    roomIndex = findRoomIndex(buildingName, roomName);
    console.log('RoomInfo', buildingName, roomName, findFloorIndex(buildingName, roomName), findRoomIndex(buildingName, roomName));

    let functionBook = () => {
        const timeStartInput = document.getElementById("timeStart") as HTMLInputElement;
        const timeEndInput = document.getElementById("timeEnd") as HTMLInputElement;
            
        if (!timeStartInput.value || !timeEndInput.value || valueSelected === '') {
            alert(translations[language].roomInfo.alertCheck1);
        }
    
        else if (timeStartInput.value >= timeEndInput.value) {
            alert(translations[language].roomInfo.alertCheck2);
        }
        else if (selectedDate < new Date().toISOString().split('T')[0]) {
            alert(translations[language].roomInfo.alertCheck3);
        }
        else if (timeStartInput && timeEndInput) {
            const timeStart = timeStartInput.value;
            const timeEnd = timeEndInput.value;

            // Check for time conflicts with existing reservations
            const room = building.floors[currentIndex].rooms.find(room => room.name === roomName);
            if (room) {
                const hasConflict = room.reservations.some(reservation => {
                    return reservation.date === valueSelected &&
                        ((timeStart >= reservation.time_start && timeStart < reservation.time_end) ||
                        (timeEnd > reservation.time_start && timeEnd <= reservation.time_end) ||
                        (timeStart <= reservation.time_start && timeEnd >= reservation.time_end));
                });
        
                if (hasConflict) {
                    alert(translations[language].roomInfo.alertCheck4);
                    return;
                }
            }

            const reservation = { date: valueSelected, time_start: timeStart, time_end: timeEnd, user: getUser().username };
            buildingsInfo[buildingName].floors[currentIndex].rooms[roomIndex]['reservations'].push(reservation);
            console.log('Reservation added', reservation);
            alert(translations[language].roomInfo.alertSuccess);
        }
        else {
        console.log('Input elements not found');
    }
        
    }

    const handleSelect = (index: number) => {
        setCurrentIndex(index);
    };

    const RoomCalendar = () => {
        const [value, onChange] = useState(new Date());
        const [activeStartDate, setActiveStartDate] = useState(new Date());

        
        const handleDateChange = (value: Date) => {
            onChange(value);
            setSelectedDate(value.toISOString().split('T')[0]);
            valueSelected = value.toISOString().split('T')[0];
            setActiveStartDate(value);
        };

        const handleActiveStartDateChange = ({ activeStartDate }: { activeStartDate: Date }) => {
            setActiveStartDate(activeStartDate);
        };

        return (
            <Calendar
                onChange={handleDateChange}
                value={value}
                minDate={new Date('2024-09-01')}
                maxDate={new Date('2024-12-31')}
                showNavigation={true}
                showNeighboringMonth={true}
                showWeekNumbers={false}
                locale={translations[language].roomInfo.calendarLocale}
                activeStartDate={activeStartDate}
                onActiveStartDateChange={handleActiveStartDateChange}
            />
        )
    }

    const renderContent = () => {
        switch (selectedOption) {
            case translations[language].roomInfo.buttonRoomInfo:
                return <div className="rooms-list">
                    {building.floors[currentIndex].rooms.map((room, index) => {
                        if (room.name === roomName) {
                            return (
                                <div
                                    key={roomName}
                                    className="room-info-card"
                                >
                                    <div >
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <div style={{ flex: 1, alignContent: 'center' }}>
                                                <table style={{ alignContent: 'center' }}>
                                                    <tbody>
                                                        <tr>
                                                            <td>{translations[language].roomInfo.Description}</td>
                                                            <td>{room.description}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>{translations[language].roomInfo.Size}</td>
                                                            <td>{room.size}</td>
                                                        </tr>

                                                        {room.materials.map((material, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>Material - {index + 1}</td>
                                                                    <td>{material.name}</td>
                                                                </tr>
                                                            );
                                                        })}

                                                        {room.qualities.map((qlt, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{translations[language].roomInfo.Quality} - {index + 1}</td>
                                                                    <td>{qlt}</td>
                                                                </tr>
                                                            );
                                                        })}

                                                    </tbody>
                                                </table>
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <img src={room.photos[1]} alt={room.name} style={{ width: '100%' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>;
            case translations[language].roomInfo.buttonReservations:
                return building.floors[currentIndex].rooms.map((room, index) => {
                    if (room.name === roomName) {
                        const reservationsForSelectedDate = room.reservations.filter(reserve => reserve.date === valueSelected);
                        return (
                            <div key={index}>
                                <div className="reservations-container">
                                    <div className="calendar-container">
                                        <h2><RoomCalendar /></h2>
                                    </div>
                                    <div className="details-container">
                                        <h2>{translations[language].roomInfo.completedReservations}</h2>
                                        {reservationsForSelectedDate.length > 0 ? (
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <th>{translations[language].roomInfo.date}</th>
                                                        <th>{translations[language].roomInfo.timeStart}</th>
                                                        <th>{translations[language].roomInfo.timeEnd}</th>
                                                    </tr>
                                                    {reservationsForSelectedDate.map((reserve, index) => (
                                                        <tr key={index}>
                                                            <td>{reserve.date}</td>
                                                            <td>{reserve.time_start}</td>
                                                            <td>{reserve.time_end}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p>{translations[language].roomInfo.noReservations}</p>
                                        )}
                                    </div>
                                    <div className="details-container book-slot-container">
                                        <h2>{translations[language].roomInfo.bookYourSlot}</h2>
                                        <div className="book-slot">
                                            <div className="book-slot-row">
                                                <label>{translations[language].roomInfo.date}</label>
                                                <span>{valueSelected}</span>
                                            </div>
                                            <div className="book-slot-row">
                                                <label>{translations[language].roomInfo.timeStart}</label>
                                                <input type="time" id="timeStart" name="timeStart" />
                                            </div>
                                            <div className="book-slot-row">
                                                <label>{translations[language].roomInfo.timeEnd}</label>
                                                <input type="time" id="timeEnd" name="timeEnd" />
                                            </div>
                                            <div className="book-button-container">
                                                <button className="book-button" onClick={() => functionBook()}>{translations[language].roomInfo.buttonBook}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    return null;
                });
            default:
                return null;
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', background: 'steelblue' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: 1, alignContent: 'center', background: 'skyblue' }}>
                    <button className={'back-button'} onClick={() => navigate(-1)}>{translations[language].roomInfo.buttonBack}</button>
                </div>
                <div style={{ flex: 4, background: 'skyblue' }}>
                    <div className={"centered-container"}><h1>{translations[language].roomInfo.building} {buildingName} {translations[language].roomInfo.room} {roomName}</h1></div>
                </div>
                <div style={{ flex: 1, background: 'skyblue' }}>
                    <div className={"header"}><h1></h1></div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: 1 }}></div>
                <div style={{ flex: 2 }}>
                    <button className="buttons" onClick={() => setSelectedOption(translations[language].roomInfo.buttonRoomInfo)}>{translations[language].roomInfo.buttonRoomInfo}</button>
                </div>
                <div style={{ flex: 2 }}>
                    <button className="buttons" onClick={() => setSelectedOption(translations[language].roomInfo.buttonReservations)}>{translations[language].roomInfo.buttonReservations}</button>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {renderContent()}
            </div>
            <div>

            </div>
        </div>
    );
};

export default RoomInfo;
