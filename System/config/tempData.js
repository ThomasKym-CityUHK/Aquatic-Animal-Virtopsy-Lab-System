var sampleUserData = {
  authorization:{
    id:"tk000",
    uid:"tk000",
    username:"Thomas Kun",
    authlevel: 9999
  },
  config:{
    dashboard:{
      items:{
        "1624969945360": {
          id: "1624969945360", title: "All Cases", type: "mv", description: "Show all marine mammal cases in map", component: {
            TYPE: "mv", CONFIG: {
              title: "All Cases", descr: "Show all marine mammal cases in map", gsize: 4, color: "black",
              search: true, showmm: true, showba: false
            }, DATASET: {
              rule: []
            }
          }
        },
        "1626117023823": {
          "id": "1626117023823",
          "title": "Test",
          "type": "fu",
          "description": "Test FU Component",
          "component": {
            "TYPE": "fu",
            "CONFIG": {
              "title": "Test",
              "descr": "Test FU Component",
              "gsize": "2",
              "color": "red",
              "case": "SC15-0103",
              "search": false
            },
            "DATASET": []
          }
        },
        "1626118036142": {
          "id": "1626118036142",
          "title": "Test",
          "type": "ce",
          "description": "Test CE Component",
          "component": {
            "TYPE": "ce",
            "CONFIG": {
              "title": "Test",
              "descr": "Test CE Component",
              "gsize": "2",
              "color": "red"
            },
            "DATASET": {
              "showData": [
                "0^strandingreport^sid",
                "0^strandingreport^specSpecific",
                "0^strandingreport^ageClass",
                "1^caseconclusion^comments",
                "1^caseconclusion^COD",
                "1^caseconclusion^CODVerified",
                "2^morphometric^m1",
                "2^morphometric^m2",
                "2^morphometric^m2b",
                "2^morphometric^m3",
                "2^morphometric^m3b",
                "2^morphometric^m4",
                "2^morphometric^m5",
                "2^morphometric^m6",
                "2^morphometric^m7",
                "2^morphometric^m8",
                "2^morphometric^m9",
                "2^morphometric^m10m",
                "2^morphometric^m10f",
                "2^morphometric^m11",
                "2^morphometric^m12",
                "2^ridge^m14",
                "2^ridge^m14b",
                "2^ridge^m15",
                "2^ridge^m16",
                "2^ridge^m16b",
                "2^girth^m17",
                "2^girth^m18",
                "2^girth^m19",
                "2^girth^m20",
                "2^girth^m21",
                "2^girth^m22m",
                "2^girth^m22f",
                "2^girth^m23",
                "2^head^m24",
                "2^head^m25",
                "2^head^m26",
                "2^head^m27",
                "2^head^m28",
                "2^flipper^m29",
                "2^flipper^m30",
                "2^flipper^m31",
                "2^flipper^m32",
                "2^fluke^m33",
                "2^fluke^m34",
                "2^fluke^m35",
                "2^fluke^m36",
                "2^fluke^m37",
                "2^blubber^mA1",
                "2^blubber^mA2",
                "2^blubber^mA3",
                "2^blubber^mB1",
                "2^blubber^mB2",
                "2^blubber^mB3",
                "2^blubber^mC1",
                "2^blubber^mC2",
                "2^blubber^mC3",
                "2^external^oBodyScore",
                "2^external^cBodyScore",
                "2^external^wounds",
                "2^external^lesions",
                "2^external^parasites",
                "2^external^nostrils",
                "2^external^oralCavity",
                "2^external^tongue",
                "2^external^eyes",
                "2^external^ears",
                "2^external^mammary",
                "2^external^anus",
                "2^other^mUL",
                "2^other^mLL",
                "2^other^mUR",
                "2^other^mLR",
                "2^other^mLMSL",
                "2^other^mLMSR",
                "2^other^m13",
                "2^other^mIWD",
                "2^other^mD",
                "2^other^mLOO"
              ]
            }
          }
        },
        "1626178264390": {
          "id": "1626178264390",
          "title": "Test FM Component",
          "type": "fm",
          "description": "Test FM Component",
          "component": {
            "TYPE": "fm",
            "CONFIG": {
              "title": "Test FM Component",
              "descr": "Test FM Component",
              "gsize": "2",
              "color": "red",
              "search": true,
              "filetype": "own"
            },
            "DATASET": []
          }
        },
        "1626180328262": {
          "id": "1626180328262",
          "title": "Test Table Component",
          "type": "tl",
          "description": "Test Table Component",
          "component": {
            "TYPE": "tl",
            "CONFIG": {
              "title": "Test Table Component",
              "descr": "Test Table Component",
              "gsize": "4",
              "color": "red",
              "search": true,
              "add": true,
              "edit": true,
              "delete": true
            },
            "DATASET": {
              "showData": [
                "strandingreport^sid",
                "girth^m17",
                "head^m24",
                "fluke^m33",
                "caseconclusion^CODVerified",
                "circulatory^pericardial",
                "circulatory^heart"
              ],
              "rule": [
                {
                  "data": "strandingreport^species",
                  "operator": "=",
                  "params": ["NP"]
                },
                {
                  "data": "strandingreport^sex",
                  "operator": "IN",
                  "params": ["F","M"]
                }
              ]
            }
          }
        },
        "1626187033712": {
          "id": "1626187033712",
          "title": "Stranding Cases (SC)",
          "type": "mv",
          "description": "Show all SC cases in map",
          "component": {
            "TYPE": "mv",
            "CONFIG": {
              "title": "Stranding Cases (SC)",
              "descr": "Show all SC cases in map",
              "gsize": "4",
              "color": "black",
              "search": true,
              "showmm": true,
              "showba": false
            },
            "DATASET": {
              "rule": [
                {
                  "data": "strandingreport^species",
                  "operator": "IN",
                  "params": [
                    "SC",
                    "NP"
                  ]
                }
              ]
            }
          }
        },
        "1626193069646": {
          "id": "1626193069646",
          "title": "Test Statistic with detail",
          "type": "stat",
          "description": "Test Statistic with detail",
          "component": {
            "TYPE": "stat",
            "CONFIG": {
              "title": "Test Statistic with detail",
              "descr": "Test Statistic with detail",
              "gsize": "1",
              "color": "orange",
              "shdtl": true
            },
            "DATASET": [
              {
                "main": {
                  "maindt": "strandingreport^sid",
                  "dispOpts": [],
                  "groupvalue": false
                },
                "rule": [
                  {
                    "data": "strandingreport^species",
                    "operator": "=",
                    "params": [
                      "NP"
                    ]
                  }
                ],
                "subs": []
              }
            ]
          }
        },
        "1626202868217": {
          "id": "1626202868217",
          "title": "Species & Gender bar chart",
          "type": "lb",
          "description": "Bar Chart of Species & Gender Relationship",
          "component": {
            "TYPE": "lb",
            "CONFIG": {
              "title": "Species & Gender bar chart",
              "descr": "Bar Chart of Species & Gender Relationship",
              "gsize": "4",
              "color": "default"
            },
            "DATASET": [
              {
                "main": {
                  "maindt": "strandingreport^species",
                  "graptype": "bar",
                  "dispOpts": [],
                  "groupvalue": false
                },
                "rule": [
                  {
                    "data": "strandingreport^ageClass",
                    "operator": "=",
                    "params": [
                      "Calf"
                    ]
                  }
                ],
                "subs": [
                  {
                    "subdt": "strandingreport^sex",
                    "graptype": "bar",
                    "dispOpts": [],
                    "groupvalue": false
                  }
                ]
              }
            ]
          }
        }
        
      },
      display:[
        ["1624969945360","1626180328262","1626187033712"],["1626117023823","1626178264390"],["1626118036142","1626193069646","1626193069646"]
      ]

    },
    strandingcases:{
      "datashows":["strandingreport^sid","strandingreport^species","strandingreport^straDate","strandingreport^ageClass","strandingreport^code","strandingreport^length","strandingreport^weight"]}
  }
};

