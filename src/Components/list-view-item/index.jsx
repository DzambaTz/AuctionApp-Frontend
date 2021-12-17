import "./index.scss";

function ListViewItem(props) {
  return (
    <div className="list-item">
      <a href={props.link}>
        <div className="list-item-image">
          <img src={props.image} />
        </div>
        <div className="list-item-info">
          <h2>{props.title}</h2>
          <p>{props.description}</p>
          <h1>Start from ${props.price}</h1>
        </div>
      </a>
    </div>
  );
}

export default ListViewItem;
