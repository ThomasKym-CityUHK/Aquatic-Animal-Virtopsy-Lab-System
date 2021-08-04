const INF = 999999999;
const ZERO= 0;

const _NUMBER = "number";
const _STRING = "text";
const _LONGSTR= "textarea";
const _DATETIME= "date";
const _TIME= "time";


const _SINGEL = 0;
const _BETWEEN = 1;
const _MULTI= 2;

const _SERNAME = "Aquatic Animal Virtopsy Lab System";
const _SERDIR = "http://localhost:8888/AquaticAnimalVirtopsyLabSystem";
const _BACKEND = "backend";
const _REQURL  = "request.php";

const _REQPATH = _SERDIR+"/"+_BACKEND+"/"+_REQURL;
const _REQPATH_DATA = _SERDIR+"/"+_BACKEND+"/"+"reportData.php";
const _REQPATH_CHARTS = _SERDIR+"/"+_BACKEND+"/"+"chartsData.php";
const _REQPATH_FILESHANDLE = _SERDIR+"/"+_BACKEND+"/"+"fileController.php";
const _REQPATH_DASHBOARD = _SERDIR+"/"+_BACKEND+"/"+"dashboardRequest.php";

const TRUE  = true;const ACTIVE = true;const ON = true;

const FALSE = false;const OFF = false;


const FILT_TYPE = {
  image:{ path:"asserts/system/system/image.png"},
  photo:{ path:"asserts/system/system/image.png"},
  pdf:{ path:"asserts/system/system/pdf.png"},
  word:{ path:"asserts/system/system/word.png"},
  excel:{ path:"asserts/system/system/excel.png"},
  text:{ path:"asserts/system/system/text.png"},
  dicom:{ path:"asserts/system/system/dicom.png"},
  video:{ path:"asserts/system/system/video.png"},
  zip:{ path:"asserts/system/system/zip.png"},
  unknow:{ path:"asserts/system/system/unknow.png"},
}

