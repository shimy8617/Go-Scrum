export const Card = ({
  data: { title, createdAt, user: {userName}, description, status, importance },
}) => (
  <div className="card">
    <div className="close">x</div>
    <h2>{title}</h2>
    <h6>{createdAt}</h6>
    <h5>{userName}</h5>
    <button type="button">{status}</button>
    <button type="button">{importance}</button>
    <p>{description}</p>
  </div>
);
