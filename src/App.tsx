import React from "react";
import { toCompactFeed, RootFeed } from "./feed";
import { parseQuery } from "./util";
var convert = require("xml-js");
const fakeFeed="%5B%7B%22title%22%3A%22Study%20Finds%20More%20Americans%20Waiting%20To%20Start%20Secret%20Second%20Families%20Until%20Later%20In%20Life%20%22%2C%22img%22%3A%22https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FEYK2LngXQAY_p3T.jpg%22%2C%22date%22%3A%22Sat%2C%2016%20May%202020%2021%3A31%3A01%20%2B0000%22%7D%2C%7B%22title%22%3A%22Teleconferencing%20Pastor%20Requests%20Any%20Worshipper%20Currently%20Speaking%20In%20Tongues%20Go%20On%20Mute%20%22%2C%22img%22%3A%22https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FEYKgqp8X0AAN_zw.jpg%22%2C%22date%22%3A%22Sat%2C%2016%20May%202020%2019%3A57%3A01%20%2B0000%22%7D%2C%7B%22title%22%3A%22Mom%20Apologizing%20For%20Going%20Through%20Menopause%20%22%2C%22img%22%3A%22https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FEYKNq1zWoAISaC8.jpg%22%2C%22date%22%3A%22Sat%2C%2016%20May%202020%2018%3A34%3A01%20%2B0000%22%7D%2C%7B%22title%22%3A%22Trump%20Accuses%20New%20York%20Of%20Padding%20State's%20Mortality%20Rate%20By%20Including%20African%20American%20Deaths%20%22%2C%22img%22%3A%22https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FEYJ3d9yWoAARQ9E.jpg%22%2C%22date%22%3A%22Sat%2C%2016%20May%202020%2016%3A57%3A01%20%2B0000%22%7D%2C%7B%22title%22%3A%22Area%20Man's%20Knee%20Making%20Weird%20Sound%20%22%2C%22img%22%3A%22https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FEYJiLniXQAg9UqB.jpg%22%2C%22date%22%3A%22Sat%2C%2016%20May%202020%2015%3A24%3A01%20%2B0000%22%7D%5D"
const FEED_URL =
  process.env.NODE_ENV === "development"
    ? "/rss/5ec0621c8a93f8a57f8b45675ec061c38a93f8d67b8b4567.xml"
    : "https://fetchrss.com/rss/5ec0621c8a93f8a57f8b45675ec061c38a93f8d67b8b4567.xml";

function App() {
  const [feed, setFeed] = React.useState<any>("");
  React.useEffect(() => {
    const query = parseQuery(window.location.search);
    if (query.items) {
      return setFeed(JSON.parse(query.items));
    }
    fetch(FEED_URL, { mode: "cors" })
      .then((res) => res.text())
      .then((str) => convert.xml2js(str, { compact: true }))
      .then((parsed) => setFeed(parsed))
      .catch((err) => setFeed(err));
  }, []);
  if (!feed) return <div>Loading</div>;
  if (feed instanceof Error || feed === -1)
    return (
      <div>
        <h1>Blast! There was an error :/</h1>
        <pre>{JSON.stringify(feed?.message, null, 2)}</pre>
        <button onClick={() => {
          window.location.search=`?items=${fakeFeed}`
        }}>
          Try mock data?
        </button>
      </div>
    );
  const items = Array.isArray(feed) ? feed : toCompactFeed(feed as RootFeed);
  (window as any).feed = items;
  return (
    <section className=''>
      <h2 className="athelas f6 ph1 ph0-l mv0">The Onion Twitter</h2>
      {items.map((post, i) => {
        return (
          <article key={i} className="pv2 bt bb b--black-10 ph3 ph0-l">
            <div className="flex flex-column flex-row-ns">
              <div className="w-100 w-60-ns pr3-ns order-2 order-1-ns">
                <h1 className="f3 athelas mt0 lh-title">{post.title}</h1>
                {/* <p className="f5 f4-l lh-copy athelas">
                  The tech giant says it is ready to begin planning a quantum
                  computer, a powerful cpu machine that relies on subatomic particles instead
                  of transistors.
                </p> */}
              </div>
              <div className="pl3-ns order-1 order-2-ns mb4 mb0-ns w-100 w-40-ns">
                <img src={post.img} className="db" alt="article-img" />
              </div>
            </div>
            {/* <p className="f6 lh-copy gray mv0">By <span className="ttu">{post['dc:creator']._text}</span></p> */}
            <time className="f6 db gray">{post.date}</time>
          </article>
        );
      })}
    </section>
  );
}

export default App;
