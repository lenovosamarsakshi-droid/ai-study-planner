import logo from "/logo.png";

function Header({ studentName }) {
  return (
    <>
      <h1 className="app-title">
        <img src={logo} alt="StudyBloom Logo" />
        StudyBloom
      </h1>

      <p className="app-tagline">
        Plan • Learn • Bloom
      </p>

      <h2>
        {studentName
          ? `Welcome back, ${studentName}! 👋`
          : "Welcome!"}
      </h2>
    </>
  );
}

export default Header;