//Inicialmente se va a emplear el boton para mostrar y quitar el menu
//Se ejecutan las lineas para que cuando se pulse el boton de menu, aparezca o desaparezca los elementos de navegacion, por eso se emplea toggle.
//Ademas se le dice que se crea la clase boton_muestra para que asi se pueda mostrar o quitar modificandolo en CSS.
document.querySelector('.boton_menu').addEventListener('click', () => {
    document.querySelector('.navegacion ul.elementos_navegacion').classList.toggle('boton_muestra');
});

/*Para hacer el efecto de que se mueve la portada */ 
let animacion_portada = document.querySelector('.portada');
let animacion_titulo = document.querySelector('.titulo_portada');
let animacion_contenido = document.querySelector('.contenido_portada');

function mover_portada() {
    let tope = document.documentElement.scrollTop;
    animacion_portada.style.transform = 'translateY(' + tope*0.3 + 'px)';
    animacion_titulo.style.transform = 'translateY(' + tope*0.3 + 'px)';
    animacion_contenido.style.transform = 'translateY(' + tope*-0.5 + 'px)';
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
    console.log(progreso);
}

window.addEventListener('scroll',progreso);

/*Al final se ha decidido que la portada no, pero la funcion seria asi:
    let animacion_portada = document.querySelector('.portada');
    
    function mostrar_portada() {
    let altura_portada = animacion_portada.offsetTop;
    if(altura_portada - 500 < tope) {
        animacion_portada.style.opacity = 1;
        animacion_portada.classList.add('muestra_dinamica');
    }

    */



