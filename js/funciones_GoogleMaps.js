function pedirXML(){
    var url="http://www.mc30.es/components/com_hotspots/datos/camaras.xml";
    var peticion_http=new XMLHttpRequest();
	peticion_http.onreadystatechange=function()//Lo que se queda esperando la respuesta
		{
			if(this.readyState==4 && this.status==200)
			{
				var lista_camaras=tratarXML(this.responseText);
				crearTabla(lista_camaras);
				cargarMapas(lista_camaras);
                
			}
		};
		peticion_http.open("GET",url,true);
		peticion_http.send();
}

function tratarXML(xml)
{
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xml,"text/xml");
	var lista_camaras=new Array();
	var lista_elementos_camara=xmlDoc.getElementsByTagName("Camara");
	for(i=0; i<lista_elementos_camara.length; i++)
	{
		var elemento_camara=lista_elementos_camara[i];
		var elemento_latitud=elemento_camara.getElementsByTagName("Latitud")[0];
		var hijo_latitud=elemento_latitud.childNodes[0];
		var valor_latitud=hijo_latitud.nodeValue;
		var elemento_longitud=elemento_camara.getElementsByTagName("Longitud")[0];
		var hijo_longitud=elemento_longitud.childNodes[0];
		var valor_longitud=hijo_longitud.nodeValue;
		//Se puede hacer todo de golpe
		var valor_url="http://"+elemento_camara.getElementsByTagName("URL")[0].childNodes[0].nodeValue;
		//Formamos un objeto en javascript
		var camara={latitud: valor_latitud, longitud: valor_longitud, url: valor_url};
		//Metemos la lista en el array
		lista_camaras.push(camara);
	}
    return lista_camaras;
}
function crearTabla(lista_camaras){
	var tabla=document.getElementById("tabla");
	for(i=0; i<lista_camaras.length;i++){
		var camara=lista_camaras[i];
		var tr=document.createElement("tr");
		var td1=document.createElement("td");
		var div=document.createElement("div");
		var id=document.createElement("id");
		div.setAttribute("id","mapa"+i+"");
		div.className="capa_mapa";
		//console.log(div);
		td1.appendChild(div);
		var td2=document.createElement("td");
		td2.innerHTML="<img width='150px' src="+camara.url+"></img>";
		tr.appendChild(td1);
		tr.appendChild(td2);
		tabla.appendChild(tr);
		/*var obj_tr=document.createElement("tr");
		obj_tr.innerHTML="<td><div class='capa_mapa' id='mapa"+i+"'></td><td><img width='100px' src="+camara.url+"></td>";
		//console.log(obj_tr);
		tabla.appendChild(obj_tr);*/
	}
}
function cargarMapas(lista_camaras) {
  for(j=0; j<lista_camaras.length; j++)
  {
  var camara=lista_camaras[j];
  var posicion={lat:camara.latitud*1, lng:camara.longitud*1}
  var map = new google.maps.Map(document.getElementById('mapa'+j), {zoom: 14, center: posicion});
  var marker = new google.maps.Marker({position: posicion, map: map});
  }
}