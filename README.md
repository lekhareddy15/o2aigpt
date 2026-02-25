# Project Overview

This project is aimed at developing an intelligent conversational agent using the OpenAI GPT model, designed to assist users across various domains by understanding and generating human-like text responses.

# Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Deployment**: Docker, AWS

# Setup Instructions

1. **Clone the repository**:
    ```bash
    git clone https://github.com/lekhareddy15/o2aigpt.git
    cd o2aigpt
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure environment variables**:
    Create a `.env` file in the root directory and specify the required variables.

4. **Start the application**:
    ```bash
    npm start
    ```

# Available Scripts

- `npm start`: Starts the application in development mode.
- `npm run build`: Builds the app for production.
- `npm test`: Runs the test suite.

# Project Structure

```
├── src
│   ├── components
│   ├── pages
│   ├── services
│   ├── styles
│   └── index.js
├── public
│   └── index.html
├── server
│   ├── routes
│   ├── config
│   └── app.js
├── .env
└── package.json
```

# Deployment Information

The application can be deployed using Docker. Follow these steps:

1. Build the Docker image:
    ```bash
    docker build -t o2aigpt .
    ```

2. Run the Docker container:
    ```bash
    docker run -p 3000:3000 o2aigpt
    ```

For AWS deployment, ensure to configure your EC2 instance and use the necessary security group settings.