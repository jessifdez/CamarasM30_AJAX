function pedirXML(){
    var url="http://www.mc30.es/components/com_hotspots/datos/camaras.xml";
    var peticion_http=new XMLHttpRequest();
	peticion_http.onreadystatechange=function()//Lo que se queda esperando la respuesta
		{
			if(this.readyState==4 && this.status==200)
			{
				var lista_camaras=tratarXML(this.responseText);
				crearTabla(lista_camaras);
                
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
    td1.innerHTML=camara.latitud;
    var td2=document.createElement("td");
    td2.innerHTML=camara.longitud;
	var td3=document.createElement("td");
    td3.innerHTML="<img width='150px' src="+camara.url+"></img>";
    tr.appendChild(td1);
    tr.appendChild(td2);
	tr.appendChild(td3);
    tabla.appendChild(tr);
	}
}