/**
 * {
 *    "dashboard":{
 *        "items":{
 *            "1624969945360":{"id":"1624969945360","title":"Test Statistics 01","size":"1","type":"stat","color":"primary","showDetail":"on","center":"on","draggable":"on","data":[{"main":{"table":"strandingreport","column":"sid","ptype":"COUNT","isGrouped":false,"dataset":[""],"rules":[]},"sub":[]}],"datasets":{"data":[295]}},
 *            "1624970033236":{"id":"1624970033236","title":"Marine Case (Sex is M)","size":"2","type":"stat","color":"red","showDetail":"on","center":"on","draggable":"on","data":[{"main":{"table":"strandingreport","column":"sid","ptype":"COUNT","isGrouped":false,"dataset":[""],"rules":[{"table":"strandingreport","column":"sex","operator":"=","params":["M"]}]},"sub":[]}],"datasets":{"data":[120]}},
 *            "1624970114907":{"id":"1624970114907","title":"Species(NP)","size":"1","type":"stat","color":"orange","showDetail":"on","center":"on","draggable":"on","data":[{"main":{"table":"strandingreport","column":"sid","ptype":"COUNT","isGrouped":false,"dataset":[""],"rules":[{"table":"strandingreport","column":"species","operator":"=","params":["NP"]}]},"sub":[]}],"datasets":{"data":[204]}},
 *            "1624970196698":{"id":"1624970196698","title":"Age Class (Bar Chart)","size":"4","type":"lb","color":"coldTone","showDetail":true,"center":"on","draggable":"on","data":[{"main":{"table":"strandingreport","column":"ageClass","gtype":"bar","ptype":"COUNT","isGrouped":false,"dataset":[""],"rules":[]},"sub":[]}],"datasets":{"mainlabel":[null,"?","Adult","Calf","Juvenile","Juvenile /","Juvenile/S","Neonate","Sub-adult","Subadult","TBC","Unknown"],"data":[[0],[0,23],[0,0,81],[0,0,0,25],[0,0,0,0,61],[0,0,0,0,0,2],[0,0,0,0,0,0,1],[0,0,0,0,0,0,0,28],[0,0,0,0,0,0,0,0,38],[0,0,0,0,0,0,0,0,0,2],[0,0,0,0,0,0,0,0,0,0,3],[0,0,0,0,0,0,0,0,0,0,0,6]],"label":["COUNT","COUNT","COUNT","COUNT","COUNT","COUNT","COUNT","COUNT","COUNT","COUNT","COUNT","COUNT"],"type":["bar","bar","bar","bar","bar","bar","bar","bar","bar","bar","bar","bar"]}},
 *            "1625835568185":{"id":"1625835568185","title":"Test Bar Chart","size":"4","type":"lb","color":"default","showDetail":true,"center":"on","draggable":"on","data":[{"main":{"table":"strandingreport","column":"sex","gtype":"bar","ptype":"COUNT","isGrouped":false,"dataset":[""],"rules":[]},"sub":[{"table":"strandingreport","column":"ageClass","gtype":"bar","ptype":"COUNT","isGrouped":false,"dataset":[""]}]}]}
 *        },
 *        "display":[["1624970114907","1624970114907","1624970114907"],["1625835568185"],[]]
 *    },
 * 
 *    "strandingcases":{"datashows":["strandingreport^sid","strandingreport^straDate","strandingreport^location","strandingreport^sex","strandingreport^length","strandingreport^weight"]}}
**/

