import React from 'react';
import { useState } from "react";
import { useMedia } from "../hooks/apiHooks";
import MediaRow from "./MediaRow";

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { mediaArray, loading, error, refetch } = useMedia();

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
        <button onClick={refetch} className="btn" style={{ marginTop: "10px" }}>
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
              <MediaRow 
                key={item.media_id} 
                item={item} 
                setSelectedItem={setSelectedItem}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
