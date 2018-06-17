# Realtime Comments Widget (Next.js & Pusher)


This project contains the source code for a very simple realtime comments widget application with sentiment analysis. With sentiment analysis, we are able to detect the mood of a person based on the words they use in their comments. 

[View tutorial](https://pusher.com/tutorials/comments-sentiment-analysis-nextjs)

Here is a screenshot of the application.

![App Screenshot](https://i.imgur.com/DtLF0GH.png)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

1. **Install Node on your machine**: Ensure that you have **Node** and **npm** or **Yarn** installed on your machine. To install Node and npm on your machine, see the [Node download page](https://nodejs.org/en/download/). If you prefer using [Yarn](https://yarnpkg.com/) as your package manager to using npm, you can [get Yarn here](https://yarnpkg.com/en/docs/install).

2. **Create a Pusher application**: Create a new application on your [Pusher Dashboard](https://dashboard.pusher.com/) to get your app credentials.

### Setup Instructions

1. **Clone the repository** into a new directory on your machine.

2. **Install the dependencies** by running the following command from the new directory.

```sh
npm install
```

or using `yarn`

```sh
yarn add
```

3. **Create a `.env` file** in the root of the new directory with the following content.

```ini
# Pusher App Credentials

PUSHER_APP_ID=YOUR_APP_ID
PUSHER_APP_KEY=YOUR_APP_KEY
PUSHER_APP_SECRET=YOUR_APP_SECRET
PUSHER_APP_CLUSTER=YOUR_APP_CLUSTER
```

4. **Start the app** by running the following command. The app will runs on port 3000 except that port is already in use.

```sh
npm run dev
```

For `production`

```sh
npm start
```

## Built With

Here is a run-down of the core technologies used in this project.

1. [Next.js](https://learnnextjs.com/) - A framework for building server-side rendered(SSR) React applications with ease. It handles most of the challenges that come with building SSR React apps.

2. [Pusher](https://pusher.com/) - Pusher is a technology for building apps with varying realtime needs like push notifications and pub/sub messaging. It is the engine behind the realtime ability of our data visualization app.

3. [Sentiment](https://github.com/thisandagain/sentiment) - Sentiment is a module that uses the [AFINN-165](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010) wordlist and [Emoji Sentiment Ranking](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0144296) to perform [sentiment analysis](http://en.wikipedia.org/wiki/Sentiment_analysis) on arbitrary blocks of input text.

4. [React](https://reactjs.org/) - A very popular JavaScript DOM rendering framework for building scalable web applications using a component-based architecture.

## Acknowledgements

- **Remy Sharp ([@remi](https://github.com/remy))** - Next.js configuration for dotenv and custom servers ([remy/next.config.js](https://gist.github.com/remy/6bb7beccc6355cafa7eac64f46467c66)).