var colors = fs.getColors(COLOR_TONE.coldTone.set,8);
var testdata = {
    datasets: [{
        label: 'Bar Dataset',
        data: [10, 20, 30, 40, 30, 42, 12, 50],
        type: 'bar',
        backgroundColor: colors,
        borderColor: colors
    }, {
        label: 'Line Dataset',
        data: [30, 42, 12, 50, 30, 42, 12, 50],
        type: 'line',
        backgroundColor: colors,
        borderColor: colors
    }],
    labels: ['January', 'February', 'March', 'April','January', 'February', 'March', 'April']
}

var testOptions = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            },
            gridLines:{
                display:false
            }
        }],
        xAxes:[{
            gridLines:{
                display:true
            }
        }]
    },
    maintainAspectRatio: false,
    aspectRatio:1
};
const Pdata = [
    {x: 'Jan', net: 100, cogs: 50, gm: 50}, 
    {x: 'Feb', net: 120, cogs: 55, gm: 75}, 
    {x: 'Feb', net: 120, cogs: 55, gm: 75}, 
    {x: 'Feb', net: 120, cogs: 55, gm: 75}
];
const Pcfg = {
    type: 'line',
    data: {
        labels: Pdata.map(o => o.x),
        datasets: [{
            label: 'Net sales',
            data: Pdata.map(o => o.net),
            backgroundColor: colors[0],
            borderColor: colors[0]
        }, {
            type: 'line',
            label: 'Cost of goods sold',
            data: Pdata.map(o => o.cogs),
            backgroundColor: colors[1],
            borderColor: colors[1]
        }, {
            type:'bar',
            label: 'Gross margin',
            data: Pdata.map(o => o.gm),
            backgroundColor: colors[2],
            borderColor: colors[2]
        }]
    },
    options:testOptions
};

