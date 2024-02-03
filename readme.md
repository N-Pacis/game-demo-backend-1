# Korea Sw Biz Game Demo Application


## Prerequisites

Before running the application, ensure you have the following installed:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node.js package manager)

## Running with Docker

1. Clone the repository:

    ```bash
    git clone https://github.com/Game-Demo-1/game-demo-backend.git
    ```

2. Navigate to the project directory:

    ```bash
    cd game-demo-backend
    ```

3. Create a `.env` file with the required environment variables. You can use the provided `.env.example` as a template.

4. Build and run the Docker containers:

    ```bash
    docker-compose up -d
    ```

5. Access the application at [http://localhost:7000](http://localhost:7000).

6. To stop the containers:

    ```bash
    docker-compose down
    ```

## Running Manually

1. Clone the repository:

    ```bash
    git clone https://github.com/Game-Demo-1/game-demo-backend.git
    ```

2. Navigate to the project directory:

    ```bash
    cd game-demo-backend
    ```

3. Create a `.env` file with the required environment variables. You can use the provided `.env.example` as a template.

4. Install dependencies:

    ```bash
    npm install
    ```

5. Run Sequelize migrations:

    ```bash
    npx sequelize-cli db:migrate --env DEV
    ```

6. Start the application:

    ```bash
    npm start
    ```

7. Access the application at [http://localhost:7000](http://localhost:7000).

8. To stop the application, press `Ctrl + C` in the terminal.

