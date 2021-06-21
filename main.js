//Inicialmente se redirige http con el que trabaja la API de CouchDB a https

//if (location.protocol !== 'https:') {
//    location.replace(`https:${location.href.substring(location.protocol.length)}`);
//}

//Se va a emplear el boton para mostrar y quitar el menu
//Se ejecutan las lineas para que cuando se pulse el boton de menu, aparezca o desaparezca los elementos de navegacion, por eso se emplea toggle.
//Ademas se le dice que se crea la clase boton_muestra para que asi se pueda mostrar o quitar modificandolo en CSS.
document.querySelector('.boton_menu').addEventListener('click', () => {
    document.querySelector('.navegacion ul.elementos_navegacion').classList.toggle('boton_muestra');
});

/*Para hacer el efecto de que se mueve la portada */ 
let animacion_portada = document.querySelector('.portada');
let animacion_titulo = document.querySelector('.titulo_portada');
let animacion_contenido1 = document.querySelector('.parrafo1_portada');
let animacion_contenido2 = document.querySelector('.parrafo2_portada');

function mover_portada() {
    let tope = document.documentElement.scrollTop;
    animacion_portada.style.transform = 'translateY(' + tope*0.3 + 'px)';
    animacion_titulo.style.transform = 'translateY(' + tope*-0.25 + 'px)';
    animacion_contenido1.style.transform = 'translateY(' + tope*-0.25 + 'px)';
    animacion_contenido2.style.transform = 'translateY(' + tope*-0.25 + 'px)';
}

window.addEventListener('scroll',mover_portada);

/*Para ver como los elementos aparecen de forma dinamica se hace la siguiente funcion*/
let animacion_aplicaciones = document.querySelectorAll('.aparecer');

function mostrar_aplicaciones() {
    let tope = document.documentElement.scrollTop;
    for(var i=0; i < animacion_aplicaciones.length; i++ ) {
        let altura_aplicacion = animacion_aplicaciones[i].scrollTop;
        if(altura_aplicacion - 200 < tope) {
            animacion_aplicaciones[i].style.opacity = 1;
            animacion_aplicaciones[i].classList.add('muestra_dinamica');
        }
    }
}

//Cuando se realice el evento scroll es cuando se ejecuta la funcion creada con anterioridad
window.addEventListener('scroll',mostrar_aplicaciones);


function progreso() {
    let progreso  = document.documentElement.scrollTop;
    //console.log(progreso);
}

