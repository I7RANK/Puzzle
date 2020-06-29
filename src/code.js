var num_piezas;

// --------- estos dos array -----------
var piezas_nivel = ["","","","","fin","","","","","rec","curv","curv","","","rec",
"rec","curv","rec","rec","curv","ini","","","",""];
var estados_win = [0,0,0,0,1,0,0,0,0,1,4,1,0,0,1,1,3,2,2,2,3,0,0,0,0];

/*piezas ["","","","","fin","","","","","rec","curv","curv-x2","","","rec",
"rec","curv","rec","rec","curv","ini","","","",""];
estados [0,0,0,0,1,0,0,0,0,1,4,1,0,0,1,1,3,2,2,2,3,0,0,0,0]; */
// piezas [curv, cruz, rec, curv, , rec, curv, rec, curv, , rec, curv, rec, curv, fin, curv, rec, rec, curv-x2, curv, , , , ini,]
// estados [4, 1, 2, 1, 0, 1, 4, 2, 2, 0, 1, 3, 2, 1, 1, 3, 2, 2, 1, 2, 0, 0, 0, 3, 0]

/* 
rec, curv, cruz, fin, ini, curv_x2
*/

// Nivel 2
// curv, rec, rec, curv, , curv, rec, fin, curv, curv, , , , , rec, , , curv, rec, curv, , , ini, , 
// 4, 2, 2, 1, 0, 3, 2, 2, 3, 1, 0, 0, 0, 0, 1, 0, 0, 4, 2, 2, 0, 0, 3, 0, 0
var estado_piezas = [0];
var grados_piezas = [0];

function def_ruta(p_n, n) {
    var ruta = "";
    if (p_n[n]=="ini") {
        ruta = "img/ini_a.png"
    }else if (p_n[n]=="fin") {
        ruta = "img/fin_a.png"
    }else if (p_n[n]=="rec") {
        ruta = "img/rec_b.png"
    }else if (p_n[n]=="curv") {
        ruta = "img/curv_b.png"
    }else if (p_n[n]=="cruz") {
        ruta = "img/cruz_b.png"
    }else if (p_n[n]=="curv-x2") {
        ruta = "img/curv-x2_b.png"
    }else if (p_n[n]=="") {
        ruta = "img/"
    }else if (p_n[n]=="") {
        ruta = "img/"
    }else if (p_n[n]=="") {
        ruta = "img/"
    }else if (p_n[n]=="") {
        ruta = "img/"
    }else if (p_n[n]=="") {
        ruta = "img/"
    }else if (p_n[n]=="") {
        ruta = "img/"
    }else {

    }
    return ruta;
}

function add_piezas(num, edit) {
    num_piezas = num;
    for (var i = 0; i <= num - 1; i++) {
        var divcontend = document.createElement("div");
        var divcontend_img = document.createElement("div");
        var imgpieza = document.createElement("img");
        
        divcontend.setAttribute("id", "divcontend" + i);
        divcontend.setAttribute("Class", "contend_5x5");
        divcontend_img.setAttribute("Class", "contend_img_5x5");
        divcontend_img.setAttribute("id", "divcontend_img" + i);
        imgpieza.setAttribute("id", i);
        imgpieza.setAttribute("Class", "img_5x5");

        if (edit == true) {
            divcontend.setAttribute("onclick", "in_select(this);");
            divcontend_img.setAttribute("onclick", "id_divcontend_img(this);");
        }

        estado_piezas[i] = 0;
        grados_piezas[i] = 0;

        if (piezas_nivel[i] == "" || piezas_nivel[i] == null) {

        }else {
            imgpieza.setAttribute("src", def_ruta(piezas_nivel, i));
            imgpieza.setAttribute("onclick", "rotar(this.id)");
            estado_piezas[i] = 1;
            if (piezas_nivel[i] == "fin" || piezas_nivel[i] == "ini") {
                imgpieza.setAttribute("onclick", "");
                estado_piezas[i] = estados_win[i];
                if (estados_win[i] == 1) {
                    imgpieza.style = "transform: rotate(0deg);";
                }else if (estados_win[i] == 2) {
                    imgpieza.style = "transform: rotate(90deg);";
                }else if (estados_win[i] == 3) {
                    imgpieza.style = "transform: rotate(180deg);";
                }else if (estados_win[i] == 4) {
                    imgpieza.style = "transform: rotate(270deg);";
                }
            }
            if (edit == true) {

            }else {
                divcontend_img.appendChild(imgpieza);
            }
        }
        divcontend.appendChild(divcontend_img);

        if (edit == true) {
            document.getElementById("div_editor").appendChild(divcontend);
        }else {
            document.getElementById("div_juego").appendChild(divcontend);
        }
    }
}

