# Treasure Hunt 

Welcome to the Treasure Hunt Website! This interactive game challenges players to explore the campus, decipher hints, and scan hidden QR codes to emerge victorious. The player with the fastest time in finding all the QR codes will be declared the winner.

## How to Play

1. **Explore:** Roam around the campus to discover hidden QR codes.
2. **Hints:** Visit the website for clues on the locations of the QR codes.
3. **Scan:** Use the QR scanning mechanism on the 'Scan' page to capture each code.
4. **Answer Questions:** After scanning, answer a question to progress to the next level.
5. **Completion:** Finish the game by finding all QR codes and answering all questions.

## About the Website

The Treasure Hunt Website is built using Next.js {App router} and incorporates Firebase for user authentication and database functionality.

### Pages

1. **Home:** The landing page with information about the treasure hunt.
2. **Login:** Allows registered users to log in to their accounts.
3. **Signup:** New users can create an account to participate in the treasure hunt.
4. **Instructions:** Displays general rules and instructions of the game. The timer starts when the 'Start' button is clicked.
5. **Scan:** The core of the game, including hints and the QR code scanning mechanism.
6. **Question:** After scanning a QR code, players must answer a question to progress.
7. **Completion:** Displays when a player successfully completes the game.

## Running Locally

To run the Treasure Hunt Website locally, follow these steps:

1. **Clone Repository:**
   ```bash
   git clone https://github.com/niranjan-official/treasure-hunt.git
   cd treasure-hunt
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set up Firebase:**
   - Create a Firebase project and configure it in the project.
   - Update Firebase credentials in the project.

4. **Run the Application:**
   ```bash
   npm run dev
   ```

5. **Access Locally:**
   Open your web browser and go to [http://localhost:3000](http://localhost:3000) to play the treasure hunt game.

Feel free to contribute to the project and enhance the treasure hunt experience for players!