var testdata2 = {
    datasets: [{
        label: 'Bar Dataset',
        data: [10, 20, 30, 40, 30, 42, 12, 50],
        type: 'bar',
        backgroundColor: colors,
        borderColor: colors
    }, {
        label: 'Line Dataset',
        data: [30, 42, 12, 50, 30, 42, 12, 50],
        type: 'line',
        backgroundColor: colors,
        borderColor: colors
    }],
    labels: ['January', 'February', 'March', 'April','January', 'February', 'March', 'April']
}
const tempDataSet = {
  barChart:{
    type:"lb",
    configs:{
      id:"lb-20210517120700110",
      title:"Test Line Chart",
      size:8,
      color:"default",
      center:true,
      draggable:false
    },data:[
        {
          main:{
            table:"strandingreport",
            column:"species",
            type:"bar",
            presentType:"count",
            sets:["NP","SC"],
            rules:[]
          },
          sub:[]
        },
        {
          main:{
            table:"strandingreport",
            column:"species",
            type:"bar",
            presentType:"count",
            sets:["OT"],
            rules:[
              { table:"strandingreport",column:"created_at",operator:">=",values:["2000-01-01"] },
              { table:"strandingreport",column:"frozen",operator:"==",values:["Y"] },
              { table:"strandingreport",column:"ageClass",operator:"IN",values:["1","2","3","4"] }
            ]
          },
          sub:[
            {
              table:"strandingreport",
              column:"sex",
              presentType:"count",
              sets:[]
            }
          ]
        }
      ]
  },
  lineChart:{},
  mixChart:{},
  stat:{},
  
  dashboard:{}
}

var tempDataSetFormData = [
  {
    id:0,title:"Main Data"
  }
]




var testdatatmp = {
  datasets: [{
      label: 'Bar Dataset',
      data: [10, 20, 30, 0, 0, 0],
      backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
      ]
  },{
      label: 'Bar Dataset',
      data: [20, 10, 50, 0, 0, 0],
      backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
      ]
  },{
      label: 'Bar Dataset',
      data: [50, 30, 10, 0, 0, 0],
      backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
      ]
  }, {
      label: 'Bar Dataset',
      data: [0, 0, 0,25, 100, 50],
      backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
      ]
  }, {
      label: 'Line Dataset',
      data: [30, 42, 12, 50, 30, 42, 12],
      // Changes this dataset to become a line
      type: 'line',
      backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
      ]
  }],
  labels: ['M1-A', 'M1-B', 'M1-C', 'M2','M3-A','M3-B']
}

