const boton_caja = document.querySelector(".form-btn-dibujar");
const articulo_derecho = document.getElementById('box_container');
const maxima_fila = 100;
const maxima_rand = 100;
const minima_rand = 1;

const generar_piramide = (quantity) => {

    let piramide = [];

    for(let fila = 0; fila < quantity; fila++ ){ 
        for(let columna = 0; columna <= fila; columna++){
            //console.log("fila: " + fila + " columna: " + columna);   
            piramide.push( [ Math.floor(Math.random(minima_rand) * maxima_rand), fila , columna ] );
        }
    }
    
    return piramide;
}

const dibujar_piramide = (array, selector) =>{
    
    let HTMLPiramide = "";
    
    if(selector == 1 ){
        for (let fila = 0; fila < ( array[array.length - 1][2] + 1); fila++) {
    
            HTMLPiramide += `<div class='row fila_${fila}'>`;
        
            for (let columna = 0; columna <= fila; columna++) {
                
                const elemento = array.find( item => item[1] === fila && item[2] === columna);
                HTMLPiramide += `<div class = 'page-boxs'>${ elemento ? elemento[0] : "&nbsp;"}</div>`;
                
            }

            HTMLPiramide += "</div>";
        }

    }

    if( selector == 2 ){

        //console.log("imprimiendo ruta");

        for (let fila = 0; fila < ( array[array.length - 1][2] + 1); fila++) {
    
            HTMLPiramide += `<div class='row fila_${ fila }'>`;
        
            for (let columna = 0; columna <= fila; columna++) {
                
                const elemento = array.find( item => item[1] === fila && item[2] === columna);

                if( elemento[3] == 1 ){

                    HTMLPiramide += `<div class = 'page-boxs routed'> ${ elemento ? elemento[0] : "&nbsp;" } </div>`;
                
                }else {

                    HTMLPiramide += `<div class = 'page-boxs'>${ elemento ? elemento[0] : "&nbsp;" }</div>`;
                
                }
                
            }

            HTMLPiramide += "</div>";
        }
    
    }

    return HTMLPiramide;
}

/***
 * esta funcion sirve para sumar arreglos en el formato general de este programa el cual es valor, fila, columna
 */

const sumar_arreglo = ( array ) => {

    let sumatoria = 0;

    array.forEach(element => {
        sumatoria = sumatoria + element[0];
    });

    return sumatoria;

}

const cargar_resultados = ( array, where ) => { // value, fila, columna, 1

    let element = document.getElementById(where);
    let HTMLResultados = "";
    

    element.innerHTML = "";
   
    HTMLResultados += `<div class = 'row'>`;
    array.map( element => {
        HTMLResultados += `<div class = 'page-boxs'> ${ element[0] } </div>`;
    });
    HTMLResultados += `</div> `;

    HTMLResultados += `<div class = 'contenedor-resultados'>`;
    HTMLResultados += `TOTAL DE PESOS:  <div class = 'page-boxs resultados'>`;
    HTMLResultados += `${ sumar_arreglo(array) }`;
    HTMLResultados += `</div> `;
    HTMLResultados += `</div> `;

    element.innerHTML += HTMLResultados;

}

const generar_piramide_rutas = ( array_inicial, array_rutas ) => {

    let array_final = [];

    for(let fila = 0; fila < array_rutas.length ; fila++ ){
        
        //console.log( array_final );
        
        for ( let posicion = 0; posicion < array_inicial.length; posicion ++ ){

            let valueA = array_rutas[fila][1];
            let valueB = array_inicial[posicion][1];
            let valueC = array_rutas[fila][2];
            let valueD = array_inicial[posicion][2];

            if( valueA === valueB && valueC === valueD ){
                
                array_inicial[posicion].push(1);
                let arreglo = array_inicial[posicion];
                array_final[posicion] = arreglo;

            }
            
            else{
                let arreglo = array_inicial[posicion];
                array_final[posicion] = arreglo;

            }

        } 
    }

    array_final.forEach(element => {
        if( element.length < 4 ){
            element.push(0);
        }
    });
        
    //console.log("elemento Prim: " + elementI);
    //console.log("elemento Sec: " + elementS);
    //console.log(array_final);

    return array_final;

}

