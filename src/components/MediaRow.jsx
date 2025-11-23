import { Link } from "react-router-dom";

const MediaRow = ({ item }) => {
  return (
    <tr>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{item.username || "Unknown"}</td>
      <td>
        {item.thumbnail && (
          <img
            src={item.thumbnail}
            alt={item.title}
            style={{ width: "100px", height: "auto" }}
          />
        )}
      </td>
      <td>{item.media_type}</td>
      <td>
        <Link to={\`/single/\${item.media_id}\`} state={item} className="btn">
          View
        </Link>
      </td>
    </tr>
  );
};

export default MediaRow;
