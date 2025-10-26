# Deployment Guide - Rexom Discord Music Bot

This guide will help you deploy your Discord music bot to Render.com.

## Prerequisites

Before deploying, you need:
1. A Discord Bot Token (from [Discord Developer Portal](https://discord.com/developers/applications))
2. A Render.com account (free at [render.com](https://render.com))

## Discord Bot Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications/)
2. Create a new application or select an existing one
3. Go to the "Bot" section and create a bot
4. **Enable these Privileged Gateway Intents:**
   - PRESENCE INTENT
   - SERVER MEMBERS INTENT
   - MESSAGE CONTENT INTENT
5. Copy your bot token (you'll need this later)
6. Go to "OAuth2" → "URL Generator"
7. Select scopes: `bot` and `applications.commands`
8. Select permissions: `Administrator` (or specific permissions you need)
9. Copy the generated URL and invite the bot to your server

## Configuration

### 1. Bot Configuration (`config/bot.json`)

Edit the `config/bot.json` file with your settings:

```json
{
  "activity": {
    "name": "music",
    "type": "LISTENING"
  },
  "status": "online",

  "domain": "http://localhost:3000",
  "clientID": "YOUR_BOT_CLIENT_ID",
  "clientSECRET": "YOUR_BOT_CLIENT_SECRET",

  "mainPrefix": "!",
  "mainLang": "en",
  "ownerID": "YOUR_DISCORD_USER_ID",

  "panelType": "buttons",
  "replyType": "embeds",

  "leaveOnEmpty": true,
  "leaveOnStop": true,
  "leaveOnFinish": false,
  "searchSongs": 10,
  "YTDLP": "true",
  "api": {
    "spotify": {
      "clientID": "none",
      "clientSECRET": "none"
    }
  }
}
```

**Important fields to update:**
- `clientID`: Your bot's Application ID (from OAuth2 section)
- `clientSECRET`: Your bot's Client Secret (from OAuth2 section)
- `ownerID`: Your Discord User ID
- `mainPrefix`: Command prefix (default is `!`)
- `mainLang`: Language (`en` or `ar`)

## Deploying to Render

### Step 1: Prepare Your Repository

1. Make sure all your code is in a Git repository (GitHub, GitLab, or Bitbucket)
2. Push all changes to your repository

### Step 2: Create a New Web Service on Render

1. Log in to [Render.com](https://render.com)
2. Click "New +" and select "Web Service"
3. Connect your repository

### Step 3: Configure the Service

Fill in the following settings:

**Basic Settings:**
- **Name:** `rexom-bot` (or your preferred name)
- **Region:** Choose the closest to your users
- **Branch:** `main` (or your default branch)
- **Root Directory:** Leave empty
- **Runtime:** `Node`

**Build & Deploy Settings:**
- **Build Command:** `npm install`
- **Start Command:** `node source/index.js`

**Instance Type:**
- Select **Free** tier (or choose a paid plan for better performance)

### Step 4: Add Environment Variables

Click "Advanced" and add environment variables:

| Key | Value |
|-----|-------|
| `TOKEN` | Your Discord bot token |
| `NODE_ENV` | `production` |

### Step 5: Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy your bot
3. Monitor the logs to ensure it starts successfully

## Bot Features

Your bot supports both **slash commands** and **prefix commands**:

### Slash Commands
- Type `/` in Discord to see all available slash commands
- Example: `/play song name`

### Prefix Commands
- Use the prefix set in `config/bot.json` (default: `!`)
- Example: `!play song name`

## Music Commands

- `/play` or `!play` - Play a song from YouTube, Spotify, SoundCloud, etc.
- `/pause` or `!pause` - Pause the current song
- `/resume` or `!resume` - Resume playback
- `/skip` or `!skip` - Skip to the next song
- `/stop` or `!stop` - Stop playback and clear queue
- `/queue` or `!queue` - Show the current queue
- `/nowplaying` or `!nowplaying` - Show current song
- `/volume` or `!volume` - Adjust volume
- `/loop` or `!loop` - Loop current song or queue
- `/shuffle` or `!shuffle` - Shuffle the queue

And many more! Use `/help` or `!help` to see all commands.

## Troubleshooting

### Bot is offline
- Check Render logs for errors
- Verify your bot token is correct in environment variables
- Make sure the bot has proper permissions on Discord

### Music not playing
- Ensure ffmpeg-static is installed (should be automatic)
- Check if the bot has permission to join/speak in voice channels
- Verify the voice channel isn't full

### Commands not working
- Make sure you've invited the bot with `applications.commands` scope
- Wait a few minutes for Discord to register slash commands
- Try using the prefix commands as fallback

## Support

For issues, visit the [GitHub repository](https://github.com/DevelopersSupportAR/rexom) or join the [Developer Support Discord](https://discord.gg/developer-support).

## Notes

- Render free tier may sleep after 15 minutes of inactivity
- For 24/7 uptime, consider upgrading to a paid plan
- The bot uses opusscript for audio encoding (pure JavaScript, no compilation needed)
- Slash commands are automatically registered on bot startup
