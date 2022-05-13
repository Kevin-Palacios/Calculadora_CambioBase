//q:)->-</:
var copiaMatriz;


function calcularGeneradores(matrizEnviada){
    var prueba=12.12217;
    prueba=parseFloat(prueba.toFixed(3));
    console.log(prueba);
    document.getElementById("ResultadosGeneradores").innerHTML = "";
    document.getElementById("ResultadosGeneradores").innerHTML = "";
    document.getElementById("Resultados2Generadores").innerHTML = "";
    document.getElementById("Resultados3Generadores").innerHTML = "";
    document.getElementById("generadores").innerHTML = "";
    document.getElementById("ImprimirGeneradores").innerHTML = "";

    var filas=0;
    var columnas=0;
    var solucion=0;

    

    filas=document.getElementById("filas").value;
    columnas=document.getElementById("columnas").value;
    var n_col=1+parseInt(columnas, 10);

    var contador=0;
    var contador0=0;
    var contador02=0;



    var matriz= new Array(matrizEnviada.length);
    copiaMatriz=new Array(matrizEnviada.length);

    var i, j;
    var ultimacol, contadoruc=0;

    for(i=0; i<matrizEnviada.length; i++){
        matriz[i]= new Array(matrizEnviada[i].length+1);
        copiaMatriz[i]= new Array(matrizEnviada[i].length+1);
        for(j=0; j<matrizEnviada[i].length+1;j++){
            if(j!=matrizEnviada[i].length){
                matriz[i][j] = matrizEnviada[i][j];
                copiaMatriz[i][j] = matrizEnviada[i][j];
                
            }else{/*
                ultimacol=97+i+contadoruc;
                if(ultimacol==101 || ultimacol==105){
                    contadoruc++;
                    ultimacol=97+i+contadoruc;
                    matriz[i][j] = String.fromCharCode(ultimacol);
                    copiaMatriz[i][j] = String.fromCharCode(ultimacol);
                }else{
                    matriz[i][j] = String.fromCharCode(ultimacol);
                    copiaMatriz[i][j] = String.fromCharCode(ultimacol);
                }*/
                matriz[i][j]=Math.floor((Math.random() * (99999 - 9999 + 1)) + 9999);
            }
            
        }
    }


    var HTML = "<table border=0 width=80%>";

    for(i=0; i<matriz.length; i++){
        
        HTML += "<tr>";
        for(j=0;j<matriz[i].length;j++){
            
            HTML += '<td align=center>'+matriz[i][j]+'</td>';
            
            
        }
    
    }
    
    HTML += "</tr></table>";
    
    document.getElementById("ResultadosGeneradores").innerHTML = HTML;

    
    var pivote;
    var auxH;
    var newH="";

    for(i=0; i<matriz.length; i++){

        for(j=0; j<matriz[i].length;j++){

            if(!eliminarFilasGeneradores(matriz, n_col)){
                document.getElementById("Resultados3Generadores").innerHTML = "No tiene solución";
                document.getElementById("generadores").innerHTML = "&there4;No es un espacio generador";
                solucion=1;

                break;

            }
            
            if(matriz[i][j]==0 && i==j && j!=matriz[0].length){

                
                if(ordenarGeneradores(matriz, i, j, n_col)==false){
                    document.getElementById("Resultados3Generadores").innerHTML = "No tiene solución";
                    document.getElementById("generadores").innerHTML = "&there4;No es un espacio generador";
                    //console.log("No tiene solución");
                    solucion=1;
    
                    break;
    
                }else if(ordenarGeneradores(matriz, i, j, n_col)==true){
                    console.log("sol inf");
                    for(auxH=(j+1); auxH<matriz[i].length-1; auxH++){
                        if(matriz[i][auxH]!=0){
                            pivote=matriz[i][auxH];
                            operacionGeneradores(matriz, i, j, n_col, pivote, auxH);
                            console.log("Holasss");
                            newH=auxH;
                            auxH=matriz[0].length-1;
                        }
                        
                        
                    }
                }else{
                    pivote=matriz[i][j];
                    operacionGeneradores(matriz, i, j, n_col, pivote);
                }
                
                

    
            }else if(matriz[i][j]!=0 && i==j && j!=matriz[0].length){
                
                pivote=matriz[i][j];
                operacionGeneradores(matriz, i, j, n_col, pivote);

            }
            
        }
        
    }

    if(solucion==0){
        for(i=matriz.length-1; i>0; i--){

            for(j=matriz[i].length-1; j>0;j--){
                if( i==j && j!=matriz[0].length){
                    pivote=matriz[i][j];
                    operacionAtrasGeneradores(matriz, i, j, n_col, pivote);
    
                }
                
            }
            
        }
        
        imprimirResultadosGeneradores(matriz, n_col);
    }

    if(solucion==1){
        return false;
    }else{
        return true;
    }
    


}

