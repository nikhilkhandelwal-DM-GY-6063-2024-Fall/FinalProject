const int leftButton = 2;  // Pin for Left button
const int rightButton = 3; // Pin for Right button
const int restartButton = 4;

void setup() {
  pinMode(leftButton, INPUT_PULLUP);  // Enable internal pull-up resistor
  pinMode(rightButton, INPUT_PULLUP);// Enable internal pull-up resistor
  pinMode(restartButton, INPUT_PULLUP);
  Serial.begin(9600);               
}

void loop() {
  if (digitalRead(leftButton) == LOW) { 
    Serial.println("LEFT");
    delay(50); // Debounce delay
  }
  if (digitalRead(rightButton) == LOW) {
    Serial.println("RIGHT");
    delay(50);
  }
  if (digitalRead(restartButton) == LOW) { 
    Serial.println("RESTART");
    delay(200);
  }
}
