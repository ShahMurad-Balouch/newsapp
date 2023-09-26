import React, { Component } from "react";

export class NewsItems extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, time, source } = this.props;
    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ left: "96%!important", zIndex: "1" }}
          >
            {source}
            <span className="visually-hidden">unread messages</span>
          </span>
          {/* If image is null then use the ternary operator here ..i.e..
          {!imageurl?"path":imageurl}
          */}
          <img
            src={
              !imageUrl
                ? "https://media.cnn.com/api/v1/images/stellar/prod/230921125719-03-ny-bus-crash-0921.jpg?c=16x9&q=h_720,w_1280,c_fill/f_webp"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-dark"
            >
              Read more
            </a>
          </div>
          <div className="card-footer">
            <small className="text-muted">
              By: {!author ? "Unknown" : author} on{" "}
              {new Date(time).toGMTString()}
            </small>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItems;