function operacionGeneradores(matriz, i, j, n_col, pivote, auxH){

    var mensaje;
    var n_pivote, pivoteaux;
    var k;
    var posicion = parseInt(i, 10)+1;
    var posicion2;
    var dato;
    var expresionultimaFila="";
    var expAux;
    var verificar;

    pivoteaux=pivote;

    if(matriz[i][j]==pivote){
        verificar=true;
    }else{
        verificar=false;
    }

    //if(matriz[i][j]!=0){
        for(k=0;k<matriz[i].length-1; k++){
            matriz[i][k]=parseFloat(matriz[i][k])/parseFloat(pivote);
            
        }
        
        expresionultimaFila = '('+matriz[i][matriz[i].length-1]+')/'+pivote;
        //console.log(expresionultimaFila+"*******");
        expAux=math.simplify(expresionultimaFila);
        //console.log(expAux.toString());
        matriz[i][matriz[i].length-1]=expAux;
        //matriz[i][n_col-1]=math.simplify(matriz[i][n_col-1]/pivote);
        //console.log(matriz[i][n_col-1]);

        dato = math.format(math.fraction(pivote), { fraction: 'ratio' });
        if(pivote%1==0){
            mensaje="(1/"+pivote+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion+"</sub>";
        }else{
            mensaje="(1/("+dato+"))(F<sub>"+posicion+"</sub>)→F<sub>"+posicion+"</sub>";
        }

        /*
        if(pivote%1==0 || pivote%.1==0 || pivote%.01==0 || pivote%.001==0|| pivote%.0001==0){
            mensaje="(1/"+pivote+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion+"</sub>";
        }else{
            mensaje="(1/"+parseFloat(pivote).toFixed(2)+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion+"</sub>";
        }
        */

        
        imprimirGeneradores(matriz, mensaje);
    //}
    

    var m;
    var fx;
    
    var expresion_f, expresion_c;

    for(m=i+1; m<matriz.length; m++){
        if(verificar){
            n_pivote=matriz[m][j];
        }else{
            n_pivote=matriz[m][auxH];
        }
        for(k=0; k<matriz[i].length; k++){
            if(k!=matriz[i].length-1){
                matriz[m][k]=parseFloat(matriz[m][k])-(parseFloat(matriz[i][k])*parseFloat(n_pivote));
            }else{
                
                expresionultimaFila = '('+matriz[m][k]+')-(('+matriz[i][k]+')*('+n_pivote+'))';
                expAux=math.simplify(expresionultimaFila);
                //console.log(expAux.toString());
                matriz[m][k]=expAux;
            }
            
        }
        posicion2 = parseInt(m, 10)+1;
        dato = math.format(math.fraction(n_pivote), { fraction: 'ratio' });
        if(n_pivote%1==0){
            mensaje="F<sub>"+posicion2+"</sub>-("+n_pivote+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion2+"</sub>";
        }else{
            mensaje="F<sub>"+posicion2+"</sub>-("+dato+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion2+"</sub>";
        }
        /*
        if(n_pivote%1==0 || n_pivote%.1==0 || n_pivote%.01==0 || n_pivote%.001==0|| n_pivote%.0001==0){
            mensaje="F<sub>"+posicion2+"</sub>-("+n_pivote+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion2+"</sub>";
        }else{
            mensaje="F<sub>"+posicion2+"</sub>-("+parseFloat(n_pivote).toFixed(4)+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion2+"</sub>";
        }*/
        
        imprimirGeneradores(matriz, mensaje);
        
    }

    
    eliminarFilasGeneradores(matriz, n_col);

    return matriz;
    

}


