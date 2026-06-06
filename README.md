# Anti-Image Phishing Bot for Discord

This Discord bot is designed to combat image-based phishing scams. It automatically scans images posted in your server, uses Optical Character Recognition (OCR) to read the text within them, and deletes any images containing suspicious keywords.

## How It Works

When a user uploads an image to a channel the bot has access to:
1.  The bot intercepts the message containing the image attachment.
2.  It uses the `tesseract.js` library to perform OCR on the image and extract any text.
3.  The extracted text is then checked against a predefined list of scam-related keywords (e.g., `heodux.com`, `withdrawal success`, `Mr Beast`).
4.  If a match is found, the bot immediately deletes the user's message.
5.  A detailed log is sent to a designated private channel, notifying moderators about the detected scam attempt, the user who posted it, and the keyword that was matched.

## CONTROL FLOW

<img width="1051" height="353" alt="image" src="https://github.com/user-attachments/assets/ed8b16b9-0461-4a2d-999f-fd3592d6669a" />


## Features

*   **Real-time Image Scanning:** Monitors channels for new image uploads.
*   **OCR-Powered Detection:** Reads text directly from images to identify scams.
*   **Automatic Message Deletion:** Removes malicious content instantly.
*   **Detailed Logging:** Keeps moderators informed with rich embed logs for every action taken.
*   **Easy Configuration:** Set up your bot token and log channel with a simple `.env` file.

## Setup and Usage

Follow these steps to get the bot running on your server.

### 1. Prerequisites
*   [Node.js](https://nodejs.org/) (v16.9.0 or higher recommended)
*   A Discord Bot application. You can create one on the [Discord Developer Portal](https://discord.com/developers/applications). Ensure your bot has the `Guilds`, `GuildMessages`, and `MessageContent` intents enabled.

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/dheerajwmilk/anti-image-fishing-bot-discord.git

# Navigate into the project directory
cd anti-image-fishing-bot-discord

# Install the required dependencies
npm install
```

### 3. Configuration
1.  Create a `.env` file in the root of the project by copying the example file:
    ```bash
    cp .env.example .env
    ```
2.  Open the `.env` file and fill in the required values:
    ```env
    # Your Discord bot's token from the Discord Developer Portal
    BOT_TOKEN=YOUR_BOT_TOKEN_HERE

    # The ID of the channel where scam logs should be sent
    LOG_CHANNEL_ID=YOUR_LOG_CHANNEL_ID_HERE
    ```

### 4. Customizing Keywords
You can customize the keywords the bot looks for by editing the `scamKeywords` array in `bot.js`:
```javascript
// in bot.js
const scamKeywords = ['heodux.com', 'withdrawal success', 'claim your reward', 'Mr Beast', 'Crypto'];
```

### 5. Running the Bot
Start the bot using the following command:
```bash
node bot.js
```
Your bot should now be online and actively scanning for phishing images in the servers it has been added to.
