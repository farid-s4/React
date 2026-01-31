function Profile() {
  return (
    <div className="page">
      <h1>Профиль студента</h1>
      <div className="profile-container">
        <div className="profile-card">
          <h2>Фарид</h2>
          <p className="profile-email">farid@example.com</p>
          
          <div className="profile-info">
            <div className="info-row">
              <span className="info-label">Группа:</span>
              <span className="info-value">FSDA</span>
            </div>
            <div className="info-row">
              <span className="info-label">Курс:</span>
              <span className="info-value">2</span>
            </div>
            <div className="info-row">
              <span className="info-label">Средний балл:</span>
              <span className="info-value">12</span>
            </div>
            <div className="info-row">
              <span className="info-label">Пройдено курсов:</span>
              <span className="info-value">8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
