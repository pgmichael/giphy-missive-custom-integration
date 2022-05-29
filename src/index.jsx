import { render } from "preact";
import { App } from "./components/App";
import { fetchRandomGif } from "./helpers/giphy";

render(<App />, document.querySelector("#app"));

Missive.setActions([
  {
    label: `Add 👍  GIF`,
    callback: async () => {
      const gif = await fetchRandomGif("thumbs up");

      Missive.comment(gif.images.downsized.url);
    },
  },
  {
    label: `Add 👎  GIF`,
    callback: async () => {
      const gif = await fetchRandomGif("thumbs down");

      Missive.comment(gif.images.downsized.url);
    },
  },
  {
    label: `Add 🤣  GIF`,
    callback: async () => {
      const gif = await fetchRandomGif("laughing");

      Missive.comment(gif.images.downsized.url);
    },
  },
]);

Missive.on("main_action", (e) => {
  Missive.openSelf();
});