function saca_nom(source) {
    var nom_;
    // este for saca el trozo del nombre de la imagen de la url del img LLLL
    for (i = 0; i<= source.length - 1; i++) {
        if (source.charAt(i) == "/") {
            nom_ = source.substring(i + 1, source.length);
        }
    }

    // aqui se quita la extencion del nombre de la imagen
    nom_ = nom_.substring(0, nom_.length - 4);

    // y aqui se quita lo que esta despues de el gion bajo
    for (i = 0; i<= nom_.length - 1; i++) {
        if (nom_.charAt(i) == "_") {
            nom_ = nom_.substring(0, i);
        }
    }
    return nom_;
}

function rotar(id) {
    var source = document.getElementById(id).src;
    var nom_img = "";

    nom_img = saca_nom(source);
    // cambia algunos estados(las que no necesitan todos los estados) y reinicia estados
    // el cruzado tiene un estado de 0

    /* estados: 
    cruz_a y cruz_b = 1
    cruz_ab y cruz_ba y curv_x2_a y curv_x2_b y rec_a y rec_b = 2
    fin_a y ini_a y curv_a y curv_b = 4
    */

    /* estandarizar nombres de estados
    ---- 1 ----
    cruz
    ---- 2 ----
    curv-x2
    ccruz para las cruzes con dos colores
    rec
    ---- 4 ----
    fin
    ini
    curv
    */

    // el estado se asigna cuando se crean las piezas
    if (nom_img == "cruz") {
        estado_piezas[id] = 1;
    }else if (nom_img == "ccruz" || nom_img == "curv-x2" || nom_img == "rec") {
        if (estado_piezas[id] == 1){
            estado_piezas[id] = 2;
        }else if (estado_piezas[id] == 2) {
            estado_piezas[id] = 1;
        }
    }else if (nom_img == "fin" || nom_img == "ini" || nom_img == "curv") {
        if (estado_piezas[id] == 4) {
            estado_piezas[id] = 0;
        }
        estado_piezas[id] = estado_piezas[id] + 1;
    }
    gene_estados[id] = estado_piezas[id];

    grados_piezas[id] = grados_piezas[id] + 90;
    document.getElementById(id).style = "transform: rotate(" + grados_piezas[id] + "deg); transition: 0.4s;";

    // para ganar
    var np = 25;
    var ganas = 0;
    for (a = 0; a <= np - 1; a++) {
        if (estado_piezas[a] == estados_win[a]) {
            ganas = ganas + 1;
        }
    }
    if (ganas == np) {
        // alert("Maravilloso como el oso");
        document.getElementById("div_tit_juego").style = "top: 10px;";
        for (e = 0; e<= 24; e++) {
            var elimg = document.getElementById(e);
            if (elimg == null) {
            }else {
                var url = elimg.src;
                // falta el ab.png o el ba.png
                var new_url = url.substring(0, url.length - 5) + "a.png";
                elimg.setAttribute("src", new_url);
            }
        }
    }
}

// ----------------------- Editor ---------------------- //
var div_contend = "";
var div_contendimg = "";
var new_idimg = "";
var gene_limg = [""];
var gene_estados = [0];
for (var i = 0; i <= 24; i++) {
    gene_limg[i] = "";
    gene_estados[i] = 0;
}

