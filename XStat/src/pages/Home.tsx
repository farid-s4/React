function Home() {
  return (
    <div className="page">
      <h1>Добро пожаловать в XStat</h1>
      <div className="card">
        <h2>Платформа для обучения</h2>
        <p>Изучайте новые навыки и отслеживайте свой прогресс</p>
        <div className="stats">
          <div className="stat-item">
            <div className="stat-number">24</div>
            <div className="stat-label">Курса</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">156</div>
            <div className="stat-label">Студентов</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Успешность</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