var testOptionstmp = {
  scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          },
          gridLines:{
              display:false
          }
      }],
      xAxes:[{
          gridLines:{
              display:true
          }
      }]
  },
  maintainAspectRatio: false,
  aspectRatio:1
};



/**
 * 
 *
 * ['mA1','blubber','decimal','','YES']
 *  
 * 
 **/



tempMMData= {
  "strandingreport^sid": "NP02-131/",
  "strandingreport^species": "NP",
  "strandingreport^specSpecific": null,
  "strandingreport^straDate": "0000-00-00",
  "strandingreport^straTime": null,
  "strandingreport^latiDegree": "22",
  "strandingreport^latiMinute": "18",
  "strandingreport^latiSecond": "28.4",
  "strandingreport^latiDirection": "N",
  "strandingreport^longDegree": "114",
  "strandingreport^longMinute": "17",
  "strandingreport^longSecond": "26.0",
  "strandingreport^longDirection": "E",
  "strandingreport^region": "Hong Kong",
  "strandingreport^location": "Sheung Sze Wan Beach",
  "strandingreport^position": null,
  "strandingreport^ageClass": "Calf",
  "strandingreport^code": "4",
  "strandingreport^sex": "F",
  "strandingreport^length": "90.0",
  "strandingreport^weight": null,
  "strandingreport^personnel": "Dr Nathalie Mauroo",
  "strandingreport^comments": null,
  "strandingreport^frozen": null,
  "strandingreport^windDirection": null,
  "strandingreport^windSpeed": null,
  "morphometric^m1": null,
  "morphometric^m2": null,
  "morphometric^m2b": null,
  "morphometric^m3": null,
  "morphometric^m3b": null,
  "morphometric^m4": null,
  "morphometric^m5": null,
  "morphometric^m6": null,
  "morphometric^m7": null,
  "morphometric^m8": null,
  "morphometric^m9": null,
  "morphometric^m10m": null,
  "morphometric^m10f": null,
  "morphometric^m11": null,
  "morphometric^m12": null,
  "ridge^m14": null,
  "ridge^m14b": null,
  "ridge^m15": null,
  "ridge^m16": null,
  "ridge^m16b": null,
  "girth^m17": null,
  "girth^m18": null,
  "girth^m19": null,
  "girth^m20": null,
  "girth^m21": null,
  "girth^m22m": null,
  "girth^m22f": null,
  "girth^m23": null,
  "head^m24": null,
  "head^m25": null,
  "head^m26": null,
  "head^m27": null,
  "head^m28": null,
  "flipper^m29": null,
  "flipper^m30": null,
  "flipper^m31": null,
  "flipper^m32": null,
  "fluke^m33": null,
  "fluke^m34": null,
  "fluke^m35": null,
  "fluke^m36": null,
  "fluke^m37": null,
  "blubber^mA1": null,
  "blubber^mA2": null,
  "blubber^mA3": null,
  "blubber^mB1": null,
  "blubber^mB2": null,
  "blubber^mB3": null,
  "blubber^mC1": null,
  "blubber^mC2": null,
  "blubber^mC3": null,
  "other^mUL": null,
  "other^mLL": null,
  "other^mUR": null,
  "other^mLR": null,
  "other^mLMSL": null,
  "other^mLMSR": null,
  "other^m13": null,
  "other^mIWD": null,
  "other^mD": null,
  "other^mLOO": null,
  "caseconclusion^comments": null,
  "caseconclusion^COD": null,
  "caseconclusion^CODVerified": null,
  "circulatory^pericardial": null,
  "circulatory^heart": null,
  "endocrine^adreGlands": null,
  "endocrine^brain": null,
  "endocrine^pituGland": null,
  "gastrointestinal^esophagus": null,
  "gastrointestinal^stomach": null,
  "gastrointestinal^foreStomach": null,
  "gastrointestinal^fundStomach": null,
  "gastrointestinal^pyloStomach": null,
  "gastrointestinal^intestines": null,
  "gastrointestinal^liver": null,
  "gastrointestinal^pancreas": null,
  "lymphatic^spleen": null,
  "lymphatic^lympNodes": null,
  "external^oBodyScore": null,
  "external^cBodyScore": null,
  "external^wounds": null,
  "external^lesions": null,
  "external^parasites": null,
  "external^nostrils": null,
  "external^oralCavity": null,
  "external^tongue": null,
  "external^eyes": null,
  "external^ears": null,
  "external^mammary": null,
  "external^anus": null,
  "musculo^blubber": null,
  "musculo^muscle": null,
  "necropsyothers^thorCavity": null,
  "necropsyothers^periCavity": null,
  "necropsyothers^thyroid": null,
  "necropsyothers^parathyroid": null,
  "necropsyothers^thymus": null,
  "necropsyothers^sample": null,
  "necropsyrecord^sex": null,
  "necropsyrecord^ageClass": null,
  "necropsyrecord^code": null,
  "necropsyrecord^necrDate": null,
  "necropsyrecord^COD": null,
  "necropsyrecord^personnel": null,
  "necropsyrecord^length": null,
  "necropsyrecord^weight": null,
  "necropsyrecord^comments": null,
  "pulmonary^trachea": null,
  "pulmonary^lungs": null,
  "pulmonary^rLung": null,
  "pulmonary^lLung": null,
  "pulmonary^pharTonsils": null,
  "pulmonary^glottis": null,
  "urinary^kidneys": null,
  "urinary^rKidneys": null,
  "urinary^lKidneys": null,
  "urinary^bladder": null,
  "urinary^testes": null,
  "urinary^rTestes": null,
  "urinary^lTestes": null,
  "urinary^penis": null,
  "urinary^skeletal": null,
  "urinary^vertebrae": null,
  "urinary^joints": null,
  "virtopsy^scanDate": null,
  "virtopsy^scanTime": null,
  "virtopsy^COD": "Drowning. Infanticide? Vessel interaction?",
  "virtopsy^personnel": null,
  "virtopsy^code": null,
  "virtopsy^modaUsed": null,
  "virtopsy^comments": null,
  "virtopsy^dicomPath": null,
  "virtopsy^position": null
};

