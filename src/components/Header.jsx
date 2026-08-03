function Header({ studentName }) {
  return (
    <>
      <h1>📚 Study Planner AI</h1>

      <h2>
        {studentName
          ? `Welcome back, ${studentName}! 👋`
          : "Welcome!"}
      </h2>
    </>
  );
}

export default Header;