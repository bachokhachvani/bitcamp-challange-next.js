import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
// .map((data) => ({
//   id: data.data.id,
//   body: data.data.attributes.body.value,
//   title: data.data.attributes.title,
//   image: data.data.attributes.links.relationships.field.image.data,
// })),

function index(props) {
  // const article = props.data.map((article) => ({
  //   id: article.data.data.id,
  //   body: article.data.data.attributes.body.value,
  //   title: article.data.data.attributes.title,
  //   image: article.data.data.attributes.links.relationships.field.image.data,
  // }));
  const Geturl = "http://localhost:8080/jsonapi/node/article";
  axios.get(Geturl).then(function (response) {
    console.log(response.data.data);
  });
  // console.log(article);
  return (
    <div className="card-group">
      <div className="row row-cols-5 row-cols-md-4 g-1">
        {props.data.map((article) => (
          <div key={article.id} className="col">
            <div className="card">
              <img
                src="https://imgflip.com/s/meme/Spiderman-Computer-Desk.jpg"
                className="card-img-top"
                alt="..."
              ></img>
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.summary}</p>
                <Link
                  href={"http://localhost:3000/" + article.id}
                  className="btn btn-primary"
                >
                  <button className="btn btn-primary" type="submit">
                    Detailed
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export async function getStaticProps() {
  const { data } = await axios.get(
    "http://localhost:8080/jsonapi/node/article"
  );
  JSON.stringify(data);
  return {
    props: {
      data: data.data.map((a) => ({
        body: a.attributes.body.value,
        summary: a.attributes.body.summary,
        title: a.attributes.title,
        id: a.id,
        // image: a.attributes.relationships.field_image.data.meta,
      })),
    },
    revalidate: 10,
  };
}

export default index;
// .map((data) => ({
//   id: data.data.id,
//   body: data.data.attributes.body.value,
//   title: data.data.attributes.title,
//   image: data.data.attributes.links.relationships.field.image.data,
// })),