const COLOR_TONE = { 
    default:{
      name:"Default",
      set:[
        'rgba(249, 65, 68,0.6)','rgba(243,114, 44,0.6)',
        'rgba(248,150, 30,0.6)','rgba(249,132, 74,0.6)',
        'rgba(249,199, 79,0.6)','rgba(144,190,109,0.6)',
        'rgba( 67,170,139,0.6)','rgba( 77,144,142,0.6)',
        'rgba( 87,117,144,0.6)','rgba( 39,125,161,0.6)'
    ],setNoAlpha:[
      'rgb(249, 65, 68)','rgb(243,114, 44)',
      'rgb(248,150, 30)','rgb(249,132, 74)',
      'rgb(249,199, 79)','rgb(144,190,109)',
      'rgb( 67,170,139)','rgb( 77,144,142)',
      'rgb( 87,117,144)','rgb( 39,125,161)'
  ]},
    warm6colors:{
      name:"Warm Tone (6 Colors)",
      set:[
        'rgba(203,153,126,0.6)','rgba(221,190,169,0.6)',
        'rgba(255,232,214,0.6)','rgba(183,183,164,0.6)',
        'rgba(165,165,141,0.6)','rgba(107,112,92 ,0.6)'
      ],setNoAlpha:[
        'rgb(203,153,126)','rgb(221,190,169)',
        'rgb(255,232,214)','rgb(183,183,164)',
        'rgb(165,165,141)','rgb(107,112,92 )'
      ]},
    blueTone:{
      name:"Blue Tone",
      set:[
      'rgba(3, 4, 94,0.4)','rgba(2, 62, 138,0.4)',
      'rgba(0, 119, 182,0.4)','rgba(0, 150, 199,0.4)',
      'rgba(0, 180, 216,0.4)','rgba(72, 202, 228,0.4)',
      'rgba(144, 224, 239,0.4)','rgba(173, 232, 244,0.4)',
      'rgba(202, 240, 248,0.4)'
    ],setNoAlpha:[
      'rgb(3, 4, 94)','rgb(2, 62, 138)',
      'rgb(0, 119, 182)','rgb(0, 150, 199)',
      'rgb(0, 180, 216)','rgb(72, 202, 228)',
      'rgb(144, 224, 239)','rgb(173, 232, 244)',
      'rgb(202, 240, 248)'
    ]},
    coldTone:{
      name:"Cold Tone",
      set:[
      'rgba(247, 37, 133,0.4)','rgba(181, 23, 158,0.4)',
      'rgba(114, 9, 183,0.4)','rgba(86, 11, 173,0.4)',
      'rgba(72, 12, 168,0.4)','rgba(58, 12, 163,0.4)',
      'rgba(63, 55, 201,0.4)','rgba(67, 97, 238,0.4)',
      'rgba(72, 149, 239,0.4)','rgba(76, 201, 240,0.4)'
    ],setNoAlpha:[
      'rgb(247, 37, 133)','rgb(181, 23, 158)',
      'rgb(114, 9, 183)','rgb(86, 11, 173)',
      'rgb(72, 12, 168)','rgb(58, 12, 163)',
      'rgb(63, 55, 201)','rgb(67, 97, 238)',
      'rgb(72, 149, 239)','rgb(76, 201, 240)'
    ]}
}
const MONTH = [
  { full:'January'  , simp:'Jan',nums:'01' },
  { full:'February' , simp:'Feb',nums:'02' },
  { full:'March'    , simp:'Mar',nums:'03' },
  { full:'April'    , simp:'Apr',nums:'04' },
  { full:'May'      , simp:'May',nums:'05' },
  { full:'June'     , simp:'Jun',nums:'06' },
  { full:'July'     , simp:'Jul',nums:'07' },
  { full:'August'   , simp:'Aug',nums:'08' },
  { full:'September', simp:'Sep',nums:'09' },
  { full:'October'  , simp:'Oct',nums:'10' },
  { full:'November' , simp:'Nov',nums:'11' },
  { full:'December' , simp:'Dec',nums:'12' }
]
const SIZE = {
  0:"",  1:"one",2:"two",3:"three",4:"four",5:"five",6:"six",7:"seven",8:"eight",9:"nine",10:"ten",
  11:"eleven",12:"twelve",13:"thirteen",14:"fourteen",15:"fifteen", 16:"sixteen"
}
const TSIZE = {
  0:"mini",  1:"tiny",2:"small",3:"large",4:"big",5:"huge",6:"massive",
  mini:"mini",  tiny:"tiny",small:"small",large:"large",big:"big",huge:"huge",massive:"massive",
  
}
const SYSSTYLES = {
  primary:"primary",secondary:"secondary",basic:"basic",default:"primary",
  0:"",1:"primary",2:"secondary",3:"basic"
}
const SYSCOLORS = {
  0:"",1:"primary",2:"secondary",3:"basic",4:"teal",
  5:"yellow",6:"orange",7:"green",8:"teal",9:"blue",10:"purple",11:"pink",12:"red",13:"black",
  primary:"primary",secondary:"secondary",basic:"basic",
  yellow:"yellow",orange:"orange",green:"green",teal:"teal",blue:"blue",purple:"purple",pink:"pink",red:"red",black:"black",white:"basic",default:"primary"
}
const COLORSARRAY=[
  {name:"Red",val:"red"},{name:"Orange",val:"orange"},{name:"Red",val:"yellow"},{name:"Olive",val:"olive"},{name:"Green",val:"green"},
  {name:"Teal",val:"teal"},{name:"Blue",val:"blue"},{name:"Violet",val:"violet"},{name:"Purple",val:"purple"},{name:"Pink",val:"pink"},
  {name:"Brown",val:"brown"},{name:"Grey",val:"grey"},{name:"Black",val:"black"},{name:"Default",val:"default"}
]
const NUM2WORD = {
  humanize:function(num){
    var ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
                'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
                'seventeen', 'eighteen', 'nineteen'];
    var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty',
                'ninety'];
  
    var numString = num.toString();
  
    if (num < 0) throw new Error('Negative numbers are not supported.');
  
    if (num === 0) return 'zero';
  
    //the case of 1 - 20
    if (num < 20) {
      return ones[num];
    }
  
    if (numString.length === 2) {
      return tens[numString[0]] + ' ' + ones[numString[1]];
    }
  
    //100 and more
    if (numString.length == 3) {
      if (numString[1] === '0' && numString[2] === '0')
        return ones[numString[0]] + ' hundred';
      else
        return ones[numString[0]] + ' hundred and ' + convert(+(numString[1] + numString[2]));
    }
  
    if (numString.length === 4) {
      var end = +(numString[1] + numString[2] + numString[3]);
      if (end === 0) return ones[numString[0]] + ' thousand';
      if (end < 100) return ones[numString[0]] + ' thousand and ' + convert(end);
      return ones[numString[0]] + ' thousand ' + convert(end);
    }
  }
}

