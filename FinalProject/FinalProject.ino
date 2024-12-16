const int leftButton = 2;  // Pin for Left button
const int rightButton = 3; // Pin for Right button

void setup() {
  pinMode(leftButton, INPUT_PULLUP);  // Enable internal pull-up for Left button
  pinMode(rightButton, INPUT_PULLUP); // Enable internal pull-up for Right button
  Serial.begin(9600);                 // Start serial communication
}

void loop() {
  // Check if Left button is pressed (LOW state)
  if (digitalRead(leftButton) == LOW) {
    Serial.println("LEFT");
    delay(50); // Small delay for smooth control
  }
  
  // Check if Right button is pressed (LOW state)
  if (digitalRead(rightButton) == LOW) {
    Serial.println("RIGHT");
    delay(50); // Small delay for smooth control
  }
}