function ordenarGeneradores(matriz, i, j, n_col){

    var k, r, m, h, nv;
    var array_columnas= [];
    var auxiliar = [];
    var num_fila="";
    var mensaje;
    var posicion = parseInt(i, 10)+1;
    var posicion2;
    var verificar= true;

    for(k=0;k<matriz.length; k++){
        array_columnas[k]=matriz[k][i]
    }

    for(m=j; m<matriz.length; m++){
        if(array_columnas[m]!=0){
            num_fila=m;
            break;
        }
    }

    //for(nv=0; nv<matriz.length; nv++){
        for(h=(j+1); h<matriz[i].length-1; h++){
            if(matriz[i][h]==0){
                verificar=false;
            }else{
                verificar=true;
                break;
            }
            
            
        }
    //}
    

    if(num_fila!=""){
        for(r=0; r<matriz[i].length; r++){
            auxiliar[r]=matriz[i][r];
            matriz[i][r] = matriz[num_fila][r];
            matriz[num_fila][r] = auxiliar[r];
        }
        posicion2 = parseInt(num_fila, 10)+1;
        mensaje="F<sub>"+posicion+"</sub>↔F<sub>"+posicion2+"</sub>";
        imprimirGeneradores(matriz, mensaje);
        return matriz;
    }else if(num_fila=="" && !verificar){
        //mensaje="F<sub>"+posicion+"</sub>↔F<sub>"+posicion2+"</sub>";
        //imprimirGeneradores(matriz, mensaje);
        //console.log("hlola");
        return false;
    }else if(num_fila=="" && verificar){
        return true;
    }


    

    //return matriz;

}



function operacionAtrasGeneradores(matriz, i, j, n_col, pivote){

    var n_pivote;
    var k;
    var mensaje;
    var m=i-1;
    var posicion = parseInt(i, 10)+1;
    var posicion2;
    var dato;
    var expresionultimaFila="";
    var expAux="";
    var auxH, newH;
    var verificar=true;


    
    var fx;
    
    var expresion_f, expresion_c;
    if(matriz[i][j]==0){
        for(auxH=(j+1); auxH<matriz[i].length-1; auxH++){
            if(matriz[i][auxH]!=0){
                //pivote=matriz[i][auxH];
                verificar=false;
                console.log(matriz[i].length);
                newH=auxH;
                //auxH=(matriz[i].length-1);
                break;
                
            }else{
                verificar=true;
            }
        }   
    }
    
    
    for(m=i-1; m>=0; m--){
        if(verificar){
            n_pivote=matriz[m][j];
        }else{
            n_pivote=matriz[m][newH];
        }
        //console.log(newH);
        for(k=0; k<matriz[i].length; k++){
            //matriz[m][k]=parseFloat(matriz[m][k])-(parseFloat(matriz[i][k])*parseFloat(n_pivote));
            
            if(k!=matriz[i].length-1){
                matriz[m][k]=parseFloat(matriz[m][k])-(parseFloat(matriz[i][k])*parseFloat(n_pivote));
            }else{
                expresionultimaFila = '('+matriz[m][k]+')-(('+matriz[i][k]+')*('+n_pivote+'))';
                //console.log(expresionultimaFila);
                expAux=math.simplify(expresionultimaFila);
                //console.log(expAux.toString());
                matriz[m][k]=expAux;
            }
        }

        posicion2 = parseInt(m, 10)+1;
        
        dato = math.format(math.fraction(n_pivote), { fraction: 'ratio' });
        if(n_pivote%1==0){
            
            mensaje="F<sub>"+posicion2+"</sub>-("+n_pivote+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion2+"</sub>";
        }else{
            mensaje="F<sub>"+posicion2+"</sub>-("+dato+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion2+"</sub>";
        }
        /*
        if(n_pivote%1==0 || n_pivote%.1==0 || n_pivote%.01==0 || n_pivote%.001==0|| n_pivote%.0001==0){
            mensaje="F<sub>"+posicion2+"</sub>-("+n_pivote+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion2+"</sub>";
        }else{
            mensaje="F<sub>"+posicion2+"</sub>-("+parseFloat(n_pivote).toFixed(4)+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion2+"</sub>";
        }
        */
        
        imprimirGeneradores(matriz, mensaje);
    }

   

    return matriz;


}

function eliminarFilasGeneradores(matriz, n_col,){

    var i, j;
    var contador;
    var mensaje;
    var posicion;
    for (i = 0; i < matriz.length; i++) {
        contador=0;
        for ( j = 0; j < matriz[i].length; j++) {
            if (matriz[i][j]== 0) {
                contador++;
            }

            if (contador==matriz[i].length) {
                matriz.splice(i, 1);
                posicion= parseInt(i, 10)+1;
                mensaje ="Se eliminó F<sub>"+posicion+"</sub>";
                imprimirGeneradores(matriz, mensaje);

                i=0;
            }
            
        }
        
    }

    for (i = 0; i < matriz.length; i++) {
        contador=0;
        for ( j = 0; j < (matriz[i].length-1); j++) {
            if (matriz[i][j]== 0) {
                contador++;
            }
            
        }

        if(contador==matriz[i].length-1){

            return false;
        }
        
        
    }


    return matriz;
}



