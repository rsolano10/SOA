#include <SoftwareSerial.h>
SoftwareSerial esp8266(3, 2);

float Sensibilidad = 0.139; //sensibilidad en V/A para nuestro sensor
float offset = 0.100; // Equivale a la amplitud del ruido
float II; // corriente inicial
float IF; // corriente final
float IP = 10; // corriente promedio
String server = "192.168.1.5";
String cadena = "";

void setup()
{
  Serial.begin(9600); // monitor serial del arduino
  esp8266.begin(9600); // baud rate del ESP8255

  pinMode(4, OUTPUT);
  pinMode(5, OUTPUT);
  digitalWrite(4, HIGH);
  digitalWrite(5, HIGH);

  sendData("AT+RST\r\n", 2000); // resetear módulo
  connectServer();
}

void connectServer() {
  sendData("AT+CWMODE=1\r\n", 1000); // configurar como cliente
  sendData("AT+CWJAP=\"Solano Asenjo\",\"Gasper123\"\r\n", 8000); // SSID y contraseña para unirse a red
  sendData("AT+CIFSR\r\n", 1000); // obtener dirección IP
  sendData("AT+CIPMUX=1\r\n", 1000); // configurar para multiples conexiones
  sendData("AT+CIPSERVER=1,80\r\n", 1000); // servidor en el puerto 80
}

void sendIP() {
  esp8266.println("AT");
  if (esp8266.find("OK"))
    Serial.println("Respuesta AT correcto");
  else
    Serial.println("Error en ESP8266");

  // ESP8266 en modo estación (nos conectaremos a una red existente)
  esp8266.println("AT+CWMODE=3");
  if (esp8266.find("OK"))
    Serial.println("ESP8266 en modo Estacion");

  // Nos conectamos a una red wifi
  esp8266.println("AT+CWJAP=\"Solano Asenjo\",\"Gasper123\"");
  Serial.println("Conectandose a la red ...");
  esp8266.setTimeout(10000); // Aumentar si demora la conexion
  if (esp8266.find("OK"))
    Serial.println("WIFI conectado");
  else
    Serial.println("Error al conectarse en la red");
  esp8266.setTimeout(2000);
  // Desabilitamos las conexiones multiples
  esp8266.println("AT+CIPMUX=0");
  if (esp8266.find("OK"))
    Serial.println("Multiconexiones deshabilitadas");
  delay(1000);

  // ---------enviamos las variables al servidor---------------------
  // Nos conectamos con el servidor:
  esp8266.println("AT+CIPSTART=\"TCP\",\"" + server + "\",3000");
  if ( esp8266.find("OK"))
  {
    Serial.println();
    Serial.println();
    Serial.println();
    Serial.println("ESP8266 conectado con el servidor...");

    //Armamos el encabezado de la peticion http
    String peticionHTTP = "GET /api/V1/stat?data=";
    peticionHTTP = peticionHTTP + IP;
    peticionHTTP = peticionHTTP + " HTTP/1.1\r\n";
    peticionHTTP = peticionHTTP + "Host: http://" + server + ":3000\r\n\r\n";

    Serial.println(peticionHTTP);

    // Enviamos el tamaño en caracteres de la peticion http:
    esp8266.print("AT+CIPSEND=");
    esp8266.println(peticionHTTP.length());

    // esperamos a ">" para enviar la petcion  http
    if (esp8266.find(">")) // ">" indica que podemos enviar la peticion http
    {
      Serial.println("Enviando HTTP . . .");
      esp8266.println(peticionHTTP);
      if ( esp8266.find("SEND OK"))
      {
        Serial.println("Peticion HTTP enviada:");
        Serial.println();
        Serial.println(peticionHTTP);
        Serial.println("Esperando respuesta...");

        boolean fin_respuesta = false;
        long tiempo_inicio = millis();
        cadena = "";

        while (fin_respuesta == false)
        {
          while (esp8266.available() > 0)
          {
            char c = esp8266.read();
            Serial.write(c);
            cadena.concat(c);  // guardamos la respuesta en el string "cadena"
          }
          // finalizamos si la respuesta es mayor a 500 caracteres
          if (cadena.length() > 500) // Pueden aumentar si tenen suficiente espacio en la memoria
          {
            Serial.println("La respuesta a excedido el tamaño maximo");

            esp8266.println("AT+CIPCLOSE");
            if ( esp8266.find("OK"))
              Serial.println("Conexion finalizada");
            fin_respuesta = true;
          }
          if ((millis() - tiempo_inicio) > 10000) // Finalizamos si ya han transcurrido 10 seg
          {
            Serial.println("Tiempo de espera agotado");
            esp8266.println("AT+CIPCLOSE");
            if ( esp8266.find("OK"))
              Serial.println("Conexion finalizada");
            fin_respuesta = true;
          }
          if (cadena.indexOf("CLOSED") > 0) // si recibimos un CLOSED significa que ha finalizado la respuesta
          {
            Serial.println();
            Serial.println("Cadena recibida correctamente, conexion finalizada");
            fin_respuesta = true;
          }
        }
      }
      else
      {
        Serial.println("No se ha podido enviar HTTP.....");
      }
    }
  }
  else
  {
    Serial.println("No se ha podido conectarse con el servidor");
  }
  connectServer();
}

