const _MOBJDEFVAL = {
    species:[
        { dispName:"NP",value:"NP"},
        { dispName:"SC",value:"SC"},
        { dispName:"OT",value:"OT"}
    ],
    sex:[
        { dispName:"Male",value:"M"},
        { dispName:"Female",value:"F"},
        { dispName:"Undetermined",value:"U"}
    ],
    ageclass:[
        { dispName:"Neonate",value:"Neonate"},
        { dispName:"Calf",value:"Calf"},
        { dispName:"Juvenile",value:"Juvenile"},
        { dispName:"Sub-adult",value:"Sub-adult"},
        { dispName:"Adult",value:"Adult"},
        { dispName:"Undetermined",value:"Undetermined"}
    ],
    condition:[
      { dispName:"0. NA",value:"NA"},
      { dispName:"1. Live Strandings",value:"LS"},
      { dispName:"2. Freshly Dead",value:"FD"},
      { dispName:"3. Moderately Decomposed",value:"MD"},
      { dispName:"4. Very Decomposed",value:"VD"},
      { dispName:"5. Mummified or Skeletal Remains",value:"MSR"}
    ],
    bool:[
      { dispName:"Yes",value:"true"},
      { dispName:"No",value:"false"}
    ]
}

const _DEFDOCCLASSIFY = {
  general:[
    {name:"Anatomy",value:"anatomy"},
    {name:"Necropsy",value:"necropsy"},
    {name:"Virtopsy",value:"virtopsy"},
    {name:"Sample Taken",value:"sample"},
  ],
  image:[
    {name:"Unknow",value:0},
    {name:"Non-Useful",value:1},
    {name:"Not Clear",value:2},
    {name:"Useful",value:3}
  ]
}

const _FILETYPE = {
          Funcs:{
            FileTypeClassifyByName:function(data){
              var fileName = data;
              var fileNameArray = fileName.split(".");
              var fileType = fileNameArray[fileNameArray.length-1];
              
              switch(fileType){
                  case "pdf":case "PDF":
                      return "pdf";
                  case "doc":case "DOC":case "docx":case "DOCX":
                      return "word";
                  case "ppt":case "PPT":case "pptx":case "PPTX":
                      return "ppt";
                  case "xlsx":case "XLSX":case "xlsm":case "XLSM":
                  case "xls":case "XLS":case "xml":case "XML":
                      return "excel";
                  case "txt":case "TXT":case "log":case "LOG":
                      return "text";
                  case "jpg":case "jpge":case "JPG":case "JPGE":
                  case "png":case "PNG":case "gif":case "GIF":
                      return "image";
                  case "bmp":case "BMP":case "nef":case "NEF":
                  case "raw":case "RAW":case "cr2":case "CR2":
                  case "eps":case "EPS":case "orf":case "ORF":
                  case "tif":case "TIF":case "tiff":case "TIFF":
                      return "photo";
                  case "dicom":case "DICOM":
                      return "dicom";
                  case "zip":case "ZIP":case "rar":case "RAR":
                  case "7z":case "7Z":case "gzip":case "GZIP":
                      return "zip";
                  case "mp4":case "MP4":case "avi":case "AVI":
                  case "mov":case "MOV":case "wmv":case "WMV":
                  case "mp3":case "MP3":
                      return "video";
                  default: 
                      return "unknow";
              }
          },
          FileTypeClassify:function(data){
              var file = data;
              var fileName = file.upload.filename;
              return this.FileTypeClassifyByName(fileName);
          }
        },
        image:{
            name:{ en:"Images (Web available)"},
            dataAttrs:[
                {   title:`<div class="ui mini icon blue button" onclick="UploadCtrl.UploadBuffList.EventListener.groupedit(this)"><i class="icon edit"></i></div>`
                    ,data:"fileAttr",name:"image",render:function(data){
                      var id = data[0];var type = data[1];var name = data[2];
                      return `<img class="ui fluid mini image" src="${ uploadBuffers[id][type][name].dataURL}">`;
                    }},
                { title:"Name",data:"name",name:"name",render:function(data){
                  if(data.length>20){
                    return data.substring(0, 20)+"...";
                  }
                  return data;
                } },
                //{ title:"Size",data:"size",name:"size" },
                //{ title:"Type",data:"type",name:"type" },
                { title:"Status",data:"status",name:"status" },
                { title:"SID",data:"fileAttr",name:"sid",editable:true,edittype:"input",render:function(data=""){
                  var value = "";
                  if(data!=""){
                    var id = data[0];var type = data[1];var name = data[2];
                    value = uploadBuffers_Server[id][type][name]["sid"];
                  }
                  return `<div class="ui mini form"><div class="field"><input data-filename="${name}" data-column="sid" onchange="UploadCtrl.UploadBuffList.EventListener.bufferEditor.rowedit(this)" value="${value}"/></div></div>`;
                } },
                { title:"Image Class",data:"",name:"imageclass",editable:true,edittype:"select",options:_DEFDOCCLASSIFY.image,optionConfig:{values: _DEFDOCCLASSIFY.image},
                render:function(){
                  return `
                        <div class="ui dropdown" data-column="imageclass">
                          <input  type="hidden"><i class="dropdown icon"></i>
                          <div class="default text"></div>
                          <div class="menu"></div>
                        </div>
                  `;
                }},
                { title:"Category",data:"name",name:"category",editable:true,edittype:"select",options:_DEFDOCCLASSIFY.general,optionConfig:{
                  values: _DEFDOCCLASSIFY.general,
                  useLabels: false,allowAdditions:false
                },render:function(){
                  return `
                      <div class="ui multiple dropdown" data-column="category">
                        <input  type="hidden"><i class="dropdown icon"></i>
                        <div class="default text"></div>
                        <div class="menu"></div>
                      </div>
                  `;
                }},
                { title:"Description",data:"fileAttr",name:"description",editable:true,edittype:"textarea",render:function(data=""){
                  var value = "";
                  if(data!=""){
                    var id = data[0];var type = data[1];var name = data[2];
                    value = uploadBuffers_Server[id][type][name]["description"];
                  }
                  return `<div class="ui mini form"><div class="field"><textarea data-column="description" onchange="UploadCtrl.UploadBuffList.EventListener.bufferEditor.rowedit(this)" rows="1">${value}</textarea></div></div>`;
                }}
            ],
        },
        general:{
            name:{ en:function(data){
                switch(data){
                    case "image":
                        return "Images (Web available)";
                    case "word":
                        return "Document Files";
                    case "excel":
                        return "Excel Files";
                    case "pdf":
                        return "PDF Files";
                    case "text":
                        return "Texture Files";
                    case "photo":
                        return "Photo (Raw Files)";
                    case "dicom":
                        return "Dicom Files (CT Scan)";
                    case "video":
                        return "Video or Audio";
                    case "unknow":default:
                        return "Other";
                }
            }},
            dataAttrs:[
                    {   title:`<div class="ui mini icon blue button" onclick="UploadCtrl.UploadBuffList.EventListener.groupedit(this)"><i class="icon edit"></i></div>`,
                        data:"name",render:function(data){
                          var name = data;
                          var type = UploadCtrl.Events.FileTypeClassifyByName(name);
                          return `<img class="ui fluid tiny image" src="asserts/system/system/${type}.png">`;
                    }},
                    { title:"Name",data:"name",name:"name",render:function(data){
                      if(data.length>20){
                        return data.substring(0, 20)+"...";
                      }
                      return data;
                    } },
                    //{ title:"Size",data:"size",name:"size" },
                    //{ title:"Type",data:"type",name:"type" },
                    { title:"Status",data:"status",name:"status" },
                    { title:"SID",data:"fileAttr",name:"sid",editable:true,edittype:"input",render:function(data=""){
                      var value = "";
                      if(data!=""){
                        var id = data[0];var type = data[1];var name = data[2];
                        value = uploadBuffers_Server[id][type][name]["sid"];
                      }
                      return `<div class="ui mini form"><div class="field"><input data-filename="${name}" data-column="sid" onchange="UploadCtrl.UploadBuffList.EventListener.bufferEditor.rowedit(this)" value="${value}"/></div></div>`;
                    } },
                    { title:"Category",data:"name",name:"category",editable:true,edittype:"select",options:_DEFDOCCLASSIFY.general,optionConfig:{
                      values: _DEFDOCCLASSIFY.general,
                      useLabels: false,allowAdditions:false
                    },render:function(){
                      return `
                          <div class="ui multiple dropdown" data-column="category">
                            <input  type="hidden"><i class="dropdown icon"></i>
                            <div class="default text"></div>
                            <div class="menu"></div>
                          </div>
                      `;
                    }},
                    { title:"Description",data:"fileAttr",name:"description",editable:true,edittype:"textarea",render:function(data=""){
                      var value = "";
                      if(data!=""){
                        var id = data[0];var type = data[1];var name = data[2];
                        value = uploadBuffers_Server[id][type][name]["description"];
                      }
                      return `<div class="ui mini form"><div class="field"><textarea  data-column="description" onchange="UploadCtrl.UploadBuffList.EventListener.bufferEditor.rowedit(this)" rows="1">${value}</textarea></div></div>`;
                    }}
                ]
            
        }
}

