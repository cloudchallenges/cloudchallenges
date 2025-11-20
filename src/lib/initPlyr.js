import { settings } from "astro/runtime/client/dev-toolbar/settings.js";
import Plyr from "plyr";

export default () => {
  document.addEventListener("astro:page-load", () => {
    const players = Plyr.setup("#player", {
      controls: [
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "settings",
        "fullscreen",
      ],
      settings: ["captions", "quality", "speed", "loop"],
      keyboard: { focused: true },
      autoplay: false,
      ratio: "16:9",
      clickToPlay: true,
      invertTime: false,
      tooltips: { controls: true, seek: true },
      quality: {
        default: 1080,
        options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
      },
    });

    return players;
  });
};
