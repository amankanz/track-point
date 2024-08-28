import { useState } from "react";
import { useGeolocation } from "./useGeolocation";

export default function App() {
  const {
    position: { lat, lng },
    getPosition,
    isLoading,
    error,
  } = useGeolocation();

  const [countClicks, setCountClicks] = useState(0);

  function handleClick() {
    setCountClicks((count) => count + 1);
    getPosition();
  }

  return (
    <div className="container">
      <header>
        <h1>TrackPoint</h1>
      </header>

      <main>
        <div className="card">
          <h2>Welcome to TrackPoint</h2>
          <p>
            Your precise GPS location is just a tap away. Click "Get my
            position" to instantly find out where you are on the map!
          </p>

          <button onClick={handleClick} disabled={isLoading}>
            Get my position
          </button>

          {isLoading && <p>Loading position...</p>}
          {error && <p>{error}</p>}
          {!isLoading && !error && lat && lng && (
            <p>
              Your GPS position:{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
              >
                {lat}, {lng}
              </a>
            </p>
          )}
        </div>
      </main>

      <p>You requested position {countClicks} times</p>

      <footer>
        <p>
          &copy; 2024{" "}
          <a
            href="https://kanezaio.netlify.app/#intro"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kaneza
          </a>{" "}
          - TrackPoint. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