window.addEventListener('scroll',progreso);


    /* FUNCIONES PARA LA PETICION DE DATOS A LA BASE DE DATOS */
   
    var xhttp;
    //Funcion para la conexion con la base de datos, en ella se emplea una variable con la que se va a implementar la conexion
    function createConnection() {
        xhttp = new XMLHttpRequest();
    }
    
    //Funcion para realizar la peticion a la base de datos
    function getMessage_calistenia() {
        createConnection();
        //Hasta que no se realiza de forma correcta el protocolo no se realiza el handleresponse
        xhttp.onreadystatechange = handleResponse_calistenia;
        //En caso de tener un buscador: var keyword = document.getElementById("keyword").value;

        var url = "https://carlostfg.herokuapp.com/api/calistenia";
        //var url = "https://Carlostfg2021.dyndns.org:6984/calistenia/Full_1";

        
        console.log(url);
        //Se realiza la peticion GET a la base de datos, por eso su URL, si esto fuese un texto iria aqui donde buscarlo no?
        xhttp.open("GET", url, true);
        //Se obtiene el documento en formato json
        xhttp.setRequestHeader("Accept", "application/json;charset=UTF-8");
        
        //xhttp.setRequestHeader("Authorization","Basic Auth");

        //¿?
        xhttp.send(null);
    }
    
    //Funcion para recibir la respuesta en formato JSON y poder proceder a la descarga
    function handleResponse_calistenia() {

         
         //xhttp.readyState == 4 la solicitud se envia y se recibido de forma correcta al servidor
         //xhttp.status == 200 es como que el servidor esta listo y te manda la respuesta
        if (xhttp.readyState == 4 && xhttp.status == 200) {
           
           // Leemos la respuesta en JSON

           var texto = JSON.parse(xhttp.responseText);
            console.log(texto);
           var resultado = "";
           resultado = resultado + "Tipo de rutina: \t" + texto[0]._id+ "\n";
           resultado = resultado + "Numero total de ejercicios: \t" + texto[0].total_exercises+ "\n";
           resultado = resultado + " \n";
           
          for(var i = 0; i <texto[0].exercises.length ; i++){ 
             resultado = resultado + " Ejercicio: \t" + texto[0].exercises[i].description +"\n";
             resultado = resultado + " Repeticiones: \t" + texto[0].exercises[i].repetitions +"\n";
             resultado = resultado + " \n";
           }

           var element = document.createElement('a');

        //Para proceder con la descarga del archivo
       //element.setAtribute('href','data:text/plain;charset=uft-8,' + encodeURIComponent(text));
       element.setAttribute('href','data:text/plain;charset=uft-8,' + encodeURIComponent(resultado));

       //Se crea el atributo para la descarga
       //element.setAttribute('download',filename);
       element.setAttribute('download',"rutina_calistenia.txt");

       element.style.display = 'none';
       document.body.appendChild(element);

       element.click();

       document.body.removeChild(element);
       }
   }

   //En lugar de crear el elemento que se muestra a continuacion, para optimizar el programa, en el codigo HTML se ha creado el boton que permita la comunicacion con el servidor
   //document.getElementById("btn_calistenia").onclick = function (){
   //    getMessage();
   //}

   //Funcion para realizar la peticion a la base de datos
   function getMessage_calistenia2() {
    createConnection();
    //Hasta que no se realiza de forma correcta el protocolo no se realiza el handleresponse
    xhttp.onreadystatechange = handleResponse_calistenia2;
    //En caso de tener un buscador: var keyword = document.getElementById("keyword").value;

    var url = "http://carlostfg2021.dyndns.org:5984/calistenia/Full_1/";
    //var url = "https://Carlostfg2021.dyndns.org:6984/calistenia/Full_1";

    
    console.log(url);
    //Se realiza la peticion GET a la base de datos, por eso su URL, si esto fuese un texto iria aqui donde buscarlo no?
    xhttp.open("GET", url, true);
    //Se obtiene el documento en formato json
    xhttp.setRequestHeader("Accept", "application/json;charset=UTF-8");
    
    //xhttp.setRequestHeader("Authorization","Basic Auth");

    //¿?
    xhttp.send(null);
}

//Funcion para recibir la respuesta en formato JSON y poder proceder a la descarga
function handleResponse_calistenia2() {

     
     //xhttp.readyState == 4 la solicitud se envia y se recibido de forma correcta al servidor
     //xhttp.status == 200 es como que el servidor esta listo y te manda la respuesta
    if (xhttp.readyState == 4 && xhttp.status == 200) {
       
       // Leemos la respuesta en JSON

       var texto = xhttp.responseText;


       var element = document.createElement('a');

    //Para proceder con la descarga del archivo
   //element.setAtribute('href','data:text/plain;charset=uft-8,' + encodeURIComponent(text));
   element.setAttribute('href','data:text/plain;charset=uft-8,' + encodeURIComponent(texto));

   //Se crea el atributo para la descarga
   //element.setAttribute('download',filename);
   element.setAttribute('download',"rutina_calistenia.txt");

   element.style.display = 'none';
   document.body.appendChild(element);

   element.click();

   document.body.removeChild(element);
   }
}

