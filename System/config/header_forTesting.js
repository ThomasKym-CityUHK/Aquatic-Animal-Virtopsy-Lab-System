var headConfig      = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">'
                    + '<title>Aquatic Animal Virtopsy Lab</title>';
document.write(headConfig);

/****** Lib File Import ******/
//Jquery //https://jquery.com/
var LibSource       = '<script src="lib/Jquery/jquery.js"></script>'

//Jquery UI //https://jqueryui.com/
                    + '<script src="lib/JqueryUI/jquery-ui.js"></script>'

//Bootstrap //https://getbootstrap.com/
                    //+ '<script src="lib/bootstrap/dist/js/bootstrap.js"></script>'
                    //+ '<link href="lib/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet"></link>'

//Feather  //https://feathericons.com/
                    + '<link href="lib/feather/feather.css" rel="stylesheet" type="text/css"></link>'

//Semantic/Fomantic //https://semantic-ui.com/  | https://fomantic-ui.com/
                    //+ '<link rel="stylesheet" type="text/css" href="lib/Semantic/semantic.min.css">'
                    //+ '<script src="lib/Semantic/semantic.min.js"></script>'
                    + '<link rel="stylesheet" type="text/css" href="lib/Fomantic/dist/semantic.css">'
                    + '<script src="lib/Fomantic/dist/semantic.js"></script>'
                    + ''
//ChartJs //https://www.chartjs.org/
                    + '<link href="lib/ChartJs/dist/Chart.css" rel="stylesheet"></link>'
                    + '<script src="lib/ChartJs/dist/Chart.js"></script>'
                    + '<script src="lib/ChartJs/dist/Chart.bundle.js"></script>' 

//QuillJs //https://quilljs.com/
                    //+ '<script src="lib/Quill/quill.js"></script>'
                    + '<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">'
                    + '<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>'

//SimditorJs //https://simditor.tower.im/
                    //+ '<link  href="lib/Simditor/styles/font-awesome.css" rel="stylesheet" type="text/css">'
                    //+ '<link  href="lib/Simditor/styles/simditor.css" rel="stylesheet" type="text/css">'
                    //+ '<script src="lib/Simditor/scripts/module.js"></script>'
                    //+ '<script src="lib/Simditor/scripts/uploader.js"></script>'
                    //+ '<script src="lib/Simditor/scripts/simditor.js"></script>'

//DraggableJs //https://shopify.github.io/draggable/
                    //+'<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.12/lib/draggable.bundle.js"></script>'
                    //+'<script src="lib/Draggable/draggable.bundle.js"></script>';
                    
//Datatables //https://datatables.net/
                    + '<link rel="stylesheet" href="lib/Datatables/datatables.min.css" />'
                    + '<script src="lib/Datatables/datatables.min.js"></script>'

//Leaflet //https://leafletjs.com/
                    + '<link rel="stylesheet" href="lib/Leaflet/leaflet.css" />'
                    + '<script src="lib/Leaflet/leaflet.js"></script>'
                    + '<link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css" />'
                    + '<script src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js"></script>'
//DropzoneJs //https://www.dropzonejs.com
                    + '<script src="lib/dropzone/dist/dropzone.js"></script>'

document.write(LibSource);

/***** CSS Script Import *****/
var CssSource       = '<link href="css/style.css" rel="stylesheet"></link>'
                    + '';
document.write(CssSource);
/**** Customize JS Import ****/
//var CustomizeJs     = '<script src="src/cust.js" type="module"></script>';
var CustomizeJs     = ''
                    + '<script src="config/configs.js"></script>'
                    + '<script src="src/Utils.js"></script>'
                    + '<script src="src/Funcs.js"></script>'
                    + '<script src="src/Components.js"></script>'
                    + '<script src="src/UI.js"></script>'
                    + '<script src="src/Controllor.js"></script>'
                    + '<script src="config/tempData.js"></script>'
                    //+ '<script src="config/Main.js"></script>';

document.write(CustomizeJs);