# Rexom Discord Music Bot

## Overview

Rexom is a feature-rich Discord music bot built with Discord.js v14 and DisTube v5 for music playback. The bot provides comprehensive music playback capabilities with support for multiple streaming platforms (YouTube, Spotify, SoundCloud), playlist management, and an interactive web dashboard. It features both traditional prefix commands and modern slash commands, along with a unique music channel setup that uses reaction-based controls.

**Latest Update (October 2025)**: Bot has been fully updated to Discord.js v14 and DisTube v5 with modern dependencies. Ready for deployment on Render.com.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Core Technologies
- **Discord.js v14**: Primary Discord API wrapper with full gateway intents and partials support
- **DisTube v5**: Music playback engine with plugin architecture
- **Node.js 18+**: Runtime environment
- **Quick.db**: SQLite-based local database for persistent storage

### Bot Architecture

**Command System**:
- Dual command handler supporting both prefix-based commands and slash commands
- Dynamic command loading from `/source/commands/` directory structure organized by categories (admin, base, music, utilities)
- Slash commands registered separately via `/source/interactions/` directory
- Command cooldown management using Map collections

**Music Playback Architecture**:
- DisTube player instance configured with multiple plugins:
  - YtDlpPlugin for YouTube downloads
  - SpotifyPlugin with optional API credentials for enhanced Spotify support
  - SoundCloudPlugin for SoundCloud integration
- Voice connection management using @discordjs/voice
- Queue system with support for repeat modes (off/song/queue), shuffle, autoplay
- Search functionality with user selection via message collectors or select menus

**Event-Driven Design**:
- Event handlers for Discord events (ready, messageCreate, interactionCreate, guildCreate/Delete, messageReactionAdd)
- DisTube music events (playSong, addSong, addList, empty, error, searchResult, etc.)
- Centralized event loading system from `/source/events/`

### Data Storage Strategy

**Quick.db Schema Patterns**:
- Guild settings: `Settings_{guildID}` stores prefix and language preferences
- DJ system: `DJ_{guildID}` and `DJ_TOG_{guildID}` for role-based permissions
- Music setup: `SeTupInFo_{guildID}` for reaction-based music channel configuration
- User playlists: `PlaylistsData_{userID}` stores array of playlist objects with names and song URLs
- Voice persistence: `Voice_Channel_{guildID}` for 24/7 voice channel presence
- Dynamic dashboard data: `SongDashData_{guildID}` for real-time music state

**No relational database used** - all persistence handled through Quick.db's key-value SQLite wrapper.

### Web Dashboard

**Express-based Server**:
- Port: 8080 (configurable via environment)
- EJS templating engine for server-side rendering
- Passport.js with Discord OAuth2 strategy for authentication
- Session management using express-session with memorystore
- Body-parser middleware for request parsing

**Authentication Flow**:
- OAuth2 scopes: identify, guilds, guilds.join
- Client credentials configured via `config/bot.json`
- Session-based authentication with serialization/deserialization

### Internationalization

**Multi-language Support**:
- English (en) and Arabic (ar) language options
- Language stored per-guild in database
- Conditional response rendering throughout command execution
- Separate embed messages and error handling per language

### Configuration Management

**Structured Configuration Files**:
- `config/bot.json`: Main bot configuration (activity, status, prefix, language, client credentials, Spotify API keys)
- `config/colors.json`: Embed color scheme (loading, error, done, warn)
- `config/emojis.json`: Emoji mappings for consistent UI
- `.env`: Sensitive data (Discord bot token)

### Permission System

**Two-tier Permission Model**:
- Administrator-only commands for critical operations (setup, temp channels)
- DJ role system: toggleable role-based access control for music commands
- Permission checks at command execution level with localized error messages

### Unique Features Architecture

**Reaction-Based Music Control**:
- Dedicated music channel with persistent message
- Emoji reactions mapped to player controls (⏹️ stop, ⏭️ skip, ⏯️ play/pause, 🔄 loop, 🔀 shuffle, 🔉/🔊 volume)
- Message content in channel automatically queued for playback
- Real-time embed updates showing current track

**Playlist System**:
- User-scoped playlist storage with name-based indexing
- Save current queue as playlist
- Load and play saved playlists with sequential queueing
- Duplicate name prevention with interactive confirmation prompts

**Voice Channel Persistence**:
- 24/7 voice channel presence via join/leave commands
- Periodic connection health checks (500ms interval)
- Automatic reconnection on disconnect

## External Dependencies

### Third-Party Services

**Music Sources**:
- YouTube (via yt-dlp): Primary video/audio source
- Spotify API: Optional enhanced integration with client credentials
- SoundCloud: Plugin-based support
- 700+ websites supported through yt-dlp

**APIs**:
- Discord API: Full gateway and REST API usage
- Google TTS API: Text-to-speech functionality for say command
- GitHub API: Update checking against repository tags
- Lyrics Finder API: Song lyrics retrieval
- TikTok API (via godownloader.com): Video download service

### NPM Dependencies

**Core Discord**:
- discord.js ^14.14.0
- @discordjs/rest ^2.0.0
- @discordjs/voice ^0.16.0
- discord-api-types ^0.37.0

**Music**:
- distube ^5.0.7
- @distube/soundcloud ^2.0.4
- @distube/spotify ^2.0.2
- @distube/yt-dlp ^2.0.1
- ffmpeg-static ^5.2.0
- opusscript ^0.1.1
- libsodium-wrappers ^0.7.13
- tweetnacl ^1.0.3

**Web Server**:
- express ^4.18.0
- express-session ^1.17.3
- passport ^0.7.0
- passport-discord ^0.1.4
- ejs ^3.1.9
- body-parser ^1.20.0
- memorystore ^1.6.7

**Utilities**:
- quick.db ^9.1.7 (SQLite wrapper)
- axios ^1.6.0
- dotenv ^16.0.0
- moment ^2.30.0
- ms ^2.1.3
- chalk ^4.1.2
- figlet ^1.7.0
- glob ^10.3.0

### Deployment Considerations

**Environment Requirements**:
- Node.js 18.x or higher
- FFmpeg (provided via ffmpeg-static)
- Sufficient memory for voice connections and audio processing

**Required Secrets**:
- Discord bot token (TOKEN env variable)
- Discord client ID and secret (for OAuth2 dashboard)
- Optional: Spotify client ID and secret (for enhanced Spotify support)

**Platform Compatibility**:
- Designed for deployment on Render.com (per deployment guide)
- Can run on any Node.js hosting with persistent storage
- Web dashboard requires public domain/URL for OAuth2 callbacks