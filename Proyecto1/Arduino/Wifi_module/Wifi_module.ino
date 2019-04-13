#include <SoftwareSerial.h>
SoftwareSerial esp8266(3,2); 

float Sensibilidad=0.139; //sensibilidad en V/A para nuestro sensor
float offset=0.100; // Equivale a la amplitud del ruido
float II;
float IF;
float IP;

void setup()
{ 
 Serial.begin(9600);  // monitor serial del arduino
 esp8266.begin(9600); // baud rate del ESP8255
 
 pinMode(4,OUTPUT);
 pinMode(5,OUTPUT);
 digitalWrite(4,HIGH);
 digitalWrite(5,HIGH);
 
 sendData("AT+RST\r\n",2000);      // resetear módulo
 sendData("AT+CWMODE=1\r\n",1000); // configurar como cliente
 sendData("AT+CWJAP=\"Solano Asenjo\",\"Gasper123\"\r\n",8000); //SSID y contraseña para unirse a red 
 sendData("AT+CIFSR\r\n",1000);    // obtener dirección IP
 sendData("AT+CIPMUX=1\r\n",1000); // configurar para multiples conexiones
 sendData("AT+CIPSERVER=1,80\r\n",1000);         // servidor en el puerto 80
}

void loop()
{
 if(esp8266.available())   // revisar si hay mensaje del ESP8266
 {
  if(esp8266.find("+IPD,")) // revisar si el servidor recibio datos
  {
   delay(1500); // esperar que lleguen los datos hacia el buffer
   int conexionID = esp8266.read()-48; // obtener el ID de la conexión para poder responder
   esp8266.find("swt="); // bucar el texto "led="
   int state = (esp8266.read()-48); // Obtener el estado del pin a mostrar
   digitalWrite(13, state); // Cambiar estado del pin
   while(esp8266.available()){
    char c = esp8266.read();
    Serial.print(c);
  }
 
  //responder y cerrar la conexión para que el navegador no se quede cargando 
  // página web a enviar
  if (state==0) {
   digitalWrite(4,LOW); //encender switch 1
   II = get_corriente();
  }
  if (state==1) {
   digitalWrite(4,HIGH); //apagar switch 1
   IF = get_corriente();
   IP = (IF+II)/2;
   Serial.print("Ip: ");
   Serial.print(IP,3);
  }
  if (state==2) {
   digitalWrite(5,LOW); //encender switch 2
  }
  else { 
   digitalWrite(5,HIGH); //apagar switch 2
  }

  String webpage = "ok";
 
  // comando para enviar página web
  String comandoWebpage = "AT+CIPSEND=";
  comandoWebpage+=conexionID;
  comandoWebpage+=",";
  comandoWebpage+=webpage.length();
  comandoWebpage+="\r\n";
  sendData(comandoWebpage,1000);
  sendData(webpage,1000);
 
  // comando para terminar conexión
  String comandoCerrar = "AT+CIPCLOSE=";
  comandoCerrar+=conexionID;
  comandoCerrar+="\r\n";
  sendData(comandoCerrar,3000);
  }
 }
}

float get_corriente()
{
  float voltajeSensor;
  float corriente=0;
  long tiempo=millis();
  float Imax=0;
  float Imin=0;
  while(millis()-tiempo<500)//realizamos mediciones durante 0.5 segundos
  { 
    voltajeSensor = analogRead(A0) * (5.0 / 1023.0);//lectura del sensor
    corriente=0.9*corriente+0.1*((voltajeSensor-2.527)/Sensibilidad); //Ecuación  para obtener la corriente
    if(corriente>Imax)Imax=corriente;
    if(corriente<Imin)Imin=corriente;
  }
  return(((Imax-Imin)/2)-offset);
}

/*
Enviar comando al esp8266 y verificar la respuesta del módulo, todo esto dentro del tiempo timeout
*/
void sendData(String comando, const int timeout)
{
 long int time = millis(); // medir el tiempo actual para verificar timeout
 
 esp8266.print(comando); // enviar el comando al ESP8266
 
 while( (time+timeout) > millis()) //mientras no haya timeout
 {
  while(esp8266.available()) //mientras haya datos por leer
  { 
   // Leer los datos disponibles
   char c = esp8266.read(); // leer el siguiente caracter
   Serial.print(c);
  }
 } 
 return;
}
