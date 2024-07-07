# Tempo Moderation Bot

Tempo Moderation is a Discord bot designed to help manage your server efficiently with various moderation tools and features.

## Features

- **User Information**: Fetch details about server members.
- **Moderation Commands**: Ban, kick, warn, and unban users.
- **Logging**: Keep track of all moderation actions.
- **Verification**: Create verification messages for new members.
- **Embeds**: Easily send embedded messages.

## Installation

### Prerequisites

- Node.js (v12.0 or higher)
- npm (Node Package Manager)
- A Discord bot token from the [Discord Developer Portal](https://discord.com/developers/applications)

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Thechonk01/Tempo-Moderation.git

2. **Navigate to the project directory:**
   ```bash
   cd Tempo-Moderation

3. **Install dependencies:**
   ```bash
   npm install

4. **Configure the bot:**
   - Create config.json with bot token and bot user Id
   - Contents:
     ```json
     {"token":, "clientId":, "logchannelid":, "errorchannelid":}

## Usage

### Basic Commands

- **Ban a user:**
  ```bash
  /ban <userid/user@> <reason>
- **Kick a user:**
  ```bash
  /kick <userid/user@> <reason>
- **Warn a user:**
  ```bash
  /warn <userid/user@> <reason>
- **Unban a user:**
  ```bash
  /unban <userid/user@> <reason>
- **Get user information:**
  ```bash
  /user <userid/user@>
- **Create a verification message:**
  ```bash
  /verify [role]
- **Send an embed message:**
  ```bash
  /embed <channel>

### Advanced Configuration

- **Configure welcome/leave and log channels:**
  ```bash
  /config <option> <set>

### Additional Commands

- **Check bot's ping:**
  ```bash
  /ping
- **Get server information:**
  ```bash
  /server
- **Help command:**
  ```bash
  /help [commandname]


# License
This project is licensed under the ISC License. See the [LICENSE](https://github.com/Thechonk01/Tempo-Moderation/blob/master/LICENSE) file for details.