function imprimirGeneradores(matriz, mensaje){

    var i, j;
    var imprimirProcedimiento = document.getElementById('ImprimirGeneradores');
    var dato;

    var procedimiento = "<table border=0 cellspacing='30px'>";

    procedimiento += "<tr><td rowspan="+matriz.length+1+" align='center'>"+mensaje+"</td></tr>";
    
    for(i=0; i<matriz.length; i++){
        
        procedimiento += "<tr>";
        for(j=0;j<matriz[i].length;j++){
            /*var expsa = '2x + 3x';
            console.log(math.simplify(expsa).toString());
            console.log(math.format(math.fraction(0.125), { fraction: 'ratio' }));
            */
            if(j!=matriz[i].length-1){
                if(matriz[i][j]%1==0){
                    procedimiento += '<td align=center>'+matriz[i][j]+'</td>';
                }else{
                    dato = math.format(math.fraction(matriz[i][j]), { fraction: 'ratio' })
                    procedimiento += '<td align=center>'+dato+'</td>';
                }
            }else{
                procedimiento += '<td align=center>'+matriz[i][j]+'</td>';
            }
            

            
            /*
            if(matriz[i][j]%1==0 || matriz[i][j]%.1==0 || matriz[i][j]%.01==0 || matriz[i][j]%.001==0|| matriz[i][j]%.0001==0){
                procedimiento += '<td align=center>'+matriz[i][j]+'</td>';
            }else{
                procedimiento += '<td align=center>'+parseFloat(matriz[i][j]).toFixed(4)+'</td>';
            }*/
            
            
            
            
        }
    
    }
    
    
    procedimiento += "</tr></table><br><br><br>";
    
    imprimirProcedimiento.insertAdjacentHTML('beforeend', procedimiento);
    
}


