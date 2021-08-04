const UserCtrl = {
    _ini:function(){},
    Event:{
        checking:function(){
            if(fs.isEmpty(user)){
                if(!fs.isEmpty(fs.getCookie("user"))){
                    user = fs.strTjson(fs.getCookie("user"));
                    UserCtrl.Event.getUserConfig();
                }
                if(fs.isEmpty(user)){ return false; }
            }
            return true;
        },
        updateUserConfig:function(targetUser = null){
            var userStr = "",uid = "";
            if(targetUser != null){ 
                uid = targetUser.authorization.uid;
                userStr = fs.jsonTstr(targetUser.config);
            }else{
                uid = user.authorization.uid;
                userStr = fs.jsonTstr(user.config);
            }
            
            
            if(fs.isEmpty(userStr)){ return; }
            $.ajax({
                async:false,type: "POST",
                url: _REQPATH,
                data: { request:"userconfigUpd", data:{ uid:uid,config:userStr,editUID:user.authorization.uid }},
                success:function(result){ fs.msg.infoA("User Config Updated") },
                error:function(result){ fs.msg.infoA("System Failed:#UserUpdate:00. Please Contact System Admin."); }
            });
        },
        getUserConfig:function(){
            $.ajax({
                async:false,type: "POST",
                url: _REQPATH,
                data: { request:"getUserConfig", data:{ uid:user.authorization.uid }},
                success:function(result){ user.config = fs.strTjson(result); },
                error:function(result){ fs.msg.infoA("System Failed:#UserUpdate:00. Please Contact System Admin."); }
            });
        }
    },
    EventListener:{
        profile:function(){},
        settings:function(){},
        logout:function(){
            var conf = {
                msg:"Do you want to logout?",
                actions:[
                    { text:"Yes",class:"green",click:function(){
                        user = [];
                        fs.delCookie("user");
                        fs.clnCookie();
                        LoginCtrl._ini();
                    }},{ text:"No",class:"red",click:function(){ }}
                ]
            };
            fs.msg.attached(conf);
        },
    }
}

const LoginCtrl = {
    _ini:function(){
        $("body").html(LoginUI._ini());
    },
    EventListener:{
        login:function(){
            var error    = [];
            var username = $("#login input[name='username']").val();
            $("#login .secondary.button").addClass("loading");
            if(fs.isEmpty(username)){ error[error.length] = "Please enter your username/user id/e-mail"; }
            var password = $("#login input[name='password']").val();
            if(fs.isEmpty(password)){ error[error.length] = "Please enter your password"; }
            if(error.length>0){
                for(var i = 0;i<error.length;i++){
                    fs.msg.errorA(error[i]);
                }
                $("#login .secondary.button").removeClass("loading");
                return;
            }
            $.ajax({
                async:false,type: "POST",
                url: _REQPATH,
                data: { 
                    request:"login",
                    data:{
                        username:username,
                        password:password
                    }
                },
                success:function(result){ 
                    $("#login .secondary.button").removeClass("loading");
                    if(fs.isEmpty(result["error"])){
                        user = result['user'];
                        //console.log(user)
                        fs.setCookie("user",fs.jsonTstr(user));
                        UserCtrl.Event.getUserConfig();
                        $("#login").remove();
                        fs.msg.infoA(`Welcome, ${user.authorization.username}`);
                        PageCtrl._ini();
                        MenuCtrl._ini();
                        DashboardCtrl._ini();
                    }else{
                        fs.msg.errorA(result["error"]);
                    }
                },
                error:function(){ 
                    $("#login .secondary.button").removeClass("loading");
                    fs.msg.warning("System Failed:#login:00. Please Contact System Admin");
                }
            });
        }
    }
}


const PageCtrl       = {
    _ini:function(){ $("body").append(PageUI._ini()); }
};
const MenuCtrl       = {
    _ini:function(data=null){
        if(!fs.isEmpty(data)){ user=data; }
        $("body").append(MenuUI.sideMenu(user)+MenuUI.topMenu(user));
        $("#top-menu .ui.dropdown").dropdown();
        $('#side-menu-button').on('click', function() {
            var target = $(this).data('target');
            $(target).sidebar({
                dinPage: true,transition: 'overlay',mobileTransition: 'overlay'
            }).sidebar('toggle');
        });
    },
    _refresh:function(){
        userInfo = user['authorization'];
        userName = userInfo['username'];
        //userIcon = (userInfo.userIcon)?("<img class='ui right spaced avatar image' src='"+userInfo.userIcon+"'>"):"<i class='large circular inverted user'></i>";
        $("#top-userinfo").html(userName);
    },
    dirTo:function(loc){
        //$("#body_main").addClass("ui segment loading");
        switch(loc){
            case "Dashboard":
                DashboardCtrl._ini();break;
            case "MapView" :
                MapViewCtrl._ini();break;
            case "StrandingCases" :
                StrandingCasesCtrl._ini();break;
            case "FilesManagement" :
                FileManagementViewCtrl._ini();break;
        }
        //$("#body_main").delay(1500).removeClass("ui segment loading");
    }
};

const ChartCtrl = {
    _ini:function(data){
        var id = data.id;
        var options = (!fs.isEmpty(data.options))?data.options:{
            yAxes: [{
                ticks: { beginAtZero: true },
                gridLines:{ display:false }
            }],
            xAxes:[{
                gridLines:{ display:true }
            }],
            maintainAspectRatio: false,
            
            aspectRatio:0.8
        };
        var dataset = data.datasets;
        var mainType = data.type;
        var newChart = new Chart(id, {
            type: mainType,
            data: dataset,
            options: options
        });
    },
    dataRetrieve:{
        _ini:function(data){
            var type = data.type;
            var _return = [];
            $.ajax({
                async:false,type: "POST",
                url: _REQPATH_CHARTS,
                data: { request:type,data:data.data },
                success:function(result){ _return = result; },
                error:function(result){ _return = result; }
            });
            return _return;
        }
    },
    chartsDataSet:{
        _ini:function(data){
            switch(data.type){
                case "stat":
                    return this.stat(data);
                case "lb":case "pd":case "sc":
                    return this.lb(data);
            }
        },
        stat:function(data){
            var tempdatasets = [];
            return tempdatasets;
        },
        lb:function(data){
            var returnData = data.datasets;
            var color = data.color;
            var tempdatasets = {
                datasets:[],
                labels:returnData["mainlabel"]
            }
            if(returnData["label"]!=undefined){
                for(var idx_datalabel=0;idx_datalabel<returnData["label"].length;idx_datalabel++){
                    var dta = returnData["data"][idx_datalabel];
                    var lbl = returnData["label"][idx_datalabel];
                    var cty = returnData["type"][idx_datalabel];
                    tempdatasets.datasets[tempdatasets.datasets.length] = {
                        label:lbl, data:dta, type:cty,
                        backgroundColor:COLOR_TONE[color].set[idx_datalabel%(COLOR_TONE[color].set.length)],
                        borderColor:COLOR_TONE[color].set[idx_datalabel%(COLOR_TONE[color].set.length)]
                    }
                }
            }else{
                tempdatasets.datasets[tempdatasets.datasets.length] = {
                    label:"Data",
                    data: returnData["data"],
                    type:returnData["type"],
                    backgroundColor:COLOR_TONE[color].set,
                    borderColor:COLOR_TONE[color].set
                }
            }
            
            return tempdatasets;
        },
        pd:function(data){
            var tempdatasets = [];
            return tempdatasets;
        },
        sc:function(data){
            var tempdatasets = [];
            return tempdatasets;
        }
    },
    EventListener:{
        stat:{
            showDetail:function(data){
                var id = data;
            }
        }
    }
}

const MapViewCtrl    = {
    defID:"map-view",
    _ini:function(){
        var mapviewparas = {
            showTable:true,
            search:true
        };
        $("body>#body_main").html(mapViewUI._ini(mapviewparas));
        _gb_ret[MapViewCtrl.defID] = (fs.isEmpty(_gb_ret[MapViewCtrl.defID]))?MapViewCtrl.DataControls.retrieveData():_gb_ret[MapViewCtrl.defID];
        //console.log(_gb_ret[MapViewCtrl.defID])
        var thisMap = MapCtrl._ini({id:this.defID,events:[
            { action:"onMoveEnd",func:MapViewCtrl.MapEvents.onMoveEnd},
            { action:"onResize",func:MapViewCtrl.MapEvents.onResize},
        ]});
        MapViewCtrl.list._ini();
    },
    EventListener:{
         showDetail:function(){},
        closeDetail:function(){
            $("#Simple-Detail").hide();
        }
    },
    DataControls:{
        retrieveData:function(){
            var retrieved = [];
            $.ajax({
                async:false,type: "POST",
                url: _REQPATH,
                data: { request:"getMapView", data:{ attributes:marineObj.getAttributesList(),range:[0,30] }},
                success:function(result){ 
                    retrieved = result;
                },
                error:function(result){ console.log(result); }
            });
            return retrieved;
        }
    },
    MapEvents:{
        onMoveEnd:function(data){
            MapViewCtrl.list._ini();
        },
        onResize:function(data){
            MapViewCtrl.list._ini();
        },
        pinClick:function(data){},
    },
    side:{
        item:{
            MarineMammal:{
                EventListener:{
                    zoomTo:function(data){
                        var sid = data;
                        var marineData = _gb_ret[MapViewCtrl.defID].MarineMammal;
                        var targetData = marineData.find(function(row){
                            return row["strandingreport^sid"] == sid;
                        });
                        var lati = fs.DMSTDeg([ 
                            targetData['strandingreport^latiDegree'],
                            targetData['strandingreport^latiMinute'],
                            targetData['strandingreport^latiSecond'],
                            targetData['strandingreport^latiDirection']
                        ]);
                        var long = fs.DMSTDeg([ 
                            targetData['strandingreport^longDegree'],
                            targetData['strandingreport^longMinute'],
                            targetData['strandingreport^longSecond'],
                            targetData['strandingreport^longDirection']
                        ]);
                        

                        var map = maps[MapViewCtrl.defID].map;
                        map.fitBounds([[lati,long]]);
                    },
                    detail:function(data){
                        var ret_Data = (_gb_ret[MapViewCtrl.defID].MarineMammal).find(function(c){
                            return c["strandingreport^sid"] === sid;
                        });
                        var detailParams = {
                            id:"Simple-Detail",
                            type:"MarineMammal",
                            data:ret_Data
                        };
                        DetailViewCtrl._ini(detailParams);
                        $("#Simple-Detail").show();
                    }
                }
            },
            BoatActivity:{
                EventListener:{
                    zoomTo:function(date,vessel){
                        var boatData = _gb_ret[MapViewCtrl.defID].BoatActivity;
                        var targetData = boatData.find(function(row){
                            return ((row['date'] == date)&&(row['vessel']==vessel));
                        });
                        var startposition = targetData['starPosition'];
                        var startPositionArray = startposition.split(" ");
                        var lati = parseInt(startPositionArray[0].substr(1,2))+(parseInt(startPositionArray[0].substr(3))/100000);
                        var long = parseInt(startPositionArray[1].substr(1,3))+(parseInt(startPositionArray[1].substr(4))/100000);
                        

                        var map = maps[MapViewCtrl.defID].map;
                        map.fitBounds([[lati,long]]);
                    
                    },detail:function(data){}
                }
            }
        }
    },
    list:{
        defID:"map-view-table-list",
        _ini:function(){
            var toggleBtnElms = $(`#${MapViewCtrl.search.searchGroup.defID} .toggle.button.selected`);
            var searchInputElm= $(`#${MapViewCtrl.search.searchInput.defID} input`);
            var listElm = $(` #${MapViewCtrl.list.defID} .list`);
            var thisMap = maps[MapViewCtrl.defID].map;
            MapCtrl.mapFunction.iniMarkerClusters({id:MapViewCtrl.defID});

            var mapBounds = thisMap.getBounds();
            var ret_Data  =_gb_ret[MapViewCtrl.defID];
            var search_val = $(searchInputElm).val();

            $(listElm).html("");
            $(toggleBtnElms).each(function(idx){
                var showElm  = $(toggleBtnElms[idx]);
                var dataType = $(showElm).attr("data-gp");
                for(var i in ret_Data[dataType]){
                    var item = ret_Data[dataType][i];
                    var consted = MapViewCtrl.list.itemConst[dataType](item);
                    
                    if(!fs.isEmpty(search_val)){
                        var _match = false;
                        for(var key in item){
                            if(typeof item[key]=="string"){
                                _match = (item[key].includes(search_val));
                            }else{
                                _match = (item[key] == (search_val));
                            }
                            if(_match){ break; }
                        }
                        if(!_match){ continue; }
                    }
                    if(
                        ((consted['gps'].lati>=mapBounds._southWest.lat)&&(consted['gps'].lati<=mapBounds._northEast.lat))
                        &&
                        ((consted['gps'].long>=mapBounds._southWest.lng)&&(consted['gps'].long<=mapBounds._northEast.lng))
                    ){
                        var paramsForMarker = consted;
                        var mapMarkerParams = {
                            type:dataType,
                            id:MapViewCtrl.defID,
                            lati:consted['gps'].lati,
                            long:consted['gps'].long,
                            events:[
                                {action:"click",func:function(e){ MapViewCtrl.list.markerFunctions[dataType].onClick(e); } }
                            ],
                            params:paramsForMarker
                        };
                        MapCtrl.mapFunction.addMarkerToCluster(mapMarkerParams);
                        $(listElm).append(mapViewUI.side.items[dataType](consted));
                    }
                }
            });
            
            MapCtrl.mapFunction.refreshMap({id:MapViewCtrl.defID});
        },
        markerFunctions:{
            MarineMammal:{
                onClick:function(e){
                    console.log(e);
                    var params = e.target.options.params;
                    var sid = params.sid;
                    var ret_Data = (_gb_ret[MapViewCtrl.defID].MarineMammal).find(function(c){
                        return c["strandingreport^sid"] === sid;
                    });
                    var detailParams = {
                        id:"Simple-Detail",
                        type:"MarineMammal",
                        data:ret_Data
                    };
                    DetailViewCtrl._ini(detailParams);
                    $("#Simple-Detail").show();
                }
            },
            BoatActivity:{
                onClick:function(e){
                    var params = e.target.options.params;
                }
            }
        },
        itemConst:{
            MarineMammal:function(data){
                var _rtn = {};
                var lati = fs.DMSTDeg([ data['strandingreport^latiDegree'],data['strandingreport^latiMinute'],data['strandingreport^latiSecond'],data['strandingreport^latiDirection']]);
                var long = fs.DMSTDeg([ data['strandingreport^longDegree'],data['strandingreport^longMinute'],data['strandingreport^longSecond'],data['strandingreport^longDirection']]);
                
                _rtn["sid"] = data['strandingreport^sid'];
                _rtn["sex"] = data['strandingreport^sex'];
                _rtn["species"] = data['strandingreport^species'];
                _rtn["ageClass"] = data['strandingreport^ageClass'];
                _rtn["straDate"] = data['strandingreport^straDate'];
                _rtn["location"] = data['strandingreport^location'];
                _rtn["gps"] = {
                    lati:lati,
                    long:long
                }
                return _rtn;
            },
            BoatActivity:function(data){
                var _rtn = {};
                var startposition = data['starPosition'];
                var startPositionArray = startposition.split(" ");
                var lati = parseInt(startPositionArray[0].substr(1,2))+(parseInt(startPositionArray[0].substr(3))/100000);
                var long = parseInt(startPositionArray[1].substr(1,3))+(parseInt(startPositionArray[1].substr(4))/100000);
                _rtn["date"] = data['date'];
                _rtn["vessel"] = data['vessel'];
                _rtn["surveyors"] = data['surveyors'];
                _rtn["gps"] = { lati:lati,long:long }
                return _rtn;
            }
        }
    },
    search:{
        defID:"map-view-table-search",
        searchInput:{
            defID:"map-view-search-input",
            EventListener:{
                onChange:function(data){
                    var elm = data;
                    //var searchVal = $(elm).val();
                    MapViewCtrl.list._ini();
                }
            }
        },
        searchGroup:{
            defID:"map-toggle-button-list",
            EventListener:{
                searchGroup:function(data){
                    var elm = data;
                    $(elm).toggleClass("selected");
                    $(elm).toggleClass("basic");
                    MapViewCtrl.list._ini();
                }
            }
        }
    }
};

const StrandingCasesCtrl={
    defaultShows:["strandingreport^sid","strandingreport^species","strandingreport^straDate","strandingreport^ageClass","strandingreport^code","strandingreport^length","strandingreport^weight","virtopsy^COD"],
    defaultTableConfigs:{
        stateSave: true,
        select:true,
        search:true,
        page:true,
        pageLength:14,
        fixedHeader: true,
        orderCellsTop: true,
        responsive:true,
        autoWidth:true,
        lengthMenu: [[14,18,20,-1], [14, 18, 20, "All"]]
    },
    defID :"strandingcases",
    defTableID :"table-strandingcases",
    _ini:function(){
        ///////////////////////////////////////////////////////Initialize Variable
        $("body>#body_main").html(strandingCaseUI._ini());
        var showsData = 
            (fs.isEmpty(user.config))?
                this.defaultShows:
                (fs.isEmpty(user.config.strandingcases))?
                    this.defaultShows:
                    (fs.isEmpty(user.config.strandingcases.datashows))?
                        this.defaultShows:
                        user.config.strandingcases.datashows;
        /*$("body>#body_main>#main-content").append(`<div id="StrandingCasesUploadArea"></div>`);
        UploadCtrl._ini({
            id:"StrandingCasesUploadArea"
        });*/
        /////////////////////////////////////////////////////// Retrieve Data
        var retrieved = StrandingCasesCtrl._ini_bundle.dataRetrieve();
        ///////////////////////////////////////////////////////Initialize Config Setting Area
        $("#searchTools .accordion").accordion();
        
        ///////////////////////////////////////////////////////Initialize Show's Columns Setting
        $("#searchTools #showsColumns").dropdown('set selected',showsData);
        $("#searchTools #showsColumns").dropdown('setting', 'onChange', function(){ 
            var selected = $("#searchTools #showsColumns").dropdown("get value");
            selected = selected.split(",");
            StrandingCasesCtrl.Event.columnsUpdate({showsData:selected});
        });
        
        ///////////////////////////////////////////////////////Initialize Columns
        var dataTableColumns = StrandingCasesCtrl._ini_bundle.getDataColumnsShows(showsData);
        
        var conf = StrandingCasesCtrl.defaultTableConfigs;
        conf["data"] = retrieved;
        conf["columns"] = dataTableColumns;
        var table = StrandingCasesCtrl._ini_bundle.table_ini({conf:conf});
        /////////////////////////////////////////////////////// Initialize Columns Searching 
        StrandingCasesCtrl._ini_bundle.searchColumn_ini({table:table,showsData:showsData});
    },
    _ini_bundle:{
        table_ini:function(data){
            var conf = data.conf;
            var table = TableCtrl._ini({id:StrandingCasesCtrl.defTableID,elm:$(`#${StrandingCasesCtrl.defID}`),configs:conf});
            return table;
        },
        searchColumn_ini:function(data){
            var table = data.table;
            var showsData = data.showsData;
            for(var i in showsData){
                $( `input[name="search-${showsData[i]}"]` ).on( 'keyup change', function () {
                    var name = $(this).attr("name");var id = name.split("-")[1];
                    if ( table.column(`${id}:name`).search() !== this.value ) {
                        table.column(`${id}:name`).search( this.value ).draw();
                    }
                });
            };
        },
        dataRetrieve:function(){
            var retrieved = [];
            $.ajax({
                async:false,type: "POST",
                url: _REQPATH,
                data: { request:"getMarineMammals", data:{ attributes:marineObj.getAttributesList() }},
                success:function(result){ 
                    _gb_ret["strandingcases"] = retrieved = result;
                },
                error:function(result){ console.log(result); }
            });
            return retrieved;
        },
        getDataColumnsShows:function(data){
            var showsData = data;
            var dataTableColumns = [];
            if(user.authorization.authlevel>=3){
                dataTableColumns[dataTableColumns.length] = { 
                    data: "strandingreport^sid",
                    title: `${strandingCaseUI.auxiliary.sideBtns.new()}`,
                    render:function(data){
                        return `
                            ${strandingCaseUI.auxiliary.sideBtns.detail(data)}
                            ${strandingCaseUI.auxiliary.sideBtns.edit(data)}
                            ${strandingCaseUI.auxiliary.sideBtns.delete(data)}
                        `;
                    }
                };
            }
            var AllTableColumns = marineObj.getAttributesList();
            for(var table in AllTableColumns){
                for(var i in AllTableColumns[table]){
                    var col = AllTableColumns[table][i];
                    var id  = `${table}^${col}`;var vis = showsData.includes(id);
                    var title = marineObj.getColumnName({table:table,column:col }).en;
                    dataTableColumns[dataTableColumns.length] = { 
                        data:id,
                        title: `${title}<br/><div class="ui mini form"><input name="search-${id}" placeholder="${title}" type="text"></div>`,
                        visible:vis,
                        name:id
                    };
                }
            }
            return dataTableColumns;
        }
    },
    Event:{
        _refresh:function(){
            var retrieved = [];
            $.ajax({
                async:false,type: "POST",
                url: _REQPATH,
                data: { request:"getMarineMammals", data:{ attributes:marineObj.getAttributesList(),range:[0,30] }},
                success:function(result){ 
                    retrieved = result;
                },
                error:function(result){ console.log(result); }
            });
            $(`#${StrandingCasesCtrl.defTableID}`).dataTable().fnClearTable();
            $(`#${StrandingCasesCtrl.defTableID}`).dataTable().fnAddData(retrieved);
            //console.log("refresh");
        },
        updateConfig:function(data){
            var showsData = data;
            if(fs.isEmpty(user.config)){ user["config"] = {}; };
            if(fs.isEmpty(user.config.strandingcases)){ user["config"]["strandingcases"] = {}; };
            if(fs.isEmpty(user.config.strandingcases.datashows)){ user["config"]["strandingcases"]["datashows"] = {}; };
            user["config"]["strandingcases"]["datashows"] = showsData;
            UserCtrl.Event.updateUserConfig();
            console.log("update config");
        },
        columnsUpdate:function(data){
            var table = $(`#${StrandingCasesCtrl.defTableID}`).DataTable();
            table.columns().visible( false );
            var showsData = data.showsData;
            table.column(0).visible(true);
            for(var i in showsData){
                table.column(`${showsData[i]}:name`).visible(true);
            }
            this.updateConfig(showsData);
            StrandingCasesCtrl._ini_bundle.searchColumn_ini({table:table,showsData:showsData});
        }
    },
    EventListener:{
        new:function(){
            EditorCtrl._ini();
        },
        delete:function(data){
            var sid = data;
            var conf = {
                msg:"Do you want to delete case : ["+sid+"]?",
                actions:[
                    { 
                        text:"Yes",class:"green",click:function(){
                            $.ajax({
                                async:false,type: "POST",
                                url: _REQPATH,
                                data: { request:"delMarineMammal", data:{ sid:sid,uid:user.authorization.uid,attributes:marineObj.getAttributesList() }},
                                success:function(result){ 
                                    if(result["rslt"]==false){ fs.msg.warningA("System Error: Cannot Delete");console.log(result); }
                                    StrandingCasesCtrl.Event._refresh();
                                },
                                error:function(result){ console.log(result); }
                            });
                        }
                    },{ text:"No",class:"red",click:function(){}}
                ]
            };
            fs.msg.attached(conf);
        },
        edit:function(data){
            var sid = data;
            EditorCtrl._ini(sid);
        },
        detail:function(data){
            var sid = data;
            var ret_Data = (_gb_ret["strandingcases"]).find(function(c){
                return c["strandingreport^sid"] === sid;
            });
            var detailParams = {
                type:"MarineMammal",
                data:ret_Data,
                modal:true
            };
            DetailViewCtrl._ini(detailParams);
        }
    }
}

