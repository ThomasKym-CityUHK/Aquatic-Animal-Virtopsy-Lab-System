// Global Varible

//User Setting
var user = [];

//Report Form Global Var
var _GB_CONFIG_FROM_VAR = {};
var _GB_DATASET_FROM_VAR = [];

/***********NEW DASHBOARD EDITOR*************/
var _NEW_DISPLAY_CONFIG = {
  row:false,id:0
};
var _GB_DASHBOARD_EDITOR_VARS = {
  TYPE:"",CONFIG:{},DATASET:[]
};

/* 
**general**
DATASET:[
  { 
    main:{
      data:"table^column",
    },
    subs:[
      {data:"table^column"}
    ],
    rule:[
      {data:"table^column",operator:"opt",params:["",...]}
    ]
  },{...}...
];
**tl-table list**
DATASET:[
  { 
    main:{
      data:"table^column",
    },
    subs:[],
    rule:[]
  },{...}...
];

*/
//System Var
var maps         = {};
var tables        = {};

var uploads       = {};
var uploadBuffers= {};
var uploadBuffers_Server= {};

var _gb_ret     = {};

$.fn.dataTable.ext.errMode = 'none';


var semantic = {}
semantic.button = {};
// ready event
semantic.button.ready = function() {
    // selector cache
    var $togglebuttons = $('.toggle.button');
    // alias
    handler = {
      activate: function() {
          $(this).toggleClass("basic");
      }
    };
    $togglebuttons.on('click', handler.activate);
};

// attach ready event
$(document).ready(semantic.button.ready);