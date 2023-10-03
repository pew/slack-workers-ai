# Cloudflare Workers AI Slack llama2 Bot

This is really just a super quick 'n dirty fork of the [existing ChatGPT Slack Bot](https://github.com/pew/slack-chatgpt) running on Cloudflare Workers, but using the [Workers AI LLama 2 Model](https://ai.cloudflare.com/).

- [Repo for the original ChatGPT project](https://github.com/shapehq/slack-chatgpt)

## 🚀 Getting Started

Follow the steps below to get started.

### Create a Cloudflare Worker

1. clone this repo
2. install everything: `npm run i`
3. deploy the Worker quickly so you can add the secrets: `npm run deploy`
4. take note of the URL you get from the deploy script, you need it for the Slack config
5. create your [Slack App](#create-a-slack-app), get the secrets and add them to your Worker

### Add Your Secrets to the Cloudflare Worker

Your Cloudflare worker will need to know the Slack bot's token.

Then add your bot's token running the following command. Paste the token when prompted to enter it.

```bash
npx wrangler secret put SLACK_TOKEN
```

Finally add the Slack signing secret. Paste the secret when prompted to enter it.

```bash
npx wrangler secret put SLACK_SIGNING_SECRET
```

### Create a Slack App

The Slack app will be used to listen for request in Slack and post messages back into Slack. In order to support all of slack-chatgpt's features, there are a couple of steps needed. However, you can also choose to setup just the features you need.

Start by creating a Slack app on [api.slack.com/apps](https://api.slack.com/apps). You are free to choose any name for the app that fits your needs.

Make sure to add the Bots feature to the Slack app and add the following scopes:

- `app_mentions:read`
- `chat:write`
- `commands`
- `im:history`
- `chat:write.public`

Take note of your bot's OAuth token and your app's signing secret as you will need [add both to your Cloudflare worker later](https://github.com/shapehq/slack-chatgpt#add-your-secrets-to-the-cloudflare-worker).

#### Responding to Mentions and Direct Messages

In order for the bot to respond to mentions and direct messages, you must enable Event Subscriptions in your Slack app and pass the URL to your Cloudflare Worker followed by the path `/events`, e.g. `https://slack-chatgpt.shapehq.workers.dev/events`.

Make sure to subscribe to the following events:

- `app_mention`
- `message.im`

#### Enabling the Slash Command

Add a slash command to your Slack app. You are free to choose the command, description, and usage hint that fits your needs but make sure to set the URL to your Cloudflare Worker followed by the path `/commands`, e.g. `https://slack-chatgpt.shapehq.workers.dev/commands`.

#### Adding the Shortcut to Messages

In order to respond to a message using ChatGPT, you must enable interactivity on your Slack app. Make sure to set the URL to your Cloudflare Worker followed by the path `/interactivity`, e.g. `https://slack-chatgpt.shapehq.workers.dev/interactivity`.

Then create a new shortcut and select "On messages" when asked about where the shortcut should appear. You are free to choose the name and description that fit your needs but make sure to set the callback ID to `ask_chatgpt_on_message`.

#### Adding the Global Shortcut

To add the global shortcut to your workspace, you must enable interactivity on your Slack app. You may have already done this when adding the shortcut to messages. When enabling interactivity, you should make sure to set the URL to your Cloudflare Worker followed by the path `/interactivity`, e.g. `https://slack-chatgpt.shapehq.workers.dev/interactivity`.

Then create a new shortcut and select "Global" when asked about where the shortcut should appear. You are free to choose the name and description that fit your needs but make sure to set the callback ID to `ask_chatgpt_global`.

## ✨ Features

slack-chatgpt can be used to interact with ChatGPT in several ways on Slack.

#### Mentions

When mentioning the bot, it will post a reply in a thread so it does not clutter the conversation.

<a href="./screenshots/mention.png" target="_blank"><img src="./screenshots/mention.png" width="300" /></a>

#### Direct Messages

People in the workspace can write messages messages to the bot in which case it replies directly within the conversation.

<a href="./screenshots/dm.png" target="_blank"><img src="./screenshots/dm.png" width="300" /></a>

#### Slash Command

Use the slash command to ask ChatGPT a question and have it reply within the conversation.

<a href="./screenshots/command.png" target="_blank"><img src="./screenshots/command.png" width="300" /></a>

#### Shortcut on Message

The shortcut on messages can be used to answer a message using ChatGPT.

<a href="./screenshots/shortcut-on-message.png" target="_blank"><img src="./screenshots/shortcut-on-message.png" width="300" /></a>

#### Global Shortcut

The global shortcut can be used to have ChatGPT help you write a message and then send that message to a channel or you can copy the message and send it yourself.

<a href="./screenshots/global-shortcut.png" target="_blank"><img src="./screenshots/global-shortcut.png" width="300" /></a>