/** PROCEDIMIENTO GENERAL
 * 1. analizar cuantas cajas hay en la fila
 * 2. si hay mas de 1 caja quiere decir que esa caja es el padre, sino continuar
 * 3. pasar a la siguiente fila
 * 4. analizar cuantas cajas hay en la fila
 * 5. si hay mas de 1 caja quiere decir que esa caja es el padre, sino continuar
 * 6. analizar las 3 rutas.
 * 7. buscar la ruta mas grande.
 * 8. analizar a cual correponde dicha ruta, siempre hay 2 posibles padres.
 */

/*** ENTRADAS Y FUNCION PRINCIPAL
 * 
 * 
 * ACA VAN LA FUNCION PRINCIPAL O EL MANEJADOR DE TODO EL PROCESO,
 * COMO TAMBIEN LOS EVENTOS QUE EL USUARIO EMITE, CON EL BOTON DEL FORMULARIO
 * 
*/

/**
 *  \/ \/ \/ CONVERGENCIA DE LOS CODIGOS \/ \/ \/
 * */ 

const convertir_arreglo_1M = (arregloUnidimensional) => {
    
    let filas = 0;
    let columnas = 0;
  
    for (let i = 0; i < arregloUnidimensional.length; i++) {
      if (arregloUnidimensional[i][1] >= filas) {
        filas = arregloUnidimensional[i][1] + 1;
      }
      if (arregloUnidimensional[i][2] >= columnas) {
        columnas = arregloUnidimensional[i][2] + 1;
      }
    }
  
    // Crear un arreglo multidimensional e inicializarlo
    let arregloMultidimensional = new Array(filas);
    for (let i = 0; i < filas; i++) {
      arregloMultidimensional[i] = new Array(columnas).fill(0);
    }
  
    // Llenar el arreglo multidimensional con los valores del arreglo unidimensional
    for (let i = 0; i < arregloUnidimensional.length; i++) {
      const valor = arregloUnidimensional[i][0];
      const fila = arregloUnidimensional[i][1];
      const columna = arregloUnidimensional[i][2];
      arregloMultidimensional[fila][columna] = valor;
    }
  
    return arregloMultidimensional;
}

const getSolvedMatrix = (inputMatrix) => {
    let newMatrix = inputMatrix;
    let row = newMatrix.length - 1, col = 0, valueOfComparison;
    
    while (row > 0) {
        col = 0;
        while (col < row) {
            if( newMatrix[row][col]>newMatrix[row][col + 1]){
                valueOfComparison = newMatrix[row][col]; }
                else {
                    valueOfComparison = newMatrix[row][col + 1]
                }
                newMatrix[row - 1][col] += valueOfComparison;
            col += 1;
        }
        row--;
    }
    return newMatrix;
}

const maxPath = (solvedMatrix, matrix) => {
    let pathArray = [];
    let row = 0, col = 0, searchValue;
    while (row < solvedMatrix.length) {
        
        pathArray.push([ matrix[row][col], row, col ])
        
        searchValue = solvedMatrix[row][col] - matrix[row][col];
        
        if (row != solvedMatrix.length - 1) {
            if (solvedMatrix[row + 1][col] != searchValue) {
                col += 1
            }
        }
        row++;
    }
    return pathArray;
}

/**
 *  /\/\/\ CONVERGENCIA DE LOS CODIGOS /\/\/\
 * */ 


const main = (value) => {
        
    let arreglo = generar_piramide(value); // value, fila, columna
    let html = dibujar_piramide(arreglo, 1); // genera el html
    let ruta = []; // arreglo de 1 dimension

    articulo_derecho.innerHTML = html;
  
    let matrix = convertir_arreglo_1M(arreglo); 
    let copia_matrix = convertir_arreglo_1M(arreglo); 
    
    ruta = maxPath( getSolvedMatrix(copia_matrix), matrix ); // resultado ruta mas pesada.

    cargar_resultados(ruta, 'contenedor_ruta');
    arreglo_con_rutas = generar_piramide_rutas(arreglo, ruta); // value, fila, columna
    html = dibujar_piramide ( arreglo_con_rutas, 2); // value, fila, columna, 1: si es ruta 0: si no es ruta
    articulo_derecho.innerHTML = html;

}

const calcularBTN  = () =>{
    let value = document.getElementById('boxNumber').value;
    
    //console.log(value)
    if( value <= maxima_fila ) {
        main( value );
    }
};

   
    