void loop()
{
  if (esp8266.available())  // revisar si hay mensaje del ESP8266
  {
    if (esp8266.find("+IPD,")) // revisar si el servidor recibio datos
    {
      delay(1500); // esperar que lleguen los datos hacia el buffer
      int conexionID = esp8266.read() - 48; // obtener el ID de la conexión para poder responder
      esp8266.find("swt="); // bucar el texto "led="
      int state = (esp8266.read() - 48); // Obtener el estado del pin a mostrar
      digitalWrite(13, state); // Cambiar estado del pin
      while (esp8266.available()) {
        char c = esp8266.read();
        Serial.print(c);
      }

      // responder y cerrar la conexión para que el navegador no se quede cargando
      // página web a enviar
      if (state == 0) {
        digitalWrite(4, LOW); // encender switch 1
        II = get_corriente();
      }
      if (state == 1) {
        digitalWrite(4, HIGH); // apagar switch 1
        IF = get_corriente();
        IP = (IF + II) / 2;
        sendIP();
        Serial.print("Ip: ");
        Serial.print(IP, 3);
      }
      if (state == 2) {
        digitalWrite(5, LOW); // encender switch 2
      }
      else {
        digitalWrite(5, HIGH); // apagar switch 2
      }

      String webpage = "ok";

      // comando para enviar página web
      String comandoWebpage = "AT+CIPSEND=";
      comandoWebpage += conexionID;
      comandoWebpage += ",";
      comandoWebpage += webpage.length();
      comandoWebpage += "\r\n";
      sendData(comandoWebpage, 1000);
      sendData(webpage, 1000);

      // comando para terminar conexión
      String comandoCerrar = "AT+CIPCLOSE=";
      comandoCerrar += conexionID;
      comandoCerrar += "\r\n";
      sendData(comandoCerrar, 3000);
    }
  }
}

float get_corriente()
{
  float voltajeSensor;
  float corriente = 0;
  long tiempo = millis();
  float Imax = 0;
  float Imin = 0;
  while (millis() - tiempo < 500) // realizamos mediciones durante 0.5 segundos
  {
    voltajeSensor = analogRead(A0) * (5.0 / 1023.0);// lectura del sensor
    corriente = 0.9 * corriente + 0.1 * ((voltajeSensor - 2.527) / Sensibilidad); // Ecuación  para obtener la corriente
    if (corriente > Imax)Imax = corriente;
    if (corriente < Imin)Imin = corriente;
  }
  return (((Imax - Imin) / 2) - offset);
}

/*
  Enviar comando al esp8266 y verificar la respuesta del módulo, todo esto dentro del tiempo timeout
*/
void sendData(String comando, const int timeout)
{
  long int time = millis(); // medir el tiempo actual para verificar timeout

  esp8266.print(comando); // enviar el comando al ESP8266

  while ( (time + timeout) > millis()) // mientras no haya timeout
  {
    while (esp8266.available()) // mientras haya datos por leer
    {
      // Leer los datos disponibles
      char c = esp8266.read(); // leer el siguiente caracter
      Serial.print(c);
    }
  }
  return;
}