function generar() {
    var line = "";
    var esta = "";
    for (var i = 0; i <= 24; i++) {
        line = line + ", " + gene_limg[i];
        esta = esta + ", " + gene_estados[i];
    }
    line = line.substring(2);
    esta = esta.substring(2);
    console.log(line);
    console.log(esta);
}

function in_select(id) {
    div_contend.style = "none";
    if (div_contend != "") {
        if (div_contend != id) {
            div_contend = id;
            div_contend.style = "box-shadow: inset 0px 0px 20px #000;";
        }else {
            div_contend.style = "none";
            div_contend = "";
        }
    }else {
        div_contend = id;
        div_contend.style = "box-shadow: inset 0px 0px 20px #000;";
    }
    tituloo.innerText = "";
}

function id_divcontend_img(id) {
    var cortar = "";
    if (div_contendimg != "") {
        if (div_contendimg != id) {
            div_contendimg = id;
            cortar = div_contendimg.id;
            new_idimg = cortar.substring(14, div_contendimg.id.length);
        }else {
            div_contendimg = "";
            new_idimg = undefined;
        }
    }else {
        div_contendimg = id;
        cortar = div_contendimg.id;
        new_idimg = cortar.substring(14, div_contendimg.id.length);
    }
}


function chosen(id) {
    if (div_contend == "" || div_contendimg == "" || new_idimg == "") {
        alert("Seleccione primero una casilla");
    }else {
        var img_new = document.createElement("img");
        img_new.setAttribute("id", new_idimg);
        img_new.setAttribute("Class", "img_5x5");
        img_new.setAttribute("src", id.src);
        estado_piezas[new_idimg] = 1;
        grados_piezas[new_idimg] = 0;

        div_contend.setAttribute("onclick", "");
        div_contendimg.setAttribute("onclick", "");
        img_new.setAttribute("onclick", "rotar(this.id)");

        div_contendimg.appendChild(img_new);
 
        gene_limg[new_idimg] = saca_nom(id.src);
        gene_estados[new_idimg] = 1;

        div_contend.style = "none";
        div_contend = "";
        new_idimg = "";
        div_contendimg = "";
    }
}

function borrar(id, solob) {
    var node = document.getElementById(id.id);
    node.parentNode.removeChild(node);
    if (solob == false) {
        gene_limg[id.id] = "";
        gene_estados[id.id] = 0;
    }else {

    }
}

var tituloo = document.getElementById("titulo");
var spann_t = document.getElementById("borrar_t");
var spann_f = document.getElementById("borrar_f");
function cambio(equelan, id) {
    
    if (div_contend == "" || div_contendimg == "" || new_idimg == "") {
        if (equelan == true) {
            console.log(equelan);
            tituloo.innerText = "Eliminando";
            for (i = 0; i <= num_piezas - 1; i++){
                var div1 = document.getElementById("divcontend" + i);
                var div2 = document.getElementById("divcontend_img" + i);
                var img1 = document.getElementById(i);
                if (img1 != null) {
                    img1.setAttribute("onclick", "borrar(this, false)");
                }
                div1.setAttribute("onclick", "");
                div2.setAttribute("onclick", "");
            }
            spann_t.setAttribute("class", "sombra icon-ex ocultar");
            spann_f.setAttribute("class", "sombra icon-chulo");
        }else {
            console.log(equelan);
            titulo.innerText = "";
            for (i = 0; i <= num_piezas - 1; i++){
                var div1 = document.getElementById("divcontend" + i);
                var div2 = document.getElementById("divcontend_img" + i);
                var img1 = document.getElementById(i);
                if (img1 != null) {
                    img1.setAttribute("onclick", "rotar(this.id)");
                }else {
                    div1.setAttribute("onclick", "in_select(this);");
                    div2.setAttribute("onclick", "id_divcontend_img(this);");
                }
            }
            spann_f.setAttribute("class", "sombra icon-chulo ocultar");
            spann_t.setAttribute("class", "sombra icon-ex");
        }
        
    }else {
        tituloo.innerText = "Desseleccione la casilla primero";
    }

}

