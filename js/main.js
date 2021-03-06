const url = 'https://clientes.api.greenborn.com.ar/public-random-word?c=1&l=5';

fetch(`${url}`)
.then( response => response.json())
.then( data => {
    const palabra = data[0].toUpperCase();
    let palabraPartida = palabra.split('');
    console.log(palabra);

    const contenedorPalabra = document.getElementById('contenedorPalabra');
    const btnJugar = document.getElementById('btnJugar');
    const contenedorLetras = document.getElementById('letrasUsadas');
    const mensaje = document.getElementById('mensaje-final');
    const teclas = document.querySelectorAll('li');

    const cabeza = document.getElementById('cabeza');
    const tronco = document.getElementById('tronco');
    const brazo1 = document.getElementById('brazo1');
    const brazo2 = document.getElementById('brazo2');
    const pierna1 = document.getElementById('pierna1');
    const pierna2 = document.getElementById('pierna2');

    const dibujarPalabra = function(){
        palabraPartida.forEach(letra => {
            const cadaLetra = document.createElement('span');
            cadaLetra.innerHTML = letra;
            cadaLetra.classList.add('letra');
            cadaLetra.classList.add('hidden');
            contenedorPalabra.appendChild(cadaLetra);
        })
    }

    let letrasUsadas;
    let errores;
    let aciertos;
    let partes = [
        'cabeza',
        'tronco',
        'brazo1',
        'brazo2',
        'pierna1',
        'pierna2'
    ]

    const terminarJuego = function(){
        document.removeEventListener('keydown', eventoLetra);
        btnJugar.removeAttribute('style');
    }

    const letraCorrecta = function(letra){
        const { children } = contenedorPalabra;
        for(let i = 0; i < children.length; i++){
            if(children[i].innerHTML === letra){
                children[i].classList.toggle('hidden');
                aciertos++;
            }
        }
        if(aciertos === palabraPartida.length){
            terminarJuego();
            mensaje.innerHTML = 'FELICIDADES!! GANASTE!!'

        }
    };

    const agregarLetra = function(letra){
        const elementoLetra = document.createElement('span');
        elementoLetra.innerHTML = letra;
        contenedorLetras.appendChild(elementoLetra);
    }

    const letraIncorrecta = function(){
        agregarParte(partes[errores]);
        errores++;
        if(errores === partes.length){
            terminarJuego();
            mensaje.innerHTML = 'LO SIENTO, PERDISTE!'
        }
    };

    const agregarParte = function(parte){
        switch(parte){
            case 'cabeza':
                cabeza.classList.add('mostrar');
                break;
            case 'tronco':
                tronco.classList.add('mostrar');
                break;
            case 'brazo1':
                brazo1.classList.add('mostrar');
                break;
            case 'brazo2':
                brazo2.classList.add('mostrar');
                break;
            case 'pierna1':
                pierna1.classList.add('mostrar');
                break;
            case 'pierna2':
                pierna2.classList.add('mostrar');
                break;
        }
    }

    const ingresarLetra = function(letra){
        if(palabraPartida.includes(letra)){
            letraCorrecta(letra);
        }else{
            letraIncorrecta();
        }
        agregarLetra(letra);
        letrasUsadas.push(letra);
    };

    const eventoLetra = function(e){
        let nuevaLetra = e.key.toUpperCase();
        if(nuevaLetra.match(/^[a-z??]$/i) && !letrasUsadas.includes(nuevaLetra)){
            ingresarLetra(nuevaLetra);
        }
    };

    for (i=0;i<teclas.length;i++){
        let teclaActual = teclas[i].innerHTML;
        teclas[i].addEventListener('click',function(){
            if(!letrasUsadas.includes(teclaActual)){
                ingresarLetra(teclaActual);
            }
        })
    }

    const resetear = function(){
        location.reload();
    }

    const jugar = () => {
        letrasUsadas = [];
        errores = 0;
        aciertos = 0;
        
        contenedorPalabra.innerHTML = '';
        contenedorLetras.innerHTML = '';
        btnJugar.style.display = 'none';
        mensaje.innerHTML = '';

        cabeza.classList.add('esconder');
        tronco.classList.add('esconder');
        brazo1.classList.add('esconder');
        brazo2.classList.add('esconder');
        pierna1.classList.add('esconder');
        pierna2.classList.add('esconder');

        dibujarPalabra();
        document.addEventListener('keydown',eventoLetra);
        document.addEventListener('load',eventoLetra);
    };

    jugar();
    btnJugar.addEventListener('click',resetear);
});
