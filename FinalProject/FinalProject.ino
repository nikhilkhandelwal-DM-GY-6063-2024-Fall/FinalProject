const int leftButton = 2;  // Pin for Left button
const int rightButton = 3; // Pin for Right button
const int restartButton = 4;

void setup() {
  pinMode(leftButton, INPUT_PULLUP);  // Enable internal pull-up resistor
  pinMode(rightButton, INPUT_PULLUP);// Enable internal pull-up resistor
  pinMode(restartButton, INPUT_PULLUP);
  Serial.begin(9600);                 // Start serial communication
}

void loop() {
  if (digitalRead(leftButton) == LOW) { // Button pressed (LOW)
    Serial.println("LEFT");
    delay(50); // Debounce delay
  }
  if (digitalRead(rightButton) == LOW) { // Button pressed (LOW)
    Serial.println("RIGHT");
    delay(50); // Debounce delay
  }
  if (digitalRead(restartButton) == LOW) { // Button pressed (LOW)
    Serial.println("RESTART");
    delay(200); // Debounce delaay
  }
}