tempBoatData= {
  "date": "2020-02-29",
  "vessel": "Dai Shing",
  "surveyors": "Brian, Henry, Tabris, Aurora, Raymond, Nick",
  "number": "1",
  "area": "SL: Shek Ku Chau",
  "wind": "NE",
  "seaState": "2",
  "species": "NP",
  "starTime": "10:51:00",
  "endTime": "11:04:00",
  "starPosition": "N2211471 E11357592 ",
  "endPosition": "N2210882113 E5653526 ",
  "a": "0",
  "s": "0",
  "j": "0",
  "c": "0",
  "u": "0",
  "behaviours": "Travelling",
  "remark": "",
  "association": null,
  "created_at": "2021-05-14 01:48:12",
  "updated_at": "2021-05-14 01:48:12"
};


TempNewDashoboardEditorDataStructure = {
  TYPE:"stat",
  CONFIGS:{
    GENERAL:{},
    OTHER:{}
  },
  DATASET:[
    {
      main:{
        data:"strandingreport^sid",
        type:"line",//(optional)
        presenttype:"count",//cnt,max,min,sum,avg
        //string:["1","2"],//params
        //date:{ from:"A",to:"B",target:["1","2","3"],display:0 }, //display: 0-Year, 1-Month, 2-Date
        //number:{ from:"A",to:"B",target:["1","2","3"] }
      },
      sub:[
        {
          data:"strandingreport^sid",
          type:"line",//(optional)
          presenttype:"count",//cnt,max,min,sum,avg
        }
      ],
      rule:[
        { data:"",operator:"",param:[] }
      ]
    }
  ]

}