function recargar() {
    for (i = 0; i <= num_piezas - 1; i++) {
        var borrar_divcontend = document.getElementById("divcontend" + i);
        var borrar_divcontend_img = document.getElementById("divcontend_img" + i);
        var borrar_img = document.getElementById(i);

        if (borrar_img != null) {
            borrar_img.parentNode.removeChild(borrar_img);
        }

        borrar_divcontend.parentNode.removeChild(borrar_divcontend);
        borrar_divcontend_img.parentNode.removeChild(borrar_divcontend_img);
        estado_piezas[i] = 0;
        grados_piezas[i] = 0;
        gene_limg[i] = 0;
        gene_estados[i] = 0;
    }
    add_piezas(num_piezas, true);
    
    // document.getElementById("div_editor").style = "animation: none;";
    // document.getElementById("div_editor").style = "animation: pulzo 1s;";
}

function develop() {
    alert("Developing");
}
function consola() {
    console.log("Developing");
}

// --------------------------- niveles ----------
function cargar_dlvls() {
    for (i = 0; i <= 24; i++) {
        var div_lvls = document.createElement("div");
        var lbl_lvls = document.createElement("label");

        lbl_lvls.setAttribute("class", "lbl_lvls centrar");
        div_lvls.setAttribute("id", "div_lvls" + i);
        div_lvls.setAttribute("class", "div_lvls");
        div_lvls.setAttribute("onclick", "location.href='juego.html'");
        div_lvls.setAttribute("onmouseover", "divs_hover(this);");
        div_lvls.setAttribute("onmouseout", "divs_out(this);");

        // div_lvls.style = "animation: cambio_borderdiv 1s infinite " + (i * 100) + "ms;";
        lbl_lvls.style = "animation: cambio_colortext 1s infinite ";
        lbl_lvls.innerText = (i + 1);
        div_lvls.appendChild(lbl_lvls);
        document.getElementById("menu_lvls").appendChild(div_lvls);
    }
}

function divs_hover (id) {
    var elemento = document.getElementById(id.id);
    elemento.style = "background: #0c0c0c; border-bottom: solid 3px #fff;";
}

function divs_out (id) {
    var elemento = document.getElementById(id.id);
    elemento.style = "background: #000; border-bottom: solid 3px #0c4071;";
}

function c_color(ns,nl) {
	if (nl == 1) {
		document.getElementById("span_up" + ns).style.background = "linear-gradient(to right,#2b0016,#ff1751)";
		document.getElementById("span_rg" + ns).style.background = "linear-gradient(to bottom,#2b0016,#ff1751)";
		document.getElementById("span_dw" + ns).style.background = "linear-gradient(to left,#2b0016,#ff1751)";
		document.getElementById("span_lf" + ns).style.background = "linear-gradient(to top,#2b0016,#ff1751)";
	} else if (nl == 2) {
		document.getElementById("span_up" + ns).style.background = "linear-gradient(to right,#000f2b,#1742ff)";
		document.getElementById("span_rg" + ns).style.background = "linear-gradient(to bottom,#000f2b,#1742ff)";
		document.getElementById("span_dw" + ns).style.background = "linear-gradient(to left,#000f2b,#1742ff)";
		document.getElementById("span_lf" + ns).style.background = "linear-gradient(to top,#000f2b,#1742ff)";
	}
	
}

function c_line(tipo) {
	if (tipo.id == "btn_j") {
		c_color(1,1);
		document.getElementById("btn_j").style.color = "#ff1751";
	} else if (tipo.id == "btn_p") {
		c_color(2,1);
		document.getElementById("btn_p").style.color = "#ff1751";
	}
}
function c_lineout(tipo) {
	if (tipo.id == "btn_j") {
		c_color(1,2);
		document.getElementById("btn_j").style.color = "#1742ff";
	} else if (tipo.id == "btn_p") {
		c_color(2,2);
		document.getElementById("btn_p").style.color = "#1742ff";
	}
}