const marineObj = {
    _ini:function(data){
      switch(data){
        case "normal":case "Normal":
        case "normaltype":case "NormalType":
          return fs.new(NormalType);
      }
      return null;
    },
    getAttributesList:function(){
      var _rtn = {};
      for(var table in marineObj.attributes){
        _rtn[table] = [];
        for(var column in marineObj.attributes[table].columns){
          _rtn[table][_rtn[table].length] = column;
        }
      }
      return _rtn;
    },
    getAttributesListArray:function(){
      var _rtn = [];
      for(var table in marineObj.attributes){
        var idx = _rtn.length;
        _rtn[idx] = {};
        _rtn[idx].table = table;
        _rtn[idx].columns = [];
        for(var column in marineObj.attributes[table].columns){
          var _idx = _rtn[idx].columns.length;
          _rtn[idx].columns[_idx] = column;
        }
      }
      return _rtn;
    },
    getColumns:function(data){
      var table = data;
      var _rtn =[];
      for(var column in marineObj.attributes[table].columns){
        _rtn[_rtn.length] = column;
      }
      return _rtn;
    },
    getTableName:function(data){
      var table = data.table;
      return marineObj.attributes[table].info.display;
    },
    getColumnName:function(data){
      var table = data.table;
      var column = data.column;
      return marineObj.attributes[table].columns[column].display;
    },
    getTableNameRawData:function(data){
      var table = data.split("^")[0];
      return marineObj.attributes[table].info.display;
    },
    getColumnNameRawData:function(data){
      var table = data.split("^")[0];
      var column = data.split("^")[1];
      return marineObj.attributes[table].columns[column].display;
    },
    attributes:{
        strandingreport: {
            info: {
              display: {
                en: "General Information",zh: "????????????"
              }
            },
            columns: {
              sid: {
                display: {
                  en: "Specimen ID",zh: "????????????",
                  placeholder:"Recorded as [Type of specimen][YY]-[DD][MM]"
                },
                requires: true,datatype: "varchar",datalen: 10,size:4,
                EventListener:{
                  onChange : function(elm){
                    var error = [];
                    var sid = $(`input[name="strandingreport.sid"]`).val();
                    var species=sid.slice(0,2);
                    if(fs.isEmpty(species)||!(species=="NP"||species=="SC"||species=="OT")){ error[error.length] = "species"; }
                    var YY=(sid.slice(2,4));
                    if(fs.isEmpty(YY)){ error[error.length] = "YY"; }
                    var DD=(sid.slice(5,7));
                    if(fs.isEmpty(DD)){ error[error.length] = "DD"; }
                    var MM=(sid.slice(7,9));
                    if(fs.isEmpty(MM)){ error[error.length] = "MM"; }
                    if(error.length==0){ 
                      $(`select[name="strandingreport.species"]`).parents(".dropdown").dropdown('set selected', species);
                      $(`input[name="strandingreport.straDate"]`).val(`20${YY}-${MM}-${DD}`);
                    }else{ console.log(error); }
                  }
                }
              },
              species: {
                display: {
                  en: "Species",zh: "????????????",
                  placeholder:"Select a species"
                },
                requires: true,datatype: "char",datalen: 2,size:2,
                options:_MOBJDEFVAL.species,
                EventListener:{
                  onChange : function(elm){
                    var error = [];
                    var species = $(`select[name="strandingreport.species"]`).parents(".dropdown").dropdown('get value');
                    if(fs.isEmpty(species)){ error[error.length] = "species"; }
                    var date = $(`input[name="strandingreport.straDate"]`).val();
                    if(fs.isEmpty(date)){ error[error.length] = "date"; }
                    if(error.length==0){
                      var YY=(date.slice(2,4));
                      var MM=(date.slice(5,7));
                      var DD=(date.slice(8,10));
                      var sid = `${species}${YY}-${DD}${MM}`;
                      $(`input[name="strandingreport.sid"]`).val(sid);
                    }else{ console.log(error); }
                  }
                }

              },
              specSpecific: {
                display: {
                  en: "Species Specific",zh: "??????",
                  placeholder:"Species Specific"
                },
                requires: false,datatype: "varchar",datalen: 50,size:4
              },
              straDate: {
                display: {
                  en: "Date Found",zh: "????????????",
                  placeholder:"Stranding Date"
                },
                requires: true,
                datatype: "date",
                datalen: 0,size:2,EventListener:{
                  onChange : function(elm){
                    var error = [];
                    var species = $(`select[name="strandingreport.species"]`).parents(".dropdown").dropdown('get value');
                    if(fs.isEmpty(species)){ error[error.length] = "species"; }
                    var date = $(`input[name="strandingreport.straDate"]`).val();
                    if(fs.isEmpty(date)){ error[error.length] = "date"; }
                    if(error.length==0){
                      var YY=(date.slice(2,4));
                      var MM=(date.slice(5,7));
                      var DD=(date.slice(8,10));
                      var sid = `${species}${YY}-${DD}${MM}`;
                      $(`input[name="strandingreport.sid"]`).val(sid);
                    } /*else{ console.log(error); }*/

                  }
                }
              },
              straTime: {
                display: {
                  en: "Time Found",zh: "????????????",
                  placeholder:"Stranding Time"
                },
                requires: false,
                datatype: "time",
                datalen: 0,size:2
              },
              latiDegree: {
                  display: {
                    en: "Latitude Degree",zh: "??????(???)"
                  },
                  requires: false,
                  datatype: "int",
                  datalen: 0,size:4
              },
              latiMinute: {
                  display: {
                    en: "Latitude Minute",zh: "??????(???)"
                  },
                  requires: false,
                  datatype: "int",
                  datalen: 0,size:4
              },
              latiSecond: {
                  display: {
                    en: "Latitude Second",zh: "??????(???)"
                  },
                  requires: false,
                  datatype: "decimal",
                  datalen: 0,size:4
              },
              latiDirection: {
                  display: {
                    en: "Latitude Direction",zh: "??????(??????)"
                  },
                  requires: false,
                  datatype: "char",
                  datalen: 1,size:4
              },
              longDegree: {
                  display: {
                    en: "Longitude Degree",zh: "??????(???)"
                  },
                  requires: false,
                  datatype: "int",
                  datalen: 0,size:4
              },
              longMinute: {
                  display: {
                    en: "Longitude Minute",zh: "??????(???)"
                  },
                  requires: false,
                  datatype: "int",
                  datalen: 0,size:4
              },
              longSecond: {
                  display: {
                    en: "Longitude Second",zh: "??????(???)"
                  },
                  requires: false,
                  datatype: "decimal",
                  datalen: 0,size:4
              },
              longDirection: {
                  display: {
                    en: "Longitude Direction",zh: "??????(??????)"
                  },
                  requires: false,
                  datatype: "char",
                  datalen: 1,size:4
              },
              region: {
                  display: {
                    en: "Region",
                    zh: "??????"
                  },
                  requires: false,
                  datatype: "varchar",
                  datalen: 30,size:4
              },
              location: {
                  display: {
                      en: "Location",
                      zh: "??????"
                  },
                  requires: false,
                  datatype: "varchar",
                  datalen: 100,size:4
              },
              position: {
                  display: {
                    en: "Position",
                    zh: "??????"
                  },
                  requires: false,
                  datatype: "varchar",
                  datalen: 100,size:4
              },
              ageClass: {
                display: {
                  en: "Age Class",
                  zh: "????????????",
                  placeholder:"Age Class"
                },
                requires: false,
                datatype: "varchar",
                datalen: 10,size:2,
                options:_MOBJDEFVAL.ageclass
              },
              code: {
                display: {
                  en: "Condition Code",
                  zh: "??????",
                  placeholder:"Condition Code"
                },
                requires: false,
                datatype: "char",
                datalen: 1,size:2,options:_MOBJDEFVAL.condition
              },
              sex: {
                display: {
                  en: "Gender",
                  zh: "??????",
                  placeholder:"Gender"
                },
                requires: false,
                datatype: "varchar",
                datalen: 3,size:2,
                options:_MOBJDEFVAL.sex
              },
              length: {
                display: {
                  en: "Length",
                  zh: "??????",
                  placeholder:"Please specify(insert numbers)/Unknow"
                },
                requires: false,
                datatype: "decimal",
                datalen: 0,size:2
              },
              weight: {
                display: {
                  en: "Weight",
                  zh: "??????",
                  placeholder:"Please specify(insert numbers)/Unknow"
                },
                requires: false,
                datatype: "decimal",
                datalen: 0,size:2
              },
              personnel: {
                display: {
                  en: "Personnel",
                  zh: "????????????",
                  placeholder:"Please insert the responsible person"
                },
                requires: false,
                datatype: "varchar",
                datalen: 100,size:4
              },
              comments: {
                display: {
                  en: "Comments",
                  zh: "??????",
                  placeholder:"Please brief the case"
                },
                requires: false,
                datatype: "text",
                datalen: 65535,size:4
              },
              frozen: {
                display: {
                  en: "Frozon",zh: "?????????",
                  placeholder: "Is Frozoned"
                },
                requires: false,
                datatype: "varchar",
                datalen: 3,size:2,options:_MOBJDEFVAL.bool
              },
              windDirection: {
                display: {
                  en: "Wind Direction",
                  zh: "??????",
                  placeholder:"Please specify/Unknow"
                },
                requires: false,
                datatype: "varchar",
                datalen: 3,size:2
              },
              windSpeed: {
                display: {
                  en: "Wind Speed",
                  zh: "??????",
                  placeholder:"Please specify/Unknow"
                },
                requires: false,
                datatype: "decimal",
                datalen: 0,size:2
              }
            }
        },
        morphometric: {
            info: {
              display: {
                en: "Morphometics (cm)",
                zh: "?????? ???cm???"
              },
              description:"Length of tip of Maxilla",
              subtitle:"Length of tip of Maxilla to ..."
            },
            columns: {
              m1: {
                display: {
                  en: "1 - ANTERIOR MARGIN OF FLUKE NOTCH",zh: "????????????",
                  placeholder:"Please specify (insert number)/NA"
                },
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m2: {
                display: {
                  en:"2 - POSTERIOR INSERTION OF DORSAL RIDGE",zh:"????????????",
                  placeholder:"Please specify (insert number)/NA"
                },
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m2b: {
                display: {en:"2B- LAST TUBERCLE OF DORSAL RIDGE",zh:"??????????????????????????????",
                placeholder:"Please specify (insert number)/NA"},
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m3: {
                display: {en:"3 - ANTERIOR INSERTION OF DORSAL RIDGE",zh:"????????????",
                placeholder:"Please specify (insert number)/NA"},
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m3b: {
                display: {en:"3B- FIRST TUBERCLE OF DORSAL RIDGE",zh:"??????????????????????????????",
                placeholder:"Please specify (insert number)/NA"},
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m4: {
                display: {en:"4 - LEFT EAR",zh:"???????????????",
                placeholder:"Please specify (insert number)/NA"},
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m5: {
                display: { en:"5 - CENTRE OF BLOWHOLE ",zh:"???????????????????????????" ,
                placeholder:"Please specify (insert number)/NA"},
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m6: {
                display: {en:"6 - POSTERIOR INSERTION OF GAPE",zh:"????????????",
                placeholder:"Please specify (insert number)/NA"},
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m7: {
                display: {en:"7 - CENTRE OF LEFT EYE",zh:"??????????????????",
                placeholder:"Please specify (insert number)/NA"},
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m8: {
                display: {en:"8 - ANTERIOR INSERTION OF LEFT FLIPPER",zh:"?????????????????????",
                placeholder:"Please specify (insert number)/NA"},
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m9: {
                display: { en:"9 - CENTRE OF UMBILICUS",zh:"?????????" ,
                placeholder:"Please specify (insert number)/NA"},
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m10m: {
                display: { en:"10M- CENTRE OF GENITAL SLIT (MALE)",zh:"???????????????????????????" ,
                placeholder:"Please specify (insert number)/NA"},
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m10f: {
                display: { en:"10F- CENTRE OF GENITAL SLIT (FEMALE)",zh:"???????????????????????????",
                placeholder:"Please specify (insert number)/NA"}, 
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m11: {
                display: {en:"11 - CENTRE OF ANUS",zh:"????????????" ,
                placeholder:"Please specify (insert number)/NA"},
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m12: {
                display: {en:"12M- CENTRE OF PREANAL TUBULE (MALE)",zh:"??????????????????????????????" ,
                placeholder:"Please specify (insert number)/NA"},
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              }
            }
        },
        ridge: {
            info: {
              display: {
                en: "Ridge",
                zh: "??????"
              }
            },
            columns: {
              m14: {
                display: {en:"14 - ANTERIOR TO POSTERIOR INSERTION OF RIDGE",zh:"?????????",
                placeholder:"Please specify (insert number)/NA"},
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m14b: {
                display: { en:"14B- FIRST TO LAST TUBERCLE",zh:"??????????????????",
                placeholder:"Please specify (insert number)/NA" },
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m15: {
                display: {en:"15 - SURFACE WIDTH OF RIDGE (WIDEST POINT)",zh:"??????????????????",
                placeholder:"Please specify (insert number)/NA"},
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m16: {
                display: {en:"16 - HEIGHT OF RIDGE",zh:"?????????",
                placeholder:"Please specify (insert number)/NA"},
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m16b: {
                display: {en:"16B - MAXIMUM ROWS OF TUBERCLES AT WIDEST POINT OF RIDGE",zh:"???????????????????????????",
                placeholder:"Please specify (insert number)/NA"},
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              }
            }
        },
        girth: {
            info: {
              display: {
                en: "Girth",
                zh: "??????"
              }
            },
            columns: {
              m17: {
                display: {en:"17 - GIRTH AT EYE",zh:"???????????????",
                placeholder:"Please specify (insert number)/NA"},
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m18: {
                display: { en:"18 - GIRTH AT ANTERIOR INSERTION OF FLIPPER",zh:"??????????????????" ,
                placeholder:"Please specify (insert number)/NA"},
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m19: {
                display: { en:"19 - GIRTH AT AXILLA",zh:"????????????" ,
                placeholder:"Please specify (insert number)/NA"},
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m20: {
                display: { en:"20 - GIRTH MID-POINT BETWEEN AXILLA & UMBILICUS",zh:"??????????????????????????????" ,
                placeholder:"Please specify (insert number)/NA"},
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m21: {
                display: { en:"21 - GIRTH AT UMBILICUS",zh:"?????????",
                placeholder:"Please specify (insert number)/NA" },
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m22m: {
                display: { en:"22 M - GIRTH AT GENITALIA (MALE)",zh:"?????????????????????????????????" ,
                placeholder:"Please specify (insert number)/NA"},
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m22f: {
                display: { en:"22 F - GIRTH AT GENITALIA (FEMALE)",zh:"?????????????????????????????????" ,
                placeholder:"Please specify (insert number)/NA"},
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m23: {
                display: { en:"23 - GIRTH AT ANUS",zh:"???????????????" ,
                placeholder:"Please specify (insert number)/NA"},
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              }
            }
        },
        head: {
            info: {
              display: {
                en: "Head",
                zh: "??????"
              }
            },
            columns: {
              m24: {
                display: { en:"24 - PROJECTION OF MELON BEYOND MAXILLA",zh:"?????????????????????",
                placeholder:"Please specify (insert number)/NA" },
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m25: {
                display: { en:"25 - POSTERIOR INSERTION OF GAPE TO CENTRE OF EYE",zh:"?????????-????????????",
                placeholder:"Please specify (insert number)/NA" },
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m26: {
                display: { en:"26 - LENGTH OF EYE",zh:"?????????",
                placeholder:"Please specify (insert number)/NA" },
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m27: {
                display: { en:"27 - CENTRE OF EYE TO EAR",zh:"?????????-??????",
                placeholder:"Please specify (insert number)/NA" },
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m28: {
                display: { en:"28 - GAPE - MAXIMUM WIDTH AT POSTERIOR INSERTION",zh:"??????????????????" ,
                placeholder:"Please specify (insert number)/NA"},
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              }
            }
        },
        flipper: {
            info: {
              display: {
                en: "Flipper",
                zh: "?????????"
              }
            },
            columns: {
              m29: {
                display: { en:"29 - FLIPPER TIP TO ANTERIOR INSERTION",zh:"???????????????????????????",
                placeholder:"Please specify (insert number)/NA"  },
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m30: {
                display: { en:"30 - FLIPPER TIP TO AXILLA (POSTERIOR INSERTION)",zh:"???????????????????????????",
                placeholder:"Please specify (insert number)/NA" },
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m31: {
                display: { en:"31 - FLIPPER MAXIMUM WIDTH",zh:"???????????????",
                placeholder:"Please specify (insert number)/NA" },
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              },
              m32: {
                display: { en:"32 - FLIPPER -ANTERIOR INSERTION TO AXILLA",zh:"?????????????????????"},
                requires: false,
                datatype: "decimal",
                size:4,datalen: 0
              }
            }
        },
        fluke: {
          info: {
              display: {
              en: "Fluke",
              zh: "??????"
              }
          },
          columns: {
              m33: {
              display: {en:"33 - FLUKE SPAN",zh:"?????????",
              placeholder:"Please specify (insert number)/NA"},
              requires: false,
              datatype: "decimal",
              size:4,datalen: 0
              },
              m34: {
              display: {en:"34 - NOTCH OF FLUKES TO ANTERIOR MARGAIN AT WIDEST POINT",zh:"????????????-?????????????????????",
              placeholder:"Please specify (insert number)/NA"},
              requires: false,
              datatype: "decimal",
              size:4,datalen: 0
              },
              m35: {
              display: {en:"35 - FLUKE LENGTH - ANTERIOR MARGIN",zh:"??????????????????",
              placeholder:"Please specify (insert number)/NA"},
              requires: false,
              datatype: "decimal",
              size:4,datalen: 0
              },
              m36: {
              display: {en:"36 - FLUKE LENGTH - POSTERIOR MARGIN",zh:"??????????????????",
              placeholder:"Please specify (insert number)/NA"},
              requires: false,
              datatype: "decimal",
              size:4,datalen: 0
              },
              m37: {
              display: {en:"37 - FLUKE NOTCH DEPTH",zh:"??????????????????",
              placeholder:"Please specify (insert number)/NA"},
              requires: false,
              datatype: "decimal",
              size:4,datalen: 0
              }
          }
        },
        blubber: {
        info: {
            display: {
            en: "Blubber",
            zh: "?????????"
            }
        },
        columns: {
            mA1: {
            display: {en:"A1 - BLUBBER THICKNESS (MID DORSAL)",zh:"??????????????????????????????1",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "decimal",
            size:4,datalen: 0
            },
            mA2: {
            display: {en:"A2 - BLUBBER THICKNESS (LATERAL)",zh:"?????????????????????????????????1",
            placeholder:"Please specify (insert number)/NA" },
            requires: false,
            datatype: "decimal",
            size:4,datalen: 0
            },
            mA3: {
            display: {en:"A3 - BLUBBER THICKNESS (MID VENTRAL)",zh:"??????????????????????????????1",
            placeholder:"Please specify (insert number)/NA" },
            requires: false,
            datatype: "decimal",
            size:4,datalen: 0
            },
            mB1: {
            display: {en:"B1 - BLUBBER THICKNESS (MID DORSAL)",zh:"??????????????????????????????2",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "decimal",
            size:4,datalen: 0
            },
            mB2: {
            display: {en:"B2 - BLUBBER THICKNESS (LATERAL)",zh:"?????????????????????????????????2",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "decimal",
            size:4,datalen: 0
            },
            mB3: {
            display: { en:"B3 - BLUBBER THICKNESS (MID VENTRAL)",zh:"??????????????????????????????2",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "decimal",
            size:4,datalen: 0
            },
            mC1: {
            display: {en:"C1 - BLUBBER THICKNESS (MID DORSAL)",zh:"??????????????????????????????3",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "decimal",
            size:4,datalen: 0
            },
            mC2: {
            display: {en:"C2 - BLUBBER THICKNESS (LATERAL)",zh:"?????????????????????????????????3",
            placeholder:"Please specify (insert number)/NA" },
            requires: false,
            datatype: "decimal",
            size:4,datalen: 0
            },
            mC3: {
            display: {en:"C3 - BLUBBER THICKNESS (MID VENTRAL)",zh:"??????????????????????????????3",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "decimal",
            size:4,datalen: 0
            }
        }
        },
        other: {
        info: {
            display: {
            en: "Other",
            zh: "????????????"
            }
        },
        columns: {
            mUL: {
            display: {en:"UL - TOOTH COUNT - LEFT UPPERE",zh:"??????????????????????????????",
            placeholder:"Please specify (insert number)/NA" },
            requires: false,
            datatype: "decimal",
            size:4,datalen: 0
            },
            mLL: {
            display: {  en:"LL - TOOTH COUNT - LEFT LOWER",zh:"??????????????????????????????",
            placeholder:"Please specify (insert number)/NA" },
            requires: false,
            datatype: "decimal",
            size:4,datalen: 0
            },
            mUR: {
            display: { en:"UR - TOOTH COUNT - RIGHT UPPER",zh:"??????????????????????????????",
            placeholder:"Please specify (insert number)/NA" },
            requires: false,
            datatype: "decimal",
            size:4,datalen: 0
            },
            mLR: {
            display: { en:"LR - TOOTH COUNT - RIGHT LOWER",zh:"??????????????????????????????",
            placeholder:"Please specify (insert number)/NA" },
            requires: false,
            datatype: "decimal",
            size:4,datalen: 0
            },
            mLMSL: {
            display: { en:"LENGTH MAMMARY SLIT (LEFT)",zh:"?????????????????????",
            placeholder:"Please specify (insert number)/NA" },
            requires: false,
            datatype: "decimal",
            size:4,datalen: 0
            },
            mLMSR: {
            display: { en:"LENGTH MAMMARY SLIT (RIGHT)",zh:"?????????????????????",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "decimal",
            size:4,datalen: 0
            },
            m13: {
            display: { en:"13 - GENITAL SLIT LENGTH",zh:"???????????????",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "decimal",
            size:4,datalen: 0
            },
            mIWD: {
            display: { en:"INSIDE WIDTH / DIAMETER",zh:"??????????????????????????????",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "decimal",
            size:4,datalen: 0
            },
            mD: {
            display: { en:"DEPTH",zh:"???????????????????????????" ,
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "decimal",
            size:4,datalen: 0
            },
            mLOO: {
            display: { en:"LENGTH OF OPENING",zh:"?????????????????????????????????" ,
                placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "decimal",
            size:4,datalen: 0
            }
        }
        },
        caseconclusion: {
        info: {
            display: {
            en: "Case Conclusion",
            zh: "??????/??????"
            }
        },
        columns: {
            comments: {
            display: { en: "Comments",zh: "??????",
            placeholder:"Please specify /NA" },
            requires: false,
            datatype: "text",
            size:4,datalen: 65535
            },
            COD: {
            display: {en: "Cause of Death",zh: "????????????",
            placeholder:"Please specify /NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 30
            },
            CODVerified: {
            display: {en: "Verified",zh: "?????????",
            placeholder:"Please specify /NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 10
            }
        }
        },
        circulatory: {
        info: {
            display: {
            en: "Circulatory",zh: "??????????????????"
            }
        },
        columns: {
            pericardial: {
            display: {en: "Pericardial",zh: "??????",
            placeholder:"Please specify /NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            heart: {
            display: {en: "Heart",zh: "???",
            placeholder:"Please specify /NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            }
        }
        },
        endocrine: {
        info: {
            display: {
            en: "Endocrine",zh: "?????????"
            }
        },
        columns: {
            adreGlands: {
            display: { en: "Adrenal Glands",zh: "?????????",
            placeholder:"Please specify (insert number)/NA" },
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            brain: {
            display: { en: "Brain",zh: "???",
            placeholder:"Please specify (insert number)/NA" },
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            pituGland: {
            display: { en: "Pituitary Gland",zh: "?????????",
            placeholder:"Please specify (insert number)/NA" },
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            }
        }
        },
        gastrointestinal: {
        info: {
            display: {
            en: "Gastrointestinal Tract",
            zh: "?????????"
            }
        },
        columns: {
            esophagus: {
            display: {en: "Esophagus",zh: "??????",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 10
            },
            stomach: {
            display: {en: "Stomach",zh: "???",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            foreStomach: {
            display: {en: "Fore Stomach",zh: "??????",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            fundStomach: {
            display: {en: "Foundational Stomach",zh: "?????????",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            pyloStomach: {
            display: {en: "Pylo Stomach",zh: "?????????",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            intestines: {
            display: {en: "Intestines",zh: "???",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            liver: {
            display: {en: "Liver",zh: "???",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            pancreas: {
            display: {en: "Pancreas",zh: "??????",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            }
        }
        },
        lymphatic: {
        info: {
            display: {en: "Lymphatic",zh: "??????"}
        },
        columns: {
            spleen: {
            display: {en: "Spleen",zh: "???",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            lympNodes: {
            display: {en: "Lymph Nodes",zh: "?????????",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            }
        }
        },
        external: {
        info: {
            display: {
            en: "External",
            zh: "??????"
            }
        },
        columns: {
            oBodyScore: {
            display: {en: "o Body Score",zh: "",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 10
            },
            cBodyScore: {
            display: {en: "c Body Score",zh: "",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            wounds: {
            display: {en: "Wounds",zh: "??????",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            lesions: {
            display: {en: "Lesions",zh: "??????",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            parasites: {
            display: {en: "Parasites",zh: "?????????",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            nostrils: {
            display: {en: "Nostrils",zh: "??????",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            oralCavity: {
            display: {en: "Oral Cavity",zh: "??????",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            tongue: {
            display: {en: "Tongue",zh: "??????",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            eyes: {
            display: {en: "Eyes",zh: "??????",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            ears: {
            display: {en: "Ears",zh: "??????",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            mammary: {
            display: {en: "Mammary",zh: "??????",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            anus: {
            display: {en: "Anus",zh: "??????",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            }
        }
        },
        musculo: {
        info: {
            display: {
            en: "Musculo",
            zh: "??????"
            }
        },
        columns: {
            blubber: {
            display: { en: "Blubber",zh: "??????",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            muscle: {
            display: { en: "Muscle",zh: "??????",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            }
        }
        },
        necropsyothers: {
        info: {
            display: {en: "Necropsy Others",zh: "??????"}
        },
        columns: {
            thorCavity: {
            display: {en: "ThorCavity",zh: "",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            periCavity: {
            display: {en: "PeriCavity",zh: "",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            thyroid: {
            display: {en: "Thyroid",zh: "?????????",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            parathyroid: {
            display: {en: "Parathyroid",zh: "????????????",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            thymus: {
            display: {en: "Thymus",zh: "??????",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            sample: {
            display: {en: "sample",zh: "??????",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 4000
            }
        }
        },
        necropsyrecord: {
        info: {
            display: {en: "Necropsy Record",zh: "????????????"}
        },
        columns: {
            sex: {
            display: {en: "Necropsy Record - Sex",zh: "????????????(??????)",
            placeholder:"Please select gender"},
            requires: false,
            datatype: "char",
            size:2,datalen: 1,
            options:_MOBJDEFVAL.sex
            },
            ageClass: {
            display: {en: "Necropsy Record - Age",zh: "????????????(??????)",
            placeholder:"Please select age class"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 10,
            options:_MOBJDEFVAL.ageclass
            },
            code: {
            display: {en: "Necropsy Record - Condition Code",zh: "????????????(??????)",
            placeholder:"Please select condition code"},
            requires: false,
            datatype: "int",
            size:4,datalen: 0,options:_MOBJDEFVAL.condition
            },
            necrDate: {
            display: {en: "Necropsy Record - Necropsy Date",zh: "????????????(??????)",
            placeholder:"Please select necropsy date"},
            requires: false,
            datatype: "date",
            size:2,datalen: 0
            },
            COD: {
            display: {en: "Necropsy Record - Cause of Death",zh: "????????????(??????)",
            placeholder:"Please specify"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            personnel: {
            display: {en: "Necropsy Record - Response Person",zh: "????????????(?????????)",
            placeholder:"Please specify"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 100
            },
            length: {
            display: {en: "Necropsy Record - Length",zh: "????????????(??????)",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "decimal",
            size:4,datalen: 0
            },
            weight: {
            display: {en: "Necropsy Record - Weight",zh: "????????????(??????)",
            placeholder:"Please specify (insert number)/NA"},
            requires: false,
            datatype: "decimal",
            size:4,datalen: 0
            },
            comments: {
            display: {en: "Necropsy Record - Comments",zh: "????????????(??????)",
            placeholder:"Please specify"},
            requires: false,
            datatype: "text",
            size:4,datalen: 65535
            }
        }
        },
        pulmonary: {
        info: {
            display: {
            en: "Pulmonary",
            zh: "??????"
            }
        },
        columns: {
            trachea: {
            display: {en: "Trachea", zh: "??????",
            placeholder:"Please specify /NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            lungs: {
            display: {en: "Lungs", zh: "???",
            placeholder:"Please specify /NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            rLung: {
            display: {en: "Right Lung", zh: "??????",
            placeholder:"Please specify /NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            lLung: {
            display: {en: "Left Lung", zh: "??????",
            placeholder:"Please specify /NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            pharTonsils: {
            display: {en: "Tonsil", zh: "?????????",
            placeholder:"Please specify /NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            glottis: {
            display: {en: "Glottis", zh: "??????",
            placeholder:"Please specify /NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            }
        }
        },
        urinary: {
        info: {
            display: {en: "Urinary", zh: "???"}
        },
        columns: {
            kidneys: {
            display: {en: "Kidneys", zh: "??????",
            placeholder:"Please specify /NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            rKidneys: {
            display: {en: "Right Kidneys", zh: "??????",
            placeholder:"Please specify /NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            lKidneys: {
            display: {en: "Left Kidneys", zh: "??????",
            placeholder:"Please specify /NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            bladder: {
            display: {en: "Bladder", zh: "??????",
            placeholder:"Please specify /NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            testes: {
            display: {en: "Testes", zh: "??????",
            placeholder:"Please specify /NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            rTestes: {
            display: {en: "Right Testes", zh: "?????????",
            placeholder:"Please specify /NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            lTestes: {
            display: {en: "Left Testes", zh: "?????????",
            placeholder:"Please specify /NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            penis: {
            display: {en: "Penis", zh: "??????",
            placeholder:"Please specify /NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            skeletal: {
            display: {en: "Skeletal", zh: "??????",
            placeholder:"Please specify /NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            vertebrae: {
            display: {en: "Vertebrae", zh: "??????",
            placeholder:"Please specify /NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            joints: {
            display: {en: "Joints", zh: "??????",
            placeholder:"Please specify /NA"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            }
        }
        },
        virtopsy: {
        info: {
            display: {en: "Virtopsy", zh: "????????????"},
        },
        columns: {
            scanDate: {
            display: {en: "Scan Date", zh: "????????????",
            placeholder:"Please select scannign date"},
            requires: false,
            datatype: "date",
            size:2,datalen: 0
            },
            scanTime: {
            display: {en: "Scan Time", zh: "????????????",
            placeholder:"Please select scanning time"},
            requires: false,
            datatype: "time",
            size:2,datalen: 0
            },
            COD: {
            display: {en: "Cause of Death", zh: "??????",
            placeholder:"Please brief the cause of death"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 200
            },
            personnel: {
            display: {en: "Personnel", zh: "?????????",
            placeholder:"Please insert response person"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 100
            },
            code: {
            display: {en: "Condition Code", zh: "??????",
            placeholder:"Please select condition code"},
            requires: false,
            datatype: "char",
            size:4,datalen: 1,options:_MOBJDEFVAL.condition
            },
            modaUsed: {
            display: {en: "Modal Used", zh: "????????????",
            placeholder:"Please insert modal used"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 30
            },
            comments: {
            display: {en: "Comments", zh: "??????",
            placeholder:"Please Brief"},
            requires: false,
            datatype: "text",
            size:4,datalen: 65535
            },
            dicomPath: {
            display: {en: "Dicom Path", zh: "CT????????????",
            placeholder:"Please copy the path of CT Scan files"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 150
            },
            position: {
            display: {en: "Position", zh: "??????",
            placeholder:"Please insert a position"},
            requires: false,
            datatype: "varchar",
            size:4,datalen: 400
            }
        }
        }
    }
}

const NormalType = {
    info:{
      displap:{
        en:"Marine Mammal"
      }
    },
    getAttributesList:function(){
      var _rtn = {};
      var editor = NormalType.editor;
      for(var i in editor){
        var content = editor[i].content;
        for(var j in content){
          var table   = content[j].table;
          var rows    = content[j].rows;
          var optional= fs.isEmpty(content[j].optional)?null:content[j].optional;
          if(rows=="ALL"){
            _rtn[table] = marineObj.getColumns(table);
          }else{
            _rtn[table] = [];
            for(var k in rows){
              var row = rows[k];
              for(var l in row){
                var col = row[l].col;
                if(fs.isEmpty(col.datatype)){
                  _rtn[table][_rtn[table].length] = col;
                }else{
                  _rtn[table][_rtn[table].length] = col.datatype;
                }
              }
            }
            for(var k in optional){
              var row = optional[k];
              for(var l in row){
                var col = row[l].col;
                if(fs.isEmpty(col.datatype)){
                  _rtn[table][_rtn[table].length] = col;
                }else{
                  _rtn[table][_rtn[table].length] = col.datatype;
                }
              }
            }
          }
        }
      }
      return _rtn;
    },
    getAttributesListArray:function(){
      var _rtn = [];
      var editor = NormalType.editor;
      for(var i in editor){
        var content = editor[i].content;
        var currIdx = _rtn.length;
        _rtn[currIdx] = {};
        for(var j in content){
          var table   = content[j].table;
          _rtn[currIdx][j] = {};
          _rtn[currIdx][j]['table'] = table;
          var rows    = content[j].rows;
          var optional= fs.isEmpty(content[j].optional)?null:content[j].optional;
          if(rows=="ALL"){
            _rtn[currIdx][j]['columns'] = marineObj.getColumns(table);
          }else{
            _rtn[currIdx][j]['columns'] = [];
            for(var k in rows){
              var row = rows[k];
              for(var l in row){
                var col = row[l].col;
                if(fs.isEmpty(col.datatype)){
                  _rtn[currIdx][j]['columns'][_rtn[currIdx][j]['columns'].length] = col;
                }else{
                  _rtn[currIdx][j]['columns'][_rtn[currIdx][j]['columns'].length] = col.datatype;
                }
              }
            }
            for(var k in optional){
              var row = optional[k];
              for(var l in row){
                var col = row[l].col;
                if(fs.isEmpty(col.datatype)){
                  _rtn[currIdx][j]['columns'][_rtn[currIdx][j]['columns'].length] = col;
                }else{
                  _rtn[currIdx][j]['columns'][_rtn[currIdx][j]['columns'].length] = col.datatype;
                }
              }
            }
          }
        }
      }
      return _rtn;
    },
    editor:[
            { 
              display:{
                table:"strandingreport",
              },content:[
                {
                  table:"strandingreport",
                  rows:[
                    [{ col:"sid",size:4 }],
                    [{ col:"species",size:2 },{ col:"specSpecific",size:2 }],
                    [{ col:"ageClass",size:2 },{ col:"sex",size:1 },{ col:"frozen",size:1 }],
                    [{ col:"length",size:2 },{ col:"weight",size:2 }],
                    [{ col:"straDate",size:2 },{ col:"straTime",size:2 }],
                    [{ col:{ 
                          display:{en:"Location and Address",zh:"????????????"},
                          content:[ "latiDegree" ,"latiMinute","latiSecond","latiDirection",
                                    "longDegree" ,"longMinute","longSecond","longDirection",
                                    "region","location","position"],
                          datatype:"location" },
                       size:4
                    }],
                  ],
                  optional:[
                    [{ col:"windDirection",size:2 },{ col:"windSpeed",size:2 }],
                    [{ col:"personnel",size:4 }],
                    [{ col:"comments",size:4 }],
                  ]
                }
              ]
            }, {
              display:{ table:"caseconclusion" },
              content:[
                { 
                  table:"caseconclusion",
                  rows:"ALL"
                }
              ]
            }, {
              display:{
                table:"morphometric",
              },
              content:[
                { 
                  table:"morphometric",
                  rows:"ALL"
                },{ 
                  table:"ridge",
                  rows:"ALL"
                },{ 
                  table:"girth",
                  rows:"ALL"
                },{ 
                  table:"head",
                  rows:"ALL"
                },{ 
                  table:"flipper",
                  rows:"ALL"
                },{ 
                  table:"fluke",
                  rows:"ALL"
                },{ 
                  table:"blubber",
                  rows:"ALL"
                },{
                  table:"external",
                  rows:"ALL"
                },{ 
                  table:"other",
                  rows:"ALL"
                }
              ]
            }, {
              display:{ en:"Anatomy",zh:"??????" },
              content:[
                { 
                  table:"circulatory",
                  rows:"ALL"
                },{ 
                  table:"endocrine",
                  rows:"ALL"
                },{ 
                  table:"gastrointestinal",
                  rows:"ALL"
                },{ 
                  table:"lymphatic",
                  rows:"ALL"
                },{ 
                  table:"pulmonary",
                  rows:"ALL"
                }
              ]
            }, {
              display:{ en:"Necropsy",zh:"??????" },
              content:[
                { 
                  table:"necropsyothers",
                  rows:"ALL"
                },{ 
                  table:"necropsyrecord",
                  rows:"ALL"
                }
              ]
            }, {
              display:{ table:"virtopsy" },
              content:[
                { 
                  table:"virtopsy",
                  rows:"ALL"
                }
              ]
            }
        ]
}

