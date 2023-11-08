(() => {
    const GeneratePyramid = {
        htmlElements: {
            levels: document.getElementById("levels"),
            pyramid: document.getElementById("pyramid"),
            path: document.getElementById("path"),
        },
        init: () => {
            GeneratePyramid.htmlElements.levels.addEventListener("input", GeneratePyramid.updatePyramid);
            GeneratePyramid.updatePyramid();
        },
        updatePyramid: () => {
            const levels = GeneratePyramid.htmlElements.levels.value;
            const pyramid = GeneratePyramid.htmlElements.pyramid;
            pyramid.innerHTML = "";
            let input1 = "";

            let p = 0;
            for (let i = 1; i <= levels; i++) {
                const row = document.createElement("div");
                row.className = "row";
                for (let j = 1; j <= i; j++) {
                    const square = document.createElement("div");
                    square.className = "square";
                    p = Math.floor(Math.random() * 99) + 1;
                    input1 += p + " ";
                    square.textContent = p;
                    row.appendChild(square);
                }
                pyramid.appendChild(row);
            }
            console.log(input1);
            let matrix = GeneratePyramid.getMatrixFromTriangle(input1);
            let solvedMatrix = GeneratePyramid.getSolvedMatrix(GeneratePyramid.copyMatrix(matrix), 0);
            console.log("matrix2");
            console.table(matrix);
            console.log("solved");
            console.table(solvedMatrix);
            let maxLengthArr = GeneratePyramid.getLongestPathArr(solvedMatrix, matrix);

            console.log("arr", maxLengthArr);
            GeneratePyramid.htmlElements.path.innerHTML = GeneratePyramid.drawPath(maxLengthArr);
            GeneratePyramid.highlightLongestPath(matrix, maxLengthArr);
        },
        getMatrixFromTriangle(input) {
            //en este caso sera estatico el triangulo inicial 
            let array = input.split(/[ ]+/);
            let matrix = [];
            // console.log("input", input);
            let j = 1;
            //matrix stuff
            let accIndex = 0;
            while (true) {
                accIndex += j;
                if (accIndex > array.length) break;
                matrix.push([]);
                let i = 0;
                while (i < j) {
                    try {
                        matrix[j - 1].push(parseInt(array[(accIndex - j) + i]))
                    }
                    catch (err) {
                        console.log(err)
                        throw new Error("Valor en el arreglo no es numero")
                    }
                    i += 1;
                }
                j += 1;
            }

            // console.table(matrix)
            //making matrix
            let max = matrix[matrix.length - 1].length;

            i = 0;
            //zero fill
            while (i < matrix.length) {
                //para bajar la complejidad de n^2
                j = matrix[i].length;
                while (j < max) {

                    matrix[i].push(0);

                    j += 1;
                }
                i += 1;
            }
            return matrix;
        },
        getSolvedMatrix: (inputMatrix, order) => {
            if (order == null || typeof (order) != "number") {
                order = 0;
                throw new Error("Order debe ser un numero.")
            }
            let newMatrix = inputMatrix;


            let row = newMatrix.length - 1, col = 0, valueOfComparison;
            //vamos a loopear por cada row existente de la matriz
            while (row > 0) {
                col = 0;
                //luego loopeamos por cada valor de la columna menos el row que estamos.
                // row 1 [1, 1, 0] nada mas loopeara por los valores de 1 y 1.
                while (col < row) {
                    /*nos vamos a el row anterior y buscamos el
                     valor minimo en el row inferior */

                    if (order == 0) {
                        valueOfComparison = GeneratePyramid.getMaxVal(newMatrix[row][col], newMatrix[row][col + 1])

                    } else {
                        valueOfComparison = GeneratePyramid.getMinVal(newMatrix[row][col], newMatrix[row][col + 1])
                    }
                    newMatrix[row - 1][col] += valueOfComparison;
                    col += 1;
                }
                row--;
            }

            return newMatrix;
        },
        getLongestPathArr(solvedMatrix, matrix) {
            let pathArray = [];
            let row = 0, col = 0, searchValue;
            //colocamos el primer valor (obvio) en el path como inicio. 
            while (row < solvedMatrix.length) {

                pathArray.push(matrix[row][col])
                searchValue = solvedMatrix[row][col] - matrix[row][col];

                //el ultimo valor tiene como nulo la derecha asi que no se realiza.
                if (row != solvedMatrix.length - 1) {
                    //si el valor es igual al que buscamos, entonces se cambia el col.
                    //por la forma de la piramide representada a la izq de  la matriz.
                    if (solvedMatrix[row + 1][col] != searchValue) {
                        col += 1
                    }

                    //si los valore de la izq y derecha son iguales, se deberia repetir esta
                    //funcion para buscar el arreglo por debajo de ellos a ver cual de ellos
                    //da la suma correcta al final.
                }
                row++;
            }
            // console.log(pathArray);
            return pathArray;
        },
        getMaxVal(a, b) {
            if (a > b) {
                return a;
            }
            else {
                return b;
            }
        },
        getMinVal(a, b) {
            if (a < b) {
                return a;
            }
            else {
                return b;
            }
        },
        copyMatrix: (matrix) => {
            let i = 0;
            let newMatrix = [];
            while (i < matrix.length) {
                newMatrix.push([...matrix[i]])
                i++;
            }
            return newMatrix;
        },
        drawPath: (pathArr) => {
            let i = 0;
            let drawnPath = "";
            let sum = 0;
            while (i < pathArr.length - 1) {
                sum += pathArr[i];
                drawnPath += `<span class="path-item">${pathArr[i]}</span><span class="path-item">&#10148;</span>`;
                i++;
            }
            drawnPath += `<span class="path-item">${pathArr[pathArr.length - 1]}</span>
                        <span class="path-item">=</span> 
                        <span class="path-item">${sum + pathArr[pathArr.length - 1]}</span>`;

            return `${drawnPath}`;
        },
       
        highlightLongestPath(matrix, path) {
            const pyramidRows = document.querySelectorAll('.row');
        
            for (let j = 0; j < path.length; j++) {
                const row = pyramidRows[j];
                const squares = row.querySelectorAll('.square');
        
                for (let i = 0; i < path.length; i++) {
                    const square = squares[i];
        
                    if (matrix[j][i] === path[j]) {
                        square.style.backgroundColor = 'pink';
                    }
                }
            }
        },
        
    };

    GeneratePyramid.init();
})();
