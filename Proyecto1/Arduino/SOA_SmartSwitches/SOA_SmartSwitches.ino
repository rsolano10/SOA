//Enviroment variables
int switch1 = 2;
int switch2 = 3;
String incomingData = "";

//Aux_Functions
void menuDisplay(){
  Serial.println("--Menu Options--");
  Serial.println("1. Type 'ON1' to turn on the device");
  Serial.println("2. Type 'OFF1' to turn off the device");
  Serial.println("3. Type 'ON2' to turn on the device");
  Serial.println("4. Type 'OFF2' to turn off the device");
  Serial.println("----------------");
}

void switchController(String action){ // action to perform to switch conector ON or OFF and the switch in which to action
  if(action.equalsIgnoreCase("ON1")){
    digitalWrite(switch1, LOW);
  }
  else if(action.equalsIgnoreCase("OFF1")){
    digitalWrite(switch1, HIGH);
  }
  else if(action.equalsIgnoreCase("ON2")){
    digitalWrite(switch2, LOW);
  }
  else if(action.equalsIgnoreCase("OFF2")){
    digitalWrite(switch2, HIGH);
  }
  else if (action.equalsIgnoreCase("test")){ // protocol for testing only
    digitalWrite(switch1, LOW);
    delay(5000);
    digitalWrite(switch1, HIGH);
    delay(1000);
    digitalWrite(switch2, LOW);
    delay(5000);
    digitalWrite(switch2, HIGH);
  }
  else{ // no real action recognized
    Serial.println("Action could not be realized!");
  }
}


//Main Arduino Functions

void setup() {// Runs every time arduino is turned on
  //pin modes setups
  pinMode(switch1, OUTPUT); // switch 1 as output
  pinMode(switch2, OUTPUT); // switch 2 as output

  //Serial initialice
  Serial.begin(9600);

  //menu Display
  menuDisplay(); //Display menu just for the first time system is available
}

void loop() {
  //Serial data reader:
  if(Serial.available() > 0) { // is Serial available verification
    incomingData = Serial.readString(); 
    incomingData.trim();// by default console input set a blank space at the end, we trim to avoid false string comparising and missunderstandings
    switchController(incomingData);
    menuDisplay();
  }
}