//En lugar de crear el elemento que se muestra a continuacion, para optimizar el programa, en el codigo HTML se ha creado el boton que permita la comunicacion con el servidor
//document.getElementById("btn_calistenia").onclick = function (){
//    getMessage();
//}

   

   
   function getMessage_karaoke() {
    createConnection();
    //Hasta que no se realiza de forma correcta el protocolo no se realiza el handleresponse
    xhttp.onreadystatechange = handleResponse_karaoke;
    //En caso de tener un buscador: var keyword = document.getElementById("keyword").value;

    var url = "https://carlostfg.herokuapp.com/api/karaoke";
    
    console.log(url);
    //Se realiza la peticion GET a la base de datos, por eso su URL, si esto fuese un texto iria aqui donde buscarlo no?
    xhttp.open("GET", url, true);
    //Se obtiene el documento en formato json
    xhttp.setRequestHeader("Accept", "application/json;charset=UTF-8");
    
    xhttp.send(null);
}

//Funcion para recibir la respuesta en formato JSON y poder proceder a la descarga
function handleResponse_karaoke() {

     
     //xhttp.readyState == 4 la solicitud se envia y se recibido de forma correcta al servidor
     //xhttp.status == 200 es como que el servidor esta listo y te manda la respuesta
    if (xhttp.readyState == 4 && xhttp.status == 200) {
       
       // Leemos la respuesta en JSON

       var texto = JSON.parse(xhttp.responseText);

       var resultado = "";
       resultado = resultado + "Id de la canción: \t" + texto[0]._id+ "\n";
       resultado = resultado + "Numero de lineas de la canción: \t" + texto[0].total_lines + "\n";
       resultado = resultado + " \n";
       resultado = resultado + " Canción: \t" + texto[0].lyrics[0].first +"\n";
       resultado = resultado + " Autor: \t" + texto[0].lyrics[0].second +"\n";
       resultado = resultado + " \n";

       for(var i = 1; i <texto[0].lyrics.length ; i++){ 
         resultado = resultado + " Letra: \t" + texto[0].lyrics[i].first +"\n";
         resultado = resultado + " Letra: \t" + texto[0].lyrics[i].second +"\n";
         resultado = resultado + " \n";
         //resultado = resultado + " Duracion: \t" + texto.lyrics[i].duration +"\n";
         
       }

       var element = document.createElement('a');

        //Para proceder con la descarga del archivo
        
        element.setAttribute('href','data:text/plain;charset=uft-8,' + encodeURIComponent(resultado));

        //Se crea el atributo para la descarga
        element.setAttribute('download',"cancion_seleccionada.txt");

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
   }
}

function getMessage_karaoke2() {
    createConnection();
    //Hasta que no se realiza de forma correcta el protocolo no se realiza el handleresponse
    xhttp.onreadystatechange = handleResponse_karaoke2;
    //En caso de tener un buscador: var keyword = document.getElementById("keyword").value;

    var url = "http://carlostfg2021.dyndns.org:5984/karaoke/D_ID_1/";
    
    console.log(url);
    //Se realiza la peticion GET a la base de datos, por eso su URL, si esto fuese un texto iria aqui donde buscarlo no?
    xhttp.open("GET", url, true);
    //Se obtiene el documento en formato json
    xhttp.setRequestHeader("Accept", "application/json;charset=UTF-8");
    
    xhttp.send(null);
}

//Funcion para recibir la respuesta en formato JSON y poder proceder a la descarga
function handleResponse_karaoke2() {

     
     //xhttp.readyState == 4 la solicitud se envia y se recibido de forma correcta al servidor
     //xhttp.status == 200 es como que el servidor esta listo y te manda la respuesta
    if (xhttp.readyState == 4 && xhttp.status == 200) {
       
       // Leemos la respuesta en JSON

       var texto = xhttp.responseText;

       var element = document.createElement('a');

        //Para proceder con la descarga del archivo
        
        element.setAttribute('href','data:text/plain;charset=uft-8,' + encodeURIComponent(texto));

        //Se crea el atributo para la descarga
        element.setAttribute('download',"cancion_seleccionada.txt");

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
   }
}




