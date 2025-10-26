const { DisTube } = require("distube");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { SpotifyPlugin } = require("@distube/spotify");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const client = require("./discord");
let {
  searchSongs,
  api,
} = require("../../config/bot.json");

if (Number(searchSongs) > 20) searchSongs = 20;
if (isNaN(Number(searchSongs))) searchSongs = 0;

let player;
if (api.spotify.clientID == "none" || api.spotify.clientSECRET == "none") {
  player = new DisTube(client, {
    emitNewSongOnly: false,
    savePreviousSongs: true,
    nsfw: false,
    emitAddSongWhenCreatingQueue: true,
    emitAddListWhenCreatingQueue: true,
    joinNewVoiceChannel: false,
    plugins: [new SoundCloudPlugin(), new SpotifyPlugin(), new YtDlpPlugin()],
  });
} else {
  player = new DisTube(client, {
    emitNewSongOnly: false,
    savePreviousSongs: true,
    nsfw: false,
    emitAddSongWhenCreatingQueue: true,
    emitAddListWhenCreatingQueue: true,
    joinNewVoiceChannel: false,
    plugins: [
      new SoundCloudPlugin(),
      new SpotifyPlugin({
        parallel: true,
        emitEventsAfterFetching: false,
        api: {
          clientId: api.spotify.clientID,
          clientSecret: api.spotify.clientSECRET,
        },
      }),
      new YtDlpPlugin()
    ],
  });
}

player.setMaxListeners(0);

module.exports = player;
