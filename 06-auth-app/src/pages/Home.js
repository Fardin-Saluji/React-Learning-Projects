function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h2>Home Page</h2>
      <p>Welcome, {user?.email}</p>
    </div>
  );
}

export default Home;
