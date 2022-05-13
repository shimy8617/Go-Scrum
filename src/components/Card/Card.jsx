import { useState } from "react";

export const Card = ({
  data: {
    title,
    createdAt,
    user: { userName },
    description,
    status,
    importance,
  },
}) => {
  const [showMore, setShowMore] = useState(false);

  const datetime = new Date(createdAt).toLocaleString() + " hs.";

  const limitString = (str) => {
    if (str.length > 170)
      return { string: str.slice(0, 167).concat("..."), addButton: true };
    return { string: str, addButton: false };
  };

  return (
    <div className="card">
      <div className="close">x</div>
      <h2>{title}</h2>
      <h6>{datetime}</h6>
      <h5>{userName}</h5>
      <button className={status.toLowerCase()} type="button">
        {status.toLowerCase()}
      </button>
      <button className={status.toLowerCase()} type="button">
        {importance.toLowerCase()}
      </button>
      <p>{limitString(description).string}</p>
      {showMore && (
        <>
          <p>{description}</p>
          <button type="button" onClick={() => setShowMore(false)}>
            Ver Menos
          </button>
        </>
      )}
      {!showMore && limitString(description).addButton && (
        <button type="button" onClick={() => setShowMore(true)}>
          Ver más
        </button>
      )}
    </div>
  );
};