const MapCtrl = {
    icons:{
        MarineMammal:L.divIcon({
            html:`<div class="mapPin  MarineMammal"><i class="icon circular teal servicestack"></i></div>`,
            className:'dummy',
            iconAnchor: [20,51]
        }), //servicestack
        BoatActivity:L.divIcon({
            html:`<div class="mapPin  BoatActivity"><i class="icon circular orange ship"></i></div>`,
            className:'dummy',
            iconAnchor: [20, 51]
        }) //ship
    },
    styles:{
        bright:{ name:{ en:"Normal",zh:"一般"},path:"https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png" },
        dark  :{ name:{ en:"Dark"  ,zh:"深色"},path:"https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" },
        light :{ name:{ en:"Light" ,zh:"淺色"},path:"https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" },
        default:{ name:{ en:"Normal",zh:"一般"},path:"https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png" }
    },
    center:[22.302711, 114.177216], //center of hong kong
    zoom: 11,zoomControl: false,
    _ini:function(data){
        var id = data.id;
        var events = data.events;
        var baseMaps = {};
        for(var style in this.styles){
            if(style=="default"){ continue; }
            var styleContent = this.styles[style];
            var thisMapLayer = L.tileLayer(styleContent.path);
            baseMaps[styleContent.name.en] = thisMapLayer;
        }
        var map = L.map( id, { 
            center:this.center,
            zoom: this.zoom,
            zoomControl: this.zoomControl,
            layers: [L.tileLayer(this.styles.default.path)]
        });
        L.control.layers(baseMaps,null,{position: 'topleft'}).addTo(map);
        //L.tileLayer(this.styles.default.path).addTo(map);
        for(var i in events){
            var func = events[i].func;var action=events[i].action; 
            MapCtrl.mapEvents[action](map,func);
        }
        maps[id] = {};
        maps[id].map = map;
        MapCtrl.mapFunction.iniMarkerClusters({id:id});
        return map;
    },
    mapEvents:{
        onClick:function(map,func){ map.on('click', func); },
        onResize:function(map,func){ map.on('resize',func); },
        onMoveEnd:function(map,func){ map.on('moveend', func); },
        onZoomEnd:function(map,func){ map.on('zoomend',func); }
    },
    mapFunction:{
        addMarkerToMap:function(data){
            var map = maps[data.id].map;
            var lati = data.lati,long = data.long, type = data.type ;
            var events=(fs.isEmpty(data.events))?[]:data.events;
            var params=(fs.isEmpty(data.params))?[]:data.params;
            var options = {icon:MapCtrl.icons[type]};
            if(!fs.isEmpty(data.params)){ options["params"] = params; }
            var marker = L.marker([lati,long],options);
            for(var i in events){
                var func = events[i].func;var action=events[i].action;
                marker.on(action,func);
            }
            marker.addTo(map);
            return marker;
        },
        addMarker:function(data){
            var lati = data.lati,long = data.long, type = data.type ;
            var events=(fs.isEmpty(data.events))?[]:data.events;
            var params=(fs.isEmpty(data.params))?[]:data.params;
            var options = {icon:MapCtrl.icons[type]};
            if(!fs.isEmpty(data.params)){ options["params"] = params; }
            var marker = L.marker([lati,long],options);
            for(var i in events){
                var func = events[i].func;var action=events[i].action;
                marker.on(action,func);
            }
            return marker;
        },
        addMarkerToCluster:function(data){
            var type = data.type;
            var marker = MapCtrl.mapFunction.addMarker(data);
            maps[data.id].group[type].addLayer(marker);
            return;
        },
        iniMarkerClusters:function(data){
            if(fs.isEmpty(maps[data.id].group)){ maps[data.id].group = {}; }
            maps[data.id].group.MarineMammal = new L.MarkerClusterGroup({
                iconCreateFunction: function(cl) {
                    return new L.DivIcon({ 
                        html: '<div class="mapPin MarineMammal"><i class="icon circular teal">'+cl.getChildCount()+'</i></div>',
                        className:'dummy'
                    });
                },
                maxClusterRadius: 50,
            });
            maps[data.id].group.BoatActivity = new L.MarkerClusterGroup({
                iconCreateFunction: function(cl) {
                    return new L.DivIcon({ 
                        html: '<div class="mapPin BoatActivity"><i class="icon circular orange">'+cl.getChildCount()+'</i></div>',
                        className:'dummy'
                    });
                },
                maxClusterRadius: 50,
                className:'dummy'
            });
        },
        refreshMap:function(data){
            var id  = data.id;
            var map = maps[id].map;
            map.eachLayer(function(layer){
                if((layer instanceof L.Marker)||(layer instanceof L.MarkerClusterGroup)){
                    map.removeLayer(layer);
                }
            });
            var clusters = maps[id].group;
            for(var cluster in clusters){
                map.addLayer(clusters[cluster]);
            }
        }
    }
}

const TableCtrl = {
    defInitConf:{
        stateSave: true,
        select:true,
        pageLength:10,
        fixedHeader: true,
        orderCellsTop: true,
        responsive:true,
        autoWidth:true,
        lengthMenu: [[10,15,20,-1], [10, 15, 20, "All"]]
    },
    _setting:function(){
        
    },
    _ini:function(data){
        var id = data.id;var elm = data.elm;
        var configs = data.configs;
        $(elm).html(TableUI._ini(id));
        var thisTable  = $(elm).children(`#${id}`);
        var tableConfig= this.defInitConf;
        for(var conf in configs){
            tableConfig[conf] = configs[conf];
        }
        //console.log(tableConfig);
        var newDataTable = $(thisTable).DataTable(tableConfig);
        tables[id] = newDataTable;
        return newDataTable;
    },
    _ini_bundle:{
    }
}