function imprimirResultadosGeneradores(matriz, n_col){
    
    var i, j, k=0, m, h, g;
    var vector="";
    
    var suma = "";
    var imprimirresultadoFinal = document.getElementById('Resultados3Generadores');
    var imprimirCombinacion = document.getElementById('generadores');
    //document.getElementById('Resultados2Generadores').innerHTML="El sistema tiene soluciones infinitas <br><br>";
    var rango;
    var lamnda = "";
    var dato;
    
    

    var resultadoFinal = "<table border=0 cellspacing='30px'>";
    var combinacion = "";
    var auxCombinacion="";
    combinacion+="(";
    for(i=0; i<copiaMatriz.length; i++){
        
            if(i!=copiaMatriz.length-1){
                combinacion+=copiaMatriz[i][copiaMatriz[i].length-1]+", ";
            }else{
                combinacion+=copiaMatriz[i][copiaMatriz[i].length-1];
            }
            
            //console.log(copiaMatriz[i][j]);
        
    }
    combinacion+=")=< (";


    for(i=0; i<matriz.length; i++){
        resultadoFinal += "<tr>";
        for(j=0; j<matriz[i].length-1; j++){
            if(matriz[i][j]==1&&j==i){
                document.getElementById('Resultados2Generadores').innerHTML="El sistema tiene solución única <br><br>";
                for(k=(j+1), m=(matriz[i].length-i); k<matriz[i].length-1; k++, m--){
                    if(matriz[i][k]==0){
                        suma=suma+"";
                    }else{
                        document.getElementById('Resultados2Generadores').innerHTML="El sistema tiene soluciones infinitas <br><br>";
                        //suma+="(";
                        if(matriz[i][k]>0){
                            /*
                            dato = math.format(math.fraction(((-1)*(matriz[i][k]))), { fraction: 'ratio' });
                            if(((-1)*(matriz[i][k]))%1==0){
                                */
                                suma=suma+((-1)*(matriz[i][k]))+" &lambda;<sub>"+(m)+"</sub> ";
                                //combinacion+=((-1)*(matriz[i][k]))+" &lambda;<sub>"+(m)+"</sub> ";
                            
                            /*
                            }else{
                                suma=suma+dato+" &lambda;<sub>"+(m)+"</sub> ";
                                //combinacion+=dato+" &lambda;<sub>"+(m)+"</sub> ";
                            }
                            */
                        }else{
                            /*
                            dato = math.format(math.fraction(((-1)*(matriz[i][k]))), { fraction: 'ratio' });
                            if(((-1)*(matriz[i][k]))%1==0){
                            */
                                suma=suma+" + "+((-1)*(matriz[i][k]))+" &lambda;<sub>"+(m)+"</sub> ";
                                //combinacion+=" + "+((-1)*(matriz[i][k]))+" &lambda;<sub>"+(m)+"</sub> ";
                            /*
                            }else{
                                suma=suma+" + "+dato+" &lambda;<sub>"+(m)+"</sub> ";
                                //combinacion+=" + "+dato+" &lambda;<sub>"+(m)+"</sub> ";
                            }
                            */
                        }
                        //suma+=")(v<sub>"+i+"</sub>)";
                        
                    }

                    if(i==matriz.length-1){
                        lamnda += '<tr><td align=center>x<sub>'+(k+1)+"</sub>=  &lambda;<sub>"+m+'</sub></td>';
                        /*
                        for(g=k; g<k+1; g++){
                            for(h=0; h<copiaMatriz.length; h++){
                                if(h!=(copiaMatriz.length-1)){
                                    vector+=copiaMatriz[h][g]+", ";
                                }else{
                                    vector+=copiaMatriz[h][g];
                                }
                                
                            }
                        }
                        
                        if(k!=matriz[i].length-2){
                            auxCombinacion+="&lambda;<sub>"+m+'</sub>('+vector+'), ';
                        }else{
                            auxCombinacion+="&lambda;<sub>"+m+'</sub>('+vector+')';
                        }
                        vector="";
                        */
                    }
                    
                }
                //dato = math.format(math.fraction(matriz[i][matriz[i].length-1]), { fraction: 'ratio' });
                /*
                for(h=0; h<n_col-1; h++){
                    if(h!=n_col-2){
                        vector+=copiaMatriz[h][i]+", ";
                    }else{
                        vector+=copiaMatriz[h][i];
                    }
                    
                }
                */
                /*
                for(g=i; g<i+1; g++){
                    for(h=0; h<copiaMatriz.length; h++){
                        if(h!=(copiaMatriz.length-1)){
                            vector+=copiaMatriz[h][g]+", ";
                        }else{
                            vector+=copiaMatriz[h][g];
                        }
                        
                    }
                }*/
                
                //if(matriz[i][matriz[i].length-1]%1==0){
                    resultadoFinal += '<td align=center>x<sub>'+(i+1)+"</sub>=("+matriz[i][matriz[i].length-1]+" "+suma+')</td>';
                    /*
                    if(i!=matriz.length-1){
                        combinacion+="("+matriz[i][matriz[i].length-1]+suma+")("+vector+"), ";
                    }else{
                        if(auxCombinacion==""){
                            combinacion+="("+matriz[i][matriz[i].length-1]+suma+")("+vector+")";
                        }else{
                            combinacion+="("+matriz[i][matriz[i].length-1]+suma+")("+vector+"), ";
                        }
                        
                    }
                }else{
                    resultadoFinal += '<td align=center>x<sub>'+(i+1)+"</sub>=("+dato+" "+suma+')</td>';
                    if(i!=matriz.length-1){
                        combinacion+="("+dato+suma+")("+vector+"), ";
                    }else{
                        if(auxCombinacion==""){
                            combinacion+="("+dato+suma+")("+vector+")";
                        }else{
                            combinacion+="("+dato+suma+")("+vector+"), ";
                        }
                        
                    }
                }
                */
                
                
                /*
                if(matriz[i][j]%1==0){
                    procedimiento += '<td align=center>'+matriz[i][j]+'</td>';
                }else{
                    dato = math.format(math.fraction(matriz[i][matriz[i].length-1]), { fraction: 'ratio' })
                    procedimiento += '<td align=center>'+dato+'</td>';
                }
                */
                
            }
            //vector="";
            suma="";   
            
            
        }
        
        
    }
    /*
    if(auxCombinacion==""){
        combinacion+=">";
    }else{
        combinacion+=auxCombinacion+">";
    }
    combinacion+="<br>&there4;Es una combinación lineal";
    */
    resultadoFinal += "</tr>";

    resultadoFinal += '</tr>'+lamnda;    

    resultadoFinal += "</tr></table><br><br><br>";
    imprimirresultadoFinal.insertAdjacentHTML('beforeend', resultadoFinal);
    document.getElementById("generadores").innerHTML = "&there4;Si es un espacio generador";
    document.getElementById('combinacionLineal').insertAdjacentHTML('beforeend', "<br><br>Si es un espacio generador");
    //imprimirCombinacion.insertAdjacentHTML('beforeend', combinacion);

    document.getElementById('ImprimirGeneradores').insertAdjacentHTML('beforeend', resultadoFinal);
}