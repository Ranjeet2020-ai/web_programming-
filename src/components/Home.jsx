import { useState, useEffect } from "react";
import { fetchData } from "../lib/functions";
import MediaRow from "./MediaRow";

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getMedia = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // For development: use test.json first, then switch to API
      const useTestData = !import.meta.env.VITE_MEDIA_API;
      
      if (useTestData) {
        const json = await fetchData("/test.json");
        setMediaArray(json);
      } else {
        // Fetch from API
        const mediaUrl = \`\${import.meta.env.VITE_MEDIA_API}/media\`;
        const mediaData = await fetchData(mediaUrl);
        
        // Fetch user data for each media item
        const mediaWithUsers = await Promise.all(
          mediaData.map(async (item) => {
            try {
              const userUrl = \`\${import.meta.env.VITE_AUTH_API}/users/\${item.user_id}\`;
              const userData = await fetchData(userUrl);
              return {
                ...item,
                username: userData.username
              };
            } catch (userError) {
              console.error(\`Error fetching user \${item.user_id}:\`, userError);
              return {
                ...item,
                username: "Unknown"
              };
            }
          })
        );
        
        setMediaArray(mediaWithUsers);
      }
    } catch (error) {
      console.error("Error fetching media:", error);
      setError("Failed to load media. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading media...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">{error}</div>
        <button onClick={getMedia} className="btn" style={{ marginTop: "10px" }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Media Gallery</h1>
      {mediaArray.length === 0 ? (
        <p>No media found.</p>
      ) : (
        <table className="media-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Owner</th>
              <th>Thumbnail</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mediaArray.map((item) => (
              <MediaRow key={item.media_id} item={item} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
