function Courses() {
  const courses = [
    { id: 1, name: 'React Основы', progress: 75, lessons: 12 },
    { id: 2, name: 'TypeScript Advanced', progress: 45, lessons: 18 },
    { id: 3, name: 'Node.js Backend', progress: 30, lessons: 15 },
  ]

  return (
    <div className="page">
      <h1>Мои курсы</h1>
      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <h3>{course.name}</h3>
            <p>{course.lessons} уроков</p>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <p className="progress-text">{course.progress}% выполнено</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Courses