const ReportFormCtrl = {
    reportTypeForm:{
        _ini:function(){
            var hasModal = ($(".modal #reportTypeForm").length>0);
            var output = "";
            if(hasModal){
                $(".modal #reportTypeForm").remove();
            }
            output = ReportFormUI.reportTypeForm();
            $("body").append(output);
            $('#reportTypeForm.coupled.modal').modal({allowMultiple: false});
            $('#reportTypeForm').modal('show');
        },
        EventListener:{
            select:function(data){
                if(data!=_GB_CONFIG_FROM_VAR["type"]){ 
                    $("#reportDataSetForm").remove();
                }
                _GB_CONFIG_FROM_VAR["type"] = data;
                ReportFormCtrl.reportConfigsForm._ini(data);
            },
            cancel:function(){
                $('.modal').modal('hide');
                $('.modal').remove();
            }
        }
    },
    reportConfigsForm:{
        _ini:function(data){
            var hasModal = $(".modal").is("#reportConfigsForm");var output = "";
            if(hasModal){
                $(".modal #reportConfigsForm").remove();
            }
            output = ReportFormUI.reportConfigsForm._ini(data);
            $("body").append(output);
            $('#reportConfigsForm.coupled.modal').modal({allowMultiple: false});
            $('#reportConfigsForm').modal('show');
            $('#reportConfigsForm .dropdown').dropdown();
            $('#reportConfigsForm .checkbox').checkbox();
            $('#reportConfigsForm .accordion').accordion();
        },
        DataSetList:{
            _refresh:function(data){
                var elm = $("#reportConfigForm #DataSetList");
                var output = ReportFormUI.reportConfigsForm.FormItems.configs.data.list(data);
                elm.html(output);
            }
        },
        Event:{
            cancel:function(){
                $('.modal').modal('hide');
                $('.modal').remove();
                _GB_CONFIG_FROM_VAR = {};
                _GB_DATASET_FROM_VAR = [];
            },
            back:function(){
                $('#reportConfigsForm').modal('hide');
                $('#reportConfigsForm').remove();
                $('#reportTypeForm').modal('show');
            },
            submit:function(){
                var error = [];
                var configElm = "#reportConfigsForm #reportConfigForm "
                var title  = $(configElm+" input[name='general[title]']").val();
                if(fs.isEmpty(title)){ error[error.length] = { msg:"Title is empty" } }
                var size  = $(configElm+" input[name='general[size]']").val();
                if(fs.isEmpty(size)){ error[error.length] = { msg:"Size is empty" } }
                var type  = _GB_CONFIG_FROM_VAR["type"];
                //options
                var color  = $(configElm+" input[name='general[color]']").val();
                if(fs.isEmpty(color)){ color = "default"; }
                var showDetail  = $(configElm+" input[name='general[showDetail]']").val();
                if(fs.isEmpty(showDetail)){ showDetail = true; }
                var center  = $(configElm+" input[name='general[center]']").val();
                if(fs.isEmpty(center)){ center = true; }
                var draggable  = $(configElm+" input[name='general[draggable]']").val();
                if(fs.isEmpty(draggable)){ draggable = true; }
                var dataVar    = _GB_DATASET_FROM_VAR;
                if(fs.isEmpty(dataVar)){ error[error.length] = { msg:"Data Set is empty" }; }
                if(error.length>0){
                    for(var e in error){ fs.msg.errorA(error[e].msg); } return;
                }
                var ID_TIME = ""+fs.getTimeStamp();
                var conf = {
                    id:ID_TIME,
                    title:title,
                    size:size,
                    type : type,
                    color:color,
                    showDetail:showDetail,
                    center:center,
                    draggable:draggable,
                    data:dataVar
                }
                
                var  rowId = _GB_CONFIG_FROM_VAR["rowId"];
                var  isRowBtn = _GB_CONFIG_FROM_VAR["isNewRow"];

                if(fs.isEmpty(user['config'])){ user['config'] = {}; }
                if(fs.isEmpty(user['config']['dashboard'])){ user['config']['dashboard'] = {}; }

                if(fs.isEmpty(user['config']['dashboard']['items'])){ user['config']['dashboard']['items'] = {}; }
                user['config']['dashboard']['items'][ID_TIME] = conf;

                if(fs.isEmpty(user['config']['dashboard']['display'])){ user['config']['dashboard']['display'] = []; }
                if(isRowBtn){           
                    user.config.dashboard.display = fs.array.insert(rowId,[ID_TIME], user.config.dashboard.display); 
                }else{
                    var dLen = user.config.dashboard.display[rowId].length;
                    user.config.dashboard.display[rowId][dLen] = ID_TIME;
                }
                UserCtrl.Event.updateUserConfig();
                DashboardCtrl._refresh();
                $(".modal").modal("hide");
                $(".modal").remove();
            },
            preview:{
                _refresh:function(){
                    var error = [];
                    var configElm = "#reportConfigsForm #reportConfigForm "
                    var title  = $(configElm+" input[name='general[title]']").val();
                    if(fs.isEmpty(title)){ error[error.length] = { msg:"Title is empty" } }
                    var size  = $(configElm+" input[name='general[size]']").val();
                    if(fs.isEmpty(size)){ error[error.length] = { msg:"Size is empty" } }
                    var type  = _GB_CONFIG_FROM_VAR["type"];
                    //options
                    var color  = $(configElm+" input[name='general[color]']").val();
                    if(fs.isEmpty(color)){ color = "default"; }
                    var showDetail  = $(configElm+" input[name='general[showDetail]']").val();
                    if(fs.isEmpty(showDetail)){ showDetail = true; }
                    var center  = $(configElm+" input[name='general[center]']").val();
                    if(fs.isEmpty(center)){ center = true; }
                    var draggable  = $(configElm+" input[name='general[draggable]']").val();
                    if(fs.isEmpty(draggable)){ draggable = true; }
                    var dataVar    = _GB_DATASET_FROM_VAR;
                    if(fs.isEmpty(dataVar)){ error[error.length] = {msg:"Data Set is empty" }; }
                    if(error.length>0){
                        for(var e in error){ fs.msg.errorA(error[e].msg); } return;
                    }
                    var _return ="";
                    if(dataVar==[]){ fs.msg.errorA("No data selected for create the graph."); }
                    else{
                        $.ajax({
                            async:false,type: "POST",
                            url: _REQPATH_CHARTS,
                            data: { request:type,data:dataVar },
                            success:function(result){ _return = result; },
                            error:function(result){ _return = result; }
                        });
                    }
                    var returnData = fs.strTjson(_return);
                    var conf = {
                        id:"preview-graph",
                        title:title,
                        size:size,
                        type : type,
                        color:color,
                        showDetail:showDetail,
                        center:center,
                        draggable:draggable,
                        datasets:returnData
                    }
                    $("#reportPreview").html(ReportFormUI.reportConfigsForm.FormItems.preview._ini());
                    if(type == "stat"){
                        $("#reportPreview").append(ChartsUI.stat._ini(conf));
                    }else{
                        $("#reportPreview").append(ChartsUI.charts._ini(conf));
                        var tempdatasets = ChartCtrl.chartsDataSet._ini(conf);
                        var main_gType = returnData["type"][0];
                        var charConfig = {
                            id:"charts-canvas-preview-graph",
                            options:[],
                            type:main_gType,
                            datasets:tempdatasets
                        }
                        ChartCtrl._ini(charConfig);
                    }

                }
            },
            dataset:{
                edit:function(data){
                    ReportFormCtrl.reportDataSetForm._ini(data);
                }
            }
            
        }
    },
    reportDataSetForm:{
        _ini:function(data){
            var hasModal = $(".modal").is("#reportDataSetForm");var output = "";
            if(hasModal){
                $('#reportDataSetForm').modal('show'); return;
            }
            output = ReportFormUI.reportDataSetForm._ini(data);
            $("body").append(output);
            $('#reportDataSetForm.coupled.modal').modal({allowMultiple: false});
            $('#reportDataSetForm').modal('show');

            $('#maindata-0 .dropdown').dropdown();
            $('#maindata-0 .checkbox').checkbox();
            $('#maindata-0 .accordion').accordion();

            $('#reportDataSetForm #dbselector-0').dropdown('setting', 'onChange', function(val){
                ReportFormCtrl.reportDataSetForm.attrSelector.EventListener.onChange(0,"maindata",val);
            });
            $('#reportDataSetForm #dbselector-rules-0').dropdown('setting', 'onChange', function(val){
                ReportFormCtrl.reportDataSetForm.attrSelector.EventListener.onChange(0,"rules",val);
            });
            $('#reportDataSetForm #operatorSelector-rules-0').dropdown('setting', 'onChange', function(val){
                ReportFormCtrl.reportDataSetForm.attrRules.EventListener.onChange(0,val);
            });
        },
        EventListener:{
            cancel:function(){
                $('#reportConfigsForm').modal('show');
            },
            submit:function(){
                var elms = $('#reportDataSetForm #mainDataSetList .maindata');
                var maindatas = [];
                var error = [];
                var type  = _GB_CONFIG_FROM_VAR["type"];
                for(var i = 0;i<elms.length;i++){
                    //get main data id and number 
                    var mainID = $(elms[i]).attr("id");var id = (mainID.split("-"))[1];
                    //get selected main data [#dbselector-[id]]
                    var mainDataVal = $("#maindata-"+id+" #dbselector-"+id).dropdown("get value");
                    if(fs.isEmpty(mainDataVal)){
                        error[error.length] = { msg:`Main data #${id} hasn't select any data` };
                    }else{
                        //trim and split the main data val eg: ['table','column','data type','null able','key']
                        var tempMainData = mainDataVal.replace(/'/g, "\"");
                        var tempMainDataVal  = fs.strTjson(tempMainData);
                        var mainDataTable = tempMainDataVal[1];var mainDataColumn = tempMainDataVal[0];
                    }
                    //get graph type eg, line, bar, scatter, pie etc.
                    var graphType = $("#maindata-"+id+" input[name='general[graphType]-"+id+"']:checked").val();
                    if(type!="stat"){
                        if(fs.isEmpty(graphType)){  error[error.length] = { msg:`Main data #${id}'s graph type hasn't been selected` }; }
                    }
                    //get present type eg, count, max, min, avg, or sum etc.
                    var presentType = $("#maindata-"+id+" input[name='presentType-"+id+"']:checked").val();
                    if(fs.isEmpty(presentType)){  error[error.length] = { msg:`Main data #${id}'s present type hasn't been selected ` }; }
                    
                    var isGrouped = $("#maindata-"+id+" input[name='general[groupsdata]-"+id+"']:checked").val();
                    if(fs.isEmpty(isGrouped)){  isGrouped = false; }else{ isGrouped = true; }

                    //get dataset, means data grounds in current table column : default:[].
                    var dataSet = [];
                    if($("#maindata-"+id+" #dataset-"+id).length>0){
                        dataSet = $("#maindata-"+id+" #dataset-"+id).dropdown("get value");
                        dataSet = dataSet.split(",");
                    }
                    //get main rules || sql conditions
                    var RulesElms = $("#maindata-"+id+" #rulesList-rules-"+id+" .item");
                    var Rules = [];
                    if(RulesElms.length>0){
                        for(var j = 0;j<RulesElms.length;j++){
                            var tableNcolumn = $(RulesElms[j]).children(".content").children(".teal").html();
                            tableNcolumn = tableNcolumn.split(".");
                            var table = tableNcolumn[0];var column = tableNcolumn[1];
                            var operator = $(RulesElms[j]).children(".content").children(".orange").html();
                            var paras = [] 
                            var parasElms = $(RulesElms[j]).children(".content").children(".primary");
                            for(var k = 0; k<parasElms.length;k++){
                                paras[paras.length] = $(parasElms[k]).html();
                            }
                            Rules[Rules.length] = { table:table,column:column,operator:operator,params:paras }
                        }
                    }

                    //get sub data set
                    var subsElms = $("#subDataList-"+id+" .subdata");
                    var subs = [];
                    if(subsElms.length>0){
                        for(var j = 0;j<subsElms.length;j++){
                            //get sub datas id and its number id
                            var subID = $(subsElms[j]).attr("id");var subID = (subID.split("-"))[2];
                            var subDataVal = $("#subdata-"+id+"-"+subID+" #dbselector-"+id+"-"+subID).dropdown("get value");
                            if(fs.isEmpty(subDataVal)){
                                error[error.length] = { msg:`Subdata #${subID} in Maindata #${id} hasn't select any data` };
                            }else{
                                //trim and split the main data val eg: ['table','column','data type','null able','key']
                                var tempSubData = subDataVal.replace(/'/g, "\"");
                                var tempSubDataVal  = fs.strTjson(tempSubData);
                                var subDataTable = tempSubDataVal[1];var subDataColumn = tempSubDataVal[0];
                            }

                            var subGraphType = $("#subdata-"+id+"-"+subID+" input[name='general[graphType]-"+id+"-"+subID+"']:checked").val();
                            if(fs.isEmpty(subGraphType)){  error[error.length] = { msg:`Subdata #${subID} graph type in Maindata #${id} hasn't been selected` }; }
                            var subPresentType = $("#subdata-"+id+"-"+subID+" input[name='presentType-"+id+"-"+subID+"']:checked").val();
                            if(fs.isEmpty(subPresentType)){  error[error.length] = { msg:`Subdata #${subID} present type in Maindata #${id} hasn't been selected` }; }
                            var subIsGrouped = $("#maindata-"+id+" input[name='general[groupsdata]-"+id+"-"+subID+"']:checked").val();
                            if(fs.isEmpty(subIsGrouped)){  subIsGrouped = false; }else{ subIsGrouped = true; }

                            var subDataSet = [];
                            if($("#subdata-"+id+"-"+subID+" #dataset-"+id+"-"+subID).length>0){
                                subDataSet = $("#subdata-"+id+"-"+subID+" #dataset-"+id+"-"+subID).dropdown("get value");
                                subDataSet = subDataSet.split(",");
                            }
                            subs[subs.length] = { 
                                table:subDataTable,
                                column:subDataColumn,
                                gtype:subGraphType,
                                ptype:subPresentType,
                                isGrouped:subIsGrouped,
                                dataset:subDataSet 
                            }
                        }
                    }

                    //construct the dataset data
                    maindatas[maindatas.length] = {
                        main:{
                            table:mainDataTable,
                            column:mainDataColumn,
                            gtype:graphType,
                            ptype:presentType,
                            isGrouped:isGrouped,
                            dataset:dataSet,
                            rules:Rules
                        },
                        sub:subs
                    }
                }
                
                if(error.length>0){
                    for(var e in error){ fs.msg.errorA(error[e].msg); } return;
                }
                _GB_DATASET_FROM_VAR = maindatas;
                ReportFormCtrl.reportConfigsForm.DataSetList._refresh(maindatas);
                $('#reportDataSetForm').modal('hide');
                $('#reportConfigsForm').modal('show');
            },
            add:{
                maindata:function(data){
                    var elm= $("#mainDataSetList");
                    var lengthOfMaindata = $("#mainDataSetList .maindata").length;
                    while(true){
                        if($("#mainDataSetList #maindata-"+lengthOfMaindata).length==0){ break; 
                        }else{ lengthOfMaindata++; }
                    }
                    var conf = { id:lengthOfMaindata,type:data }
                    elm.append(ReportFormUI.reportDataSetForm.main(conf));
                    $(`#maindata-${lengthOfMaindata} .dropdown`).dropdown();
                    $(`#maindata-${lengthOfMaindata} .checkbox`).checkbox();
                    $(`#maindata-${lengthOfMaindata} .accordion`).accordion();
                    $(`#reportDataSetForm #dbselector-${lengthOfMaindata}`).dropdown('setting', 'onChange', function(val){
                        ReportFormCtrl.reportDataSetForm.attrSelector.EventListener.onChange(lengthOfMaindata,"maindata",val);
                    });
                    $(`#reportDataSetForm #dbselector-rules-${lengthOfMaindata}`).dropdown('setting', 'onChange', function(val){
                        ReportFormCtrl.reportDataSetForm.attrSelector.EventListener.onChange(lengthOfMaindata,"rules",val);
                    });
                    $(`#reportDataSetForm #operatorSelector-rules-${lengthOfMaindata}`).dropdown('setting', 'onChange', function(val){
                        ReportFormCtrl.reportDataSetForm.attrRules.EventListener.onChange(lengthOfMaindata,val);
                    });
                }
            },
            delete:{
                maindata:function(data){
                    var id = data;
                    if($("#mainDataSetList .maindata").length<=1){
                        fs.msg.warningA("At least one main data");
                    }else{ $("#"+id).remove(); }
                },
                subdata:function(data){
                    var id = data[0];
                    var sid= data[1];
                    $("#subdata-"+id+"-"+sid).remove();
                }
            }
        },
        subset:{
            EventListener:{
                addSubset:function(data){
                    var id = data.id;
                    var elm= $("#subDataList-"+id);
                    var lengthOfSubData = $("#subDataList-"+id+" .subdata").length;
                    while(true){
                        if($("#subdata-"+id+"-"+lengthOfSubData).length==0){ break; 
                        }else{ lengthOfSubData++; }
                    }
                    var subID = id+"-"+lengthOfSubData;
                    var conf = { id:id,sid:lengthOfSubData,type:data.type}
                    elm.append(ReportFormUI.reportDataSetForm.sub(conf));
                    $("#subdata-"+subID+" #dbselector-"+subID).dropdown();
                    $("#subdata-"+subID+" #dbselector-"+subID).dropdown('setting', 'onChange', function(val){
                        ReportFormCtrl.reportDataSetForm.attrSelector.EventListener.onChange(subID,"subdata",val);
                    });
                    $("#subdata-"+subID+" .accordion").accordion();
                    $("#subdata-"+subID+" .checkbox").checkbox();
                }
            }
        },
        attrSelector:{
            EventListener:{
                onChange(id,prefix_id,val){ 
                    var tempVal = val.replace(/'/g, "\"");
                    var getVal  = fs.strTjson(tempVal);//[COLUMN_NAME,TABLE_NAME,DATATYPE,KEY,ISNULL]
                    var column  = getVal[0];var table = getVal[1];var type = getVal[2];
                    if(prefix_id=="maindata"){
                        /*var ajaxData= {
                            async:false,url:_REQPATH,
                            param :{ 
                                request:"columnContent",
                                data:{ column:column,table:table }
                            }
                        }
                        var columnGroups = Conn.ajax(ajaxData);*/
                        var param = { id:id,attrType:type };
                        var output = ReportFormUI.reportDataSetForm.attrPresentMethod(param);
                            output+= ReportFormUI.reportDataSetForm.attrGroups(param);
                        $("#"+prefix_id+"-"+id+" .m-data .norm-conf .accordion .content").html(output);
                        $("#"+prefix_id+"-"+id+" .m-data .norm-conf .accordion .content .dropdown").dropdown({allowAdditions:true});
                        $("#"+prefix_id+"-"+id+" .m-data .norm-conf .accordion .content .checkbox").checkbox();
                        $("#"+prefix_id+"-"+id+" .m-data .norm-conf .accordion .content .ui.calendar").calendar({type: 'date'});
                    }else if(prefix_id=="subdata"){
                        var param = { id:id,attrType:type };
                        var output = ReportFormUI.reportDataSetForm.attrPresentMethod(param);
                            output+= ReportFormUI.reportDataSetForm.attrGroups(param);
                        $("#"+prefix_id+"-"+id+" .m-data .norm-conf .accordion .content").html(output);
                        $("#"+prefix_id+"-"+id+" .m-data .norm-conf .accordion .content .dropdown").dropdown({allowAdditions:true});
                        $("#"+prefix_id+"-"+id+" .m-data .norm-conf .accordion .content .checkbox").checkbox();
                        $("#"+prefix_id+"-"+id+" .m-data .norm-conf .accordion .content .ui.calendar").calendar({type: 'date'});
                    }else if(prefix_id=="rules"){
                        var operator = $("#operatorSelector-rules-"+id).dropdown('get value');
                        if(operator!=""){
                            var param = { id:id,attrType:type,operator:operator };
                            var output = ReportFormUI.reportDataSetForm.rulePara(param);
                            $("#rulesParas-rules-"+id+" .rulesParas").remove();
                            $("#rulesParas-rules-"+id).append(output);
                            $("#rulesParas-rules-"+id+" .rulesParas.dropdown").dropdown('setting',{allowAdditions:true});
                            $("#rulesParas-rules-"+id+" .rulesParas .ui.calendar").calendar({type: 'date'});
                        }
                    }
                    
                }
            }
        },
        attrPresentMethod:{},
        attrGroups:{},
        attrRules:{
            EventListener:{
                onChange(id,val){
                    var id = "rules-"+id
                    var tempVal = $('#dbselector-'+id).dropdown('get value');
                    if(tempVal!=""){
                            tempVal = tempVal.replace(/'/g, "\"");
                        var getVal  = fs.strTjson(tempVal);//[COLUMN_NAME,TABLE_NAME,DATATYPE,KEY,ISNULL]
                        var type = getVal[2];
                        var operator = val;
                        var param = { id:id,attrType:type,operator:operator };
                        var output = ReportFormUI.reportDataSetForm.rulePara(param);
                        $("#rulesParas-"+id+" .rulesParas").remove();
                        $("#rulesParas-"+id).append(output);
                        $("#rulesParas-"+id+" .rulesParas.dropdown").dropdown('setting',{allowAdditions:true});
                        $("#rulesParas-"+id+" .rulesParas .ui.calendar").calendar({type: 'date'});
                    }
                },
                addRule(data){
                    var id = data;
                    var error = [];
                    var column   = $("#dbselector-"+id).dropdown('get value');
                    var getColumn=[];
                    if(fs.isEmpty(column)){ 
                        error[error.length] = { msg:`Hasn't select TARGET COLUMN for #${id}` };
                    }else{
                        tempVal = column.replace(/'/g, "\"");
                        var getColumn  = fs.strTjson(tempVal);//[COLUMN_NAME,TABLE_NAME,DATATYPE,KEY,ISNULL]
                    }

                    var operator = $("#operatorSelector-"+id).dropdown('get value');
                    if(fs.isEmpty(column)){ error[error.length] = { msg:`Hasn't select OPERATOR for #${id}` }; }

                    var params   = [];
                    if(operator!=""){
                        if(operator=="BETWEEN"||operator=="NOT BETWEEN"){
                            if($("#"+id+" .rulesParas").hasClass("calendar")){
                                params[0] = $("#"+id+" .rulesParas #calendar-parameter_"+id+"_a").calendar("get value");
                                params[1] = $("#"+id+" .rulesParas #calendar-parameter_"+id+"_b']").calendar("get value");
                                if(fs.isEmpty(params[0])||fs.isEmpty(params[1])){ 
                                    error[error.length] = { msg:`PARAMETERS cannot be empty for #${id}` }; 
                                }
                            }else{
                                params[0] = $("#"+id+" .rulesParas input[name='parameter_"+id+"_a']").val();
                                params[1] = $("#"+id+" .rulesParas input[name='parameter_"+id+"_b']").val();
                                if(fs.isEmpty(params[0])||fs.isEmpty(params[1])){ 
                                    error[error.length] = { msg:`PARAMETERS cannot be empty for #${id}` }; 
                                }
                            }
                        }else if(operator=="IN"||operator=="NOT IN"){
                            if($("#"+id+" .rulesParas .ui.calendar").length>0){
                                params[0] = $("#"+id+" input[name='parameter_"+id+"']").val();
                                if(fs.isEmpty(params[0])){ 
                                    error[error.length] = { msg:`PARAMETER cannot be empty for #${id}` }; 
                                }
                            }else{
                                params = $("#"+id+" .rulesParas").dropdown('get value');
                                if(fs.isEmpty(params)){ 
                                    error[error.length] = { msg:`PARAMETER cannot be empty for #${id}` }; 
                                }
                                params = params.split(",");
                            }
                        }else{
                            params[0] = $("#"+id+" input[name='parameter_"+id+"']").val();
                            if(fs.isEmpty(params[0])){ 
                                error[error.length] = { msg:`PARAMETER cannot be empty for #${id}` }; 
                            }
                        }
                    }
                    
                    if(error.length>0){
                        for(var e in error){ fs.msg.errorA(error[e].msg); } return;
                    }
                    var lengthOfRules = $("#rulesList-"+id).length;
                    while(true){
                        if($("#paras-"+id+"-"+lengthOfRules).length>0){ lengthOfRules++;
                        }else{ break; }
                    }
                    var conf = {
                        id:id+'-'+lengthOfRules,
                        attr:[getColumn[1],getColumn[0]],
                        oper:operator,
                        paras:params
                    };
                    $("#rulesList-"+id).append(ReportFormUI.reportDataSetForm.para(conf));
                }
            }
        },
        para:{
            del:function(data){
                $("#paras-"+data).remove();
            }
        }
    }
};

const DetailViewCtrl = {
    defID:"DetailView",
    _ini:function(data){
        var id = fs.isEmpty(data.id)?" body":`#${data.id}`;
        if($(`${id} #${DetailViewCtrl.defID}`).length>0){ $(`${id} #${DetailViewCtrl.defID}`).remove(); };
        $(`${id}`).append(DetailViewUI._ini(data));

        var targetElm = $(`${id} #${DetailViewCtrl.defID}`);
        var type = data.type;
        var modal = !fs.isEmpty(data.modal);
        var _ret_Data = data.data;

        if(type=="MarineMammal"){
            var EditorAttrs = NormalType.editor;
            for(var i in EditorAttrs){
                var display = EditorAttrs[i].display;
                var content = EditorAttrs[i].content;
                for(var j in content){
                    var rows = content[j].rows;
                    var optional = fs.isEmpty(content[j].optional)?[]:content[j].optional;
                    var table = content[j].table;
                    var title_en , title_zh;
                    var hasContent = false;
                    var output = ``;
                    
                    if(fs.isEmpty(display.table)){
                        title_en = display.en;title_zh = display.zh;
                    }else{
                        title_en = marineObj.getTableName({table:table}).en;title_zh = marineObj.getTableName({table:table}).zh;
                    }
                    var header = DetailViewUI.group.MarineMammal({title:table,en:title_en,zh:title_zh});

                    var tempOutput = ``;
                    if(rows == "ALL"){
                        rows = marineObj.attributes[table].columns;
                        var currSize = 0;
                        for(var key in rows){
                            var col = rows[key];
                            var val = _ret_Data[table+"^"+key];
                            if(!fs.isEmpty(col.options)){
                                val = (col.options).find(function(option){
                                    return option.value === val;
                                });
                                if(!fs.isEmpty(val)){ val = val.dispName }
                            }
                            if(fs.isEmpty(val)){ continue; }
                            hasContent = true;
                            var size = col.size;
                            if(currSize>=4||(currSize<4&&currSize>0&&(currSize+size>4))){ tempOutput+=`</div>`;currSize=0; }
                            if(currSize==0){ tempOutput+=`<div class="ui horizontal basic segments">`; }
                            var col_en = col.display.en;var col_zh = col.display.zh;
                            tempOutput+= DetailViewUI.item.MarineMammal({en:col_en,zh:col_zh,val:val});
                        }
                    }else{
                        for(var j in rows){
                            var tempSubOutput = ``;
                            for(var k in rows[j]){
                                var item = rows[j][k];
                                var col  = item.col;

                                if(!fs.isEmpty(col.datatype)){ 
                                    if(col.datatype == "location"){}
                                }else{
                                    var column = marineObj.attributes[table].columns[col];
                                    var col_en = column.display.en;var col_zh = column.display.zh;

                                    var val = _ret_Data[table+"^"+col];
                                    if(!fs.isEmpty(column.options)){
                                        val = ((column.options).find(function(option){
                                            return option.value === val;
                                        }));
                                        if(!fs.isEmpty(val)){ val = val.dispName }
                                    }
                                    if(fs.isEmpty(val)){ continue; }
                                    hasContent = true;
                                    tempSubOutput+= DetailViewUI.item.MarineMammal({en:col_en,zh:col_zh,val:val});
                                }
                            }
                            if(tempSubOutput!=``){ tempOutput+=`<div class="ui horizontal basic segments">${tempSubOutput}</div>`; }
                        }

                        for(var j in optional){
                            var tempSubOutput = ``;
                            for(var k in optional[j]){
                                var item = optional[j][k];
                                var col  = item.col;
                                var column = marineObj.attributes[table].columns[col];
                                var col_en = column.display.en;var col_zh = column.display.zh;

                                var val = _ret_Data[table+"^"+col];
                                if(!fs.isEmpty(column.options)){
                                    val = (column.options).find(function(option){
                                        return option.value === val;
                                    });
                                    if(!fs.isEmpty(val)){ val = val.dispName }
                                }
                                if(fs.isEmpty(val)){ continue; }
                                hasContent = true;
                                tempSubOutput+= DetailViewUI.item.MarineMammal({en:col_en,zh:col_zh,val:val});
                            }
                            if(tempSubOutput!=``){ tempOutput+=`<div class="ui horizontal basic segments">${tempSubOutput}</div>`; }
                        }
                    }
                    output += tempOutput;
                    if(hasContent){
                        $(targetElm).find(".content .main.column").append(header);
                        $(targetElm).find(`.content .main.column #${DetailViewCtrl.defID}-MarineMammal-${table}`).append(output);
                    }
                }
            }

        }

        if(modal){ $(targetElm).modal(); }
    },
    _ini_bundle:{

    }
}

const EditorCtrl = {
    defID:"CaseEditor",
    _ini:function(data = null){
        if($(`#${EditorCtrl.defID}`).length>0){
            $(`#${EditorCtrl.defID}`).remove();
        }
        $("body").append(EditorUI._ini({type:"NormalType",isEdit:(data!=null),sid:data}));
        $(`#${EditorCtrl.defID} .dropdown`).dropdown();
        $(`#${EditorCtrl.defID} .ui.accordion`).accordion();
        var mapPara = {
            id : "location",
            events:[
                {action:"onClick",func:EditorCtrl.EditorFuncs.addr_search_by_lat_lng }
            ]
        }
        MapCtrl._ini(mapPara);

        //////////////////////////////////////////////////////////////////Only For Editing Existed Cases
        if(data!=null){
            var sid = data;
            var marineData = [];
            $.ajax({
                async:false,type: "POST",url: _REQPATH,
                data: { request:"getMarineMammal", data:{ attributes:marineObj.getAttributesList(),sid:sid }},
                success:function(result){ 
                    //console.log(result);
                    marineData = result;
                },
                error:function(result){ console.log(result); }
            });
            var normalObjs = NormalType.getAttributesList();
            if(marineData.length>0){
                var normalObjs = NormalType.getAttributesList();
                for(var table in normalObjs){
                    for(var i in  normalObjs[table]){
                        if(normalObjs[table][i]=="location"){
                            //console.log(marineData[0]);
                            var latiD   = marineData[0][table+"^latiDegree"];
                            var latiM   = marineData[0][table+"^latiMinute"];
                            var latiS   = marineData[0][table+"^latiSecond"];
                            var longD   = marineData[0][table+"^longDegree"];
                            var longM   = marineData[0][table+"^longMinute"];
                            var longS   = marineData[0][table+"^longSecond"];
                            var region  = marineData[0][table+"^region"];
                            var location= marineData[0][table+"^location"];
                            var position= marineData[0][table+"^position"];
                            var lati,long;
                            if(!(parseFloat(latiD)==0&&parseFloat(latiM)==0&&parseFloat(latiS)==0)){
                                lati = fs.DMSTDeg([latiD,latiM,latiS]);
                                $(`input[name="${table}.lati"]`).val(lati);
                            }
                            if(!(parseFloat(latiD)==0&&parseFloat(latiM)==0&&parseFloat(latiS)==0)){
                                long = fs.DMSTDeg([longD,longM,longS]);
                                $(`input[name="${table}.long"]`).val(long);
                            }
                            if(!(fs.isEmpty(lati)||(fs.isEmpty(long)))){
                                var thisMap = maps['location'].map;
                                thisMap.eachLayer(function(layer){
                                    if (layer instanceof L.Marker){
                                        thisMap.removeLayer(layer)
                                    }
                                });
                                if(!(lati=="NaN"||lati==NaN||long=="NaN"||long==NaN)){
                                    L.marker([lati,long],{
                                        icon:MapCtrl.icons.MarineMammal
                                    }).addTo(thisMap);
                                }
                            }
                            
                            
                            
                            if(!fs.isEmpty(region)){ /*console.log(region);*/$(`input[name="${table}.region"]`).val(region); }
                            if(!fs.isEmpty(location)){ /*console.log(location);*/$(`textarea[name="${table}.location"]`).val(location); }
                            if(!fs.isEmpty(position)){ /*console.log(position);*/$(`input[name="${table}.position"]`).val(position); }

                        }else{
                            var name = `${table}.${normalObjs[table][i]}`;
                            var id   = `${table}^${normalObjs[table][i]}`;
                            var value= marineData[0][id];
                            if(!(value==null||value=="null"||value=="NULL"||value=="undefined"||value==undefined)){
                                if($(`input[name="${name}"],textarea[name="${name}"]`).length>0){
                                    $elm = $(`input[name="${name}"],textarea[name="${name}"]`);
                                    $elm.val(value);
                                }else if($(`select[name="${name}"]`).length>0){
                                    $elm = $(`select[name="${name}"]`).parent(".dropdown");
                                    $elm.dropdown('set selected',value);
                                }
                            }
                        }
                    }
                }
            }else{
                fs.msg.warning("System Error: Please Find System Admin");return;
            }
            //////////////////////////////////////////////////////////////////End of Editing Function
        }
        //console.log($(`#${EditorCtrl.defID} input[name="strandingreport.sid"]`));
        UploadCtrl._ini({
            id: EditorCtrl.defID+"_Upload",
            sid: $(`#${EditorCtrl.defID} input[name="strandingreport.sid"]`).val(),
            text:"Upload Area",
            preview:false,short:true
        });
        $(`#${EditorCtrl.defID}`).modal("show");
    },
    component_ini:function(data){
        var id = data.id,elm = data.elm,showData = data.data;
        $(elm).html(EditorUI.component_ini({showData:showData,id:id}));
        $(elm).find(`.dropdown`).dropdown();
        $(elm).find(`.ui.accordion`).accordion();
        $(elm).find(".leafletJs").each(function(i){
            var mapPara = {
                id : "location-"+id,
                events:[
                    {action:"onClick",func:EditorCtrl.EditorFuncs.addr_search_by_lat_lng }
                ]
            }
            MapCtrl._ini(mapPara);
        });
    },
    EventListener:{
        component:{
            submit:function(data){
                var FormElm = $(data).siblings(".ui.form");
                var currentFormValue = EditorCtrl.EditorFuncs.getCurrentFormValuesComponent(FormElm);
                var data = currentFormValue[0];
                var error= currentFormValue[1];

                if(error.length>0){
                    for(var e in error){
                        var targetElm;
                        if($(FormElm).find(`input[name="${error[e]}"]`).length>0){ 
                            targetElm = $(FormElm).find(`input[name="${error[e]}"]`); 
                        }else if($(FormElm).find(`select[name="${error[e]}"]`).length>0){
                            targetElm = $(FormElm).find(`select[name="${error[e]}"]`); 
                        }else if($(FormElm).find(`textarea[name="${error[e]}"]`).length>0){
                            targetElm = $(FormElm).find(`textarea[name="${error[e]}"]`);
                        }
                        $(targetElm).parent(".field" ).addClass("error");
                    }
                    fs.msg.errorA("Requires Data Needs to Fill");
                    $(FormElm).find(`.ui.form`).removeClass("loading");
                    $(FormElm).find(`.ui.form button`).removeClass("loading");
                }else{
                    var hasSid = true;
                    $.ajax({
                        async:false,type: "POST",url: _REQPATH,
                        data: { request:"getMarineMammal", data:{ attributes:marineObj.getAttributesList(),sid:data["strandingreport"]["sid"] }},
                        success:function(result){ 
                            console.log(result);
                            hasSid = (fs.isEmpty(result.error))?((result.length>0)?true:false):false;
                        },
                        error:function(result){ console.log(result); }
                    });
                    if(hasSid){
                        fs.msg.warningA("SID already existed");
                        $(FormElm).find(`.ui.form`).removeClass("loading");
                        $(FormElm).find(`.ui.form button`).removeClass("loading");
                    }else{
                        $.ajax({
                            async:false,type: "POST",
                            url: _REQPATH,
                            data: { request:"insertcase",data:{data:data,uid:user.authorization.uid }},
                            success:function(result){ 
                                fs.msg.infoA("Data Insert Successful!");
                            },
                            error:function(result){ 
                                fs.msg.errorA("Server System Failed:Please Find Admin!");
                                console.log(result);
                                $(FormElm).find(`.ui.form`).removeClass("loading");
                                $(FormElm).find(`.ui.form button`).removeClass("loading");
                            }
                        });
                    }
                }
            }
        },
        submit:function(){
            $(`#${EditorCtrl.defID} .error`).removeClass("error");
            $(`#${EditorCtrl.defID} .ui.form`).addClass("loading");
            $(`#${EditorCtrl.defID} .ui.form button`).addClass("loading");

            var currentFormValue = EditorCtrl.EditorFuncs.getCurrentFormValues();
            var data = currentFormValue[0];
            var error= currentFormValue[1];

            if(error.length>0){
                for(var e in error){
                    var targetElm;
                    if($(`#${EditorCtrl.defID} input[name="${error[e]}"]`).length>0){ 
                        targetElm = $(`#${EditorCtrl.defID} input[name="${error[e]}"]`); 
                    }else if($(`#${EditorCtrl.defID} select[name="${error[e]}"]`).length>0){
                        targetElm = $(`#${EditorCtrl.defID} select[name="${error[e]}"]`); 
                    }else if($(`#${EditorCtrl.defID} textarea[name="${error[e]}"]`).length>0){
                        targetElm = $(`#${EditorCtrl.defID} textarea[name="${error[e]}"]`);
                    }
                    $(targetElm).parent(".field" ).addClass("error");
                }
                fs.msg.errorA("Requires Data Needs to Fill");
                $(`#${EditorCtrl.defID} .ui.form`).removeClass("loading");
                $(`#${EditorCtrl.defID} .ui.form button`).removeClass("loading");
            }else{
                var hasSid = true;
                $.ajax({
                    async:false,type: "POST",url: _REQPATH,
                    data: { request:"getMarineMammal", data:{ attributes:marineObj.getAttributesList(),sid:data["strandingreport"]["sid"] }},
                    success:function(result){ 
                        console.log(result);
                        hasSid = (fs.isEmpty(result.error))?((result.length>0)?true:false):false;
                    },
                    error:function(result){ console.log(result); }
                });
                if(hasSid){
                    fs.msg.warningA("SID already existed");
                    $(`#${EditorCtrl.defID} .ui.form`).removeClass("loading");
                    $(`#${EditorCtrl.defID} .ui.form button`).removeClass("loading");
                }else{
                    $.ajax({
                        async:false,type: "POST",
                        url: _REQPATH,
                        data: { request:"insertcase",data:{data:data,uid:user.authorization.uid }},
                        success:function(result){ 
                            fs.msg.infoA("Data Insert Successful!");
                            console.log(result);
                            $(`#${EditorCtrl.defID}`).modal("hide");
                            $(`#${EditorCtrl.defID}`).remove();
                        },
                        error:function(result){ 
                            fs.msg.errorA("Server System Failed:Please Find Admin!");
                            console.log(result);
                            $(`#${EditorCtrl.defID} .ui.form`).removeClass("loading");
                            $(`#${EditorCtrl.defID} .ui.form button`).removeClass("loading");
                        }
                    });
                    StrandingCasesCtrl.Event._refresh();
                }
            }
            
        },
        update:function(data){
            var sid = data;
            $(`#${EditorCtrl.defID} .error`).removeClass("error");
            $(`#${EditorCtrl.defID} .ui.form`).addClass("loading");
            $(`#${EditorCtrl.defID} .ui.form button`).addClass("loading");

            var currentFormValue = EditorCtrl.EditorFuncs.getCurrentFormValues();
            var data = currentFormValue[0];
            var error= currentFormValue[1];

            if(error.length>0){
                for(var e in error){
                    var targetElm;
                    if($(`#${EditorCtrl.defID} input[name="${error[e]}"]`).length>0){ 
                        targetElm = $(`#${EditorCtrl.defID} input[name="${error[e]}"]`); 
                    }else if($(`#${EditorCtrl.defID} select[name="${error[e]}"]`).length>0){
                        targetElm = $(`#${EditorCtrl.defID} select[name="${error[e]}"]`); 
                    }else if($(`#${EditorCtrl.defID} textarea[name="${error[e]}"]`).length>0){
                        targetElm = $(`#${EditorCtrl.defID} textarea[name="${error[e]}"]`);
                    }
                    $(targetElm).parent(".field" ).addClass("error");
                }
                fs.msg.errorA("Requires Data Needs to Fill");
                $(`#${EditorCtrl.defID} .ui.form`).removeClass("loading");
                $(`#${EditorCtrl.defID} .ui.form button`).removeClass("loading");
            }else{
                $.ajax({
                    async:false,type: "POST",
                    url: _REQPATH,
                    data: { request:"updatecase",data:{sid:sid,data:data,uid:user.authorization.uid }},
                    success:function(result){ 
                        fs.msg.infoA("Data Update Successful!");
                        console.log(result);
                        $(`#${EditorCtrl.defID}`).modal("hide");
                        $(`#${EditorCtrl.defID}`).remove();
                    },
                    error:function(result){ 
                        fs.msg.errorA("Server System Failed:Please Find Admin!");
                        console.log(result);
                        $(`#${EditorCtrl.defID} .ui.form`).removeClass("loading");
                        $(`#${EditorCtrl.defID} .ui.form button`).removeClass("loading");
                    }
                });
                StrandingCasesCtrl.Event._refresh();
            }
        },
        NavTo:function(data){
            $(`#${EditorCtrl.defID} #${data}`).accordion("open",0);
            $(`#${EditorCtrl.defID} .grid .left`).animate({
                scrollTop: ($(`#${EditorCtrl.defID} #${data}`).offset().top - $(`#${EditorCtrl.defID} .grid .left`).position().top + $(`#${EditorCtrl.defID} .grid .left`).scrollTop())
            }, 500);
        },
        NavToSub:function(data){
            var paras = data.split("-");
            
            $(`#${EditorCtrl.defID} #${paras[0]}`).accordion("open",0);
            $(`#${EditorCtrl.defID} #${data}`).accordion("open",0);
            $(`#${EditorCtrl.defID} .grid .left`).animate({
                scrollTop: ($(`#${EditorCtrl.defID} #${data}`).offset().top - $(`#${EditorCtrl.defID} .grid .left`).position().top + $(`#${EditorCtrl.defID} .grid .left`).scrollTop())
            }, 500);
        }
    },
    EditorFuncs:{
        getCurrentFormValues:function(){
            var data = {};
            var error=[];
            var Type = marineObj._ini("NormalType");
            var editor = Type.editor;
            for(var i in editor){
                var content = editor[i].content;
                for(var j in content){
                    var item = content[j];
                    if(item.rows == "ALL"){
                        var table = item.table;
                        if(fs.isEmpty(data[table])){ data[table] = {}; }
                        var rows = marineObj.attributes[table].columns;
                        for(var key in rows){
                            var row = rows[key];var col = key; 
                            var isRequires = row.requires;
                            var id = table+'.'+col;
                            var targetElm;
                            data[table][col] = "null";
                            if($(`#${EditorCtrl.defID} input[name="${id}"]`).length>0){ 
                                targetElm = $(`#${EditorCtrl.defID} input[name="${id}"]`);
                                if(!fs.isEmpty($(targetElm).val())){ data[table][col] = $(targetElm).val();
                                }else{ if(isRequires){error[error.length] = id;} }
                            }else if($(`#${EditorCtrl.defID} select[name="${id}"]`).length>0){
                                targetElm = $(`#${EditorCtrl.defID} select[name="${id}"]`); 
                                var gotVal= $(targetElm).dropdown("get value");
                                if(!fs.isEmpty(gotVal)){ data[table][col] = gotVal; 
                                }else{ if(isRequires){error[error.length] = id;} }
                            }else if($(`#${EditorCtrl.defID} textarea[name="${id}"]`).length>0){
                                targetElm = $(`#${EditorCtrl.defID} textarea[name="${id}"]`);
                                if(!fs.isEmpty($(targetElm).val())){ data[table][col] = $(targetElm).val(); 
                                }else{ if(isRequires){error[error.length] = id;} }
                            }
                        }
                    }else{
                        var rows = item.rows;
                        var optional=item.optional;
                        var table = item.table;
                        if(fs.isEmpty(data[table])){ data[table] = {}; }
                        for(var k in rows){
                            var row = rows[k]; 
                            for(var l in row){
                                var col = row[l].col;
                                if(!fs.isEmpty(col.datatype)){
                                    if(col.datatype == "location"){
                                        data[table]["longDegree"]  = "null";data[table]["longMinute"]  = "null";data[table]["longSecond"]  = "null";
                                        data[table]["longDegree"]  = "null";data[table]["longMinute"]  = "null";data[table]["longSecond"]  = "null";
                                        var latiElm = $(`#${EditorCtrl.defID} input[name="strandingreport.lati"]`);
                                        var longElm = $(`#${EditorCtrl.defID} input[name="strandingreport.long"]`);
                                        var addrElm = $(`#${EditorCtrl.defID} textarea[name="strandingreport.location"]`);
                                        var regElm  = $(`#${EditorCtrl.defID} input[name="strandingreport.region"]`);
                                        var posElm  = $(`#${EditorCtrl.defID} input[name="strandingreport.position"]`);
                                        if(!fs.isEmpty($(latiElm).val())&&!fs.isEmpty($(longElm).val())){
                                            var latiDMS = fs.DegTDMS($(latiElm).val()); 
                                            data[table]["latiDegree"]  = latiDMS[0];
                                            data[table]["latiMinute"]  = latiDMS[1];
                                            data[table]["latiSecond"]  = latiDMS[2];
                                            var longDMS = fs.DegTDMS($(longElm).val()); 
                                            data[table]["longDegree"]  = longDMS[0];
                                            data[table]["longMinute"]  = longDMS[1];
                                            data[table]["longSecond"]  = longDMS[2];
                                        }
                                        if(!fs.isEmpty($(addrElm).val())){ data[table]["location"]  = $(addrElm).val(); }
                                        if(!fs.isEmpty($(regElm).val())){ data[table]["region"]     = $(regElm).val(); }
                                        if(!fs.isEmpty($(posElm).val())){ data[table]["position"]   = $(posElm).val(); }
                                    }
                                }else{
                                    var id = table+'.'+col;
                                    var targetElm;
                                    data[table][col] = "null";
                                    if($(`#${EditorCtrl.defID} input[name="${id}"]`).length>0){ 
                                        targetElm = $(`#${EditorCtrl.defID} input[name="${id}"]`); 
                                        if(!fs.isEmpty($(targetElm).val())){ data[table][col] = $(targetElm).val(); }else{
                                            if($(targetElm).attr("requires")=="true"||$(targetElm).attr("requires")==true){error[error.length] = id;}
                                        }
                                    }else if($(`#${EditorCtrl.defID} select[name="${id}"]`).length>0){
                                        targetElm = $(`#${EditorCtrl.defID} select[name="${id}"]`); 
                                        var gotVal= $(targetElm).dropdown("get value");
                                        if(!fs.isEmpty(gotVal)){ data[table][col] = gotVal; }else{
                                            if($(targetElm).attr("requires")=="true"||$(targetElm).attr("requires")==true){error[error.length] = id;}
                                        }
                                    }else if($(`#${EditorCtrl.defID} textarea[name="${id}"]`).length>0){
                                        targetElm = $(`#${EditorCtrl.defID} textarea[name="${id}"]`);
                                        if(!fs.isEmpty($(targetElm).val())){ data[table][col] = $(targetElm).val(); }else{
                                            if($(targetElm).attr("requires")=="true"||$(targetElm).attr("requires")==true){error[error.length] = id;}
                                        }
                                    }
                                }
                                
                            }
                        }

                        for(var k in optional){
                            var row = optional[k];
                            for(var l in row){
                                var col = row[l].col;
                                if(!fs.isEmpty(col.display)){
                                    if(col.datatype == "location"){
                                        data[table]["longDegree"]  = "null";data[table]["longMinute"]  = "null";data[table]["longSecond"]  = "null";
                                        data[table]["longDegree"]  = "null";data[table]["longMinute"]  = "null";data[table]["longSecond"]  = "null";
                                        var latiElm = $(`#${EditorCtrl.defID} input[name="strandingreport.lati"]`);
                                        var longElm = $(`#${EditorCtrl.defID} input[name="strandingreport.long"]`);
                                        var addrElm = $(`#${EditorCtrl.defID} textarea[name="strandingreport.location"]`);
                                        var regElm  = $(`#${EditorCtrl.defID} input[name="strandingreport.region"]`);
                                        var posElm  = $(`#${EditorCtrl.defID} input[name="strandingreport.position"]`);
                                        if(!fs.isEmpty($(latiElm).val())&&!fs.isEmpty($(longElm).val())){
                                            var latiDMS = fs.DegTDMS($(latiElm).val()); 
                                            data[table]["latiDegree"]  = latiDMS[0];
                                            data[table]["latiMinute"]  = latiDMS[1];
                                            data[table]["latiSecond"]  = latiDMS[2];
                                            var longDMS = fs.DegTDMS($(longElm).val()); 
                                            data[table]["longDegree"]  = longDMS[0];
                                            data[table]["longMinute"]  = longDMS[1];
                                            data[table]["longSecond"]  = longDMS[2];
                                        }
                                        if(!fs.isEmpty($(addrElm).val())){ data[table]["location"]  = $(addrElm).val(); }
                                        if(!fs.isEmpty($(regElm).val())){ data[table]["region"]     = $(regElm).val(); }
                                        if(!fs.isEmpty($(posElm).val())){ data[table]["position"]   = $(posElm).val(); }
                                    }
                                }else{
                                    var id = table+'.'+col;
                                    var targetElm;
                                    data[table][col] = "null";
                                    if($(`#${EditorCtrl.defID} input[name="${id}"]`).length>0){ 
                                        targetElm = $(`#${EditorCtrl.defID} input[name="${id}"]`); 
                                        if(!fs.isEmpty($(targetElm).val())){ data[table][col] = $(targetElm).val(); }else{
                                            if($(targetElm).attr("requires")=="true"||$(targetElm).attr("requires")==true){error[error.length] = id;}
                                        }
                                    }else if($(`#${EditorCtrl.defID} select[name="${id}"]`).length>0){
                                        targetElm = $(`#${EditorCtrl.defID} select[name="${id}"]`); 
                                        var gotVal= $(targetElm).dropdown("get value");
                                        if(!fs.isEmpty(gotVal)){ data[table][col] = gotVal; }else{
                                            if($(targetElm).attr("requires")=="true"||$(targetElm).attr("requires")==true){error[error.length] = id;}
                                        }
                                    }else if($(`#${EditorCtrl.defID} textarea[name="${id}"]`).length>0){
                                        targetElm = $(`#${EditorCtrl.defID} textarea[name="${id}"]`);
                                        if(!fs.isEmpty($(targetElm).val())){ data[table][col] = $(targetElm).val(); }else{
                                            if($(targetElm).attr("requires")=="true"||$(targetElm).attr("requires")==true){error[error.length] = id;}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return [data,error];
        },
        getCurrentFormValuesComponent:function(elm){
            var data = {};
            var error=[];
            var Type = marineObj._ini("NormalType");
            var editor = Type.editor;
            for(var i in editor){
                var content = editor[i].content;
                for(var j in content){
                    var item = content[j];
                    if(item.rows == "ALL"){
                        var table = item.table;
                        if(fs.isEmpty(data[table])){ data[table] = {}; }
                        var rows = marineObj.attributes[table].columns;
                        for(var key in rows){
                            var row = rows[key];var col = key; 
                            var isRequires = row.requires;
                            var id = table+'.'+col;
                            var targetElm;
                            data[table][col] = "null";
                            if($(elm).find(`input[name="${id}"]`).length>0){ 
                                targetElm = $(elm).find(`input[name="${id}"]`);
                                if(!fs.isEmpty($(targetElm).val())){ data[table][col] = $(targetElm).val();
                                }else{ if(isRequires){error[error.length] = id;} }
                            }else if($(elm).find(`select[name="${id}"]`).length>0){
                                targetElm = $(elm).find(`select[name="${id}"]`); 
                                var gotVal= $(targetElm).dropdown("get value");
                                if(!fs.isEmpty(gotVal)){ data[table][col] = gotVal; 
                                }else{ if(isRequires){error[error.length] = id;} }
                            }else if($(elm).find(`textarea[name="${id}"]`).length>0){
                                targetElm = $(elm).find(`textarea[name="${id}"]`);
                                if(!fs.isEmpty($(targetElm).val())){ data[table][col] = $(targetElm).val(); 
                                }else{ if(isRequires){error[error.length] = id;} }
                            }
                        }
                    }else{
                        var rows = item.rows;
                        var optional=item.optional;
                        var table = item.table;
                        if(fs.isEmpty(data[table])){ data[table] = {}; }
                        for(var k in rows){
                            var row = rows[k]; 
                            for(var l in row){
                                var col = row[l].col;
                                if(!fs.isEmpty(col.datatype)){
                                    if(col.datatype == "location"){
                                        data[table]["longDegree"]  = "null";data[table]["longMinute"]  = "null";data[table]["longSecond"]  = "null";
                                        data[table]["longDegree"]  = "null";data[table]["longMinute"]  = "null";data[table]["longSecond"]  = "null";
                                        var latiElm = $(elm).find(`input[name="strandingreport.lati"]`);
                                        var longElm = $(elm).find(`input[name="strandingreport.long"]`);
                                        var addrElm = $(elm).find(`textarea[name="strandingreport.location"]`);
                                        var regElm  = $(elm).find(`input[name="strandingreport.region"]`);
                                        var posElm  = $(elm).find(`input[name="strandingreport.position"]`);
                                        if(!fs.isEmpty($(latiElm).val())&&!fs.isEmpty($(longElm).val())){
                                            var latiDMS = fs.DegTDMS($(latiElm).val()); 
                                            data[table]["latiDegree"]  = latiDMS[0];
                                            data[table]["latiMinute"]  = latiDMS[1];
                                            data[table]["latiSecond"]  = latiDMS[2];
                                            var longDMS = fs.DegTDMS($(longElm).val()); 
                                            data[table]["longDegree"]  = longDMS[0];
                                            data[table]["longMinute"]  = longDMS[1];
                                            data[table]["longSecond"]  = longDMS[2];
                                        }
                                        if(!fs.isEmpty($(addrElm).val())){ data[table]["location"]  = $(addrElm).val(); }
                                        if(!fs.isEmpty($(regElm).val())){ data[table]["region"]     = $(regElm).val(); }
                                        if(!fs.isEmpty($(posElm).val())){ data[table]["position"]   = $(posElm).val(); }
                                    }
                                }else{
                                    var id = table+'.'+col;
                                    var targetElm;
                                    data[table][col] = "null";
                                    if($(elm).find(`input[name="${id}"]`).length>0){ 
                                        targetElm = $(elm).find(`input[name="${id}"]`); 
                                        if(!fs.isEmpty($(targetElm).val())){ data[table][col] = $(targetElm).val(); }else{
                                            if($(targetElm).attr("requires")=="true"||$(targetElm).attr("requires")==true){error[error.length] = id;}
                                        }
                                    }else if($(elm).find(`select[name="${id}"]`).length>0){
                                        targetElm = $(elm).find(`select[name="${id}"]`); 
                                        var gotVal= $(targetElm).dropdown("get value");
                                        if(!fs.isEmpty(gotVal)){ data[table][col] = gotVal; }else{
                                            if($(targetElm).attr("requires")=="true"||$(targetElm).attr("requires")==true){error[error.length] = id;}
                                        }
                                    }else if($(elm).find(`textarea[name="${id}"]`).length>0){
                                        targetElm = $(elm).find(`textarea[name="${id}"]`);
                                        if(!fs.isEmpty($(targetElm).val())){ data[table][col] = $(targetElm).val(); }else{
                                            if($(targetElm).attr("requires")=="true"||$(targetElm).attr("requires")==true){error[error.length] = id;}
                                        }
                                    }
                                }
                                
                            }
                        }

                        for(var k in optional){
                            var row = optional[k];
                            for(var l in row){
                                var col = row[l].col;
                                if(!fs.isEmpty(col.display)){
                                    if(col.datatype == "location"){
                                        data[table]["longDegree"]  = "null";data[table]["longMinute"]  = "null";data[table]["longSecond"]  = "null";
                                        data[table]["longDegree"]  = "null";data[table]["longMinute"]  = "null";data[table]["longSecond"]  = "null";
                                        var latiElm = $(elm).find(`input[name="strandingreport.lati"]`);
                                        var longElm = $(elm).find(`input[name="strandingreport.long"]`);
                                        var addrElm = $(elm).find(`textarea[name="strandingreport.location"]`);
                                        var regElm  = $(elm).find(`input[name="strandingreport.region"]`);
                                        var posElm  = $(elm).find(`input[name="strandingreport.position"]`);
                                        if(!fs.isEmpty($(latiElm).val())&&!fs.isEmpty($(longElm).val())){
                                            var latiDMS = fs.DegTDMS($(latiElm).val()); 
                                            data[table]["latiDegree"]  = latiDMS[0];
                                            data[table]["latiMinute"]  = latiDMS[1];
                                            data[table]["latiSecond"]  = latiDMS[2];
                                            var longDMS = fs.DegTDMS($(longElm).val()); 
                                            data[table]["longDegree"]  = longDMS[0];
                                            data[table]["longMinute"]  = longDMS[1];
                                            data[table]["longSecond"]  = longDMS[2];
                                        }
                                        if(!fs.isEmpty($(addrElm).val())){ data[table]["location"]  = $(addrElm).val(); }
                                        if(!fs.isEmpty($(regElm).val())){ data[table]["region"]     = $(regElm).val(); }
                                        if(!fs.isEmpty($(posElm).val())){ data[table]["position"]   = $(posElm).val(); }
                                    }
                                }else{
                                    var id = table+'.'+col;
                                    var targetElm;
                                    data[table][col] = "null";
                                    if($(elm).find(`input[name="${id}"]`).length>0){ 
                                        targetElm = $(elm).find(`input[name="${id}"]`); 
                                        if(!fs.isEmpty($(targetElm).val())){ data[table][col] = $(targetElm).val(); }else{
                                            if($(targetElm).attr("requires")=="true"||$(targetElm).attr("requires")==true){error[error.length] = id;}
                                        }
                                    }else if($(elm).find(`select[name="${id}"]`).length>0){
                                        targetElm = $(elm).find(`select[name="${id}"]`); 
                                        var gotVal= $(targetElm).dropdown("get value");
                                        if(!fs.isEmpty(gotVal)){ data[table][col] = gotVal; }else{
                                            if($(targetElm).attr("requires")=="true"||$(targetElm).attr("requires")==true){error[error.length] = id;}
                                        }
                                    }else if($(elm).find(`textarea[name="${id}"]`).length>0){
                                        targetElm = $(elm).find(`textarea[name="${id}"]`);
                                        if(!fs.isEmpty($(targetElm).val())){ data[table][col] = $(targetElm).val(); }else{
                                            if($(targetElm).attr("requires")=="true"||$(targetElm).attr("requires")==true){error[error.length] = id;}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return [data,error];
        },
        addr_search_by_lat_lng:function(rslt){
            var lat = rslt.latlng.lat,lng = rslt.latlng.lng;
            var reqNominatim = "https://nominatim.openstreetmap.org/reverse?format=json&accept-language=en&lat="+lat+"&lon="+lng;     
            var addressJson = [];
            var id = (fs.isEmpty(rslt.id))?"location":rslt.id;
            
            var thisMap = maps[id].map;
            thisMap.eachLayer(function(layer){
                console.log(layer);
                if (layer instanceof L.Marker){
                    thisMap.removeLayer(layer)
                }
            });
            L.marker([lat,lng],{
                icon:MapCtrl.icons.MarineMammal
            }).addTo(thisMap);

            $.ajax({
                async:false,type: "GET",
                url: reqNominatim,
                success:function(result){ 
                    addressJson = result;
                 },
                error:function(result){ console.log(result); }
            });

            var addressElm=$(`#${EditorCtrl.defID} textarea[name="strandingreport.location"]`);
            var latElm=$(`#${EditorCtrl.defID} input[name="strandingreport.lati"]`);
            var lngElm=$(`#${EditorCtrl.defID} input[name="strandingreport.long"]`);
            var regElm=$(`#${EditorCtrl.defID} input[name="strandingreport.region"]`);
            var posElm=$(`#${EditorCtrl.defID} input[name="strandingreport.position"]`);

            addressElm.val(addressJson.display_name);
            latElm.val(addressJson.lat);
            lngElm.val(addressJson.lon);
            regElm.val(addressJson.address.country);
            posElm.val(addressJson.address.state);
        },
        addr_search_by_lat_lng_Component:function(data){
            var rslt = data.rslt;var elm = data.elm;
            var lat = rslt.latlng.lat,lng = rslt.latlng.lng;
            var reqNominatim = "https://nominatim.openstreetmap.org/reverse?format=json&accept-language=en&lat="+lat+"&lon="+lng;     
            var addressJson = [];
            var id = (fs.isEmpty(data.id))?"location":data.id;
            
            var thisMap = maps[id].map;
            thisMap.eachLayer(function(layer){
                console.log(layer);
                if (layer instanceof L.Marker){
                    thisMap.removeLayer(layer)
                }
            });
            L.marker([lat,lng],{
                icon:MapCtrl.icons.MarineMammal
            }).addTo(thisMap);

            $.ajax({
                async:false,type: "GET",
                url: reqNominatim,
                success:function(result){ 
                    addressJson = result;
                 },
                error:function(result){ console.log(result); }
            });

            var addressElm=$(elm).find(`textarea[name="strandingreport.location"]`);
            var latElm=$(elm).find(`input[name="strandingreport.lati"]`);
            var lngElm=$(elm).find(`input[name="strandingreport.long"]`);
            var regElm=$(elm).find(`input[name="strandingreport.region"]`);
            var posElm=$(elm).find(`input[name="strandingreport.position"]`);

            addressElm.val(addressJson.display_name);
            latElm.val(addressJson.lat);
            lngElm.val(addressJson.lon);
            regElm.val(addressJson.address.country);
            posElm.val(addressJson.address.state);
        }
    }

}

const SelectAreaCtrl ={
    _ini:function(data){
        var elm = data;
        $(elm).mousedown(function(){
            elm.hidden = 0;
        }).mouseup(function(){

        })
    },
    Events:{

    }
};

//Note: UploadCtrl id cannot use "-" char
const UploadCtrl = {
    defaultIniConf:{ // Make the whole body a dropzone
        url: _REQPATH_FILESHANDLE, // Set the url
        autoQueue: false, // Make sure the files aren't queued until manually added
    },
    defID:"upload",
    _ini:function(data){
        var id = data.id;var elm = fs.isEmpty(data.elm)?null:data.elm;
        var sid= (fs.isEmpty(data.sid))?"":data.sid;
        if($("input[type='file'].dz-hidden-input").length>0){ $("input[type='file'].dz-hidden-input").remove(); }
        uploadBuffers[id] = {};
        uploadBuffers_Server[id] = {};
        var targetElm = (elm==null)?$(`#${id}`):$(elm);
        var iniConf = this.defaultIniConf;
        //var hasPreview = (!fs.isEmpty(data.preview));
        iniConf.previewTemplate = UploadAareUI.uploadedItem();
        iniConf.previewsContainer = `#${this.defID}-${id}-list`;
        iniConf.init = function(){
            this.on("addedfile",function(file){
                UploadCtrl.Events.dropzoneDefFunc.addedfile({file:file,id:id,sid:sid});
            });
            this.on("removedfile",function(file){
                UploadCtrl.Events.dropzoneDefFunc.removedfile({file:file,id:id});
            });
            this.on("uploadprogress",function(file,progress,bytesSent){
                UploadCtrl.Events.dropzoneDefFunc.uploadprogress({file:file,progress:progress});
            });
            this.on("sending", function(file, xhr, formData){
                console.log(xhr);
                UploadCtrl.Events.dropzoneDefFunc.sending({file:file,formData:formData,id:id});
            });
            this.on("error",function(file,response){
                UploadCtrl.Events.dropzoneDefFunc.error({file:file,response:response});
            });
            this.on("success",function(file){
                UploadCtrl.Events.dropzoneDefFunc.success({file:file,id:id});
            });
        }

        $(targetElm).html(UploadAareUI._ini(data));
        //console.log(`#${UploadCtrl.defID}-${id}`);
        var dropzone = new Dropzone(`#${UploadCtrl.defID}-${id}`,iniConf);
        $("#uploadComp-"+id+" .uploadall").click(function() {
            UploadCtrl.EventListener.bufferUpload(id);
        });
        $("#uploadComp-"+id+" .removeall").click(function() { 
            UploadCtrl.EventListener.bufferRemove(id);
        });
        uploads[id] = dropzone;
        return dropzone;
    },
    Events:{
        FileTypeClassifyByName:function(data){
            var fileName = data;
            var fileNameArray = fileName.split(".");
            var fileType = fileNameArray[fileNameArray.length-1];
            
            switch(fileType){
                case "pdf":case "PDF":
                    return "pdf";
                case "doc":case "DOC":case "docx":case "DOCX":
                    return "word";
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
        },
        dropzoneDefFunc:{
            addedfile:function(data){
                var file = data.file;
                var fileWholeNameArray = file.name.split(".");var fileNameArray = fileWholeNameArray[0].split("_");
                //console.log(file);
                var id = data.id;
                var fileType = UploadCtrl.Events.FileTypeClassify(file);
                if(fs.isEmpty(uploadBuffers[id][fileType])){ uploadBuffers[id][fileType] = {}; }
                if(fs.isEmpty(uploadBuffers_Server[id][fileType])){ uploadBuffers_Server[id][fileType] = {}; }
                uploadBuffers[id][fileType][file.name] = file;
                uploadBuffers_Server[id][fileType][file.name] = {};
                //uploadBuffers_Server[id][fileType][file.name]["name"] = file.name;
                //------------------------------------//
                var sid = data.sid;
                if(sid==""||sid==null){
                    if(fileNameArray.length>=2){ sid = fileNameArray[0]; }
                    if(sid==""){ 
                        var _fileNameArray = fileWholeNameArray[0].split(" ");
                        if(_fileNameArray.length>=2){ sid = _fileNameArray[0]; }
                    }
                }
                if(typeof(sid) != "string"){ sid = $(sid).val(); }
                uploadBuffers_Server[id][fileType][file.name]["sid"] = sid;
                //------------------------------------//
                uploadBuffers_Server[id][fileType][file.name]["uid"] = fs.isEmpty(user)?"":user.authorization.uid;

                //------------------------------------//
                uploadBuffers_Server[id][fileType][file.name]["imageclass"] = 3;

                //------------------------------------//
                var category = null;
                if(fileWholeNameArray.length>=2){ 
                    var filename_categoryArray = fileWholeNameArray[0].split("_");
                    //console.log(filename_categoryArray);
                    if(filename_categoryArray.length>1){
                        category = filename_categoryArray[1].split(" ");
                    }
                }
                uploadBuffers_Server[id][fileType][file.name]["category"] = fs.jsonTstr(category);
                //------------------------------------//
                uploadBuffers_Server[id][fileType][file.name]["description"] = "";

                //------------------------------------//
                
                /*console.log("------------------AddFile    -----------------------------");
                console.log(id+" "+fileType+" "+file.name);
                console.log(uploadBuffers);
                console.log(uploadBuffers_Server);
                console.log("------------------AddFile End-----------------------------");*/
                $('.special.cards .image').dimmer({ on: 'hover' });
                var pvElm = file.previewElement;
                if(fileType != "image"){
                    $(pvElm).children(".image").children("img").attr("src",FILT_TYPE[fileType].path);
                }
                fs.msg.infoA(`File ${file.name} added into buffer pool.`);
            },
            removedfile:function(data){
                var file = data.file;
                var id = data.id;
                var fileType = UploadCtrl.Events.FileTypeClassify(file);

                if($(`#${UploadCtrl.UploadBuffList.defUpdBuffID}-${id}`).length>0){
                    $(`#${UploadCtrl.UploadBuffList.defUpdBuffID}-${id} tr td [data-filename="${file.name}"]`).parents("tr").remove();
                }

                delete uploadBuffers[id][fileType][file.name];
                delete uploadBuffers_Server[id][fileType][file.name];
                if(fs.isEmpty(uploadBuffers_Server[id][fileType])){ delete uploadBuffers_Server[id][fileType];  }
                fs.msg.infoA(`File ${file.name} removed.`);
            },
            uploadprogress:function(data){
                var file = data.file;
                var progress = data.progress;
                var pvElm = file.previewElement;
                $(pvElm).children(".progress").attr("data-percent",progress);

            },
            sending:function(data){
                var file = data.file;
                var id = data.id;
                var fileType = UploadCtrl.Events.FileTypeClassify(file);
                data.formData.append("request", "uploadTemp");
                var uploadBuffParas = uploadBuffers_Server[id][fileType][file.name];
                for(var col in uploadBuffParas){
                    data.formData.append(col, uploadBuffParas[col]);
                }
            },
            error:function(data){
                var file = data.file;
                var response = data.response;
                var pvElm = file.previewElement;
                $(pvElm).addClass("red");
                var popupParam = {
                    elm:pvElm,
                    config:{
                        title    :"Upload Error",
                        content  :response
                    }
                }
                fs.popup(popupParam);
            },
            success:function(data){
                var file = data.file;
                var id = data.id;
                var fileType = UploadCtrl.Events.FileTypeClassify(file);
                var pvElm = file.previewElement;
                if($(`#${UploadCtrl.UploadBuffList.defUpdBuffID}-${id}`).length>0){
                    $(`#${UploadCtrl.UploadBuffList.defUpdBuffID}-${id} tr td [data-filename="${file.name}"]`).parents("tr").remove();
                }

                $(pvElm).remove();
                delete uploadBuffers[id][fileType][file.name];
                delete uploadBuffers_Server[id][fileType][file.name];
                fs.msg.infoA(`File ${file.name} Uploaded`);
            }
        }
    },
    EventListener:{
        bufferClose:function(){
            if($(".modal.caseEditor").length>0){
                $(".modal.caseEditor").modal("show");
            }
        },
        bufferInit:function(data){
            var id = data;
            UploadCtrl.UploadBuffList._ini({id:id});
        },
        bufferRemove:function(data){
            var id = data;var dropzone = uploads[id];
            $(".button .removeall").addClass("loading");
            dropzone.removeAllFiles(true); 
            $(".button .removeall").removeClass("loading");
        },
        bufferUpload:function(data){
            var id = data;var dropzone = uploads[id];
            $(".button .uploadall").addClass("loading");
            dropzone.enqueueFiles(dropzone.getFilesWithStatus(Dropzone.ADDED)); 
            FileManagementCtrl.contents.retrieved();
            $(".button .uploadall").removeClass("loading");
        }
    },
    UploadBuffList:{
        defUpdBuffID:"UpdBuffEditor",
        defTableID:"table-upload",
        _ini:function(data){
            var id = data.id;
            if($(`#${UploadCtrl.UploadBuffList.defUpdBuffID}-${id}`).length > 0){ $(`#${UploadCtrl.UploadBuffList.defUpdBuffID}-${id}`).remove(); }
            if(fs.isEmpty(uploadBuffers[id])){ fs.msg.warningA("No Files in upload buffer!");return;  }
            $('body').append(UploadAareUI.uploadBufferEditor._ini(id));
            $(`#${UploadCtrl.UploadBuffList.defUpdBuffID}-${id}`).modal('show');
            $(`#${UploadCtrl.UploadBuffList.defUpdBuffID}-${id} .accordion`).accordion();
            for(var fileType in uploadBuffers[id]){
                var columnsShow = (fs.isEmpty(_FILETYPE[fileType]))?_FILETYPE.general:_FILETYPE[fileType];
                var constructedData = UploadCtrl.UploadBuffList.Events.dataConstruct({id:id,fileType,fileType});
                TableCtrl._ini({
                    id:this.defTableID+"-"+id+"-"+fileType,
                    elm:$(`#${UploadCtrl.UploadBuffList.defUpdBuffID}-${id}-${fileType}`),
                    configs:{
                        pageLength:-1,paging:false,info:false,searching:false,
                        orderCellsTop: false,responsive:false,autoWidth:true,
                        data:constructedData,
                        columns:columnsShow.dataAttrs
                    }
                });
                $(`#${UploadCtrl.UploadBuffList.defUpdBuffID}-${id}-${fileType} .dropdown[data-column="imageclass"]`).dropdown({
                    values: _DEFDOCCLASSIFY.image,
                    onChange: function(){
                        UploadCtrl.UploadBuffList.EventListener.bufferEditor.rowedit(this);
                    }
                });
                $(`#${UploadCtrl.UploadBuffList.defUpdBuffID}-${id}-${fileType} .dropdown[data-column="category"]`).dropdown({
                    values: _DEFDOCCLASSIFY.general,
                    useLabels: false,allowAdditions:false,
                    onChange: function(){
                        UploadCtrl.UploadBuffList.EventListener.bufferEditor.rowedit(this);
                    }
                });
            }
            
            for(var fileType in uploadBuffers[id]){
                var TypeList = uploadBuffers_Server[id][fileType];//table-upload-Testing-image
                for(var filename in TypeList){
                    var item = TypeList[filename];
                    var targetElm = $(`#${UploadCtrl.UploadBuffList.defTableID}-${id}-${fileType} [data-filename="${filename}"]`).parents("tr");
                    for(var itemname in item){
                        if($(targetElm).find(`[data-column="${itemname}"]`).hasClass("dropdown")){
                            $(targetElm).find(`[data-column="${itemname}"]`).dropdown("set value",fs.strTjson(item[itemname]));
                        }else{
                            $(targetElm).find(`[data-column="${itemname}"]`).val(item[itemname]);
                        }
                    }
                    
                }
            }

        },
        Events:{
            dataConstruct:function(data){
                var _rtn = [];var id = data.id;var type = data.fileType;
                var fileList = uploadBuffers[id][type];
                for(var filename in fileList){
                    var file = fileList[filename];
                    var currLen = _rtn.length
                    _rtn[currLen] = {};
                    _rtn[currLen].name = filename;
                    _rtn[currLen].status = file.status;
                    _rtn[currLen].size = file.size;
                    _rtn[currLen].type = file.type;
                    _rtn[currLen].fileAttr = [id,type,filename];
                }
                return _rtn;
            }
        },
        EventListener:{
            groupedit:function(data){
                var elm = data;
                var thisTableElm = $(elm).parent("th").parent("tr").parent("thead").parent("table");
                var thisTableElmID = $(thisTableElm).attr("id");
                var id = thisTableElmID.split("-")[2];
                var type = thisTableElmID.split("-")[3];
                var selectElms = $(`#${UploadCtrl.UploadBuffList.defUpdBuffID}-${id} #${UploadCtrl.UploadBuffList.defUpdBuffID}-${id}-${type} tr.selected`);
                if(selectElms.length==0){ fs.msg.warningA("Haven't choose any file!");return; }
                if($(`#${UploadCtrl.UploadBuffList.GroupEdit.defID}-${id}-${type}`).length>0){
                    $(`#${UploadCtrl.UploadBuffList.GroupEdit.defID}-${id}-${type}`).remove(); 
                }
                $(`body`).append(UploadAareUI.uploadBufferEditor.uploadBufferEditorGroupEditUI._ini({id:id,type:type}));
                
                var editorItem = (fs.isEmpty(_FILETYPE[type]))?_FILETYPE.general:_FILETYPE[type];
                var editorItemDataAttrs = editorItem.dataAttrs;
                for(var i in editorItemDataAttrs){
                    var item = editorItemDataAttrs[i];
                    if(!fs.isEmpty(item.editable)){
                        $(`#${UploadCtrl.UploadBuffList.GroupEdit.defID}-${id}-${type} .content`).append(UploadAareUI.uploadBufferEditor.uploadBufferEditorGroupEditUI._content(item));
                        if(item.edittype == "select"){ 
                            $(`#${UploadCtrl.UploadBuffList.GroupEdit.defID}-${id}-${type} .content .dropdown[data-column="${item.name}"]`).dropdown(item.optionConfig);    
                        }
                    }
                }
                $(`#${UploadCtrl.UploadBuffList.GroupEdit.defID}-${id}-${type}`).modal("show");
            },
            bufferEditor:{
                rowedit:function(data){
                    var elm = data
                    var datacolumn = $(elm).attr("data-column");
                    var targetRowElm = $(elm).parents("tr");
                    var filename = $(targetRowElm).find("[data-filename]").attr("data-filename");
                    var targetTableElm = $(elm).parents("table");
                    var id = $(targetTableElm).attr("id").split("-")[2];
                    var type = $(targetTableElm).attr("id").split("-")[3];

                    var v = ($(elm).hasClass("dropdown"))?$(elm).dropdown("get value"):$(elm).val();
                    uploadBuffers_Server[id][type][filename][datacolumn] = v;
                }
            }
        },
        GroupEdit:{ 
            defID:"UpdBuffEditor-GroupEditor",
            EventListener:{
                submit:function(data){
                    var elm = data;
                    var modalID = $(elm).parent(".actions").parent(".updBufferListGroupEditor").attr("id");
                    var id   = modalID.split("-")[2];
                    var type = modalID.split("-")[3];
                    var selectElms = $(`#${UploadCtrl.UploadBuffList.defUpdBuffID}-${id} #${UploadCtrl.UploadBuffList.defUpdBuffID}-${id}-${type} tr.selected`);
                    var editorItem = (fs.isEmpty(_FILETYPE[type]))?_FILETYPE.general:_FILETYPE[type];
                    var editorItemDataAttrs = editorItem.dataAttrs;
                    var values = {};
                    for(var i in editorItemDataAttrs){
                        var item = editorItemDataAttrs[i];
                        if(!fs.isEmpty(item.editable)){
                            var v = "";
                            if(item.edittype=="select"){
                                v = $(`#${UploadCtrl.UploadBuffList.GroupEdit.defID}-${id}-${type} [data-column="${item.name}"]`).dropdown("get value");
                                if(!fs.isEmpty(v)){
                                    $(selectElms).find(` [data-column="${item.name}"]`).dropdown("set selected",v.split(","));
                                }
                            }else{ 
                                v = $(`#${UploadCtrl.UploadBuffList.GroupEdit.defID}-${id}-${type} [data-column="${item.name}"]`).val();
                                if(!fs.isEmpty(v)){
                                    $(selectElms).find(` [data-column="${item.name}"]`).val(v);
                                }
                            }
                            values[item.name] = v;
                        }
                    }

                    $(selectElms).each(function(){
                        var selectElm = $(this);
                        var selectedfilename  = $(selectElm).find("[data-filename]").attr("data-filename");
                        for(var vname in values){
                            uploadBuffers_Server[id][type][selectedfilename][vname] = values[vname];
                        }
                    });
                    $(`#${UploadCtrl.UploadBuffList.defUpdBuffID}-${id}`).modal('show');
                },
                back:function(data){
                    var elm = data;
                    var modalID = $(elm).parent(".actions").parent(".updBufferListGroupEditor").attr("id");
                    var id   = modalID.split("-")[2];
                    $(`#${UploadCtrl.UploadBuffList.defUpdBuffID}-${id}`).modal('show');
                }
            }
        }
    }
}

const FileManagementCtrl = {
    defID:"File-Management",
    _ini:function(data){
        var id = data.id;
        var elm = (fs.isEmpty(data.elm))?null:data.elm;
        var filetype = fs.isEmpty(data.filetype)?"all":data.filetype;
        var targetElm = (elm==null)?$(`#${id}`):$(elm);
        $(targetElm).html(fileManagementUI._ini(data));
        if($(targetElm).find(`#fmUploadArea${id}`).length>0){
            var uploadParam ={id:`fmUploadArea${id}`,short:true,
            preview:true};
            UploadCtrl._ini(uploadParam);
        }
        $(targetElm).find(".fm-file-type-select .header.cursor").removeClass("active");
        $(targetElm).find(`.fm-file-type-select .header.cursor[data-type='${filetype}']`).addClass("active");
        FileManagementCtrl.contents.retrieved();
        this.contents._refresh($(targetElm).find(".fmComponent"));
    },
    contents:{
        fmFileType : {
            image:{ group:"image",display:"Images" },
            pdf:{ group:"doc",display:"Documents" },
            word:{ group:"doc",display:"Documents" },
            ppt:{ group:"doc",display:"Documents" },
            excel:{ group:"doc",display:"Documents" },
            text:{ group:"doc",display:"Documents" },
            doc:{ group:"doc",display:"Documents" },
            zip:{ group:"zip",display:"Zip Files" },
            dicom:{ group:"dicom",display:"Dicom Files" },
            photo:{ group:"photo",display:"Raw Photo Source" },
            video:{ group:"video",display:"Video & Audio" },
            other:{ group:"other",display:"Other Files" },
            unknow:{ group:"other",display:"Other Files" }
        },
        fmFileShowType:{
            all:"All Files",del:"Deleted Files",own:"User's Files",tmp:"Temporary Files",
            doc:"All Documents",img:"All Images",vdo:"All Vedio & Audio",dic:"All Dicom Files",zip:"All Zip Files",oth:"Other Files"
        },
        _refresh:function(data){
            var elm = data;
            var id = $(elm).attr("id");
            var search = $(`#${id} .fm-main-search-area input`).val();
            var fileType=$(`#${id} .fm-file-type-select .header.cursor.active`).attr("data-type");
            var param = {
                search:search,
                fileType:fileType
            };
            var constData = this.constData._ini(param);
            var content = ``;
            content += fileManagementUI.main.content.header(this.fmFileShowType[fileType]);
            for(var sid in constData){
                var group = constData[sid];
                var group_content = ``;
                if(sid=="Temp"){ sid = "Temporary Files"; }
                else if(sid=="Own"){ sid = "User's Own Files"; }
                group_content += fileManagementUI.main.content.divhead(sid);
                for(var type in group){
                    var files = group[type];
                    var cards_content = ``;
                    for(var i in files){
                        var file = files[i];
                        var filename = file.name;
                        var img = (type=="image")?file.path:`asserts/system/system/${type}.png`;
                        var path = file.path;
                        var size = parseInt(file.size /1024);
                        var updated_at = (file.updated_at).substr(0,10);
                        var uiparam = {
                            filename:filename,img:img,path:path,
                            size:size,updated_at:updated_at
                        };
                        cards_content += fileManagementUI.main.content.card(uiparam);
                    }
                    group_content += fileManagementUI.main.content.subhead(this.fmFileType[type].display);
                    group_content += fileManagementUI.main.content.cards(cards_content);
                }
                content += fileManagementUI.main.content.group(group_content);
            }
            $(elm).find(".fm-main-content-area").html(content);
        },
        retrieved:function(){
            var retrieved = [];
            $.ajax({
                async:false,type: "POST",
                url: _REQPATH,
                data: { request:"getFiles", data:"NULL"},
                success:function(result){ 
                    _gb_ret["files"] = retrieved = result["data"];
                },
                error:function(result){ console.log(result); }
            });
            return retrieved;
        },
        constData:{
            _ini:function(data){
                var filetype = data.fileType;
                var _rtn = {};//this.fileType[filetype](data)
                var search_val = data.search;var ret_Data =_gb_ret["files"];var _rtn = {};
                for(var i in ret_Data){
                    var row = ret_Data[i];var _match = false;
                    if(!fs.isEmpty(search_val)){
                        for(var key in row){
                            if(typeof row[key]=="string"){
                                _match = (row[key].includes(search_val));
                            }else{
                                _match = (row[key] == (search_val));
                            }
                            if(_match){ break; }
                        }
                        if(!_match){ continue; }
                    }
                    var hasSid = false;var hasUid = false;
                    if(!(row.sid == "null"||row.sid == "NULL"||row.sid == "undefined")){ hasSid = true; }
                    if(!(row.uid == "null"||row.uid == "NULL"||row.uid == "undefined")){ hasUid = true; }
                    var currFileType = FileManagementCtrl.contents.fmFileType[_FILETYPE.Funcs.FileTypeClassifyByName(row.name)];
                    var checkingParam = {
                        hasSid:hasSid,hasUid:hasUid,currFileType:currFileType,row:row
                    };
                    var shouldShows = this.fileType[filetype](checkingParam);
                    if(!shouldShows){ continue; }
                    if(!hasSid&&!hasUid){
                        if(fs.isEmpty(_rtn["Temp"])){ _rtn["Temp"] = {}; }
                        if(fs.isEmpty(_rtn["Temp"][currFileType.group])){ _rtn["Temp"][currFileType.group] = []; }
                        _rtn["Temp"][currFileType.group][_rtn["Temp"][currFileType.group].length] = row;
                    }else if(!hasSid&&hasUid){
                        if(fs.isEmpty(_rtn["Own"])){ _rtn["Own"] = {}; }
                        if(fs.isEmpty(_rtn["Own"][currFileType.group])){ _rtn["Own"][currFileType.group] = []; }
                        _rtn["Own"][currFileType.group][_rtn["Own"][currFileType.group].length] = row;
                    }else{
                        if(fs.isEmpty(_rtn[row.sid])){ _rtn[row.sid] = {}; }
                        if(fs.isEmpty(_rtn[row.sid][currFileType.group])){ _rtn[row.sid][currFileType.group] = []; }
                        _rtn[row.sid][currFileType.group][_rtn[row.sid][currFileType.group].length] = row;
                    }

                }
                return _rtn;
            },
            fileType:{
                all:function(data){
                    return true;
                },
                del:function(){
                    //To Do
                },
                own:function(data){
                    var hasUid = data.hasUid;var row = data.row;
                    return (hasUid==true&&row.uid==user.authorization.uid);
                },
                tmp:function(data){
                    var hasUid = data.hasUid;
                    var hasSid = data.hasSid;
                    return (!hasSid&&!hasUid);
                },
                doc:function(data){
                    var currFileType = data.currFileType.group;
                    return (currFileType=="doc");
                },
                img:function(data){
                    var currFileType = data.currFileType.group;
                    return (currFileType=="image");
                },
                vdo:function(data){
                    var currFileType = data.currFileType.group;
                    return (currFileType=="video");
                },
                dic:function(data){
                    var currFileType = data.currFileType.group;
                    return (currFileType=="dicom");},
                zip:function(data){
                    var currFileType = data.currFileType.group;
                    return (currFileType=="zip");},
                oth:function(data){
                    var currFileType = data.currFileType.group;
                    return (currFileType=="other");}
            }
        }
    },
    side:{
        defID:"fm-side-bar",
        uploadArea:{
            defID:"fm-side-upload-area"
        },
        fileTypeSelector:{
            defID:"fm-side-file-type-selector",
            EventListener:{
                shows:function(data){
                    var elm = $(data);
                    var filetype = $(elm).attr("data-type");
                    var targetElm = $(elm).parents(".fmComponent");
                    $(targetElm).find(".fm-file-type-select .header.cursor").removeClass("active");
                    $(targetElm).find(`.fm-file-type-select .header.cursor[data-type='${filetype}']`).addClass("active");
                    FileManagementCtrl.contents._refresh(targetElm);
                }
            }
        },
    },
    main:{
        search:{
            EventListener:{
                onchange:function(data){
                    var targetElm = $(data).parents(".fmComponent");
                    FileManagementCtrl.contents._refresh(targetElm);
                }
            }
        },
        content:{
            item:{
                EventListener:{
                    onclick:function(data){}
                }
            }
        }
    }
}
const FileManagementViewCtrl = {
    _ini:function(){
        var params = {
            id:"body_main",
            side:true,
            upload:true,
            search:true,
            pageview:true
        };
        FileManagementCtrl._ini(params);
    }
}

const DashboardEditorCtrl = {
    componentType:{
        stat:{ name:"Statistic" },
        lb:{ name:"Line and Bar" },
        sc:{ name:"Scatter" },
        pd:{ name:"Pie and Doughnut" },
        tl:{ name:"Table List" },
        mv:{ name:"Map View" },
        fu:{ name:"Upload Area" },
        fm:{ name:"File Management" },
        ce:{ name:"Case Editor" }
    },
    defaultComponent:[
        { id:0,title:"All Cases",type:"mv",description:"Show all marine mammal cases in map",component:{
            TYPE:"mv",CONFIG:{
                title:"All Cases",descr:"Show all marine mammal cases in map",gsize:4,color:"black",
                search:true,showmm:true,showba:false
            },DATASET:{
                rule:[]
            }
        } },
        { id:1,title:"Stranding Cases (NP)",type:"mv",description:"Show all NP cases in map",component:{
            TYPE:"mv",CONFIG:{
                title:"Stranding Cases (NP)",descr:"Show all NP cases in map",gsize:2,color:"black",////search:false,add:false,edit:false,delete:false
                search:true,showmm:true,showba:false
            },DATASET:{
                rule:[
                    { data:"strandingreport^species",operator:"=",params:["NP"] }
                ]
            }
        } },
        { id:2,title:"Stranding Cases (SC)",type:"mv",description:"Show all SC cases in map",component:{
            TYPE:"mv",CONFIG:{
                title:"Stranding Cases (SC)",descr:"Show all SC cases in map",gsize:2,color:"black",////search:false,add:false,edit:false,delete:false
                search:true,showmm:true,showba:false
            },DATASET:{
                rule:[
                    { data:"strandingreport^species",operator:"=",params:["SC"] }
                ]
            }
        } },
        { id:3,title:"All Cases Table",type:"tl",description:"Show all marine mammal cases in table list",component:{
            TYPE:"tl",CONFIG:{
                title:"All Cases Table",descr:"Show all marine mammal cases in table list",gsize:4,color:"black",////search:false,add:false,edit:false,delete:false
                search:true,add:false,edit:false,delete:false
            },DATASET:{
                showData:["strandingreport^sid","strandingreport^species","strandingreport^straDate","strandingreport^ageClass","strandingreport^code","strandingreport^length","strandingreport^weight"],
                rule:[]
            }
        } },{  id:4,title:"Species & Gender bar chart",type:"lb",description:"Bar Chart of Species & Gender Relationship",component:{
                TYPE: "lb",CONFIG:{
                    title:"Species & Gender bar chart",descr:"Bar Chart of Species & Gender Relationship",gsize:4,color:"default"
                },DATASET: [
                    {
                        main: {
                            maindt: "strandingreport^species",graptype: "bar",dispOpts: [],groupvalue: false
                        },
                        rule: [
                            {data: "strandingreport^ageClass",operator: "=",params: ["ABC"]}
                        ],
                        subs: [
                            { subdt: "strandingreport^sex",graptype: "bar",dispOpts: [],groupvalue: false }
                        ]
                    }
                ]
            }
        }
    ],
    OperatorsList:{
        "=" :"Equals",
        "!=":"Not Equals",
        ">=":"Large Than",
        "<=":"Less Than",
        "IN":"Includes",
        "LIKE":"Contains",
    },
    ComponentSeletor:{
        defID:"ComponentSelector",
        components:[
            {
                group:"Charts",
                items:[
                    { name:"Statistic",val:"stat",img:"withdetail.jpg" },
                    { name:"Line or Bar",val:"lb",img:"MixBarLine.jpg" },
                    { name:"Scatter",val:"sc",img:"Bubble.jpg" },
                    { name:"Pie or Doughnut",val:"pd",img:"Pie.jpg" }
                ]
            },
            {
                group:"Functions",
                items:[
                    { name:"Table List",val:"tl",img:"tablelist.jpg" },
                    { name:"Map View",val:"mv",img:"mapview.jpg" },
                    { name:"File Upload",val:"fu",img:"uploadarea.jpg" },
                    { name:"File Manager",val:"fm",img:"filemanage.jpg" },
                    { name:"Case Editor",val:"ce",img:"caseeditor.jpg" }
                ]
            }
        ],
        _ini:function(){
            if($(`#${DashboardEditorCtrl.ComponentSeletor.defID}.modal`).length>0){
                $(`#${DashboardEditorCtrl.ComponentSeletor.defID}.modal`).remove();
            }
            $("body").append(DashboardEditorUI.ComponentSelector._ini());
            $(`#${DashboardEditorCtrl.ComponentSeletor.defID}.modal`).modal("show");
            $(`#${DashboardEditorCtrl.ComponentSeletor.defID}.modal #${DashboardEditorCtrl.ComponentSeletor.defID}_Default_Components .secondary.menu .item`).tab();
        },
        EventListener:{
            onNewItemClick:function(data){
                DashboardEditorCtrl.Events._GB_VAR_Refresh();
                _GB_DASHBOARD_EDITOR_VARS.TYPE = data;
                DashboardEditorCtrl.ComponentEditor._ini();
            },
            defSildedBtn:function(data){
                $(data).parent("div").find("#deflist").slideToggle();
                $(data).find("i.icon").toggleClass("flipped");
            },
            onDefItemClick:function(data){
                var i = $(data).attr("data-i");
                var tab = $(data).parents(".tab.segment").attr("data-tab");
                var param = null;
                if(tab=="def"){
                    param = DashboardEditorCtrl.defaultComponent[i];
                }else if(tab=="own"){
                    param = (fs.isEmpty(user.config))?[]:((fs.isEmpty(user.config.dashboard))?[]:
                                ((fs.isEmpty(user.config.dashboard.items)?[]:user.config.dashboard.items[i])));
                }
                _GB_DASHBOARD_EDITOR_VARS = param.component;
                DashboardEditorCtrl.ComponentEditor._ini();
            },
            _cancel:function(data=null){ DashboardEditorCtrl.Events._GB_VAR_Refresh();$(".ComponentModal.modal").model("hide");$(".ComponentModal.modal").remove(); },
        }
    },
    ComponentEditor:{
        defID:"ComponentEditor",
        _ini:function(data=null){
            if($(`#${DashboardEditorCtrl.ComponentEditor.defID}.modal`).length>0){
                $(`#${DashboardEditorCtrl.ComponentEditor.defID}.modal`).remove();
            }
            $("body").append(DashboardEditorUI.ComponentEditor._ini());
            $(`#${DashboardEditorCtrl.ComponentEditor.defID}.modal`).modal("show");
            $(`#${DashboardEditorCtrl.ComponentEditor.defID}.modal .ui.accordion`).accordion();
            $(`#${DashboardEditorCtrl.ComponentEditor.defID}.modal .dropdown`).dropdown();
            $(`#${DashboardEditorCtrl.ComponentEditor.defID}.modal .checkbox`).checkbox();
            //console.log(_GB_DASHBOARD_EDITOR_VARS);
            if(!fs.isEmpty(_GB_DASHBOARD_EDITOR_VARS.CONFIG)){
                for(var id in _GB_DASHBOARD_EDITOR_VARS.CONFIG){
                    var $targetElm = $(`#${DashboardEditorCtrl.ComponentEditor.defID}.modal #ComponentConfigSetting .field[data-id="${id}"]`);
                    if($targetElm.length>0){ 
                        var formtype = $targetElm.attr("data-formtype");
                        switch(formtype){
                            case "input":case "textarea":
                                $targetElm.find("input").val(_GB_DASHBOARD_EDITOR_VARS.CONFIG[id]);
                                $targetElm.find("textarea").val(_GB_DASHBOARD_EDITOR_VARS.CONFIG[id]);
                                break;
                            case "checkbox":case "radio":
                                if(_GB_DASHBOARD_EDITOR_VARS.CONFIG[id]){ $targetElm.find(`.checkbox`).checkbox('set checked'); } break;
                            case "select":
                                $targetElm.find(`.selection.dropdown`).dropdown("set selected",_GB_DASHBOARD_EDITOR_VARS.CONFIG[id]);break;
                        }
                    }
                }
                DashboardEditorCtrl.ComponentEditor.Events.datasetPreview_ini();
            }
        },
        Events:{
            datasetPreview_ini:function(){
                var type = _GB_DASHBOARD_EDITOR_VARS.TYPE;var dataset = _GB_DASHBOARD_EDITOR_VARS.DATASET;
                switch(type){
                    case "stat":case "lb":case "sc":case "pd": 
                        var data_content = "";
                        for(var i in dataset){
                            var currentData = dataset[i];
                            data_content += DashboardEditorUI.ComponentEditor.UIComponent.Components.datas.UIComponent.main(currentData);
                        }
                        $(`#${DashboardEditorCtrl.ComponentEditor.defID}.modal #DataSelectedList`).html(data_content);
                        $(`#${DashboardEditorCtrl.ComponentEditor.defID}.modal #DataSelectedList .ui.accordion`).accordion();
                        break;
                }
            },
            ConfigFromTheForm:function(){
                var _CONFIG = {};var error = false;
                var $ConfigFormElm = $(`#${DashboardEditorCtrl.ComponentEditor.defID}.modal #ComponentConfigSetting`);
                $ConfigFormElm.find(".field[data-formtype][data-id]").each(function(i){
                    var $FormItem = $(this);
                    var FormType = $FormItem.attr("data-formtype");
                    var Key = $FormItem.attr("data-id");
                    var value = null;
                    switch(FormType){
                        case "input":
                            value = $FormItem.find("input").val();break;
                        case "textarea":
                            value = $FormItem.find("textarea").val();break;
                        case "select":
                            value = $FormItem.find(".selection.dropdown").dropdown("get value");
                            if($FormItem.find(".selection.multiple.dropdown").length>0){ 
                                if(value!=""){ value = value.split(","); }else{ value = []; }
                            };break;
                        case "checkbox":
                            value = $FormItem.find(".checkbox").checkbox("is checked");break;
                        case "radio":
                            value = $FormItem.find(".radio.checkbox.checked input").val();break;
                        case "calendar":
                            value = $FormItem.find(".ui.calendar").calendar("get date");break;
                    }
                    if(fs.isEmpty(value)){
                        if(Key=="title"||Key=="gsize"||Key=="color"){ error = true;$FormItem.addClass("error"); }
                    }
                    _CONFIG[Key] = value;
                });
                return {config:_CONFIG,error:error};
            }
            
        },
        EventListener:{
            refresh:function(data=null){
                var _CONFIG = {};var error = false;
                var configFormForm = DashboardEditorCtrl.ComponentEditor.Events.ConfigFromTheForm();
                _CONFIG = configFormForm.config;error = configFormForm.error;
                switch(_GB_DASHBOARD_EDITOR_VARS.TYPE){
                    case "stat":case "lb":case "sc":case "pd":case "tl":case "ce":
                        if(fs.isEmpty(_GB_DASHBOARD_EDITOR_VARS.DATASET)){ error = true;fs.msg.errorA("Data set needs to set"); }
                }
                if(error){ fs.msg.errorA("Fields need to fill"); }else{
                    _GB_DASHBOARD_EDITOR_VARS.CONFIG = _CONFIG;
                    var ID_TIME = ""+fs.getTimeStamp();
                    var newdashboardItem = { 
                        id:"PreviewArea",
                        preview:true,
                        title:_GB_DASHBOARD_EDITOR_VARS.CONFIG.title,
                        type:_GB_DASHBOARD_EDITOR_VARS.TYPE,
                        description:_GB_DASHBOARD_EDITOR_VARS.CONFIG.descr,
                        component:_GB_DASHBOARD_EDITOR_VARS
                    }
                    DashboardCtrl.Column._ini({id:"PreviewArea",data:newdashboardItem});
                    DashboardCtrl.Components._ini(newdashboardItem);
                }
            },
            _return:function(data=null){ 
                if($(`#${DashboardEditorCtrl.ComponentSeletor.defID}.modal`).length>0){
                    $(`#${DashboardEditorCtrl.ComponentSeletor.defID}.modal`).modal("show");
                }else{
                    DashboardEditorCtrl.ComponentSeletor._ini();
                }
            },
            _cancel:function(data=null){ 
                DashboardEditorCtrl.Events._GB_VAR_Refresh();
                $(".ComponentModal.modal").modal("hide");
                $(".ComponentModal.modal").remove(); 
            },
            _submit:function(data=null){
                var _CONFIG = {};var error = false;
                var configFormForm = DashboardEditorCtrl.ComponentEditor.Events.ConfigFromTheForm();
                _CONFIG = configFormForm.config;error = configFormForm.error;
                switch(_GB_DASHBOARD_EDITOR_VARS.TYPE){
                    case "stat":case "lb":case "sc":case "pd":case "tl":case "ce":
                        if(fs.isEmpty(_GB_DASHBOARD_EDITOR_VARS.DATASET)){ error = true;fs.msg.errorA("Data set needs to set"); }
                }
                if(error){ fs.msg.errorA("Fields need to fill"); }else{ 
                    _GB_DASHBOARD_EDITOR_VARS.CONFIG = _CONFIG;
                    var ID_TIME = ""+fs.getTimeStamp();
                    var newdashboardItem = { 
                        id:ID_TIME,
                        title:_GB_DASHBOARD_EDITOR_VARS.CONFIG.title,
                        type:_GB_DASHBOARD_EDITOR_VARS.TYPE,
                        description:_GB_DASHBOARD_EDITOR_VARS.CONFIG.descr,
                        component:_GB_DASHBOARD_EDITOR_VARS
                    }
                    
                    if(fs.isEmpty(user.config)){ user.config = {}; }
                    if(fs.isEmpty(user.config.dashboard)){ user.config.dashboard = {}; }
                    if(fs.isEmpty(user.config.dashboard.items)){ user.config.dashboard.items = {}; }
                    if(fs.isEmpty(user.config.dashboard.display)){ user.config.dashboard.display = []; }
                    user.config.dashboard.items[ID_TIME] = newdashboardItem;
                    if(_NEW_DISPLAY_CONFIG.row){
                        (user.config.dashboard.display).splice(_NEW_DISPLAY_CONFIG.id,0,[ID_TIME]);

                    }else{
                        var rowID = _NEW_DISPLAY_CONFIG.id;var currRowLen = user.config.dashboard.display[rowID].length;
                        user.config.dashboard.display[rowID][currRowLen] = ID_TIME;
                    }
                    
                    UserCtrl.Event.updateUserConfig();
                    DashboardCtrl._refresh();
                    DashboardCtrl.Events.UI.dismoveable();
                    this._cancel();
                }
            },
            onDataSetBtnClick:function(){
                DashboardEditorCtrl.ComponentDataEditor._ini();
            }
        }
    },
    ComponentDataEditor:{
        defID:"ComponentDataEditor",
        _ini:function(data=null){
            if($(`#${DashboardEditorCtrl.ComponentDataEditor.defID}.modal`).length>0){
                $(`#${DashboardEditorCtrl.ComponentDataEditor.defID}.modal`).remove();
            }
            $("body").append(DashboardEditorUI.ComponentDataEditor._ini());
            this._inis._ini();
            $(`#${DashboardEditorCtrl.ComponentDataEditor.defID}.modal`).modal("show");
        },
        _inis:{
            _ini(){
                var type = _GB_DASHBOARD_EDITOR_VARS.TYPE;
                switch(type){
                    case "stat": this.TYPE.stat._ini();break;
                    case "lb": this.TYPE.lb._ini();break;
                    case "sc": this.TYPE.sc._ini();break;
                    case "pd": this.TYPE.pd._ini();break;
                    case "mv": this.TYPE.mv._ini();break;
                    case "tl": this.TYPE.tl._ini();break;
                    case "ce": this.TYPE.ce._ini();break;
                    default:break;
                }
            },
            TYPE:{
                stat:{
                    _ini:function(){
                        var dataset = _GB_DASHBOARD_EDITOR_VARS.DATASET;
                        if(fs.isEmpty(dataset)){
                            DashboardEditorCtrl.ComponentDataEditor.ComponentsINI.MainComponentAdd({id:0});
                        }else{
                            DashboardEditorCtrl.ComponentDataEditor.ComponentsINI.MainComponentAdd({id:0,data:dataset[0]});
                        }
                    }
                },
                lb:{
                    _ini:function(){
                        var dataset = _GB_DASHBOARD_EDITOR_VARS.DATASET;
                        if(fs.isEmpty(dataset)){
                            DashboardEditorCtrl.ComponentDataEditor.ComponentsINI.MainComponentAdd({id:0});
                        }else{
                            for(var i in dataset){
                                DashboardEditorCtrl.ComponentDataEditor.ComponentsINI.MainComponentAdd({id:i,data:dataset[i]});
                            }
                        }
                    }
                },
                sc:{
                    _ini:function(){
                        var dataset = _GB_DASHBOARD_EDITOR_VARS.DATASET;
                        if(fs.isEmpty(dataset)){
                            DashboardEditorCtrl.ComponentDataEditor.ComponentsINI.MainComponentAdd({id:0});
                            DashboardEditorCtrl.ComponentDataEditor.ComponentsINI.MainComponentAdd({id:1});
                        }else{
                            DashboardEditorCtrl.ComponentDataEditor.ComponentsINI.MainComponentAdd({id:0,data:dataset[0]});
                            DashboardEditorCtrl.ComponentDataEditor.ComponentsINI.MainComponentAdd({id:1,data:dataset[1]});
                        }
                    }
                },
                pd:{
                    _ini:function(){
                        var dataset = _GB_DASHBOARD_EDITOR_VARS.DATASET;
                        if(fs.isEmpty(dataset)){
                            DashboardEditorCtrl.ComponentDataEditor.ComponentsINI.MainComponentAdd({id:0});
                        }else{
                            for(var i in dataset){
                                DashboardEditorCtrl.ComponentDataEditor.ComponentsINI.MainComponentAdd({id:i,data:dataset[i]});
                            }
                        }
                    }
                },
                tl:{
                    _ini:function(){
                        var dataset = _GB_DASHBOARD_EDITOR_VARS.DATASET;
                        var $TableListDataPickerElm = $(`#${DashboardEditorCtrl.ComponentDataEditor.defID}.modal .ComponentMainFormList .ComponentMainForm#TableListDataPicker`);
                        var $TableListRulesSettingElm = $(`#${DashboardEditorCtrl.ComponentDataEditor.defID}.modal .ComponentMainFormList .ComponentMainForm#TableListRulesSetting`);
                        $TableListRulesSettingElm.find(".ui.accordion").accordion();
                        DashboardEditorCtrl.ComponentDataEditor.ComponentsINI.DataPicker({id:"showData",elm:$TableListDataPickerElm});
                        $TableListRulesSettingElm.find(`.field[data-id="ruledt"] .selection.dropdown`).dropdown('setting', 'onChange', function(){
                            DashboardEditorCtrl.ComponentDataEditor.ComponentsINI.MainComponentBundle.RuleDataSelectorChange($TableListRulesSettingElm.find(`.field[data-id="ruledt"] .selection.dropdown`));
                        });
                        $TableListRulesSettingElm.find(`.field[data-id="opts"] .selection.dropdown`).dropdown('setting', 'onChange', function(){
                            DashboardEditorCtrl.ComponentDataEditor.ComponentsINI.MainComponentBundle.RuleDataSelectorChange($TableListRulesSettingElm.find(`.field[data-id="opts"] .selection.dropdown`));
                        });
                        if(!fs.isEmpty(dataset)){
                            for(var i in dataset.showData){
                                $TableListDataPickerElm.find(`.child.checkbox[data-value="${dataset.showData[i]}"]`).checkbox('set checked');
                            }
                            for(var i in dataset.rule){
                                var ruleParam = { elm:$TableListRulesSettingElm.find(".RulesList .list"),data:dataset.rule[i] }
                                DashboardEditorCtrl.ComponentDataEditor.Events.Rule.addNewRule(ruleParam);
                            }
                        }
                    }
                },
                mv:{ _ini:function(){
                    var dataset = _GB_DASHBOARD_EDITOR_VARS.DATASET;
                    var $RulesSettingElm = $(`#${DashboardEditorCtrl.ComponentDataEditor.defID}.modal .ComponentMainFormList .ComponentMainForm`);
                    $RulesSettingElm.find(".ui.accordion").accordion();
                    $RulesSettingElm.find(`.field[data-id="ruledt"] .selection.dropdown`).dropdown('setting', 'onChange', function(){
                        DashboardEditorCtrl.ComponentDataEditor.ComponentsINI.MainComponentBundle.RuleDataSelectorChange($RulesSettingElm.find(`.field[data-id="ruledt"] .selection.dropdown`));
                    });
                    $RulesSettingElm.find(`.field[data-id="opts"] .selection.dropdown`).dropdown('setting', 'onChange', function(){
                        DashboardEditorCtrl.ComponentDataEditor.ComponentsINI.MainComponentBundle.RuleDataSelectorChange($RulesSettingElm.find(`.field[data-id="opts"] .selection.dropdown`));
                    });
                    if(!fs.isEmpty(dataset)){
                        for(var i in dataset.rules){
                            var ruleParam = { elm:$RulesSettingElm.find(".RulesList .list"),data:dataset.rules[i] }
                            DashboardEditorCtrl.ComponentDataEditor.Events.Rule.addNewRule(ruleParam);
                        }
                    }
                }},
                ce:{ _ini:function(){
                    var dataset = _GB_DASHBOARD_EDITOR_VARS.DATASET;
                    var $CaseEditorDataPickerElm = $(`#${DashboardEditorCtrl.ComponentDataEditor.defID}.modal .ComponentMainFormList .ComponentMainForm#CaseEditorDataPicker`);
                    DashboardEditorCtrl.ComponentDataEditor.ComponentsINI.DataPickerNormal({elm:$CaseEditorDataPickerElm});
                    
                    if(!fs.isEmpty(dataset)){
                        for(var i in dataset.datapicker){
                            $CaseEditorDataPickerElm.find(`.child.checkbox[data-value="${dataset.datapicker[i]}"]`).checkbox('set checked');
                        }
                    }
                }}
            },

        },
        ComponentsINI:{
            MainComponentAdd:function(data){
                var id = data.id;var deny = fs.isEmpty(data.deny)?null:data.deny;
                var _data=fs.isEmpty(data.data)?null:data.data;
                var $MainFormListElm = $(`#${DashboardEditorCtrl.ComponentDataEditor.defID} .ComponentMainFormList`);
                var $MainDataListElm = $(`#${DashboardEditorCtrl.ComponentDataEditor.defID} .ComponentMainDataList .cards`);
                $MainFormListElm.append(DashboardEditorUI.ComponentDataEditor.UIComponent.FormUI.Main({id:id}));
                $MainDataListElm.append(DashboardEditorUI.ComponentDataEditor.UIComponent.ListUI.Main.item({id:id}));
                $newMainItemElm = $(`#${DashboardEditorCtrl.ComponentDataEditor.defID} .ComponentMainFormList .ComponentMainFormGroup[data-id="main/${id}"]`);
                $newMainItemElm.find(".ui.accordion").accordion();$newMainItemElm.find(`.dropdown`).dropdown();$newMainItemElm.find(`.checkbox`).checkbox();
                $newMainItemElm.find(`.field[data-id="maindt"] .selection.dropdown`).dropdown('setting', 'onChange', function(){
                    DashboardEditorCtrl.ComponentDataEditor.ComponentsINI.MainComponentBundle.MainDataSelectorChange($newMainItemElm.find(`.field[data-id="maindt"] .selection.dropdown`));
                });
                $newMainItemElm.find(`.field[data-id="ruledt"] .selection.dropdown`).dropdown('setting', 'onChange', function(){
                    DashboardEditorCtrl.ComponentDataEditor.ComponentsINI.MainComponentBundle.RuleDataSelectorChange($newMainItemElm.find(`.field[data-id="ruledt"] .selection.dropdown`));
                });
                $newMainItemElm.find(`.field[data-id="opts"] .selection.dropdown`).dropdown('setting', 'onChange', function(){
                    DashboardEditorCtrl.ComponentDataEditor.ComponentsINI.MainComponentBundle.RuleDataSelectorChange($newMainItemElm.find(`.field[data-id="opts"] .selection.dropdown`));
                });
                if(_data!=null){
                    for(var mainformid in _data.main){
                        var $targetElm = $newMainItemElm.find(`.field[data-id="${mainformid}"]`);
                        if($targetElm.length>0){ 
                            var formtype = $targetElm.attr("data-formtype");
                            switch(formtype){
                                case "input":case "textarea":
                                    $targetElm.find("input").val(_data.main[mainformid]);$targetElm.find("textarea").val(_data.main[mainformid]);break;
                                case "checkbox":
                                    if(_data.main[mainformid]){ $targetElm.find(`.checkbox`).checkbox('set checked'); } break;
                                case "radio": 
                                    $targetElm.find(`.checkbox input[value="${_data.main[mainformid]}"]`).parents(".radio.checkbox").checkbox("set checked");break;
                                case "select":
                                    $targetElm.find(`.selection.dropdown`).dropdown("set selected",_data.main[mainformid]);break;
                            }
                        }
                    }
                    
                    var $targetElm = $newMainItemElm.find(`.ComponentSubDataList .cards`);
                    for(var i in _data.subs){
                        if($targetElm.length>0){ 
                            var subparam = { elm :$targetElm,data:_data.subs[i] };
                            DashboardEditorCtrl.ComponentDataEditor.ComponentsINI.SubComponentAdd(subparam);
                        }
                    }

                    var $targetElm = $newMainItemElm.find(`.RulesList .list`);
                    for(var i in _data.rule){
                        if($targetElm.length>0){ 
                            $targetElm.append(DashboardEditorUI.ComponentDataEditor.UIComponent.Components.Rules.Component.UIComponent.rule(_data.rule[i]));
                        }
                    }
                }
            },
            MainComponentBundle:{
                MainDataSelectorChange:function(data){
                    var selectedData = $(data).dropdown("get value");
                    var $targetDisplayOptions = $(data).parents(`.ComponentMainForm`).find(".DisplayOptions");
                    $targetDisplayOptions.replaceWith(DashboardEditorUI.ComponentDataEditor.UIComponent.Components.DisplayOptions(selectedData));
                    $targetDisplayOptions = $(data).parents(`.ComponentMainForm`).find(".DisplayOptions");
                    $targetDisplayOptions.find(`[data-id="dispOpts"] .selection.dropdown`).dropdown({ allowAdditions: true });
                    $targetDisplayOptions.find(`.ui.calendar`).calendar();
                    $targetDisplayOptions.find(`.ui.checkbox`).checkbox();
                },
                RuleDataSelectorChange:function(data){
                    var $targetRuleParamElm = $(data).parents(`.RulesForm`).find(`[data-id="params"]`);
                    var $targetRuleOptElm = $(data).parents(`.RulesForm`).find(`[data-id="opts"]`);
                    var $targetRuleDataElm = $(data).parents(`.RulesForm`).find(`[data-id="ruledt"]`);
                    
                    var selectedOpt = $targetRuleOptElm.find(".selection.dropdown").dropdown("get value");
                    var selectedData = $targetRuleDataElm.find(".selection.dropdown").dropdown("get value");
                    $targetRuleParamElm.replaceWith(DashboardEditorUI.ComponentDataEditor.UIComponent.Components.Rules.Component.params({data:selectedData,operator:selectedOpt}));
                    $targetRuleParamElm = $(data).parents(`.RulesForm`).find(`[data-id="params"]`);
                    $targetRuleParamElm.find(`.selection.dropdown`).dropdown({ allowAdditions: true });
                },

            },
            SubComponentAdd:function(data){
                var $targetElm = data.elm;var _data = fs.isEmpty(data.data)?null:data.data;
                $targetElm.append(DashboardEditorUI.ComponentDataEditor.UIComponent.ListUI.Sub.item());
                var $targetSubItemElms = $targetElm.find(".card");
                $targetSubItemElm = ($targetSubItemElms.length > 0)?$targetSubItemElms[$targetSubItemElms.length-1]:[];
                if($targetSubItemElm.length==0){ return; }
                $($targetSubItemElm).find(".ui.accordion").accordion();$($targetSubItemElm).find(`.dropdown`).dropdown();$($targetSubItemElm).find(`.checkbox`).checkbox();
                $($targetSubItemElm).find(`.field[data-id="maindt"] .selection.dropdown`).dropdown('setting', 'onChange', function(){
                    DashboardEditorCtrl.ComponentDataEditor.ComponentsINI.SubComponentBundle.SubDataSelectorChange($($targetSubItemElm).find(`.field[data-id="subdt"] .selection.dropdown`));
                });
                if(_data!=null){
                    for(var subfieldID in _data){
                        var $targetFieldElm = $($targetSubItemElm).find(`.field[data-id="${subfieldID}"]`);
                        if($targetFieldElm.length>0){ 
                            var formtype = $targetFieldElm.attr("data-formtype");
                            switch(formtype){
                                case "input":case "textarea":
                                    $targetFieldElm.find("input").val(_data[subfieldID]);
                                    $targetFieldElm.find("textarea").val(_data[subfieldID]);
                                    break;
                                case "checkbox":
                                    if(_data[subfieldID]){ $targetFieldElm.find(`.checkbox`).checkbox('set checked'); } break;
                                case "radio": 
                                    $targetFieldElm.find(`.checkbox input[value="${_data[subfieldID]}"]`).parents(".radio.checkbox").checkbox("set checked");break;
                                case "select":
                                    $targetFieldElm.find(`.selection.dropdown`).dropdown("set selected",_data[subfieldID]);break;
                            }
                        }
                    }
                }
            },
            SubComponentBundle:{
                SubDataSelectorChange:function(data){
                    var selectedData = $(data).dropdown("get value");
                    var $targetDisplayOptions = $(data).parents(`.SubComponentForm.card`).find(".DisplayOptions");
                    $targetDisplayOptions.replaceWith(DashboardEditorUI.ComponentDataEditor.UIComponent.Components.DisplayOptions(selectedData));
                    $targetDisplayOptions.find(`[data-id="dispOpts"] .selection.dropdown`).dropdown({ allowAdditions: true });
                    $targetDisplayOptions.find(`.ui.calendar`).calendar();
                    $targetDisplayOptions.find(`.ui.checkbox`).checkbox();
                }
            },
            DataPicker:function(data){
                var elm = data.elm;var checked = fs.isEmpty(data.values)?[]:data.values;var dataPickerID = fs.isEmpty(data.id)?"datapicker":data.id;
                $(elm).append(DashboardEditorUI.ComponentDataEditor.UIComponent.Components.DataPicker(dataPickerID));
                $(elm).find('.list .master.checkbox').checkbox({
                    onChecked: function() {
                        var $childCheckbox  = $(this).closest('.checkbox').siblings('.list').find('.checkbox');
                            $childCheckbox.checkbox('check');
                    },
                    onUnchecked: function() {
                        var $childCheckbox  = $(this).closest('.checkbox').siblings('.list').find('.checkbox');
                            $childCheckbox.checkbox('uncheck');
                    }
                });
                $(elm).find('.list .child.checkbox').checkbox({
                    // Fire on load to set parent value
                    fireOnInit : true,
                    // Change parent state on each child checkbox change
                    onChange   : function() {
                    var $listGroup      = $(this).closest('.list'),
                        $parentCheckbox = $listGroup.closest('.item').children('.checkbox'),
                        $checkbox       = $listGroup.find('.checkbox'),
                        allChecked      = true,allUnchecked    = true;
                        // check to see if all other siblings are checked or unchecked
                        $checkbox.each(function() {
                            if( $(this).checkbox('is checked') ) { allUnchecked = false; }else { allChecked = false; }
                        });
                        // set parent checkbox state, but don't trigger its onChange callback
                        if(allChecked) {
                            $parentCheckbox.checkbox('set checked');
                        }else if(allUnchecked) {
                            $parentCheckbox.checkbox('set unchecked');
                        }else {
                            $parentCheckbox.checkbox('set indeterminate');
                        }
                    }
                });
                for(var i in checked){
                    $(elm).find(`.child.checkbox[data-value="${checked[i]}"]`).checkbox('set checked');
                }
            },
            DataPickerNormal:function(data){
                var elm = data.elm;var checked = fs.isEmpty(data.values)?[]:data.values;var dataPickerID = fs.isEmpty(data.id)?"datapicker":data.id;
                $(elm).append(DashboardEditorUI.ComponentDataEditor.UIComponent.Components.DataPickerNormal(dataPickerID));
                $(elm).find('.list .master.checkbox').checkbox({
                    onChecked: function() {
                        var $childCheckbox  = $(this).closest('.checkbox').siblings('.list').find('.checkbox');
                            $childCheckbox.checkbox('check');
                    },
                    onUnchecked: function() {
                        var $childCheckbox  = $(this).closest('.checkbox').siblings('.list').find('.checkbox');
                            $childCheckbox.checkbox('uncheck');
                    }
                });
                $(elm).find('.list .child.checkbox').checkbox({
                    // Fire on load to set parent value
                    fireOnInit : true,
                    // Change parent state on each child checkbox change
                    onChange   : function() {
                    var $listGroup      = $(this).closest('.list'),
                        $parentCheckbox = $listGroup.closest('.item').children('.checkbox'),
                        $checkbox       = $listGroup.find('.checkbox'),
                        allChecked      = true,allUnchecked    = true;
                        // check to see if all other siblings are checked or unchecked
                        $checkbox.each(function() {
                            if( $(this).checkbox('is checked') ) { allUnchecked = false; }else { allChecked = false; }
                        });
                        // set parent checkbox state, but don't trigger its onChange callback
                        if(allChecked) {
                            $parentCheckbox.checkbox('set checked');
                        }else if(allUnchecked) {
                            $parentCheckbox.checkbox('set unchecked');
                        }else {
                            $parentCheckbox.checkbox('set indeterminate');
                        }
                    }
                });
                for(var i in checked){
                    $(elm).find(`.child.checkbox[data-value="${checked[i]}"]`).checkbox('set checked');
                }
            },
            DataSelector:function(data){
                var elm = data.elm;var selected = fs.isEmpty(data.values)?null:data.values;
                //$(elm).append(DashboardEditorUI.ComponentDataEditor.UIComponent.Components.DataSelector());
                if(selected!=null){
                    $(elm).dropdown({allowAdditions: true}).dropdown("set value",selected);//.find(`[data-id="dataselector"] .dropdown`)
                }else{ $(elm).dropdown({allowAdditions: true}); }
            }
        },
        EventListener:{
            _return:function(){ 
                if($(`#${DashboardEditorCtrl.ComponentEditor.defID}.modal`).length>0){
                    $(`#${DashboardEditorCtrl.ComponentEditor.defID}.modal`).modal("show");
                }else{
                    DashboardEditorCtrl.ComponentEditor._ini();
                }
            },
            _cancel:function(data=null){ DashboardEditorCtrl.Events._GB_VAR_Refresh();$(".ComponentModal.modal").model("hide");$(".ComponentModal.modal").remove(); },
            _submit:function(data=null){
                var rslt = this.SubmitBundle._ini();
                if(rslt){
                    DashboardEditorCtrl.ComponentEditor.Events.datasetPreview_ini();
                    DashboardEditorCtrl.ComponentDataEditor.EventListener._return();
                }
                //console.log(_GB_DASHBOARD_EDITOR_VARS);
            },
            SubmitBundle:{
                _ini:function(){
                    var type = _GB_DASHBOARD_EDITOR_VARS.TYPE;
                    switch(type){
                        case "tl":return this.TYPE.tl();break;
                        case "mv":return this.TYPE.mv();break;
                        case "ce":return this.TYPE.ce();break;
                        default: return this.TYPE.default();break;
                    }
                },
                TYPE:{
                    default:function(){
                        var $ComponentMainFormList = $(`#${DashboardEditorCtrl.ComponentDataEditor.defID}.modal .ComponentMainFormList`);
                        var error = false;var _DATASET = [];
                        var $ComponentMainFormsElm = $ComponentMainFormList.find(".ComponentMainFormGroup");
                        $ComponentMainFormsElm.each(function(i) {
                            var _datasetLen = _DATASET.length;
                            _DATASET[_datasetLen] = {};
                            var $MainFormElm = $(this);
                            var id = $MainFormElm.attr("data-id");
                            _DATASET[_datasetLen].main = {};
                            var _maindataset = {};
                            $MainFormElm.find(".ComponentMainForm .field[data-formtype][data-id]").each(function(j){
                                var $FormItem = $(this);
                                var FormType = $FormItem.attr("data-formtype");
                                var Key      = $FormItem.attr("data-id");
                                if(Key=="ruledt"||Key=="opts"||Key=="params"){ }else{
                                    var value = null;
                                    switch(FormType){
                                        case "input":
                                            value = $FormItem.find("input").val();break;
                                        case "textarea":
                                            value = $FormItem.find("textarea").val();break;
                                        case "select":
                                            value = $FormItem.find(".selection.dropdown").dropdown("get value");
                                            if($FormItem.find(".selection.multiple.dropdown").length>0){ 
                                                if(value!=""){ value = value.split(","); }else{ value = []; }
                                            };break;
                                        case "checkbox":
                                            value = $FormItem.find(".checkbox").checkbox("is checked");break;
                                        case "radio":
                                            value = $FormItem.find(".radio.checkbox.checked input").val();break;
                                        case "calendar":
                                            value = $FormItem.find(".ui.calendar").calendar("get date");break;
                                    }
                                    if(fs.isEmpty(value)){
                                        if(Key=="maindt"||Key=="graptype"){ error = true;$FormItem.addClass("error"); }
                                    }
                                    _maindataset[Key] = value;
                                }
                            });
                            _DATASET[_datasetLen].main = _maindataset;

                            _DATASET[_datasetLen].rule = [];
                            var _ruledataset = [];
                            $MainFormElm.find(".ComponentMainForm .RulesForm .RulesList .list .item").each(function(j){
                                var $FormItem  = $(this);var rule = {};
                                var ruledata   = $FormItem.find(".teal.label").attr("data-value");
                                var optdata    = $FormItem.find(".olive.label").attr("data-value");
                                var paramsdata = [];
                                $FormItem.find(".violet.label").each(function(j){
                                    var param = $(this).attr("data-value");
                                    paramsdata[paramsdata.length] = param;
                                });
                                rule.data = ruledata;rule.operator = optdata;rule.params = paramsdata;
                                _ruledataset[_ruledataset.length] = rule;
                            });
                            _DATASET[_datasetLen].rule = _ruledataset;

                            _DATASET[_datasetLen].subs = [];
                            var _subsdataset = [];
                            $MainFormElm.find(".ComponentSubDataList .ui.link.cards .card.SubComponentForm").each(function(j){
                                var $subFormElm = $(this);var _subdataset = {};
                                $subFormElm.find(".field[data-formtype][data-id]").each(function(j){
                                    var $FormItem = $(this);
                                    var FormType = $FormItem.attr("data-formtype");
                                    var Key      = $FormItem.attr("data-id");

                                    var value = null;
                                    switch(FormType){
                                        case "input":
                                            value = $FormItem.find("input").val();break;
                                        case "textarea":
                                            value = $FormItem.find("textarea").val();break;
                                        case "select":
                                            value = ($FormItem.find(".selection.dropdown").dropdown("get value"));
                                            if($FormItem.find(".selection.multiple.dropdown").length>0){ 
                                                if(value!=""){ value = value.split(","); }else{ value = []; }
                                            };break;
                                        case "checkbox":
                                            value = $FormItem.find(".checkbox").checkbox("is checked");break;
                                        case "radio":
                                            value = $FormItem.find(".radio.checkbox.checked input").val();break;
                                        case "calendar":
                                            value = $FormItem.find(".ui.calendar").calendar("get date");break;
                                    }
                                    if(fs.isEmpty(value)){
                                        if(Key=="subdt"||Key=="graptype"){ error = true;$FormItem.addClass("error"); }
                                    }
                                    _subdataset[Key] = value;
                                });
                                _subsdataset[_subsdataset.length] = _subdataset;
                                _DATASET[_datasetLen].subs = _subsdataset;
                            });
                            if(error){ fs.msg.errorA("Have column(s) need to fill");return false; }else{
                                _GB_DASHBOARD_EDITOR_VARS.DATASET = _DATASET;
                            }
                            
                        });
                        return (!error);
                    },
                    tl:function(){
                        var $ComponentDataEditor = $(`#${DashboardEditorCtrl.ComponentDataEditor.defID}.modal`);
                        var error = false;var _DATASET = {};
                        var $TableListDataPicker = $ComponentDataEditor.find("#TableListDataPicker");

                        var selectedItems = [];
                        $ComponentDataEditor.find("#TableListDataPicker .ui.child.checkbox.checked").each(function(i){
                            selectedItems[selectedItems.length] = $(this).attr("data-value");
                        });
                        if(selectedItems.length==0){ $TableListDataPicker.find(`[data-id="showData"]`).addClass("error");fs.msg.errorA("Please select at least one column");error = true; }
                        _DATASET.showData=selectedItems;
                        
                        _DATASET.rule = [];
                        var _ruledataset = [];
                        $ComponentDataEditor.find("#TableListRulesSetting .RulesForm .RulesList .list .item").each(function(j){
                            var $FormItem  = $(this);var rule = {};
                            var ruledata   = $FormItem.find(".teal.label").attr("data-value");
                            var optdata    = $FormItem.find(".olive.label").attr("data-value");
                            var paramsdata = [];
                            $FormItem.find(".violet.label").each(function(j){
                                var param = $(this).attr("data-value");
                                paramsdata[paramsdata.length] = param;
                            });
                            rule.data = ruledata;rule.operator = optdata;rule.params = paramsdata;
                            _ruledataset[_ruledataset.length] = rule;
                        });
                        _DATASET.rule = _ruledataset;
                        if(!error){  _GB_DASHBOARD_EDITOR_VARS.DATASET = _DATASET; }
                        return (!error);
                    },
                    mv:function(){
                        var $ComponentDataEditor = $(`#${DashboardEditorCtrl.ComponentDataEditor.defID}.modal`);
                        var error = false;var _DATASET = {};
                        _DATASET.rule = [];
                        var _ruledataset = [];
                        $ComponentDataEditor.find(".ComponentMainForm .RulesForm .RulesList .list .item").each(function(j){
                            var $FormItem  = $(this);var rule = {};
                            var ruledata   = $FormItem.find(".teal.label").attr("data-value");
                            var optdata    = $FormItem.find(".olive.label").attr("data-value");
                            var paramsdata = [];
                            $FormItem.find(".violet.label").each(function(j){
                                var param = $(this).attr("data-value");
                                paramsdata[paramsdata.length] = param;
                            });
                            rule.data = ruledata;rule.operator = optdata;rule.params = paramsdata;
                            _ruledataset[_ruledataset.length] = rule;
                        });
                        _DATASET.rule = _ruledataset;
                        if(!error){  _GB_DASHBOARD_EDITOR_VARS.DATASET = _DATASET; }
                        return (!error);
                    },
                    ce:function(){
                        var error = false;var _DATASET = {};
                        var $ComponentDataEditor = $(`#${DashboardEditorCtrl.ComponentDataEditor.defID}.modal`);
                        var $CaseEditorDataPicker= $ComponentDataEditor.find("#CaseEditorDataPicker");
                        var $SelectedItems         = $CaseEditorDataPicker.find(".ui.child.checkbox.checked");
                        var selectedColumns = [];
                        $SelectedItems.each(function(i){
                            selectedColumns[selectedColumns.length] = $(this).attr("data-value");
                        });
                        if(selectedColumns.length==0){ $CaseEditorDataPicker.find(`[data-id="datapicker"]`).addClass("error");fs.msg.errorA("Please select at least one column");error = true; }
                        _DATASET.showData=selectedColumns;
                        if(!error){  _GB_DASHBOARD_EDITOR_VARS.DATASET = _DATASET; }
                        return (!error);
                    }
                }
            },
            Main:{
                onAddMainClick:function(data){
                    if(_GB_DASHBOARD_EDITOR_VARS.TYPE == "sc"||_GB_DASHBOARD_EDITOR_VARS.TYPE == "stat"){
                        fs.msg.warningA("This Component is not allow to edit the number of main data set");return;
                    }
                    var $targetMainList = $(data).siblings(".ui.link.cards");
                    var cardLen = $targetMainList.find(".card").length;
                    while($targetMainList.find(`.card[data-tab="main/${cardLen}"]`)>0){ cardLen++; };
                    var newMainParam = {id:cardLen};
                    DashboardEditorCtrl.ComponentDataEditor.ComponentsINI.MainComponentAdd(newMainParam);
                },
                onSwitchMain:function(data){
                    var $MainDataListItemElms = $(`#${DashboardEditorCtrl.ComponentDataEditor.defID} .ComponentMainDataList .cards .card`);
                    $MainDataListItemElms.removeClass("active");$MainDataListItemElms.removeClass("teal");
                    $(data).addClass("active");$(data).addClass("teal");
                    var tabid = $(data).attr("data-tab");
                    $(`#${DashboardEditorCtrl.ComponentDataEditor.defID} .ComponentMainFormList .tab.ComponentMainFormGroup`).removeClass("active");
                    var $MainFormListItemElm = $(`#${DashboardEditorCtrl.ComponentDataEditor.defID} .ComponentMainFormList .tab.ComponentMainFormGroup[data-tab="${tabid}"]`);
                    $MainFormListItemElm.addClass("active");
                },
                remove:function(data){
                    var $targetMainCard = $(data).parent(".card");
                    var $targetMainCardList = $(data).parents(".link.cards");
                    if(_GB_DASHBOARD_EDITOR_VARS.TYPE == "sc"||_GB_DASHBOARD_EDITOR_VARS.TYPE == "stat"){
                        fs.msg.warningA("This Component is not allow to edit the number of main data set");return;
                    }
                    if($targetMainCardList.find(".card").length == 1){ fs.msg.warningA("At least one main data set");return; }
                    DashboardEditorCtrl.ComponentDataEditor.Events.Main.remove({id:$targetMainCard.attr("data-tab")});
                }
            },
            Sub:{
                onAddSubClick:function(data){
                    if(_GB_DASHBOARD_EDITOR_VARS.TYPE == "stat"){
                        fs.msg.warningA("This Component is not allow to edit the number of main data set");return;
                    }
                    var $targetSubList = $(data).siblings(".ui.link.cards");
                    var newSubParam = {elm:$targetSubList};
                    DashboardEditorCtrl.ComponentDataEditor.ComponentsINI.SubComponentAdd(newSubParam);
                },
                /*
                
            SubComponentAdd:function(data){
                var $targetElm = data.elm;var _data = fs.isEmpty(data.data)?null:data.data; 
                */
                remove:function(data){
                    var $targetSubCard = $(data).parent(".card");
                    $targetSubCard.remove();
                }
            },
            Rule:{
                addRule:function(data){
                    var $RuleFormGroupElm = $(data).parents(".RulesForm");
                    var ruledata  = $RuleFormGroupElm.find(`[data-id="ruledt"] .selection.dropdown`).dropdown("get value");
                    var optdata   = $RuleFormGroupElm.find(`[data-id="opts"] .selection.dropdown`).dropdown("get value");
                    var paramdata = ($RuleFormGroupElm.find(`[data-id="params"] .selection.dropdown`)>0)
                                        ?$RuleFormGroupElm.find(`[data-id="params"] .selection.dropdown`).dropdown("get value")
                                        :$RuleFormGroupElm.find(`[data-id="params"] input`).val();
                    var error = false;
                    if(fs.isEmpty(ruledata)){ fs.msg.warningA("Please select a data for rule");error = true; }
                    if(fs.isEmpty(optdata)){ fs.msg.warningA("Please select a operator for rule");error = true; }
                    if(fs.isEmpty(paramdata)){ fs.msg.warningA("Please input the parameters for rule");error = true; }
                    if(error){ return; }else{ 
                        paramdata = paramdata.split(",");
                        DashboardEditorCtrl.ComponentDataEditor.Events.Rule.addNewRule({
                            elm:$RuleFormGroupElm.find(".RulesList .list"),
                            data:{ data:ruledata,operator:optdata,params:paramdata }
                        });
                    }
                },
                delete:function(data){ $(data).parent(".item").remove(); }
            }
        },Events:{
            Rule:{
                addNewRule:function(data){
                    var $elm = $(data.elm);var rule = data.data;
                    $elm.append(DashboardEditorUI.ComponentDataEditor.UIComponent.Components.Rules.Component.UIComponent.rule(rule));
                },
                removeRule:function(data){ $(data).parent(".item").remove(); }
            },
            Main:{
                remove:function(data){
                    var id = data.id;$(`#${DashboardEditorCtrl.ComponentDataEditor.defID } [data-tab="${id}"]`).remove();
                }
            }
        }
    },
    Events:{
        _GB_VAR_Refresh:function(){ 
            _GB_DASHBOARD_EDITOR_VARS = {TYPE:"",CONFIG:{},DATASET:[]}
        }
    }
}



const DashboardCtrl  = {
    _ini:function(){
        $("body>#body_main").html(DashboardUI._ini());
        DashboardCtrl._refresh();
    },
    _refresh:function(){
        //console.log(user);
        var items  = (fs.isEmpty(user.config))?[]:
                        (fs.isEmpty(user.config.dashboard))?[]:
                            (fs.isEmpty(user.config.dashboard.items))?[]:user.config.dashboard.items;
        var display= (fs.isEmpty(user.config))?[]:
                        (fs.isEmpty(user.config.dashboard))?[]:
                            (fs.isEmpty(user.config.dashboard.display))?[]:user.config.dashboard.display;
        DashboardCtrl.Events.UI.removeTmpBtn();
        DashboardCtrl.Events.UI.disableEditing();
        var DashboardListElm = $("#main-content #DashboardItemList");
        $(DashboardListElm).html("");
        for(var i in display){
            DashboardCtrl.Row._ini(i);
            for(var j in display[i]){
                var itemID = display[i][j];
                var item = items[itemID];
                DashboardCtrl.Column._ini({id:i,data:item});
                DashboardCtrl.Components._ini(item);
            }
        }
    },
    Row:{
        _ini:function(data){ $(`#DashboardItemList`).append(DashboardUI.UIComponents.row.Row({id:data})); }
    },
    Column:{
        _ini:function(data){ 
            var isPreview = (fs.isEmpty(data.data.preview)?false:true);
            if(isPreview){
                $(`#${DashboardEditorCtrl.ComponentEditor.defID}.modal #ComponentPreview #PreviewArea`).append(DashboardUI.Component._ini(data.data)); 
            }else{
                $(`#DashboardItemList .componentRow[id="row_${data.id}"]`).append(DashboardUI.UIComponents.col.Col(data.data)); 
                $(`#DashboardItemList .componentRow[id="row_${data.id}"] .column[id="col_${data.data.id}"]`).append(DashboardUI.Component._ini(data.data)); 
            }
            
        }
    },
    Components:{
        _ini:function(data){
            var type = data.type;
            var component = data.component;
            var isPreview = (fs.isEmpty(data.preview)?false:true);
            var targetColumn = (isPreview)?$(`#${DashboardEditorCtrl.ComponentEditor.defID}.modal #ComponentPreview #PreviewArea`):$(`#col_${data.id}`);
            $(targetColumn).html(DashboardUI.Component._ini(data));
            switch(type){
                case "stat":
                    var contentElm = $(targetColumn);
                    var _retdata = [];
                    $.ajax({
                        async:false,type: "POST",
                        url: _REQPATH_DASHBOARD,
                        data: { request:"stat", data:component.DATASET},
                        success:function(result){ 
                            _retdata = result;
                        },
                        error:function(result){ console.log(result); }
                    });
                    var statConfigParam = {
                        id:`${data.id}`,
                        color:component.CONFIG.color,
                        title:component.CONFIG.title,
                        showDetail:component.CONFIG.shdtl,
                        val:_retdata[0]["rslt"]
                    }
                    $(contentElm).html(DashboardUI.Component.TYPE.stat(statConfigParam));
                    break;
                case "lb":
                    var color = component.CONFIG.color;
                    var _retdata = [];
                    $.ajax({
                        async:false,type: "POST",
                        url: _REQPATH_DASHBOARD,
                        data: { request:"lb", data:component.DATASET},
                        success:function(result){ 
                            _retdata = result;console.log(result);
                        },
                        error:function(result){ console.log(result); }
                    });
                    
                    var mainlabels = [];
                    var subslabels = [];
                    var datasets = [];
                    for(var i in _retdata){
                        for(var j in _retdata[i].main){
                            mainlabels[mainlabels.length] = _retdata[i].main[j];
                        }
                        
                        var sublabels = [];
                        for(var j in _retdata[i].subs){
                            for(var k in _retdata[i].subs[j]){
                                sublabels[sublabels.length] = _retdata[i].subs[j][k];
                            }
                        }
                        subslabels[subslabels.length] = sublabels;
                    }

                    var mainlabelsLen = mainlabels.length;
                    var colors = fs.getColors(COLOR_TONE[color].set,mainlabelsLen);
                    var currPoint = 0;
                    for(var i in subslabels){
                        var lenOfThisMain = _retdata[i].main.length;
                        for(var j in subslabels[i]){
                            var thisData = new Array(mainlabelsLen);
                                thisData.fill(0,0,mainlabelsLen);//currPoint+lenOfThisMain
                            for(var x = currPoint;x<(currPoint+mainlabelsLen);x++){
                                thisData[x] = fs.getRandomMax(200);
                            }
                            var dataset = {
                                label:subslabels[i][j],
                                data:thisData,
                                type: 'bar',
                                backgroundColor: colors,
                                borderColor: colors
                            }
                            datasets[datasets.length] = dataset;
                        }
                        currPoint+=lenOfThisMain
                    }
                    var chartParamData = {
                        datasets:datasets,
                        labels:mainlabels
                    };
                    var chartsParam = {
                        id:`chart_${data.id}`,
                        datasets:chartParamData,
                        type:"bar"
                    };
                    ChartCtrl._ini(chartsParam);
                case "sc":
                    var _X = component.DATASET[0].main.maindt;
                    var _Y = component.DATASET[1].main.maindt;
                    var _X_NAME = marineObj.getColumnNameRawData(_X);
                    var _Y_NAME = marineObj.getColumnNameRawData(_Y);
                    var datasize = fs.getRandom(50,300);
                    var color = component.CONFIG.color;
                    var colors = fs.getColors(COLOR_TONE[color].set,datasize);


                    var d = [];
                    for(var i =0;i<datasize;i++){
                        d[i] = { x:fs.getRandomMax(250),y:fs.getRandomMax(250)}
                    }
                    var datasets = [{
                        label: _X_NAME.en + " & "+_Y_NAME.en,
                        data: d, 
                        borderColor: colors,            
                        backgroundColor: colors, 
                    }];
                    var options = {
                        yAxes: [{
                            ticks: { beginAtZero: true },
                            gridLines:{ display:true }
                        }],
                        xAxes:[{
                            gridLines:{ display:true }
                        }],
                        maintainAspectRatio: false,
                        aspectRatio:0.8
                    };
                    var chartParamData = {
                        datasets:datasets,
                        labels:mainlabels
                    };
                    var chartsParam = {
                        id:`chart_${data.id}`,
                        datasets:chartParamData,
                        options:options,
                        type:"scatter"
                    };
                    ChartCtrl._ini(chartsParam);
                    break;
                case "pd":
                    var color = component.CONFIG.color;
                    var _retdata = [];
                    $.ajax({
                        async:false,type: "POST",
                        url: _REQPATH_DASHBOARD,
                        data: { request:"lb", data:component.DATASET},
                        success:function(result){ 
                            _retdata = result;console.log(result);
                        },
                        error:function(result){ console.log(result); }
                    });
                    
                    var mainlabels = [];
                    var subslabels = [];
                    var datasets = [];
                    for(var i in _retdata){
                        for(var j in _retdata[i].main){
                            mainlabels[mainlabels.length] = _retdata[i].main[j];
                        }
                        
                        var sublabels = [];
                        for(var j in _retdata[i].subs){
                            for(var k in _retdata[i].subs[j]){
                                sublabels[sublabels.length] = _retdata[i].subs[j][k];
                            }
                        }
                        subslabels[subslabels.length] = sublabels;
                    }

                    var mainlabelsLen = mainlabels.length;
                    var colors = fs.getColors(COLOR_TONE[color].set,mainlabelsLen);
                    var currPoint = 0;
                    for(var i in subslabels){
                        var lenOfThisMain = _retdata[i].main.length;
                        for(var j in subslabels[i]){
                            var thisData = new Array(mainlabelsLen);
                                thisData.fill(0,0,mainlabelsLen);//currPoint+lenOfThisMain
                            for(var x = currPoint;x<(currPoint+mainlabelsLen);x++){
                                thisData[x] = fs.getRandomMax(200);
                            }
                            var dataset = {
                                label:subslabels[i][j],
                                data:thisData,
                                type: 'doughnut',
                                backgroundColor: colors,
                                borderColor: colors
                            }
                            datasets[datasets.length] = dataset;
                        }
                        currPoint+=lenOfThisMain
                    }
                    var chartParamData = {
                        datasets:datasets,
                        labels:mainlabels
                    };
                    var chartsParam = {
                        id:`chart_${data.id}`,
                        datasets:chartParamData,
                        type:"doughnut"
                    };
                    ChartCtrl._ini(chartsParam);
                    break;
                case "tl":
                    var contentElm = $(targetColumn).find(".card .content");
                    var _retdata = [];
                    var search = component.CONFIG.search;
                    var add = component.CONFIG.add;
                    var edit = component.CONFIG.edit;
                    var dele = component.CONFIG.delete;
                    var showData = component.DATASET.showData;
                    var columns = [];
                    if(add||edit||dele){
                        columns[0] = { 
                            data: "strandingreport^sid",
                            title: `${(add)?strandingCaseUI.auxiliary.sideBtns.new():""}`,
                            render:function(_renderdata){
                                return `
                                    ${(edit)?strandingCaseUI.auxiliary.sideBtns.edit(_renderdata):""}
                                    ${(dele)?strandingCaseUI.auxiliary.sideBtns.delete(_renderdata):""}
                                `;
                            }
                        };
                    }
                    for(var col in showData){
                        columns[columns.length] = { 
                            data:showData[col],
                            title:marineObj.getColumnNameRawData(showData[col]).en }
                    }
                    $.ajax({
                        async:false,type: "POST",
                        url: _REQPATH_DASHBOARD,
                        data: { request:"tl", data:component.DATASET},
                        success:function(result){ 
                            _retdata = result;
                        },
                        error:function(result){ console.log(result); }
                    });
                    var tableListConfigs = {
                        id:`component_${data.id}`,elm:$(contentElm),
                        configs:{
                            searching:search,
                            data:_retdata,
                            columns:columns
                        }
                    }
                    //console.log(tableListConfigs);
                    TableCtrl._ini(tableListConfigs);
                    break;
                case "mv":
                    var contentElm = $(targetColumn).find(".card .content");
                    $(contentElm).html(MapUI._ini("map_"+data.id));
                    _gb_ret[MapViewCtrl.defID] = (fs.isEmpty(_gb_ret[MapViewCtrl.defID]))?MapViewCtrl.DataControls.retrieveData():_gb_ret[MapViewCtrl.defID];
                    //console.log(_gb_ret[MapViewCtrl.defID]);
                    var thismap = MapCtrl._ini({id:"map_"+data.id});
                    var showmm = component.CONFIG.showmm;
                    var showba = component.CONFIG.showba;
                    var rules = component.DATASET.rule;
                    if(showmm){
                        for(var i in _gb_ret[MapViewCtrl.defID].MarineMammal){
                            var item = _gb_ret[MapViewCtrl.defID].MarineMammal[i];
                            var consted = MapViewCtrl.list.itemConst["MarineMammal"](item);
                            var _match = false;
                            for(var x in rules){
                                var attr = rules[x].data;var operator = rules[x].operator;var params = rules[x].params;
                                var targetValue = item[attr];
                                
                                //console.log(`attr:${attr} | operator:${operator} | params:${params} | targetVal:${targetValue}`);
                                switch(operator){
                                    case "=": 
                                        _match = (targetValue == params[0]);break;
                                    case "!=":
                                        _match = (targetValue != params[0]);break;
                                    case ">=":
                                        _match = (targetValue >= params[0]);break;
                                    case "<=":
                                        _match = (targetValue <= params[0]);break;
                                    case "IN":
                                        for(var y in params){
                                            _match = (targetValue == params[y]);
                                            if(_match==true){ break };
                                        }
                                        break;
                                    case "LIKE":
                                        for(var y in params){
                                            _match = targetValue.includes(params[y]);
                                            if(_match==true){ break };
                                        }
                                        break;
                                }
                                if(_match){ break; }
                            }
                            if(!_match&&rules.length>0){ continue; }
                            //console.log(true);
                            var paramsForMarker = consted;
                            var mapMarkerParams = {
                                type:"MarineMammal",
                                id:"map_"+data.id,
                                lati:consted['gps'].lati,
                                long:consted['gps'].long,
                                params:paramsForMarker
                            };
                            MapCtrl.mapFunction.addMarkerToCluster(mapMarkerParams);
                        }
                    }
                    if(showba){
                        for(var i in _gb_ret[MapViewCtrl.defID].BoatActivity){
                            var item = _gb_ret[MapViewCtrl.defID].BoatActivity[i];
                            var consted = MapViewCtrl.list.itemConst["BoatActivity"](item);
                            
                            var paramsForMarker = consted;
                            var mapMarkerParams = {
                                type:"BoatActivity",
                                id:"map_"+data.id,
                                lati:consted['gps'].lati,
                                long:consted['gps'].long,
                                params:paramsForMarker
                            };
                            MapCtrl.mapFunction.addMarkerToCluster(mapMarkerParams);
                        }
                    }
                    MapCtrl.mapFunction.refreshMap({id:"map_"+data.id});
                    break;
                case "fu":
                    var contentElm = $(targetColumn).find(".card .content");
                    var uploadConfigs = {
                        id: data.id,elm:contentElm,
                        text:"Upload Area",
                        preview:false,short:true
                    };
                    if(!fs.isEmpty(component.CONFIG.case)){ 
                        uploadConfigs.sid = component.CONFIG.case;
                        uploadConfigs.text = `Upload File For ${component.CONFIG.case}`;
                    }
                    //console.log(uploadConfigs);
                    UploadCtrl._ini(uploadConfigs);
                    break;
                case "fm":
                    var contentElm = $(targetColumn).find(".card .content");
                    var search = component.CONFIG.search;
                    var filetype = fs.isEmpty(component.CONFIG.filetype)?"all":component.CONFIG.filetype;
                    var id = data.id;
                    var FileManagementParam = {
                        id:id,elm:contentElm,
                        side:false,
                        upload:false,
                        search:search,
                        pageview:false,
                        filetype:filetype
                    };
                    FileManagementCtrl._ini(FileManagementParam);
                    break;
                case "ce":
                    var contentElm = $(targetColumn).find(".card .content");
                    var showData = component.DATASET.showData;
                    _showData = {};
                    for(var i in showData){
                        var item = showData[i].split("^");
                        var group= parseInt(item[0]);var table = item[1];var column = item[2];
                        if(fs.isEmpty(_showData[group])){ _showData[group] = {};}
                        if(fs.isEmpty(_showData[group][table])){ _showData[group][table] = []; }
                        _showData[group][table][_showData[group][table].length] = column;
                    }
                    var editorParam = {
                        id : data.id,
                        elm: contentElm,
                        data:_showData
                    };
                    EditorCtrl.component_ini(editorParam);
                    break;
            }
        },
        TYPE:{
            stat:{ _ini:function(data){} },
            chartjs:{ _ini:function(data){} },
            tl:{ _ini:function(data){} },
            mv:{ _ini:function(data){} },
            fu:{ _ini:function(data){} },
            fm:{ _ini:function(data){} },
            ce:{ _ini:function(data){} }
        }
    },
    EventListener:{
        UI:{
            edit:function(){
                DashboardCtrl.Events.UI.toggleEvent();
                DashboardCtrl.Events.UI.addTmpBtn();
                DashboardCtrl.Events.UI.moveable();
            },
            save:function(){
                DashboardCtrl.Events.UI.toggleEvent();
                DashboardCtrl.Events.UI.removeTmpBtn();
                DashboardCtrl.Events.UI.dismoveable();
                DashboardCtrl.Events.UI.updateConfigs();
            },
            cancel:function(){
                DashboardCtrl.Events.UI.toggleEvent();
                DashboardCtrl.Events.UI.removeTmpBtn();
                DashboardCtrl.Events.UI.cancelmoveable();
                DashboardCtrl.Events.UI.dismoveable();
            },
        },
        items:{
            delete:function(data){ 
                var id = $(data).attr("data-i");
                delete user.config.dashboard.items[id];
                for(var i in user.config.dashboard.display){
                    var index = user.config.dashboard.display[i].indexOf(id);
                    if(index>-1){ user.config.dashboard.display[i].splice(index, 1); }
                }
                $(data).parent(".fluid.card").remove();
                DashboardCtrl.Events.UI.updateConfigs();
            },
            new:function(data){
                var row = $(data).attr("new-row");
                var id  = $(data).attr("data-row-id");
                _NEW_DISPLAY_CONFIG.row = (typeof(row)!='undefined');
                _NEW_DISPLAY_CONFIG.id=id;
                DashboardEditorCtrl.ComponentSeletor._ini();
            },
        },
        display:{
            delete:function(data){
                var conf = {
                    msg:"Delete this component?",
                    actions:[
                        { text:"Yes",class:"green",click:function(){
                            $(data).parents(".ui.fluid.card").remove();
                            DashboardCtrl.Events.UI.updateConfigs();
                        }},{ text:"No",class:"red",click:function(){ }}
                    ]
                };
                fs.msg.attached(conf);
            }
        }

    },
    Events:{
        UI:{
            toggleEvent:function(){ 
                $("#editbtn,#savebtn,#cancelbtn").toggleClass("hiding");
                $('.main-content').toggleClass("editing"); 
            },
            disableEditing:function(){
                $("#editbtn").removeClass("hiding");
                $("#savebtn,#cancelbtn").addClass("hiding");
                $('.main-content').removeClass("editing"); 
            },
            removeTmpBtn:function(){
                $(` #body_main #DashboardItemList .tempRow,#body_main #DashboardItemList .tempRow,
                    #body_main #DashboardItemList .tempRow,#body_main #DashboardItemList .newReportBtn`).remove();
            },
            addTmpBtn:function(){
                var DashboardList = $(`#body_main #DashboardItemList`);
                $(DashboardList).prepend(DashboardUI.UIComponents.row.tmpRow(0));
                $(DashboardList).find(".componentRow").each(function(i){
                    $(this).append(DashboardUI.UIComponents.col.tmpCol(i));
                    $(this).after(DashboardUI.UIComponents.row.tmpRow(i+1));
                });
            },
            moveable:function(){
                $( ".main-content" ).sortable({ 
                    cancel:".nondraggable" ,tolerance: "pointer",cursor: "move",
                });
                $( ".main-content .ui.grid" ).sortable({
                    connectWith: '.main-content .ui.grid',cancel:".nondraggable",cursor: "move"
                });
            },
            cancelmoveable:function(){
                $(".main-content").sortable( "cancel" );
                $(".main-content .ui.grid").sortable('cancel');
            },
            dismoveable:function(){
                $(".main-content").sortable( "destroy" );
                $(".main-content .ui.grid").sortable('destroy');
            },
            updateConfigs:function(){
                var $elms = $("#main-content #DashboardItemList");
                var _display = [];
                $elms.find(".componentRow").each(function(i){
                    if($(this).find(".componentCol").length>0){ 
                        _display[i] = [];
                        $(this).find(".componentCol").each(function(j){
                            _display[i][j] = $(this).attr("data-id");
                        });
                    }
                });
                if(fs.isEmpty(user.config)){ user.config = {}; }
                if(fs.isEmpty(user.config.dashboard)){ user.config.dashboard = {}; }
                user.config.dashboard.display = _display;
                UserCtrl.Event.updateUserConfig();
            }
        }
    }
};