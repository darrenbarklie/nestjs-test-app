import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import { nestJSTestApiUrl } from "./common/util/apiUrl";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div style={{ margin: "2rem 4rem" }}>
          <header>
            <h1>NESTJS TEST APP</h1>

            <div>
              NestJS Test API Location: <strong>{nestJSTestApiUrl}</strong>{" "}
            </div>
          </header>

          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="users" element={<Users />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return (
    <>
      <h2>About</h2>
    </>
  );
}

function Users() {
  return (
    <>
      <h2>Users</h2>
      <QueryExample />
    </>
  );
}

function QueryExample() {
  const { isLoading, error, data } = useQuery("usersData", () =>
    fetch(`${nestJSTestApiUrl}/users`).then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error)
    return (
      <div
        style={{
          color: "red",
          backgroundColor: "rgba(255,0,0,0.2)",
          padding: "1rem",
        }}
      >
        <strong>Something went wrong!</strong>
        <p>{error.message}</p>
      </div>
    );

  return (
    <div>
      {data.map((item, i) => {
        return (
          <div key={i}>
            <h1>
              {item.first_name} {item.last_name}
            </h1>
            <h2>{item.email_address}</h2>
          </div>
        );
      })}
    </div>
  );
}
