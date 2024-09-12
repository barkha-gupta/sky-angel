# Sky Angel

Sky Angel is a fun and interactive web game where the player controls an aircraft, dodges birds, and collects stars and parachutes while managing fuel levels.

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v14 or higher)
- **npm**
- **MongoDB** (for the backend)

### Installation

Follow the steps below to set up the project:

1. Clone the repository:

```sh
git clone https://github.com/barkha-gupta/sky-angel.git
```

2. Navigate to the project directory:
```sh
cd sky-angel
```
3. Setup the Frontend
Go to the frontend directory:

```sh
cd frontend
```
Install the dependencies:

```sh
npm install
```
Start the frontend development server:

```sh
npm run dev
```
This will start the frontend server, and you can access it by opening http://localhost:5173 in your browser.

4. Setup the Backend
Go to the backend directory:

```sh
cd backend
```
Install the dependencies:

```sh
npm install
```
Create a .env file in the backend directory with the following content:

```.env
MONGO_URI=your_mongo_uri
PORT=your_port_number
```
Replace your_mongo_uri with the URI of your MongoDB instance and your_port_number with the port number you want to run the backend server on (e.g., 5000).

Start the backend server:

```sh
npm start
```
The backend server will start on the port you specified in the .env file.

### Game Instructions
- Start the Game: Press the "Start Game" button to begin.
- Control the Aircraft: Use arrow keys to move the aircraft. Avoid flying off the screen.
- Avoid Birds: Dodge birds flying from right to left. Collision ends the game.
- Collect Parachutes and Stars: Increase your fuel by collecting parachutes (+10 points). Collect stars to increase your score (+1 point).
- Pause/Resume: Use the "Pause" button or press the "Space" bar to pause/resume the game.

- Check out the **Demo** of the game here: https://jam.dev/c/3de5149b-21e2-49ba-aa5f-670d7521510c

### Enjoy the game and have fun!

