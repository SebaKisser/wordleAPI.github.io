/*DECLARAMOS VARIABLES GLOBALES*/
let intentos = 6;
let palabra;
let url = 'https://random-word-api.herokuapp.com/word?number=5&&length=5&&lang=es';

fetch(url)
.then(response => response.json())
.then(response => {
    palabra = response[0].toUpperCase()
    console.log(palabra)
})
.catch (err => {
    console.log("Ocurrio un error");
})


/*DECLARAMOS CONSTANTES QUE IMPLEMENTAREMOS PARA MANIPULAR EL HTML*/
const BUTTON = document.getElementById("guess-button");
const INPUT = document.getElementById("guess-input");
const GRID = document.getElementById("contenedor-cuadro");

BUTTON.addEventListener('click',intentar);


function intentar() {

    if (INPUT.value.length != 5) {
        alert('Debe ingresar 5 letras');
    }

    else{
        /*Aqui procesamos el caso en el que el jugador acerto la palabra*/
        const FILA = document.createElement('div');
        FILA.className = 'fila';
        const INTENTO = analizarIntento();

        if (INTENTO === palabra){
            const FILA = document.createElement('div');
            FILA.className = 'fila';
        
            for (let i in palabra) {
                const LETRA = document.createElement('letra');
                LETRA.className = 'letra';
                LETRA.innerHTML = palabra[i];
                LETRA.style.backgroundColor = 'green';
                FILA.appendChild(LETRA);
            }
        
        /*Hacemos una fila más para agregar el head del mensaje final*/
        GRID.appendChild(FILA);
        mensajeFinal('<h1>GANASTE!</h1>');
        return;
        }
        
    
        for (let i in palabra) {

            const LETRA = document.createElement('div');
            LETRA.className = "letra";

            if (palabra[i] === INTENTO[i]) {
                LETRA.innerHTML = INTENTO[i];
                LETRA.style.backgroundColor = "green";
            }

            else if (palabra.includes(INTENTO[i])) {
                LETRA.innerHTML = INTENTO[i];
                LETRA.style.backgroundColor = "yellow";
            }

            else {
                LETRA.innerHTML = INTENTO[i];
                LETRA.style.backgroundColor = "grey";
            }

            FILA.appendChild(LETRA);
        }

        GRID.appendChild(FILA);

        intentos--;

        if (intentos === 0){
            mensajeFinal("<h1>PERDISTE!</h1>");
        }
    }
}

function analizarIntento(){
    let intento = document.getElementById("guess-input");
    alertarEspacios(intento);
    intento = intento.value;
    intento = intento.toUpperCase();
    return intento;
}

function mensajeFinal(parrafo){
    INPUT.disabled = true;
    BUTTON.disabled = true;
    let mensaje = document.getElementById('suposiciones');
    mensaje.innerHTML = parrafo;
}

/*Funcionalidad de recargar la pagina*/
document.getElementById('botonRecarga').addEventListener('click', function() {
    location.reload();
});

/*Envia un mensaje al usuario que no debe agregar espacios*/
function alertarEspacios(m){
    m = document.getElementById("guess-input").value;

    if (m.includes(' ')){
        alert('La palabra no debe contener espacios');
    }
    else{
        return m;
    } 
}
