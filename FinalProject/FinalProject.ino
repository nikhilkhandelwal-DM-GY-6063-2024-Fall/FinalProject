const int leftButton = 2;  // Pin for left button
const int rightButton = 3; // Pin for right button

void setup() {
  pinMode(leftButton, INPUT_PULLUP);  // Setup left button
  pinMode(rightButton, INPUT_PULLUP); // Setup right button
  Serial.begin(9600);                 // Start serial communication
}

void loop() {
  if (digitalRead(leftButton) == LOW) { // If left button pressed
    Serial.println("LEFT");
    delay(50); // Debounce delay
  }
  if (digitalRead(rightButton) == LOW) { // If right button pressed
    Serial.println("RIGHT");
    delay(50); // Debounce delay
  }
}
