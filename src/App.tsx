import React from "react";
import { RootFeed } from "./feed";
var convert = require("xml-js");

const FEED_URL =
  process.env.NODE_ENV === "development"
    ? "/rss/5ec0621c8a93f8a57f8b45675ec061c38a93f8d67b8b4567.xml"
    : "http://fetchrss.com/rss/5ec0621c8a93f8a57f8b45675ec061c38a93f8d67b8b4567.xml";

function App() {
  const [feed, setFeed] = React.useState<any>("");
  React.useEffect(() => {
    fetch(FEED_URL, { mode: "cors" })
      .then((res) => res.text())
      .then((str) => convert.xml2js(str, { compact: true }))
      .then((parsed) => setFeed(parsed))
      .catch((err) => setFeed(err));
  }, []);
  if (!feed) return <div>Loading</div>;
  if (feed instanceof Error)
    return (
      <div>
        <h1>Blast! There was an error :/</h1>
        <pre>{JSON.stringify(feed?.message, null, 2)}</pre>
      </div>
    );
  const feedContents = (feed as RootFeed).rss.channel;
  return (
    <section className="mw7 center">
      <h2 className="athelas ph3 ph0-l">The Onion Twitter</h2>
      {feedContents.item.map((post) => {
        return (
          <article className="pv4 bt bb b--black-10 ph3 ph0-l">
            <div className="flex flex-column flex-row-ns">
              <div className="w-100 w-60-ns pr3-ns order-2 order-1-ns">
                <h1 className="f3 athelas mt0 lh-title">
                  {post.title._text.replace(/(http.*)/g, "")}
                </h1>
                {/* <p className="f5 f4-l lh-copy athelas">
                  The tech giant says it is ready to begin planning a quantum
                  computer, a powerful cpu machine that relies on subatomic particles instead
                  of transistors.
                </p> */}
              </div>
              <div className="pl3-ns order-1 order-2-ns mb4 mb0-ns w-100 w-40-ns">
                <img
                  src={post["media:content"]?._attributes?.url}
                  className="db"
                  alt="article-img"
                />
              </div>
            </div>
            {/* <p className="f6 lh-copy gray mv0">By <span className="ttu">{post['dc:creator']._text}</span></p> */}
            <time className="f6 db gray">{post.pubDate._text}</time>
          </article>
        );
      })}
    </section>
  );
}

export default App;
