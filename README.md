# **Final Project: Mini Arcade Game**

## **Overview**
This project is a simple arcade-style game where players control an object (e.g., a spaceship or a character) using buttons connected to an Arduino. The game environment is displayed using p5.js and includes dynamic visuals, sound effects, and a scoring system. The objective is to navigate obstacles and collect items to achieve a high score. 

The project showcases a combination of physical computing and creative coding, integrating concepts learned throughout the course.

---

## **Features**
- **Physical Inputs**: A button connected to an Arduino for controlling the game.
- **Interactive Gameplay**: Players navigate through a game world with obstacles and collectible items.
- **Dynamic Visuals**: The game features animations and visual effects.
- **Sound Effects**: Includes audio feedback for actions like scoring or hitting obstacles.
- **Score Tracking**: A scoring system that keeps track of player performance.

---

## **Hardware Setup**
### **Arduino**
- **Inputs**: Buttons for directional movement, extra buttons for additional actions.
- **Outputs**: Sends input signals to p5.js via serial communication.

### **Components**
- Arduino (e.g., Arduino Nano 33 or Uno)
- Push buttons
- Wires and breadboard
- USB cable for connection

### **Schematic**


---

## **Software**
### **p5.js**
- **Game Environment**: Displays the game world and updates based on inputs from the Arduino.
- **Audio and Visual Effects**: Background music, sound effects, and animations.
- **Game Mechanics**:
  - Obstacle avoidance
  - Item collection
  - Scoring system



# **Milestone 2**

---

## **Features**
- **Physical Inputs**: 4 buttons connected to an Arduino.
- **Interactive Gameplay**: Players use buttons to move the character up and down, left and right to avoid obstacles.
- **Dynamic Visuals**: The game includes moving obstacles and score tracking.
- **Sound Effects**: Audio feedback enhances the gameplay experience.
- **Game Over Mechanic**: The game ends when the character collides with an obstacle.

---

## **Hardware Setup**
### **Components**
- Arduino Nano.
- 4 push buttons.
- 10kΩ resistors.
- Jumper wires and breadboard.
- USB cable for Arduino-PC communication.


---

## **Software Details**
### **Arduino**
- Reads button inputs.
- Sends button states to p5.js via serial communication.

### **p5.js**
- Displays the game interface.
- Responds to button inputs to control the character.
- Implements game mechanics like collision detection and scoring.

---

## **Game Description**
1. **Objective**: Avoid obstacles and achieve a high score.
2. **Controls**:
   - Button 1: Move character up.
   - Button 2: Move character down.
   - Button 3: Move left.
   - Button 4: Move right.
3. **Gameplay**:
   - The player moves the character to avoid obstacles.
   - Points are earned as obstacles are dodged.
   - The game ends upon collision with an obstacle.

---

## **Timeline**
| **Dates**       | **Task**                                 | **Deliverable**                       |
|------------------|------------------------------------------|---------------------------------------|
| Dec 2 - Dec 6    | Implement button input and serial communication | Button-controlled movement in p5.js. |
| Dec 7 - Dec 10   | Add obstacles and scoring system        | Playable prototype.                   |
| Dec 11 - Dec 13  | Enhance visuals and add sound effects   | Polished game.                        |
| Dec 14 - Dec 15  | Debug and finalize game                | Fully functional game.                |
| Dec 16           | Submit the project                     | Finalized submission.                 |

---

## **Code Structure**
### **Arduino Code**
- Handles button input and sends states via serial communication.
### **p5.js Code**
- Renders the game environment and processes inputs from Arduino.

---

**Algorithms:**

**Button Input Handling (Arduino):**

Debounce algorithm to avoid multiple detections for a single button press:

bool isButtonPressed(int pin) {
    static unsigned long lastPressTime = 0;
    const unsigned long debounceDelay = 50; // milliseconds
    if (digitalRead(pin) == HIGH) {
        if (millis() - lastPressTime > debounceDelay) {
            lastPressTime = millis();
            return true;
        }
    }
    return false;
}

**Collision Detection:**

Check if the player's position overlaps with obstacles:

function checkCollisions() {
    if (player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.height + player.y > obstacle.y) {
        endGame(); // Collision detected
    }
}
