import React, { useState } from "react";
import './Account.css';
import { getUserToken, getUser, isLoggedIn, clearUserSession, getUserLanguage, setUserLanguage } from "../../session/session.js";
import { useNavigate } from "react-router-dom";
import buildingsInfo from '../../storage/buildingsInfo.json';
import translations from '../../storage/translations.json';



let language = getUserLanguage();
let translation = translations[language].account;

const Account = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const navigate = useNavigate();
    
    const getUserReservations = (buildingsData, username) => { //Get all the reservations for a specific user
        const userReservations = [];
        const allUserReservations = [];
        // Iterate through each building
        Object.entries(buildingsData).forEach(([buildingId, building]) => {
          // Iterate through each floor
          building['floors'].forEach(floor => {
            // Iterate through each room
            floor.rooms.forEach(room => {
              // If the room has reservations
              if (room.reservations && Array.isArray(room.reservations)) {
                // Filter reservations for the specified user
                const roomReservations = room.reservations.filter(
                  reservation => reservation.user === username
                );
      
                // Add building and room context to each reservation
                roomReservations.forEach(reservation => {
                  userReservations.push({
                    ...reservation,
                    buildingId,
                    floorNumber: floor.floor,
                    roomName: room.name,
                    roomType: room.type,
                  });
                });
              }
            });
          });
        });
      
        
        // Sort reservations by date and time
        return userReservations.sort((a, b) => {
          const dateComparison = a.date.localeCompare(b.date);
          if (dateComparison !== 0) return dateComparison;
          return a.time_start.localeCompare(b.time_start);
        });
      };


      
      const cancelReservation = (reservationId) => {
        // Implement the logic to cancel the reservation
        console.log(`Canceling reservation with ID: ${reservationId}`);
      Object.entries(buildingsInfo).forEach(([buildingId, building]) => {
        building.floors.forEach(floor => {
          floor.rooms.forEach(room => {
            if (room.reservations && Array.isArray(room.reservations)) {
        const reservationIndex = room.reservations.findIndex(
          reservation => reservation.id === reservationId
        );
        if (reservationIndex !== -1) {
          room.reservations.splice(reservationIndex, 1);
        }
            }
          });
        });
      });
      };
      const confirmCancelReservation = (reservationId) => {
        if (window.confirm(translation.confirmReservationCancel)) {
          cancelReservation(reservationId);
        }
      };

      const ReservationsList = ({ buildingsData }) => {
        const userReservations = getUserReservations(buildingsData, getUser().username);
        console.log(userReservations);

        const isPastReservation = (date) => {
          const today = new Date().toISOString().split('T')[0];
          return date < today;
        };

        return (
          <div>
        <h2>{getUser().username}{translation.userReservations}</h2>
        {userReservations.length === 0 ? (
          <p>{translation.messageNoReservations}</p>
        ) : (
          <ul>
            {userReservations.map((item, index) => (
          <li key={`${item.date}-${item.time_start}-${index}`}>
            <p>
              {translation.building} {item.buildingId.toUpperCase()} - {translation.room} {item.roomName}
            </p>
            <p>
              {translation.date}: {item.date}
            </p>
            <p>
              {translation.time}: {item.time_start} - {item.time_end}
            </p>
            {!isPastReservation(item.date) && (
              <button onClick={() => confirmCancelReservation(item.id)}>{translation.cancelReservation}</button>
            )}
          </li>
            ))}
          </ul>
        )}
          </div>
        );
      };

      const renderContent = () => {
        if (!isLoggedIn()) {
            alert('You are not logged in');
            navigate('/');
        }
        switch (selectedOption) {
            case translation.aboutUser:
                const user = getUser();
                return (
                    <div className="user-details-container">
                      <div className="user-details-card">
                        <h2 className="user-details-title">{translation.userProfile}</h2>
                        
                        <div className="user-details-grid">
                          <div className="user-detail-item">
                            <div className="detail-label">Username</div>
                            <div className="detail-value">{user.username}</div>
                          </div>
                          
                          <div className="user-detail-item">
                            <div className="detail-label">{translation.name}</div>
                            <div className="detail-value">{user.name}</div>
                          </div>
                          
                          <div className="user-detail-item">
                            <div className="detail-label">Email</div>
                            <div className="detail-value">{user.email}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
            case translation.reservations:
                return <ReservationsList buildingsData={buildingsInfo} />;
            default:
                return <div>{translation.selectOptionFromTheSidebar}</div>;
        }
    }

    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const logoutHandler = () => {
      setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
      clearUserSession();
      alert(translation.logoutSuccess);
      navigate('/');
    };

    const cancelLogout = () => {
      setShowLogoutConfirm(false);
    };

    const LogoutConfirmationBox = () => (
      <div className="logout-confirmation-box">
        <p>{translation.logoutMessage}</p>
        <button onClick={confirmLogout}>{translation.confirmLogout}</button>
        <button onClick={cancelLogout}>{translation.cancelLogout}</button>
      </div>
    );

    return (
        <div className="account-container">
            <div className="account-sidebar">
                <h1>{translation.accountPage}</h1>
                <ul>
                    <li><button onClick={() => setSelectedOption(translation.aboutUser)}>{translation.aboutUser}</button></li>
                    <li><button onClick={() => setSelectedOption(translation.reservations)}>{translation.reservations}</button></li>
                    <li><button onClick={() => navigate('/')}>{translation.back}</button></li>
                    <li><button onClick={logoutHandler}>{translation.logout}</button></li>
                </ul>
            </div>
            <div className="account-content">
              {!showLogoutConfirm && renderContent()}
              {showLogoutConfirm && <LogoutConfirmationBox />}
            </div>
        </div>
    );
}


export default Account;