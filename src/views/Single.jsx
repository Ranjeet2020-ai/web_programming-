import { useParams, useLocation, Link } from "react-router-dom";

const Single = () => {
  const { id } = useParams();
  const location = useLocation();
  const item = location.state;

  if (!item) {
    return (
      <div className="container">
        <div className="error">No media item selected.</div>
        <Link to="/" className="btn" style={{ marginTop: "10px" }}>
          Back to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/" className="btn btn-secondary" style={{ marginBottom: "20px" }}>
        ← Back to Gallery
      </Link>
      
      <div className="single-view">
        <h2>{item.title}</h2>
        <p><strong>Description:</strong> {item.description}</p>
        <p><strong>Owner:</strong> {item.username || "Unknown"}</p>
        <p><strong>Type:</strong> {item.media_type}</p>
        <p><strong>Uploaded:</strong> {new Date(item.created_at).toLocaleDateString()}</p>
        
        {item.filename && (
          <div style={{ marginTop: "20px" }}>
            {item.media_type === "image" ? (
              <img
                src={item.filename}
                alt={item.title}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            ) : item.media_type === "video" ? (
              <video controls style={{ maxWidth: "100%" }}>
                <source src={item.filename} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <a href={item.filename} target="_blank" rel="noopener noreferrer" className="btn">
                Download File
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Single;
