import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
//ourdomain.com/
function detailed(props) {
  // const router = useRouter();
  // const urlid =
  //   "http://localhost:8080/jsonapi/node/article/" + router.query.articleid;
  // axios.get(urlid.toString()).then(function (response) {
  //   console.log(response.data.data);
  // });
  // console.log(urlid);
  return (
    <div class="card mb-3">
      <img
        class="card-img-top"
        src="https://i.imgur.com/UgESOEt.png"
        alt="Card image cap"
      ></img>
      <div class="card-body">
        <h5 class="card-title">{props.data.title}</h5>
        <p class="card-text">{props.data.body}</p>
      </div>
      <Link href="http://localhost:3000/">
        <button type="button" class="btn btn-primary btn-lg btn-block">
          Main Page
        </button>
      </Link>
    </div>
  );
}
export async function getStaticPaths() {
  const { data } = await axios.get(
    "http://localhost:8080/jsonapi/node/article/"
  );
  JSON.stringify(data);
  // const IDs = await data.data.map((a) => ({
  //   params: {
  //     articleid: a.id,
  //   },
  // }));
  return {
    fallback: false,
    paths: data.data.map((a) => ({
      params: {
        articleid: a.id,
      },
    })),
  };
}
export async function getStaticProps(context) {
  const articleid = context.params.articleid;
  const url = "http://localhost:8080/jsonapi/node/article/" + articleid;
  const { data } = await axios.get(url.toString());
  JSON.stringify(data);
  return {
    props: {
      data: {
        body: data.data.attributes.body.value,
        summary: data.data.attributes.body.summary,
        title: data.data.attributes.title,
        id: data.data.id,
        // image: a.attributes.relationships.field_image.data.meta,
      },
    },
    revalidate: 10,
  };
}

export default detailed;
