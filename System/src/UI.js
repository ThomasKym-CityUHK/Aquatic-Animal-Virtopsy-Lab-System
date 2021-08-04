const IntegatedUI = {
    _ini:function(data){
        var output = "";
        for(var i=0;i<data.length;i++){
            var tempOutput = "";
            tempOutput = ComponentsUI._switch(data[i]);
            if(tempOutput!=""){ output+=tempOutput;continue; }
            tempOutput = FormUI._switch(data[i]);
            if(tempOutput!=""){ output+=tempOutput;continue; }
        }
        return output;
    },
    exClasses:function(data){
        if(!data&&data==undefined){ return ""; }
        var exClasses  = "";

            //Int OR Int[3] eg. [X1,X2,X3],0<=X<=16, map computer,tablet,mobile
            if(data.size&&!fs.isEmpty(data.size)){
                if(data.size.length>0){
                    var computerSize = (data.size[0]>0)?` ${SIZE[data.size[0]]} wide computer `:"";
                    var tabletSize   = (data.size[1]>0)?` ${SIZE[data.size[1]]} wide tablet `:"";
                    var mobileSize   = (data.size[2]>0)?` ${SIZE[data.size[2]]} wide mobile `:"";
                    exClasses += computerSize+tabletSize+mobileSize;
                }else{
                    exClasses += (data.size>0)?SIZE[data.size]+" wide ":"";
                }
            }
            
            exClasses += fs.isEmpty(data.only)?"":((data.only)?" only ":"");
            exClasses += fs.isEmpty(data.divided)?"":((data.divided)?" divided ":"");
            exClasses += fs.isEmpty(data.relaxed)?"":((data.relaxed)?" relaxed ":"");
            exClasses += fs.isEmpty(data.aligned)?"":" "+data.valigned+" aligned ";
            exClasses += fs.isEmpty(data.inverted)?"":((data.inverted)?" inverted ":"");
            exClasses += fs.isEmpty(data.sysstyle)?"":SYSSTYLES[data.sysstyle];
            exClasses += fs.isEmpty(data.syscolor)?"":SYSCOLORS[data.syscolor];
            //text-size
            exClasses += fs.isEmpty(data.tsize)?"":((data.tsize)?` ${TSIZE[data.tsize]} `:"");

            //text
            exClasses = fs.isEmpty(data.type)?"":` ${ data.type } `;

            //header
            exClasses += fs.isEmpty(data.disable)?"":(data.disable)?" disable ":"";
            exClasses += fs.isEmpty(data.block)?"":(data.block)?" block ":"";
            exClasses += fs.isEmpty(data.dividing)?"":(data.dividing)?" dividing ":"";
            
            //list
            exClasses += fs.isEmpty(data.horizontal)?"":((data.horizontal)?" horizontal ":"");
            exClasses += fs.isEmpty(data.selection)?"":((data.selection)?" selection ":"");
            exClasses += fs.isEmpty(data.animated)?"":((data.animated)?" animated ":"");
            exClasses += fs.isEmpty(data.celled)?"":((data.celled)?" celled ":"");

            //items
            exClasses += fs.isEmpty(data.active )?"":((data.active )?" active  ":"");
            exClasses += fs.isEmpty(data.unstackable)?"":((data.unstackable)?" unstackable ":"");
            exClasses += fs.isEmpty(data.link)?"":((data.link)?" link ":"");

            //row/field/fields
            exClasses += fs.isEmpty(data.inline)?"":((data.inline)?" inline ":"");

            //checkbox/radio
            exClasses += fs.isEmpty(data.slider)?"":((data.slider)?" slider ":"");
            exClasses += fs.isEmpty(data.toggle)?"":((data.toggle)?" toggle ":"");
            exClasses += fs.isEmpty(data.readonly)?"":((data.readonly)?" read-only ":"");
            exClasses += fs.isEmpty(data.checked)?"":((data.checked)?" checked ":"");
            exClasses += fs.isEmpty(data.disabled)?"":((data.disabled)?" disabled ":"");
            exClasses += fs.isEmpty(data.fitted)?"":((data.fitted)?" fitted ":"");
            exClasses += fs.isEmpty(data.radio)?"":((data.radio)?" radio ":"");
            
            //select
            exClasses += fs.isEmpty(data.multiple)?"":((data.multiple)?" multiple ":"");
            exClasses += fs.isEmpty(data.search)?"":((data.search)?" search ":"");

            //menu
            exClasses += fs.isEmpty(data.vertical )?"":((data.vertical )?" vertical  ":"");
            exClasses += fs.isEmpty(data.fixed )?"":((data.fixed )?" fixed ":"");
            
            //label
            exClasses += fs.isEmpty(data.image )?"":((data.image )?" image ":"");
            exClasses += fs.isEmpty(data.pointing )?"":((data.pointing )?" pointing ":"");
            exClasses += fs.isEmpty(data.below )?"":((data.below )?" below ":"");
            exClasses += fs.isEmpty(data.corner )?"":((data.corner )?" corner ":"");
            exClasses += fs.isEmpty(data.tag )?"":((data.tag )?" tag ":"");
            exClasses += fs.isEmpty(data.ribbon )?"":((data.ribbon )?" ribbon ":"");
            exClasses += fs.isEmpty(data.top )?"":((data.top )?" top ":"");
            exClasses += fs.isEmpty(data.bottom  )?"":((data.bottom  )?" bottom  ":"");
            exClasses += fs.isEmpty(data.floating  )?"":((data.floating  )?" floating  ":"");
            exClasses += fs.isEmpty(data.circular  )?"":((data.circular  )?" circular  ":"");

            //menu & label
            exClasses += fs.isEmpty(data.left )?"":((data.left )?" left ":"");
            exClasses += fs.isEmpty(data.right )?"":((data.right )?" right ":"");
            
            //segment
            exClasses += fs.isEmpty(data.raised )?"":((data.raised )?" raised ":"");
            exClasses += fs.isEmpty(data.stacked )?"":((data.stacked )?" stacked ":"");
            exClasses += fs.isEmpty(data.tall )?"":((data.tall )?" tall ":"");
            exClasses += fs.isEmpty(data.piled )?"":((data.piled )?" piled ":"");
            exClasses += fs.isEmpty(data.disabled )?"":((data.disabled )?" disabled ":"");
            exClasses += fs.isEmpty(data.loading )?"":((data.loading )?" loading ":"");
            
            return exClasses;
    },
    attrType:function(data){
        switch(data){
            case "INT":case "int":
            case "FLOAT":case "float":
            case "DOUBLE":case "double":
            case "DECIMAL":case "decimal":
                return _NUMBER;
            case "CHAR":case "char":
            case "VARCHAR":case "varchar":
                return _STRING;
            case "TEXT":case "text":
            case "LONGTEXT":case "longtext":
                return _LONGSTR;
            case "DATE":case "date":
            case "DATETIME":case "datetime":
            case "TIMESTAMP":case "timestamp":
                return _DATETIME;
            case "TIME":case "time":
                return _TIME;
        }
        return _STRING;
    },
    operType:function(data){
        switch(data){
            case "=":case "Equals":
            case "!=":case "<>":case "Not Equals":
            case ">=":case "Equals or Large than":
            case "<=":case "Equals or Less than":
            case ">":case "Large":
            case "<":case "Less":
            case "LIKE":case "Like":
            case "NOT LIKE":case "Not Like":
                return _SINGEL;
            case "BETWEEN":case "Between":
            case "NOT BETWEEN":case "Not Between":
                return _BETWEEN;
            case "IN":case "In":
            case "NOT IN":case "Not In":
                return _MULTI;
        }
    }

}
const ComponentsUI = {
    _switch:function(data){
        switch(data.type){
            case "img": return this.img(data);
            case "image": return this.image(data);
            case "icon":case "i": return this.icon(data);
            case "txt":case "text":case "string": return this.text(data);
            case "header":return this.header(data);
            case "list":return this.list(data);
            case "items":return this.items(data);
            case "item":return this.item(data);
            case "menu":return this.menu(data);
            case "segments":return this.segments(data);
            case "segment":return this.segment(data);
            case "fields":return this.fields(data);
            case "field":return this.field(data);
            case "grid":return this.grid(data);
            case "row":return this.row(data);
            case "column":return this.column(data);
            case "label":return this.label(data);
            case "content":return this.content(data);
            default:return "";
        }
    },
    img:function (data){ return `<img class="ui image ${ IntegatedUI.exClasses(data.exClasses) }" src="${data.src}">`; },
    image:function (data){ 
        var output = `<div class="image">${ this.img(data)  }</div>`;
        return output;
    },
    icon:function(data){ return `<i class="${data.value} icon"></i>`; },
    text:function(data){ 
        var exClasses = IntegatedUI.exClasses(data.exClasses);
        var output = data.value;
        if(exClasses!=""){ output = `<div class="${exClasses}">${data.value}</div>`; }; 
        return output;
    },
    header:function(data){ 
        var Hsize = fs.isEmpty(data.Hsize)?false:data.Hsize;
        var exClasses = IntegatedUI.exClasses(data.exClasses);
        var openSyn = "";var endSyn = "";
        switch(Hsize){
            case  0: openSyn = `<div class='ui ${exClasses} header'>`;endSyn="</div>";break;  
            case  1: openSyn = `<h1 class='ui ${exClasses} header'>`;endSyn="</h1>";break;
            case  2: openSyn = `<h2 class='ui ${exClasses} header'>`;endSyn="</h2>";break;
            case  3: openSyn = `<h3 class='ui ${exClasses} header'>`;endSyn="</h3>";break;
            case  4: openSyn = `<h4 class='ui ${exClasses} header'>`;endSyn="</h4>";break;
            case  5: openSyn = `<h5 class='ui ${exClasses} header'>`;endSyn="</h5>";break;
            default: openSyn = `<div class='ui ${exClasses} header'>`;endSyn="</div>";break;
        }
        return `
           ${openSyn}
           ${IntegatedUI._ini(data.contents)}
           ${endSyn}
        `;
    },
    list:function(data){
        var exClasses = IntegatedUI.exClasses(data.exClasses);
        var contents = data.contents;
        var output = IntegatedUI._ini(contents);
        return `<div class="${ exClasses } ui list">${ output }</div>`;
    },
    items:function(data){
        var exClasses = IntegatedUI.exClasses(data.exClasses);
            
        var output = `<div class="ui ${ exClasses } items"> ${ IntegatedUI._ini(data.contents) } </div>`;
        return output;
    },
    item:function(data){
        var output = "";
        var exClasses = IntegatedUI.exClasses(data.exClasses);
        output = `<div class="${exClasses} item">${ IntegatedUI._ini(data.contents) }</div>`;
        return output;
    },
    menu:function(data){
        var exClasses = IntegatedUI.exClasses(data.exClasses);
        var output = `<div class="ui ${ exClasses } menu"> ${ IntegatedUI._ini(data.contents) } </div>`;
        return output;
    },
    label:function(data){
        var exClasses = IntegatedUI.exClasses(data.exClasses);
        var link = fs.isEmpty(data.link)?false:data.link;
        var output = `<div class="ui ${ exClasses } label"> ${ IntegatedUI._ini(data.contents) } </div>`;
        if(link!=false){ output = `<a class="ui ${ exClasses } label"> ${ IntegatedUI._ini(data.contents) } </div>`; }
        
        return output;
    },
    segments:function(data){
        var exClasses = IntegatedUI.exClasses(data.exClasses);
        var output = `<div class="ui ${ exClasses } segments"> ${ IntegatedUI._ini(data.contents) } </div>`;
        return output;
    },
    segment:function(data){
        var exClasses = IntegatedUI.exClasses(data.exClasses);
        var output = `<div class="ui ${ exClasses } segment"> ${ IntegatedUI._ini(data.contents) } </div>`;
        return output;
    },
    fields:function(data){
        var exClasses = IntegatedUI.exClasses(data.exClasses);
        var output = `<div class=" ${ exClasses } fields"> ${ IntegatedUI._ini(data.contents) } </div>`;
        return output;
    },
    field:function(data){
        var exClasses = IntegatedUI.exClasses(data.exClasses);
        var output = `<div class=" ${ exClasses } field"> ${ IntegatedUI._ini(data.contents) } </div>`;
        return output;
    },
    grid:function(data){
        var exClasses = IntegatedUI.exClasses(data.exClasses);
        var output = `<div class=" ${ exClasses } grid"> ${ IntegatedUI._ini(data.contents) } </div>`;
        return output;
    },
    row:function(data){
        var exClasses = IntegatedUI.exClasses(data.exClasses);
        var output = `<div class=" ${ exClasses } row"> ${ IntegatedUI._ini(data.contents) } </div>`;
        return output;
    },
    column:function(data){
        var exClasses = IntegatedUI.exClasses(data.exClasses);
        var output = `<div class=" ${ exClasses } column"> ${ IntegatedUI._ini(data.contents) } </div>`;
        return output;
    },
    content:function(data){
        return `<div class="content">${ IntegatedUI._ini(data.contents) }</div>`;
    }
}
const FormUI = {
    _switch:function(data){
        switch(data.type){
            case "input"    : return this.input(data.contents);
            case "checkbox" : return this.checkbox(data.contents);
            case "checkboxs"    : return this.checkboxs(data.contents);
            case "select"   : return this.select(data.contents);
            case "selectGP"   : return this.selectGP(data.contents);
            case "textarea" : return this.textarea(data.contents);
            case "calendar" : return this.calendar(data.contents);
            case "map"      : return this.map(data.contents);
            case "button"      : return "";
            default: return "";
        }
    },
    input: function(data){
        var title = data.title;
        var name = data.name;
        var placeholder = data.placeholder;
        var inputtype = data.inputtype;
        var exClasses = IntegatedUI.exClasses(data.exClasses);
        var output = `
            <label>${ title }</label>
            <input type="${ inputtype }" name="${ name }" placeholder="${ placeholder }">
        `;
        return output;
    },
    checkbox:function(data){
        var exClasses = IntegatedUI.exClasses(data.exClasses);
        var title = data.title;
        var name  = data.name;
        var val   = data.value;
        var output=`
            <div class="ui checkbox ${ exClasses }">
                <input name="${name}" type="checkbox" tabindex="0" class="hidden">
                <label>${title}</label>
            </div>
        `;
        return output;
    },
    checkboxs:function(data){
        var exClasses = IntegatedUI.exClasses(data.exClasses);
        var title   = data.title;
        var name    = data.name;
        var options = data.options;
        var output  = `<div class="${ exClasses } fields">
                            <h4>${title}</h4>
        `;
            for(var i =0;i<options.length;i++){
                var val         = options[i].value;
                var optionTitle = options[i].title;
                var isRadio     = fs.isEmpty(data.radio)?false:data.radio;
                var conf        = {
                    title :optionTitle,
                    val   :val,
                    name  :name,
                    exClasses:{
                        radio: isRadio
                    }
                }
                output+=    `<div class="field">
                                ${ FormUI.checkbox(conf) }
                            </div>`;
            }
            output += `</div>`;
        
        return output;
    },
    /** 
     * input data stratures 
     * data = {
     *      multiple: bool (optional),
     *      search  : bool (optional),
     *      title   : string ,
     *      name    : string ,
     *      placeholder: string,
     *      options : array data (with objs of option), 
     *      size    : int or string (optional)
     * }
     **/
    select:function(data){
        var exClasses = IntegatedUI.exClasses(data.exClasses);
        var title   = data.title;
        var name    = data.name;
        var id      = (fs.isEmpty(data.id))?name:data.id;
        var placeholder = data.placeholder;
        var options = data.options;
        var size = fs.isEmpty(data.size)?"":SIZE[data.size]+" wide ";
        var output  =   `
                    <div class="${ size } field" >
                        <label>${title}</label>
                        <div class="ui fluid ${ exClasses } selection dropdown
                        " id="${id}">
                            <input type="hidden" name="${name}">
                            <i class="dropdown icon"></i>
                            <div class="default text">${placeholder}</div>
                            <div class="menu">
                        `;
                        
                        for(var i=0;i<options.length;i++){
                            var o = options[i];
                            var dataValue = o.val;
                            var dataText = o.title;
                            var dataShows = o.contents;
                            output += `
                                <div class="item" data-value="${dataValue}" data-text="${dataText}">
                                    ${ IntegatedUI._ini(dataShows) }
                                </div>
                            `;
                        }
            output +=   `   </div>
                        </div>
                    </div>`;
            return output;
    },
    /** 
     * input data stratures 
     * data = {
     *      title   : string ,
     *      name    : string ,
     *      placeholder: string,
     *      options : 3D array data (with groups objs of option), 
     *      size    : int or string (optional)
     * }
     **/
    selectGP:function(data){
        var exClasses = IntegatedUI.exClasses(data.exClasses);
        var title   = data.title;
        var name    = data.name;
        var placeholder = data.placeholder;
        var options = data.options;
        var size = fs.isEmpty(data.size)?"":SIZE[data.size]+" wide ";
        var output  =   `
                    <div class="${ size } field" >
                        <label>${title}</label>
                        <div class="ui fluid ${ exClasses } selection dropdown
                        ">
                        
                            
                            <input type="hidden" name="${name}">
                            <i class="dropdown icon"></i>
                            <div class="default text">${placeholder}</div>
                            <div class="menu">
                        `;
                        
                        for(var i=0;i<options.length;i++){
                            var o = options[i];
                            var dataValue = o.dataValue;
                            var dataText = o.dataText;
                            var dataShows = o.dataShows;
                            output += `
                                <div class="item" data-value="${dataValue}" data-text="${dataText}">
                                    ${ IntegatedUI._ini(dataShows) }
                                </div>
                            `;
                        }
            output +=   `   </div>
                        </div>
                    </div>`;
    },
    textarea:function(data){},
    calendar:function(data){
        var id = data.id;
        var title = data.title;
        var placeholder = data.placeholder;
        var size = fs.isEmpty(data.size)?"":SIZE[data.size]+" wide ";
        var output = `
        <div class="${ size } field" >
            ${ (!fs.isEmpty(title))?`<label>${title}</label>`:"" }
            <div class="ui calendar" id="calendar-${id}">
                <div class="ui input left icon">
                    <i class="calendar icon"></i>
                    <input type="text" name="${id}" placeholder="${placeholder}">
                </div>
            </div>
        </div>
        `;
        return output;
    },
    map:function(data){}

}
/***************************Integate Components UI*******************************/
const ChartsUI={
    sizeSet:[
        [4,8,16],
        [4,8,16],
        [8,8,16],
        [12,16,16],
        [16,16,16]
    ],
    _ini:function(data){
        var type = data.type;
        switch(type){
            case "stat":
                return this.stat._ini(data);
            case "lb":case "pd":case "sc":
                return this.charts._ini(data);
            default:
                return "";
        };

    },
    stat:{
        _ini:function(data){
            var size = ChartsUI.sizeSet[(data.size)?data.size:1];
            var id   = data.id;
            var color  = (data.color)?data.color:"default";
            var val  = data.datasets['data'][0];
            var title= data.title;
            var showDetail = data.showDetail;
            var output = ``;
            if(showDetail){
                output = `<div class="${SIZE[size[0]]} wide computer ${SIZE[size[1]]} wide tablet ${SIZE[size[2]]} wide mobile componentCol column" id="charts-${id}">
                    <div class="ui button negative" onclick="DashboardCtrl.Events.chartDelete('${id}')">Delete</div>
                    <div class="ui fluid large ${SYSCOLORS[color]} card centered">
                        <div class="content">
                            <div class="ui large ${SYSCOLORS[color]} statistic">
                                <div class="value">${val}</div>
                                <div class="label">${title}</div>
                            </div>
                        </div>
                        <div class="extra content">
                            <button class="ui ${SYSCOLORS[color]} tiny button" onclick="ChartCtrl.EventListener.stat.showDetail('${id}')">More Detail</button>
                        </div>
                    </div>
                </div>`;
            }else{
                output = `<div class="${SIZE[size[0]]} wide computer ${SIZE[size[1]]} wide tablet ${SIZE[size[2]]} wide mobile componentCol column" id="charts-${id}">
                    <div class="ui large ${SYSCOLORS[color]} centered statistic">
                        <div class="value">${val}</div>
                        <div class="label">${title}</div>
                    </div>
                </div>`;
            }
            return output;
        }
    },
    charts:{
        _ini:function(data){
            var size = ChartsUI.sizeSet[data.size];
            var id   = data.id;
            var title= data.title;
            var output = `
                <div class="${SIZE[size[0]]} wide computer ${SIZE[size[1]]} wide tablet ${SIZE[size[2]]} wide mobile componentCol column" id="charts-${id}">
                    <div class="ui text menu">
                        <h3 class="ui item header">${title}</h3>
                        <div class="ui item mini right">
                            <div class="ui button negative" onclick="DashboardCtrl.Events.chartDelete('${id}')">Delete</div>
                            <div class="ui dropdown item chartFilter">
                                <i class="filter icon" onclick="Charts.EventListener.charts.filter('${id}')"></i>Filter
                            </div>
                        </div>
                    </div>
                    <div class="ui divider"></div>
                    <div class="ui padded segment">
                        <canvas id="charts-canvas-${id}"></canvas>
                    </div>
                </div>
            `;
            return output;
        }
    }
}
const TableUI={
    _ini:function(data){
        var id = data;
        var output = `<table class="datatabels ui small grey responsive single line table" id="${id}" style="width:100%"></table>`;
        return output;
    }

}
const MapUI={
    _ini:function(data){
        var id = data;
        var output = `<div class="leafletJs" id="${id}"></div>`;
        return output;
    }
}
const UploadAareUI={
    _ini:function(data){
        var id = data.id;
        var displayText = (fs.isEmpty(data.text))?"Drop or Choose files into this area":data.text;
        var HasPreview = (!fs.isEmpty(data.preview));
        var previewarea = ``;
        if(HasPreview){ previewarea = `<div class="ui special six cards uploadList" id="upload-${id}-list"></div>`; }else{
            previewarea = `<div class="ui special six cards uploadList" style="display:none" id="upload-${id}-list"></div>`;
        }
        var output = `
        <div class="uploadComp ui center aligned padded grid" id="uploadComp-${id}">
            <div class="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                <div class="ui placeholder segment uploadArea" id="upload-${id}">
                    <div class="ui icon header"><i class="file outline icon"></i>${displayText}</div>
                    <div class="ui primary button">Choose Files</div>
                </div>
            </div>
            <div class="left aligned sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                ${UploadAareUI.uploadButtons(data)}
                ${ previewarea }
            </div>
        </div>
        `;
        return output;
        /**
                    <div class="ui buttons tiny right float" style="margin-left:10px;"></div> */
    },
    uploadButtons:function(data){
        var id = data.id;var short = !fs.isEmpty(data.short);
        var output = `
            <div class="ui small header ${ (short)?`fluid buttons `:"" }" style="margin-bottom:25px;">
                <div class="ui red tiny button removeall" ><i class="trash icon"></i>${ (!short)?`Remove All`:``}</div>
                <div class="ui blue tiny button uploadall" ><i class="cloud upload icon"></i>${ (!short)?`Upload All`:``}</div>
                <div class="ui teal tiny button" onclick="UploadCtrl.EventListener.bufferInit('${id}')"><i class="edit icon"></i>${ (!short)?`Edit Buffer`:``}</div>
            </div>
        `;
        return output;
    },
    uploadedItem:function(){
        return `
        <div class="card">
            <div class="blurring dimmable image">
                <div class="ui inverted dimmer">
                    <div class="content"><div class="center">
                        <div class="ui tiny red button" data-dz-remove><i class="trash icon"></i>Remove</div>
                    </div></div>
                </div>
                <img class="ui tiny image" data-dz-thumbnail>
            </div>
            <div class="extra content">
                <span class="left floated" data-dz-name></span>
            </div>
            <div class="ui bottom indicating attached progress" data-percent="0">
                <div class="bar" data-dz-uploadprogress ></div>
            </div>
        </div>`;
    },
    uploadBufferEditor:{
        _ini:function(data){
            var id = data;
            var tablesContent =``;
            for(var fileType in uploadBuffers[id]){
                //var files = uploadBuffers[id][fileType];
                tablesContent += `
                    <div class="ui segment">
                        <div class="ui fluid selectable accordion">
                            <div class="title">
                                <h5>${_FILETYPE.general.name.en(fileType)}</h5>
                                <div class="ui divider"></div>
                            </div>
                            <div class="content" id="UpdBuffEditor-${id}-${fileType}"></div>
                        </div>
                    </div>
                `;
                //${UploadAareUI.FileTypes.genUIFunction.table({id:id,type:fileType,files:files})}
            }
            var output = `
            <div class="ui longer modal updBufferList" id="UpdBuffEditor-${id}">
                <div class="header">Upload Buffer List</div>
                <div class="scrolling content">
                    ${tablesContent}
                </div>
                <div class="actions">
                    <div class="ui cancel button" onclick="UploadCtrl.EventListener.bufferClose()">Close</div>
                    <div class="ui red  button removeall" onclick="UploadCtrl.EventListener.bufferRemove('${id}')"><i class="trash icon"></i>Remove All</div>
                    <div class="ui blue button uploadall" onclick="UploadCtrl.EventListener.bufferUpload('${id}')"><i class="cloud upload icon"></i>Upload All</div>
                </div>
            </div>`;
            return output;
        },
        sideBtns:{
            groupEdit:`<div class="ui mini icon blue button" onclick="UploadCtrl.UploadBuffList.EventListener.groupedit(this)"><i class="icon edit"></i></div>`
        },
        uploadBufferEditorGroupEditUI:{
            _ini:function(data){
                var id = data.id;
                var type = data.type;
                var name = (fs.isEmpty(_FILETYPE[type]))?_FILETYPE.general.name.en(type):_FILETYPE[type].name.en;
                var output = `
                    <div class="ui longer modal updBufferListGroupEditor" id="UpdBuffEditor-GroupEditor-${id}-${type}">
                        <div class="header">Upload Buffer Editor (for ${name})</div>
                        <div class="scrolling content"></div>
                        <div class="actions">
                            <div class="ui primary button" onclick="UploadCtrl.UploadBuffList.GroupEdit.EventListener.submit(this)">Submit</div>
                            <div class="ui red  button" onclick="UploadCtrl.UploadBuffList.GroupEdit.EventListener.back(this)">Cancel</div>
                        </div>
                    </div>
                `;
                return output;
            },
            _content:function(data){
                var title = data.title;
                var render = data.render();
                var output = `<div class="ui form"><div class="field"><label>${title}</label></div></div>${render}`;
                return output;
            }            
        }

    },
    feedbackUI:{
        success:function(){ return `<i class="check circle outline green huge icon"></i>`; }
    }
}
const SelectAreaUI = {
    _ini:function(){
        return `<div class="selectarea"></div>`;
    }
}
const LoaderUI={
    _ini:function(data){
        var id = data;
        var output = `<div class="ui active inverted dimmer loadui">
            <div class="ui mini text loader">Loading</div>
        </div>`;
        $("#"+id).append(output);
    },
    loaded:function(data){
        var id = data;
        $("#"+id+" .ui.active.loadui").remove();
    }
}
/***********************************Pages UI*************************************/
const PageUI = {
    _ini:function(){
        //var output = `<div class="pusher"></div>`;
        var output = `<div id="body_main"></div>`;
        return output;
    }
}

const LoginUI={
    _ini:function(){
        var output = `
        <div class="ui middle aligned center aligned grid" id="login">
            <div class="column">
                <div class="ui secondary image header">
                    <h1>${_SERNAME}</h1>
                    <h3> Log-in to your account </h3>
                </div>
                <form class="ui large form">
                    <div class="ui stacked segment">
                        <div class="field">
                        <div class="ui left icon input">
                            <i class="user icon"></i>
                            <input type="text" name="username" placeholder="User Name/ID/E-mail">
                        </div>
                        </div>
                        <div class="field">
                        <div class="ui left icon input">
                            <i class="lock icon"></i>
                            <input type="password" name="password" placeholder="Password">
                        </div>
                        </div>
                        <div class="ui fluid large secondary submit button" onclick="LoginCtrl.EventListener.login()">Login</div>
                    </div>

                    <div class="ui error message"></div>

                </form>

                <div class="ui message">
                    <div class="ui tiny images">
                        <img class="ui image" src="asserts/system/login/HKAA.png">
                        <img class="ui image" src="asserts/system/login/AFCD.png">
                        <img class="ui image" src="asserts/system/login/CVL.png">
                        <img class="ui image" src="asserts/system/login/CityU.png">
                        <img class="ui image" src="asserts/system/login/OPC.png">
                        <img class="ui image" src="asserts/system/login/OPCFHK.png">
                        <img class="ui image" src="asserts/system/login/PurdueU.png">
                        <img class="ui image" src="asserts/system/login/TWC.png">
                        <img class="ui image" src="asserts/system/login/Zurich.png">
                    </div>
                </div>
            </div>
        </div>`;
        return output;
    }
}

const MenuUI = {
    topMenu:function(){
        var userName = user.authorization.username;
        var output = `
            <div class='ui top fixed inverted menu' id="top-menu">
                <div class='left menu'>
                    <a><div class="item" data-target="#side-menu" id="side-menu-button"><i class='icon sidebar'></i></div></a>
                    <a class="item header" href="index.html" target="_blank" onclick="MenuCtrl.dirTo('index')">${ _SERNAME }</a>
                </div>
                <div class='right menu'>
                    <a class='item'><div ><i class='icon bell'></i></div></a>
                    <div class='ui dropdown item' tabindex='0'>
                        <i class='icon user circle'></i>
                        <div class='menu' tabindex='-1'>
                            <div class='ui item'>${userName}</div>
                            <div class='ui item' onclick="UserCtrl.EventListener.profile()"><i class='icon info circle'></i> Profile</div>
                            <div class='ui item' onclick="UserCtrl.EventListener.settings()"><i class='icon wrench circle'></i> Settings</div>
                            <div class='ui item' onclick="UserCtrl.EventListener.logout()"><i class='icon sign-out circle'></i> Logout</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return output;
    },
    sideMenu:function(){
    var output = `<div class='ui sidebar inverted vertical menu sidebar-menu' id='side-menu'>
                    <div class='item'>
                        <div class='header' >General</div>
                        <div class='menu' >
                            <a class='item' onclick="MenuCtrl.dirTo('Dashboard')"><div><i class='icon tachometer alternate' ></i> Dashboard</div></a>
                            <a class='item' onclick="MenuCtrl.dirTo('MapView')"><div><i class='icon tachometer alternate' ></i> Map View</div></a>
                        </div>
                    </div>
                    <a class='item' onclick="MenuCtrl.dirTo('StrandingCases')"><div><i class='icon database' ></i> Stranding Cases</div></a>
                    <a class='item' onclick="MenuCtrl.dirTo('FilesManagement')"><div><i class='icon folder' ></i> Files Management</div></a>
                    <div class='item' >
                        <div class='header'>Administration</div>
                        <div class='menu' >
                            <a class='item' onclick="MenuCtrl.dirTo('Team')"><div><i class='icon users' ></i> Team</div></a>
                            ${ ( user.authorization.authlevel >= 999)?`<a class='item' onclick="MenuCtrl.dirTo('TeamPolicy')"><div><i class='icon cogs'></i> Policy Setting</div></a>`:"" }
                        </div>
                    </div>
                    <div class='item' >
                        <div class='header'>Other</div>
                        <div class='menu' >
                            <a class='item' onclick="MenuCtrl.dirTo('Messages')"><div><i class='icon envelope' ></i> Messages</div></a>
                            <a class='item' onclick="MenuCtrl.dirTo('Calendar')"><div><i class='icon calendar alternate' ></i> Calendar</div></a>
                        </div>
                    </div>
                </div>`;
        return output;
    }
}

const mapViewUI ={
    _ini:function(data){
        var output = `
            <div class="main-content map-view " id="main-content">
                <div class="leaflet map fullscreen" id="map-view"></div>
                <div class="detailArea" id="Simple-Detail">
                    <div class="ui attached buttons" id="HeadTools">
                        <div class="ui mini primary button" onclick="MapViewCtrl.EventListener.showDetail()">Detail</div>
                        <div class="ui mini grey button" onclick="MapViewCtrl.EventListener.closeDetail()">Close</div>
                    </div>
                </div>
                ${ (fs.isEmpty(data.showTable))?"":this._side(data)}
            </div>
        `;
        return output;
    },
    _side:function(data){
        var output = `
            <div class="ui segment side" id="map-view-side-content">
                <div class="sidecontent tablesearch" id="map-view-table-search">
                    ${ (fs.isEmpty(data.search))?"":this.side.search(data) }
                </div>
                <div class="sidecontent tablelist" id="map-view-table-list">
                    <div class="ui list"></div>
                    <div class="ui center aligned"><span>Not More Records</span></div>
                </div>
            </div>
        `;
        return output;
    },
    side:{
        search:function(data){
            /**
            <!--<button class="tiny ui icon button floated abs left"><i class="icon angle left"></i></button>
            <button class="tiny ui icon button floated abs right"><i class="icon angle right"></i></button>-->
            **/
            return `
            <div class="ui search" id="map-view-search-input">
                <div class="ui icon fluid input">
                    <input class="prompt" type="text" placeholder="Search..." onchange="MapViewCtrl.search.searchInput.EventListener.onChange(this)">
                    <i class="search icon"></i>
            </div>
            <div class="ui hori list" id="map-view-search-toggle-button-list">
              <div id="map-toggle-button-list">
                <div class="ui tiny toggle orange button selected" data-gp="BoatActivity" onclick="MapViewCtrl.search.searchGroup.EventListener.searchGroup(this)">Boat Activities</div>
                <div class="ui tiny toggle teal button selected"   data-gp="MarineMammal" onclick="MapViewCtrl.search.searchGroup.EventListener.searchGroup(this)">Marine Mammals</div>
              </div>
            </div>
            `;
        },
        items:{
            MarineMammal:function(data){
                var sid = data.sid;
                var sex = data.sex;
                var species = data.species;
                var ageClass = data.ageClass;
                var straDate = data.straDate;
                var output = `
                    <div class="ui fluid teal raised link card" onclick="MapViewCtrl.side.item.MarineMammal.EventListener.zoomTo('${sid}')">
                        <div class="content">
                            <div class="header">${sid}</div>
                            <div class="meta">
                                <span class="category">Marine Mammal</span>
                                ${ (!fs.isEmpty(sex))?`<span class="category">|${sex}</span>`:"" }
                                ${ (!fs.isEmpty(species))?`<span class="category">|${species}</span>`:"" }
                                ${ (!fs.isEmpty(ageClass))?`<span class="category">|${ageClass}</span>`:"" }
                            </div>
                        </div>
                        <div class="extra content">
                            <span class="left floated"><i class="calendar alternate outline icon"></i>${straDate}</span>
                            <span class="right floated" onclick="MapViewCtrl.side.item.MarineMammal.EventListener.detail('${sid}')"><i class="book icon"></i>Detail</span>
                        </div>
                    </div>
                `;
                return output;
            },
            BoatActivity:function(data){
                var date = data.date;
                var vessel = data.vessel;
                var surveyors = data.surveyors;
                var output = `
                    <div class="ui fluid orange raised link card" onclick="MapViewCtrl.side.item.BoatActivity.EventListener.zoomTo('${date}','${vessel}')">
                        <div class="content">
                            <div class="header">${vessel}</div>
                            <div class="meta">
                                <span class="category">Boat Activity</span>
                                ${ (!fs.isEmpty(surveyors))?`<span class="category">|${surveyors}</span>`:"" }
                            </div>
                        </div>
                        <div class="extra content">
                            <span class="left floated"><i class="calendar alternate outline icon"></i>${date}</span>
                            <span class="right floated" onclick="MapViewCtrl.side.item.BoatActivity.EventListener.detail('${date}','${vessel}')"><i class="book icon"></i>Detail</span>
                        </div>
                    </div>
                `;
                return output;
            }
        }
    }
}
const strandingCaseUI ={
    _ini:function(){
        var output = `
            <div class="main-content" id="main-content">
                <div class="ui grid padded nondraggable" id="headTitle">
                    <h1><i class="database icon"></i> Marine Mammal Cases</h1>
                </div>
                <div class="ui grid padded" id="searchTools">
                    <div class="ui fluid accordion">
                        <div class="title"><i class="icon dropdown "></i> Table Config Setting</div>
                        <div class="content">
                            <div class="field">
                                <label>Display Data Attribute</label>
                                ${ strandingCaseUI.auxiliary.dataTableListSelector() }
                            </div>
                        </div>
                    </div>
                </div>
                <div  class="ui grid padded" id="strandingcases"></div>
            </div>
        `;
        return output;
    },
    auxiliary:{
        dataTableListSelector:function(){
            var database = marineObj.getAttributesList();
            var output= `
                <div class="ui fluid multiple search selection dropdown" id="showsColumns">
                    <input type="hidden" name="showsColumns"><i class="dropdown icon"></i><div class="default text">Select Shows Columns</div>
                    <div class="menu">`;
            for(var table in database){
                output+= `<div class="header"><i class="table icon"></i>${ marineObj.getTableName({table:table}).en }</div><div class="divider"></div>`;
                for(var i in database[table]){
                    var col = database[table][i];
                    output+=`<div class="item" data-value="${table}^${ col }"><i class="hockey puck icon"></i>${ marineObj.getColumnName({table:table,column:col}).en }</div>`;
                }
            }
            output+= `
                    </div>
                </div>`;
            return output;
        },
        sideBtns:{
            new:function(data = null){
                return `<div class="ui mini icon green button" onclick="StrandingCasesCtrl.EventListener.new()"><i class="icon plus square"></i></div>`;
            },
            edit:function(data){
                return `<div class="ui mini icon blue button" onclick="StrandingCasesCtrl.EventListener.edit('${data}')"><i class="icon edit"></i></div>`;
            },
            delete:function(data){
                return `<div class="ui mini icon red button" onclick="StrandingCasesCtrl.EventListener.delete('${data}')"><i class="icon trash"></i></div>`;
            },
            detail:function(data){
                return `<div class="ui mini icon olive button" onclick="StrandingCasesCtrl.EventListener.detail('${data}')"><i class="icon eye"></i></div>`;
            }
        }
    }
}
const fileManagementUI ={
    _ini:function(data){
        //var hasSearch=(!fs.isEmpty(data.search));
        var isPageView=(!fs.isEmpty(data.pageview));
        var output = `
            ${ (isPageView)?`<div class="main-content fileManagement" id="main-content">`:``}
                <div class="ui divided grid fmComponent" data-id="${data.id}" id="${FileManagementCtrl.defID}-${data.id}">
                    <div class="row">
                        ${ fileManagementUI.side._ini(data) }
                        ${ fileManagementUI.main._ini(data) }
                    </div>
                </div>
            ${ (isPageView)?`</div>`:``}
        `;
        return output;
    },
    main:{
        _ini:function(data){
            var hasSide = (!fs.isEmpty(data.side));
            var hasSearch=(!fs.isEmpty(data.search));
            var output = `
                <div class="${ (hasSide)?" twelve":" sixteen" } wide column fm-main-screen">
                    ${(hasSearch)?fileManagementUI.main.search():``}
                    <div class="ui basic segment fm-main-content-area">
                        <div class="fullscreen centerall"> No Data </div>
                    </div>
                </div>
            `;
            return output;
        },
        content:{
            header:function(data){
                var header = data;
                return `<div class="ui header dividing fm-main-content-area-header">${header}</div>`;
            },
            group:function(data){
                var content = data;
                var output = `<div class="ui group basic segment">${content}</div>`;
                return output;
            },
            divhead:function(data){
                var content = data;
                var output = `<div class="ui dividing header">${content}</div>`;
                return output;
            },
            subhead:function(data){
                var content = data;
                var output = `<div class="ui sub header">${content}</div>`;
                return output;
            },
            cards:function(data){
                var content = data;
                var output = `<div class="ui four cards">${content}</div>`;
                return output;
            },
            card:function(data){
                var filename = data.filename;
                var img      = data.img;//<img src="${img}">
                var path      = data.path;
                var size     = data.size;
                var updated_at = data.updated_at;
                var output = `
                    <div class="ui raised link card" data-name="${filename}" onclick="FileManagementCtrl.main.content.item.EventListener.onclick(this)">
                        <div class="image" style="background:url('${img}');"></div>
                        <div class="content">
                            <a href="${path}" class="description">${filename}</a>
                            <div class="meta"><a>${size}KB</a><span class="right floated">${updated_at}</span></div>
                        </div>
                    </div>
                `;
                return output;
            }

        },
        search:function(){
            var output =`
                <div class="ui basic divided segment fm-main-search-area">
                    <div class="ui fluid large transparent left icon input">
                    <input type="text" placeholder="Search..." onchange="FileManagementCtrl.main.search.EventListener.onchange(this)">
                    <i class="search icon"></i>
                    </div>
                </div>
            `;
            return output;
        }
    },
    side:{
        _ini:function(data){
            var hasSide = (!fs.isEmpty(data.side));
            var hasUpload=(!fs.isEmpty(data.upload));
            var output = `
                <div class="four wide column fm-side-bar" style="${(hasSide)?``:`display:none;`}">
                    ${ (hasUpload)?fileManagementUI.side.uploadArea(data):"" }
                    ${ fileManagementUI.side.fileTypeSelector(data)}
                </div>`;
            return output;
        },
        uploadArea:function(data){
            var output = `<div class="fm-upload-area" id="fmUploadArea${data.id}"></div>`;
            return output;
        },
        fileTypeSelector:function(data){
            var hasUpload=(!fs.isEmpty(data.upload));
            var output =`
            <div class="${(hasUpload)?"":"fullHeight"} fm-file-type-select">
              <div class="group ui basic segment">
                <div class="ui tiny header">Files</div>
                <h5 class="ui header cursor" data-type="all" onclick="FileManagementCtrl.side.fileTypeSelector.EventListener.shows(this)"><i class="icon folder outline"></i>All Files</h5>
                <!--<h5 class="ui header cursor"  data-type="del" onclick="FileManagementCtrl.side.fileTypeSelector.EventListener.shows(this)"><i class="icon trash alternate outline"></i>Deleted Files</h5>-->
                <h5 class="ui header cursor" data-type="own" onclick="FileManagementCtrl.side.fileTypeSelector.EventListener.shows(this)"><i class="icon user outline"></i>Own Files</h5>
                <h5 class="ui header cursor" data-type="tmp" onclick="FileManagementCtrl.side.fileTypeSelector.EventListener.shows(this)"><i class="icon cubes"></i>Temp Files</h5>
              </div>
              
              <div class="group ui basic segment">
                <div class="ui tiny header">File Types</div>
                <h4 class="ui header cursor" data-type="doc" onclick="FileManagementCtrl.side.fileTypeSelector.EventListener.shows(this)"><i class="icon file outline"></i>Documents</h4>
                <h4 class="ui header cursor" data-type="img" onclick="FileManagementCtrl.side.fileTypeSelector.EventListener.shows(this)"><i class="icon file image outline"></i>Images</h4>
                <h4 class="ui header cursor" data-type="vdo" onclick="FileManagementCtrl.side.fileTypeSelector.EventListener.shows(this)"><i class="icon file video outline"></i>Videos</h4>
                <h4 class="ui header cursor" data-type="dic" onclick="FileManagementCtrl.side.fileTypeSelector.EventListener.shows(this)"><i class="icon save outline"></i>Dicoms</h4>
                <h4 class="ui header cursor" data-type="zip" onclick="FileManagementCtrl.side.fileTypeSelector.EventListener.shows(this)"><i class="icon file archive outline"></i>Zip Files</h4>
                <h4 class="ui header cursor" data-type="oth" onclick="FileManagementCtrl.side.fileTypeSelector.EventListener.shows(this)"><i class="icon file outline"></i>Other</h4>
              </div>
            </div>
            `;
            return output;
        }
    }
}

/****************************Special Functions UI********************************/
const ReportFormUI={
    reportTypeForm:function(){
        var ReportTypeList = [
            {   
                type:"stat",name:"Statistic",
                content:[
                    { type:"stat",name:"Statistic",img:"statistic.JPG"}
                ]
            },{   
                type:"chart",name:"Charts",
                content:[
                    { type:"lb",name:"Bar or Line Chart",img:"MixBarLine.JPG"},
                    { type:"sc",name:"Bubble or Scatter Chart",img:"Bubble.JPG"},
                    { type:"pd",name:"Pie or Doughnut Chart",img:"Pie.JPG"}
                ]
            }
        ];
        var tempOutput = "";
        for(var i=0; i<ReportTypeList.length;i++){
            var header = ReportTypeList[i].name;
            var content= ReportTypeList[i].content;
            tempOutput+= `  <h3 class="ui dividing header">${header}</h3>
                            <div class="sixteen wide stretched column">`;
            for(var j=0;j<content.length;j++){
                var type = content[j].type;var name = content[j].name;var img  = content[j].img;
                tempOutput+=    `<div class="ui small bordered image cursor pointer" onclick="ReportFormCtrl.reportTypeForm.EventListener.select('${type}')">
                                    <svg width="150" height="150"><image xlink:href="./asserts/system/modal/newreport/${img}" x="0" y="0" width="100%" height="100%"></image></svg>
                                    <div class="text center aligned">${name}</div>
                                </div>`;
            }
            tempOutput+= `</div>`;
        }
        var output = `
            <div class="ui fullscreen coupled modal custForm" id="reportTypeForm">
                <div class="ui header">
                    New Report/Chart
                    <div class="sub header">Select Type</div>
                </div>
                <div class="ui padded grid">
                    <div class="sixteen wide stretched column">${tempOutput}</div>
                </div>
                <div class="actions"><div class="ui cancel button" onclick="ReportFormCtrl.reportTypeForm.EventListener.cancel()">Cancel</div></div>
            </div>
        `;
        return output;
    },
    reportConfigsForm:{
        _ini:function(data){
            var type = data;
            var output = `
                <div class="ui fullscreen coupled large modal" id="reportConfigsForm">
                    <div class="ui header">New Report/Chart<div class="sub header">Data and Config Setting</div></div>
                    <div class="ui padded contents grid">
                        <div class="ten wide computer eight wide tablet sixteen wide mobile column scrolling content center middle aligned ui" id="reportPreview">
                            ${ this.FormItems.preview._ini() }
                        </div>
                        <div class="six wide computer eight wide tablet sixteen wide mobile column scrolling content ui" id="reportConfigForm">
                            <form class="ui form">${ this.FormItems.configs._ini(type) }</form>
                        </div>
                    </div>
                    <div class="actions">
                        <div class="ui cancel button" onClick="ReportFormCtrl.reportConfigsForm.Event.cancel()">Cancel</div>
                        <div class="ui labeled icon button secondary" onClick="ReportFormCtrl.reportConfigsForm.Event.back()"><i class="left arrow icon"></i>Back</div>
                        <div class="ui button primary" onClick="ReportFormCtrl.reportConfigsForm.Event.submit()">Submit</div>
                    </div>
                </div>
            `;
            return output;
        },
        FormItems:{
            preview:{
                _ini:function(){
                    return `<a class="ui label" onclick="ReportFormCtrl.reportConfigsForm.Event.preview._refresh()"><i class="sync alternate icon" ></i>Refresh</a>`;
                }
            },
            configs:{
                _ini:function(data){
                    var output = `
                        <div class="ui accordion ">${ ReportFormUI.reportConfigsForm.FormItems.configs.general._ini(data) }</div>
                        <div class="ui divider"></div>
                        <div class="ui accordion ">
                            ${ ReportFormUI.reportConfigsForm.FormItems.configs.data._ini(data) }
                        </div>
                    `;
                    return output;
                },
                general:{
                    _ini:function(data){
                        var output = `
                            <div class="title active"><div class="ui header">General Setting</div></div>
                            <div class="content active">
                                <div class="field"><label>Title</label><input type="text" name="general[title]" placeholder="Title"></div>
                                <div class="field"><label>Grid Size (Max 4, Min 1)</label><input type="number" name="general[size]" value="4" placeholder="Grid Size (1-4)" min="1" max="4"></div>
                            `;
                            switch(data){
                                case "stat":
                                    output+=ReportFormUI.reportConfigsForm.FormItems.configs.general.stat();break;
                                case "lb":case "sc":case "pd":
                                    output+=ReportFormUI.reportConfigsForm.FormItems.configs.general.lb();break;
                            }
                            output +=`</div>`;
                        return output;
                    },
                    stat:function(){
                        var tempOutput = {};
                        tempOutput["colors"] = `<div class="item" data-value="primary"><a class="ui primary empty circular label"></a>Primary</div>`;
                        for(var i = 0; i<COLORSARRAY.length;i++){
                            tempOutput["colors"] += `<div class="item" data-value="${COLORSARRAY[i].val}"><a class="ui ${COLORSARRAY[i].val} empty circular label"></a> ${ COLORSARRAY[i].name }</div>`;
                        }
                        var output = `
                            <div class="title"><i class="dropdown icon"></i>Options</div>
                            <div class="content">
                                <div class="inline field">
                                    <label>Color Tone</label>
                                    <div class="ui fluid search selection dropdown" id="general[color]">
                                        <input type="hidden" name="general[color]"><i class="dropdown icon"></i>
                                        <div class="default text">Select Color Tone</div>
                                        <div class="menu">${tempOutput["colors"]}</div>
                                    </div>
                                </div>
                                <div class="inline field">
                                    <div class="ui checkbox">
                                        <input type="checkbox" checked name="general[showDetail]" tabindex="0" class="hidden">
                                        <label>Shows Detail</label>
                                    </div>
                                </div>
                                <div class="inline field">
                                    <div class="ui checkbox">
                                        <input type="checkbox" checked name="general[center]" tabindex="0" class="hidden">
                                        <label>Center Aligned</label>
                                    </div>
                                </div>
                                <div class="inline field">
                                    <div class="ui checkbox">
                                        <input type="checkbox" name="general[draggable]" tabindex="0" class="hidden">
                                        <label>Drag Allowed</label>
                                    </div>
                                </div>
                            </div>
                        `;
                        return output;
                    },
                    lb  :function(){
                        var tempOutput = {};
                        tempOutput["colors"] = "";
                        for(var key in COLOR_TONE){
                            var temp = "";
                            for(var c in COLOR_TONE[key].set ){
                                temp +=`<a class="ui label" style="background-color:${COLOR_TONE[key].set[c]};"></a>`;
                            }
                            tempOutput["colors"]+=`
                                <div class="item fields" data-value="${key}">
                                    <div class="ui field labels">${temp}</div>
                                    <div class="ui field">${ COLOR_TONE[key].name }</div>
                                </div>`;
                        }
                        var output = `
                            <div class="title"><i class="dropdown icon"></i>Options</div>
                            <div class="content">
                                <div class="inline field">
                                    <label>Color Tone</label>
                                    <div class="ui fluid search selection dropdown">
                                        <input type="hidden" name="general[color]"><i class="dropdown icon"></i>
                                        <div class="default text">Select Color Tone</div>
                                        <div class="menu">${tempOutput["colors"]}</div>
                                    </div>
                                </div>
                                <div class="inline field">
                                    <div class="ui checkbox">
                                        <input type="checkbox" checked name="general[center]" tabindex="0" class="hidden">
                                        <label>Center Aligned</label>
                                    </div>
                                </div>
                                <div class="inline field">
                                    <div class="ui checkbox">
                                        <input type="checkbox" name="general[draggable]" tabindex="0" class="hidden">
                                        <label>Drag Allowed</label>
                                    </div>
                                </div>
                            </div>
                        `;
                        return output;
                    }
                },
                data:{
                    _ini:function(data){
                        //<div class="ui inverted relaxed divided list" id="DataSetList">No Data</div>
                        var output = `
                        <div class="title"><div class="ui header">Data</div></div>
                        <div class="content">
                            <div class="ui inverted segment">
                                <div class="ui inverted relaxed divided list" id="DataSetList">No Data Selected</div>
                            </div>
                            <div class="ui teal button fluid" onclick="ReportFormCtrl.reportConfigsForm.Event.dataset.edit('${data}')">Edit</div>
                        </div>`;
                        return output;
                    },
                    list:function(data){
                        var output = ``;
                        for(d in data){
                            output +=`<div class="item">`;
                            output +=`  <div class="header">${ data[d].main.table }.${data[d].main.column} </div>`;
                            if(data[d].sub.length>0){
                                output += `<div class="ui fitted divider"></div>
                                            <div class="list divided">`;
                                for(subd in data[d].sub){
                                    output+=`<div class="item"><div class="header">${ data[d].sub[subd].table}.${  data[d].sub[subd].column}</div></div>`;
                                }
                                output +=`</div>`;
                            }
                            output +=`</div>`;
                        }
                        return output;
                    }

                }
            }
        }
    },
    reportDataSetForm:{
        _ini:function(data){
            var conf = {
                id:0,
                type:data
            }
            var output = `
                <div class="ui fullscreen coupled modal" id="reportDataSetForm">
                    <div class="ui header">Data Set<div class="sub header"> </div></div>
                    <div class="ui padded contents grid">
                        <div class="sixteen wide computer sixteen wide tablet sixteen wide mobile column scrolling content ui">
                        <div class="ui list" id="mainDataSetList">
                            ${ this.main(conf) }
                        </div>
                        ${ (data=="stat")?``:`
                        <div class="sixteen wide computer sixteen wide tablet sixteen wide mobile column scrolling content ui">
                            <div class="ui fluid button teal " onclick="ReportFormCtrl.reportDataSetForm.EventListener.add.maindata('${data}')">Add Data Set</div>
                        </div>
                        ` }
                    </div>
                    <div class="actions">
                        <div class="ui cancel button" onclick="ReportFormCtrl.reportDataSetForm.EventListener.cancel()">Cancel</div>
                        <div class="ui button secondary " onclick="ReportFormCtrl.reportDataSetForm.EventListener.submit()">Submit</div>
                    </div>
                </div>`;
            return output;
        },
        main:function(data){
            var id = data.id;var title = `<a onclick="ReportFormCtrl.reportDataSetForm.EventListener.delete.maindata('maindata-${id}')"><i class="close icon"></i></a> Main Data ${id}`;
            var graphType  = data.type;
            var output = ` <div class="ui segment maindata" id="maindata-${id}">
                                <div class="ui form">
                                    <div class="field m-data">
                                        <div class="field norm-conf">
                                            ${ this.attrSelector({id:id,title:title}) }
                                            <div class="inline field">
                                                <div class="ui checkbox">
                                                    <input type="checkbox" name="general[groupsdata]-${id}" tabindex="0" class="hidden">
                                                    <label>Groups Data</label>
                                                </div>
                                            </div>
                                            ${ this.getGraphTypeOptions({id:id,type:graphType}) }
                                            <div class="ui accordion">
                                                <div class="title"><i class="dropdown icon"></i>Option</div>
                                                <div class="content"></div>
                                            </div>
                                        </div>
                                        <div class="field rule-conf">
                                            ${ this.attrRules({id:id})}
                                        </div>
                                    </div>
                                    ${ (graphType=="stat")?``:`
                                    <div class="ui segment s-data" id="subDataList-${id}">
                                        <div class="ui button fluid secondary" onclick="ReportFormCtrl.reportDataSetForm.subset.EventListener.addSubset({id:'${id}',type:'${graphType}'})">Add Sub Data Set</div>
                                    </div>
                                    ` }
                                </div>
                            </div>`;
            return output;
        },
        sub:function(data){
            var id = data.id;var sid = data.sid;var title = `<a onclick="ReportFormCtrl.reportDataSetForm.EventListener.delete.subdata([${id},${sid}])"><i class="close icon"></i></a>Sub Data #${sid}`;
            var graphType  = data.type;
            var output = ` <div class="ui segment subdata" id="subdata-${id}-${sid}">
                                <div class="ui form">
                                    <div class="field m-data">
                                        <div class="field norm-conf">
                                            ${ this.attrSelector({id:id+"-"+sid,title:title}) }
                                            <div class="inline field">
                                                <div class="ui checkbox">
                                                    <input type="checkbox" name="general[groupsdata]-${id}-${sid}" tabindex="0" class="hidden">
                                                    <label>Groups Sub Data</label>
                                                </div>
                                            </div>
                                            ${ this.getGraphTypeOptions({id:id+"-"+sid,type:graphType}) }
                                            <div class="ui accordion">
                                                <div class="title"><i class="dropdown icon"></i>Option</div>
                                                <div class="content"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
            return output;
        },
        getGraphTypeOptions:function(data){
            var id  = data.id;
            var type= data.type;
            var output = "";
            switch(type){
                case "stat":
                    output = ``;
                    break;
                case "lb":
                    output = `
                        <div class="inline fields visible" style="display: flex !important;">
                            <label>Graph Type:</label>
                            <div class="field">
                                <div class="ui radio checkbox" id="general[graphType]-${id}">
                                    <input type="radio" name="general[graphType]-${id}" value="line" checked="" tabindex="0" class="hidden">
                                    <label>Line</label>
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui radio checkbox" id="general[graphType]-${id}">
                                    <input type="radio" name="general[graphType]-${id}" value="bar" checked="" tabindex="0" class="hidden">
                                    <label>Bar</label>
                                </div>
                            </div>
                        </div>
                    `;
                    break;
                case "sc":
                    output = `
                        <div class="inline fields visible" style="display: flex !important;">
                            <label>Graph Type:</label>
                            <div class="field">
                                <div class="ui radio checkbox" id="general[graphType]-${id}">
                                    <input type="radio" name="general[graphType]-${id}" value="bubble" checked="" tabindex="0" class="hidden">
                                    <label>Bubble</label>
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui radio checkbox" id="general[graphType]-${id}">
                                    <input type="radio" name="general[graphType]-${id}" value="scatter" checked="" tabindex="0" class="hidden">
                                    <label>Scatter</label>
                                </div>
                            </div>
                        </div>
                    `;
                    break;
                case "pd":
                    output = `
                        <div class="inline fields visible" style="display: flex !important;">
                            <label>Graph Type:</label>
                            <div class="field">
                                <div class="ui radio checkbox" id="general[graphType]-${id}">
                                    <input type="radio" name="general[graphType]-${id}" value="pie" checked="" tabindex="0" class="hidden">
                                    <label>Pie</label>
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui radio checkbox" id="general[graphType]-${id}">
                                    <input type="radio" name="general[graphType]-${id}" value="doughnut" checked="" tabindex="0" class="hidden">
                                    <label>Doughnut</label>
                                </div>
                            </div>
                        </div>
                    `;
                    break;
            }
            return output;
        },
        getDataBaseAttrSelectOptions:function(){
            var tempOutput = "";
            for(var i=0;i<dbCol.length;i++){
                if(i>=1){ tempOutput+=`<div class="divider"></div>`; }
                tempOutput += `<div class="header"><i class="icon table"></i>${dbCol[i].table}</div>`;
                for(var j=0;j<dbCol[i].columns.length;j++){
                    tempOutput += `<div class="item" data-value="['${dbCol[i].columns[j].COLUMN_NAME}','${dbCol[i].columns[j].TABLE_NAME}','${dbCol[i].columns[j].DATA_TYPE}','${dbCol[i].columns[j].COLUMN_KEY}','${dbCol[i].columns[j].IS_NULLABLE}']">
                        ${dbCol[i].columns[j].TABLE_NAME}.${dbCol[i].columns[j].COLUMN_NAME}
                        <div class="ui label">${ IntegatedUI.attrType(dbCol[i].columns[j].DATA_TYPE) }</div>
                    </div>`;
                }
            }
            return tempOutput;
        },
        attrSelector:function(data){
            var id= data.id;var title=data.title;
            var tempOutput = this.getDataBaseAttrSelectOptions();
            var output = `
                <div class="field">
                    <label>${title}</label>
                    <div class="ui fluid selection dropdown search" id="dbselector-${id}">
                        <input type="hidden" name="dbselector-${id}">
                        <div class="default text">Select Data</div>
                        <i class="dropdown icon"></i>
                        <div class="menu">${ tempOutput }</div>
                    </div>
                </div>
            `;
            return output;
        },
        attrPresentMethod:function(data){
            var type = IntegatedUI.attrType(data.attrType);
            var id = data.id;
            var optType = [
                {name:"Count",val:"COUNT"},
                {name:"Maximum",val:"MAX"},{name:"Minimum",val:"MIN"},
                {name:"Average",val:"AVG"},{name:"Summary",val:"SUM"},
            ]
            var options = [];
            switch(type){
                case _STRING:case _LONGSTR:case _DATETIME: options = [0];break;
                case _NUMBER: options = [1,2,3,4];break;
                default: options = [0,1,2,3,4];break;
            }
            var tempOutput = "";
            for(var i=0;i<options.length;i++){
                tempOutput+= `  <div class="field">
                                    <div class="ui radio checkbox">
                                        <input type="radio" name="presentType-${id}" value="${ optType[i].val }" ${ (i==0)?`checked=""`:"" } tabindex="0" class="hidden">
                                        <label>${ optType[i].name }</label>
                                    </div>
                                </div>`;
            }
            var output = `
                <div class="inline fields" id="presentType-${id}">
                    <label for="pTypeMain">Select Present Method of Dataset:</label>
                    ${tempOutput}
                </div>
            `;
            return output;
        },
        attrGroups:function(data){
            var type = IntegatedUI.attrType(data.attrType);
            var id = data.id;
            var output = "";
            var tempOutput = "";
            switch(type){
                case _STRING:case _LONGSTR:
                    var options = [];
                    var contents = {
                            exClasses:{
                                multiple:true,
                                search:true
                            },
                            title:"Data sets",
                            id:`dataset-${id}`,
                            name    : `dataset-${id}` ,
                            placeholder: "Empty if select all sets",
                            options : options
                        }
                        tempOutput = FormUI.select(contents);
                        output = tempOutput;
                        break;
                case _DATETIME:
                    var options = [
                            {title:"Each Year" ,val:"yy",contents:[{type:"text",value:"Each Year"}]},
                            {title:"Each Month",val:"mm",contents:[{type:"text",value:"Each Month"}]},
                            {title:"Each Day"  ,val:"dd",contents:[{type:"text",value:"Each Day"}]}
                        ]
                    var conf = {
                            exClasses:{
                                search:true
                            },
                            id:"dataset-"+id,
                            title: "Show By",
                            placeholder:"Show By",
                            name: "showby",
                            options:options
                        }
                        tempOutput  = FormUI.select(conf);
                        output = `
                            <div class="field">
                                ${tempOutput}
                            </div>
                        `;
                        break;
                case _NUMBER:default:
                    tempOutput += "";
                    output = ``;
                    break;
            }
            return output;
        },
        attrRules:function(data){
            var operators = {
                "=" :"Equals to",
                "!=":"Not Equals to",
                ">=":"Equals or Large than",
                "<=":"Equals or Less than",
                ">" :"Large than",
                "<" :"Less than",
                "BETWEEN" :"Between",
                "NOT BETWEEN" :"Not Between",
                "LIKE" :"Like",
                "NOT LIKE" :"Not Like",
                "IN" :"In",
                "NOT IN" :"Not In",
            }
            var id = "rules-"+data.id;
            var tempOutput = this.getDataBaseAttrSelectOptions();
            var output = `
                <div class="field" id="${id}">
                    <label>Rules</label>
                    <div class="ui segment">
                        <div class="fields">
                            <div class="four wide field">
                                <label>Rules Data</label>
                                <div class="ui fluid selection dropdown search" id="dbselector-${id}">
                                    <input type="hidden" name="dbselector-${id}">
                                    <div class="default text">Select Data</div>
                                    <i class="dropdown icon"></i>
                                    <div class="menu">${ tempOutput }</div>
                                </div>
                            </div>`;
                tempOutput = "";
                for(var key in operators){
                        tempOutput += `<div class="item" data-value="${key}">${operators[key]}</div>`;
                }
                output+= `
                            <div class="four wide field">
                                <label>Operator</label>
                                <div class="ui fluid selection dropdown search" id="operatorSelector-${id}">
                                    <input type="hidden" name="operatorSelector-${id}">
                                    <div class="default text">Operator</div>
                                    <i class="dropdown icon"></i>
                                    <div class="menu">${ tempOutput }</div>
                                </div>
                            </div>`;
                    
                output+= `
                            <div class="six wide field" id="rulesParas-${id}">
                                <label>Parameter</label>
                                <input type="text" class="rulesParas" name="parameter_${id}" placeholder="Enter the target characters">
                            </div>
                `;
                output+= `
                                <div class="two wide field">
                                    <label>Action</label>
                                    <div class="ui positive button fluid" onclick="ReportFormCtrl.reportDataSetForm.attrRules.EventListener.addRule('${id}')">Add</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ui divided selection list" id="rulesList-${id}"></div>
                </div>
                `;
            return output;
        },
        rulePara:function(data){
            var id = data.id;
            var type = IntegatedUI.attrType(data.attrType);
            var operator = IntegatedUI.operType(data.operator);
            switch(type){
                case _NUMBER:
                    switch(operator){
                        case _SINGEL:
                            return `<input type="number" class="rulesParas" name="parameter_${id}" placeholder="Enter number">`;
                        case _BETWEEN:
                            return `
                                <div class="two fields rulesParas">
                                    <div class="field">
                                        <input type="number" name="parameter_${id}_a" placeholder="Min Number">
                                    </div>
                                    <div class="field">
                                        <input type="number" name="parameter_${id}_b" placeholder="Max Number">
                                    </div>
                                </div>
                            `;
                        case _MULTI:
                            return `
                                <div class="ui fluid search multiple selection dropdown rulesParas" id="parameter_${id}">
                                    <input name="parameter_${id}" type="hidden">
                                    <i class="dropdown icon"></i>
                                    <div class="default text">Enter the parameters</div>
                                    <div class="menu"></div>
                                </div>
                            `;
                        default:
                            return `<input type="number"  class="rulesParas" name="parameter_${id}" placeholder="Enter number">`;
                    }
                case _STRING:case _LONGSTR:
                    switch(operator){
                        case _SINGEL:
                            return `<input type="text"  class="rulesParas" name="parameter_${id}" placeholder="Enter the target characters">`;
                        case _BETWEEN:
                            return `
                                <div class="two fields rulesParas">
                                    <div class="field">
                                        <input type="text" name="parameter_${id}_a" placeholder="From Parameter A">
                                    </div>
                                    <div class="field">
                                        <input type="text" name="parameter_${id}_b" placeholder="To Parameter B">
                                    </div>
                                </div>
                            `;
                        case _MULTI:
                            return `
                                <div class="ui fluid search multiple selection dropdown rulesParas" id="parameter_${id}">
                                    <input name="parameter_${id}" type="hidden">
                                    <i class="dropdown icon"></i>
                                    <div class="default text">Enter the parameters</div>
                                    <div class="menu"></div>
                                </div>
                            `;
                    }
                    break;
                case _DATETIME:
                    switch(operator){
                        case _SINGEL:case _MULTI:
                            var conf = {
                                id : `parameter_${id}`,
                                placeholder:"Date"
                            }
                            return `<div class="rulesParas">${FormUI.calendar(conf)}</div>`;
                        case _BETWEEN:
                            var conf1 = {
                                id : `parameter_${id}_a`,
                                placeholder:"Start Date"
                            }
                            var conf2 = {
                                id : `parameter_${id}_b`,
                                placeholder:"End Date"
                            }
                            return `
                                <div class="two fields rulesParas">
                                    ${ FormUI.calendar(conf1) }
                                    ${ FormUI.calendar(conf2) }
                                </div>
                            `;
                    }
                    break;
            }
            return "";
        },
        para:function(data){
            var id = data.id;
            var targetAttr = data.attr[0]+"."+data.attr[1];
            var targetOper = data.oper;
            var targetParas= data.paras;
            var tempParasOutput = "";
            for(var i = 0;i<targetParas.length;i++){
                if(i>0){ tempParasOutput+=`<div class="ui yellow label conn">AND</div>`; }
                tempParasOutput +=`<div class="ui primary label para">${targetParas[i]}</div>`;
            }
            var output = "";
            output = `
                <a class=" item" id="paras-${id}">
                    <i class="close icon middle aligned" onclick="ReportFormCtrl.reportDataSetForm.para.del('${id}')"></i>
                    <div class="content">
                        <div class="ui teal label attr">${targetAttr}</div>
                        <div class="ui orange label oper">${targetOper}</div>
                        ${ tempParasOutput }
                    </div>
                </a>
            `;
            return output; 
        }
    }
}

const DetailViewUI = {
    size:{
        0:SIZE[16],1:SIZE[4],2:SIZE[8],3:SIZE[12],4:SIZE[16]
    },
    _ini:function(data){
        var type = data.type;
        var modal = fs.isEmpty(data.modal)?"":"ui large modal ";
        var size  = (type=="MarineMammal")?[` ${SIZE[8]} wide `,` ${SIZE[8]} wide `]:[` ${SIZE[12]} wide `,` ${SIZE[4]} wide`];
        var output =`
            <div class="${modal} detailView ${type}" data-type="${type}" id="${DetailViewCtrl.defID}">
                ${ fs.isEmpty(data.modal)?"":DetailViewUI.header[type] }
                <div class="content">
                    <div class="ui padded grid">
                        <div class="row">
                            ${ fs.isEmpty(data.modal)?`<div class="main column"></div>`:`<div class="main ${size[0]} column"></div>` }
                            ${ fs.isEmpty(data.modal)?"":`<div class="side ${size[1]} column"></div>` }
                        </div>
                    </div>
                </div>
            </div>
        `;
        return output;
    },
    header:{
        MarineMammal:`<div class="header">Marine Mammal Case Detail</div>`,
        BoatActivity:`<div class="header">Boat Activity Detail</div>`
    },
    group:{
        MarineMammal:function(data){ 
            var title = data.title;var en = data.en;var zh = data.zh;
            var output= `
                <div class="ui segments" data-dt-group="${title}" id="${DetailViewCtrl.defID}-MarineMammal-${title}">
                    <div class="ui horizontal basic segments"><div class="header">${en}<span class="sub">${zh}</span></div></div>
                </div>
            `;
            return output;
        },
        BoatActivity:function(data){}
    },
    item:{
        MarineMammal:function(data){
            var en = data.en;var zh = data.zh;
            var val = data.val;
            var output = `
                <div class="ui basic segment">
                    <div class="header">${en} <span class="sub">${zh}</span></div>
                    <div class="content">${val}</div>
                </div>
            `;
            return output;
        },
        BoatActivity:function(data){}
    },
    side:{
        MarineMammal:{},
        BoatActivity:{}
    }

}
const EditorUI = {
    size:{
        0:SIZE[16],1:SIZE[4],2:SIZE[8],3:SIZE[12],4:SIZE[16]
    },
    _ini:function(data){
        var MMType = data.type;
        var isEdit = data.isEdit;
        var sid = data.sid;
        var Type = marineObj._ini(MMType);
        if(Type == null){ return ""; }
        var output = `
        <div class="ui modal custForm caseEditor" id="${EditorCtrl.defID}">
            <div class="ui header">Marine Mammal Case Editor</div>
            <div class="ui padded grid">
                <div class="${this.size[3]} wide column left">
                    <div class="ui form">`;
        var formItems = Type.editor;
        for(var i in formItems){
            var en = (fs.isEmpty(formItems[i].display.table))?formItems[i].display.en:marineObj.attributes[formItems[i].display.table].info.display.en;
            var zh = (fs.isEmpty(formItems[i].display.table))?formItems[i].display.zh:marineObj.attributes[formItems[i].display.table].info.display.zh;
            var id = (fs.isEmpty(formItems[i].display.table))?formItems[i].display.en:(formItems[i].display.table);
            output+=`
                        <div class="ui accordion" id="${id}">
                            <div class="${ (i==0)?"active":"" } title"><h3>${ en } <span>${ zh }</span></h3></div>
                            <div class="${ (i==0)?"active":"" } content">
                                ${ this.contents(formItems[i]) }
                            </div>
                        </div>`;
        }
        output+=`
                    </div>
                </div>
                <div class="${this.size[1]} wide column right">${ this.navigator({attr:formItems,isEdit:isEdit,sid:sid}) }</div>
            </div>
        </div>`;
        return output;
    },
    component_ini:function(data){
        var showItems = data.showData;
        var id = data.id;
        var NormType = NormalType.editor;
        var output = `
            <div class="ui dividing header"><span class="ui text black small">Marine Mammal Case Editor</span></div>
            <div class="ui padded grid">
                <div class="${this.size[4]} wide column left">
                    <div class="ui mini form">`;
        for(var i in showItems){
            var group = showItems[i];
            var groupDisplay = NormType[i].display;
            var groupName = (fs.isEmpty(groupDisplay.table))?groupDisplay:marineObj.getTableName({table:groupDisplay.table});
            var gp_en = groupName.en, gp_zh = groupName.zh;
            output+=`
                        <div class="ui accordion" id="${i}">
                            <div class="${ (i==0)?"active":"" } title"><h3>${ gp_en } <span>${ gp_zh }</span></h3></div>
                            <div class="${ (i==0)?"active":"" } content">
                                ${ this.component_content({group:group,id:id}) }
                            </div>
                        </div>`;
        }
        output+=`
                    </div>
                    <button class="fluid teal ui button" onclick="EditorCtrl.EventListener.component.submit(this)">Submit</button>
                </div>
            </div>
        `;
        return output;
    },
    component_content:function(data){
        var output = "";var group = data.group;var id = data.id;
        for(var table in group){
            var tableName = marineObj.getTableName({table:table});
            output += `
            <div class="accordion">
                <div class="title"><h5><i class="icon info circle"></i>${ tableName.en } <span class="ui text gray mini">${ tableName.zh }</span></h5></div>
                <div class="content">
            `;
            for(var i in group[table]){
                var column = group[table][i];
                var col =  marineObj.attributes[table].columns[column];
                var param = {
                    table:table,
                    column:column,
                    id:id,
                    data:col
                };
                output+= `<div class="field">
                    ${ this.normCols(param) }
                </div>`;
                output += ``;
            }
            output += `
                </div>
            </div>`;
        }
        return output;
    },
    contents:function(formItem){
        var data = formItem.content;
        var output = ``;
        for(var i in data){
            if(data.length>1){
                var en = marineObj.attributes[data[i].table].info.display.en;
                var zh = marineObj.attributes[data[i].table].info.display.zh;
                var id = ((fs.isEmpty(formItem.display.table))?formItem.display.en:formItem.display.table)+"-"+data[i].table;
                output+=`
                <div class="accordion" id="${id}">
                    <div class="title"><h4><i class="icon info circle"></i>${ en } <span>${ zh }</span></h4></div>
                    <div class="content">
                `;
            }

             
            if(data[i].rows=="ALL"){
                var rows = marineObj.attributes[data[i].table].columns;
                var currSize = 0;
                for(var key in rows){
                    var col = rows[key];
                    var size = col.size;
                    if(currSize>=4||(currSize<4&&currSize>0&&(currSize+this.sizeCalc(col)>4))){ output+=`</div>`;currSize=0; }
                    if(currSize==0){ output+=`<div class="fields">`; }
                    currSize+=size;
                    var param = {
                        table:data[i].table,
                        column:key,
                        data:col
                    };
                    output+= `<div class="${this.size[size]} wide field">
                        ${ this.normCols(param) }
                    </div>`;
                }
                output+=`</div>`;
            }else{
                var table = data[i].table;
                var rows = data[i].rows;
                var optional = data[i].optional;
                for(var j in rows){
                    output+=`<div class="fields">`;
                    for(var k in rows[j]){
                        var cols=rows[j][k];
                        var col =  marineObj.attributes[table].columns[cols.col];
                        var size = cols.size;
                        var param = {
                            table:table,
                            column:cols.col,
                            data:col
                        };
                        output+= `<div class="${this.size[size]} wide field">
                        ${ this.normCols(param) }
                        </div>`;
                    }
                    output+=`</div>`;
                }
                output+=`
                <div class="accordion">
                    <div class="title"><i class="dropdown icon"></i>Optional</div>
                    <div class="content">
                `;
                for(var j in optional){
                    output+=`<div class="fields">`;
                    for(var k in optional[j]){
                        var cols=optional[j][k];
                        var col =  marineObj.attributes[table].columns[cols.col];
                        var size = cols.size;
                        var param = {
                            table:table,
                            column:cols.col,
                            data:col
                        };
                        output+= `<div class="${this.size[size]} wide field">
                            ${ this.normCols(param) }
                        </div>`;
                    }
                    output+=`</div>`;
                }
                output+=`</div></div>`;
            }
            
            if(data.length>1){ output+=`
                </div>
            </div>`; }
        }
        return output;
    },
    navigator:function(data){
        var attrs = data.attr;
        var isEdit= data.isEdit;
        var sid= data.sid;
        var output = `<ol class="ui link list">`;
        for(var i in attrs){
            var en = (fs.isEmpty(attrs[i].display.table))?attrs[i].display.en:marineObj.attributes[attrs[i].display.table].info.display.en;
            var zh = (fs.isEmpty(attrs[i].display.table))?attrs[i].display.zh:marineObj.attributes[attrs[i].display.table].info.display.zh;
            var id = (fs.isEmpty(attrs[i].display.table))?attrs[i].display.en:(attrs[i].display.table);
            output += `<li value="" onclick="EditorCtrl.EventListener.NavTo('${id}')" class="item"><div class="header">${en} </div></li>`;//<span>${zh}</span>
            if(attrs[i].content.length>1){
                output += `<ol>`;
                for(var j in attrs[i].content){
                    var _en = marineObj.attributes[attrs[i].content[j].table].info.display.en;
                    var _zh = marineObj.attributes[attrs[i].content[j].table].info.display.zh;
                    var _id = id+"-"+attrs[i].content[j].table;
                    output += `<li value="" onclick="EditorCtrl.EventListener.NavToSub('${_id}')" class="sub-item">${_en} </li>`;
                }
                output +=`</ol>`;
            }
        }
        output+=`</ol>`;
        if(isEdit){
            output+=`<button class="fluid primary ui button" onclick="EditorCtrl.EventListener.update('${sid}')">Update</button>`;
        }else{
            output+=`<button class="fluid teal ui button" onclick="EditorCtrl.EventListener.submit()">Submit</button>`;
        }
        output+=`<div id="${EditorCtrl.defID}_Upload"></div>`;
        return output;
    },
    sizeCalc:function(data){
        var size = 0;
        if(data.datatype=="decimal"||data.datatype=="int"){ size = 4; }
        if(data.datatype=="char")   { size = 2; }
        if(data.datatype=="varchar"){ 
            if((data.datalen>=0&&data.datalen<=20)){ 
                size = 2; 
            }else if(data.datalen>20){ 
                size = 4;
            }
        }
        if(data.datatype=="date"||data.datatype=="datetime"||data.datatype=="timestamp"||data.datatype=="time"){ size = 4; }
        if(data.datatype=="text"||data.datatype=="longtext"){ size = 4; }
        return size;
    },
    normCols:function(data){
        var datatype = (fs.isEmpty(data.data))?data.column.datatype:data.data.datatype;
        var output = ``;
        if(data.data == undefined ){  
            if(data.column.datatype=="location"){
                output = this.location(data);
            }else if(datatype=="datetime"){
                output = this.datetime(data);
            }
        }else if(!fs.isEmpty(data.data.options)){
            output = this.options(data);
        }else if(IntegatedUI.attrType(datatype)==_LONGSTR){
            var requires = data.data.requires;
            var en = data.data.display.en;var zh = data.data.display.zh;
            var placeholder = data.data.display.placeholder;
            var table = data.table;var column = data.column;
            var onChange = "";
            if(!fs.isEmpty(marineObj.attributes[table].columns[column].EventListener)){
                if(!fs.isEmpty(marineObj.attributes[table].columns[column].EventListener.onChange)){
                    onChange = ` onchange="marineObj.attributes['${table}'].columns['${column}'].EventListener.onChange(this)" `;
                }
            }
            output = `
                <label>${ en } <span>${ zh }</span></label>
                <textarea name="${table}.${column}" spellcheck="false" requires="${requires}" placeholder="${placeholder}" ${ onChange }></textarea>
            `;
        }else{
            var requires = data.data.requires;
            var en = data.data.display.en;var zh = data.data.display.zh;
            var placeholder = data.data.display.placeholder;
            var table = data.table;var column = data.column;
            var onChange = "";
            if(!fs.isEmpty(marineObj.attributes[table].columns[column].EventListener)){
                if(!fs.isEmpty(marineObj.attributes[table].columns[column].EventListener.onChange)){
                    onChange = ` onchange="marineObj.attributes['${table}'].columns['${column}'].EventListener.onChange(this)" `;
                }
            }
            output = `
                <label>${ en } <span>${ zh }</span></label>
                <input name="${table}.${column}" type="${IntegatedUI.attrType(datatype)}" requires="${requires}" placeholder="${placeholder}" ${ onChange }>
            `;
        }
        return output;
    },
    options:function(data){
        var en = data.data.display.en;var zh = data.data.display.zh;
        var placeholder = data.data.display.placeholder;
        var options = data.data.options;
        var table = data.table;var column = data.column;
        
        var onChange = "";
        if(!fs.isEmpty(marineObj.attributes[table].columns[column].EventListener)){
            if(!fs.isEmpty(marineObj.attributes[table].columns[column].EventListener.onChange)){
                onChange = ` onchange="marineObj.attributes['${table}'].columns['${column}'].EventListener.onChange(this)" `;
            }
        }
        
        var output = `<label>${ en } <span>${ zh }</span></label>`;
        output += `<select class="ui fluid dropdown" name="${table}.${column}" ${onChange}>`;
        output +=   `<option value="">${placeholder}</option>`;
        for(var i in options){
            output +=   `<option value="${ options[i].value }">${options[i].dispName}</option>`;
        }
        output += `</select>`;
        return output;
    },
    location:function(data){
        var en = data.column.display.en;var zh = data.column.display.zh;
        var id = (fs.isEmpty(data.id))?"location":data.id;
        var output = `
        <label>${ en } <span>${ zh }</span></label>
        <div class="fields">
            <div class="${this.size[2]} wide field">
                ${ MapUI._ini(id) }
                <input type="hidden" name="strandingreport.lati">
                <input type="hidden" name="strandingreport.long">
            </div>
            <div class="${this.size[2]} wide field">
                <div class="fields">
                    <div class="${this.size[4]} wide field">
                        <label>Address <span> 發現地址</span></label>
                        <textarea name="strandingreport.location" spellcheck="false" placeholder="Insert the address / Click in the map"></textarea>
                    </div>
                </div>
                <div class="fields">
                    <div class="${this.size[2]} wide field">
                        <label>Region <span> 地區</span></label>
                        <input type="text" name="strandingreport.region" placeholder="Please insert a region / NA">
                    </div>
                    <div class="${this.size[2]} wide field">
                        <label>Position <span> 位置</span></label>
                        <input type="text" name="strandingreport.position" placeholder="Please insert a position / NA">
                    </div>
                </div>
            </div>
        </div>`;
        return output;
    },
    datetime:function(data){
        return "";
    }
}
const DashboardEditorUI = {
    ComponentSelector:{
        _ini:function(data=null){
            var content = ``;
            for(var i in DashboardEditorCtrl.ComponentSeletor.components){
                var group = DashboardEditorCtrl.ComponentSeletor.components[i];
                var divhead_content = DashboardEditorUI.ComponentSelector.UIComponent.divhead(group.group);
                var cards_content = ``;
                for(var j in group.items){
                    var item = group.items[j];
                    cards_content += DashboardEditorUI.ComponentSelector.UIComponent.card(item);
                }
                var cards = DashboardEditorUI.ComponentSelector.UIComponent.cards(cards_content);
                content += divhead_content + cards;
            }

            var deflist_content = `<span class="ui fluid center aligned mini text">No Default Component</span>`;
            for(var i in DashboardEditorCtrl.defaultComponent){
                if(i==0){ deflist_content=``;}
                deflist_content += DashboardEditorUI.ComponentSelector.UIComponent.sildeitem(DashboardEditorCtrl.defaultComponent[i]);
            }
            
            var ownlist_content = ``;
            var ownlist =   (fs.isEmpty(user.config))?[]:
                                ((fs.isEmpty(user.config.dashboard))?[]:
                                    ((fs.isEmpty(user.config.dashboard.items)?[]:user.config.dashboard.items)));
            for(var i in ownlist){
                ownlist_content += DashboardEditorUI.ComponentSelector.UIComponent.sildeOwnitem(ownlist[i]);
            }
            if(ownlist_content == ""){ ownlist_content = `<span class="ui fluid center aligned mini text">No Created Component</span>`; }
            var output = `
                <div class="ui longer large modal ComponentModal" id="${DashboardEditorCtrl.ComponentSeletor.defID}">
                    <div class="" id="${DashboardEditorCtrl.ComponentSeletor.defID}_Default_Components">
                        <div class="circular ui icon button " onclick="DashboardEditorCtrl.ComponentSeletor.EventListener.defSildedBtn(this)" id="silderbtn"><i class="icon angle left"></i></div>
                        <div class="ui segment" style="display:none" id="deflist">
                            <div class="ui pointing secondary menu">
                                <a class="item" data-tab="def">Default</a>
                                <a class="item active" data-tab="own">Own</a>
                            </div>
                            <div class="ui tab basic segment" data-tab="def"><div class="ui link cards">${deflist_content}</div></div>
                            <div class="ui tab basic segment" data-tab="own"><div class="ui link cards">${ownlist_content}</div></div>
                        </div>
                    </div>
                    <div class="header"><h4 class="ui header">Dashboard Editors</h4></div>
                    <div class="scrolling content">
                        ${content}
                    </div>
                    <div class="actions"><div class="ui cancel tiny button">Cancel</div></div>
                </div>
            `;
            return output;
        },
        UIComponent:{
            sildeitem:function(data){
                var title = data.title,typename = DashboardEditorCtrl.componentType[data.type].name,i = data.id,description = data.description;;
                return `
                    <div class="fluid card">
                        <div class="content"  data-i="${i}" onclick="DashboardEditorCtrl.ComponentSeletor.EventListener.onDefItemClick(this)">
                            <div class="header"><span class="ui small text">${title}</span></div>
                            <div class="meta"><span class="ui mini text">${typename}</span></div>
                            <div class="description"><span class="ui mini text">${description}</span></div>
                        </div>
                    </div>
                `;
            },
            sildeOwnitem:function(data){
                var title = data.title,typename = DashboardEditorCtrl.componentType[data.type].name,i = data.id,description = data.description;;
                return `
                    <div class="fluid card">
                        <div class="content" data-i="${i}" onclick="DashboardEditorCtrl.ComponentSeletor.EventListener.onDefItemClick(this)">
                            <div class="header"><span class="ui small text">${title}</span></div>
                            <div class="meta"><span class="ui mini text">${typename}</span></div>
                            <div class="description"><span class="ui mini text">${description}</span></div>
                        </div>
                        <div class="ui bottom attached button" data-i="${i}" onclick="DashboardCtrl.EventListener.items.delete(this)"><i class="trash icon"></i>Remove</div>
                    </div>
                `;
            },
            card:function(data){
                var name = data.name,
                    val  = data.val,
                    img  = data.img;
                return `
                    <div class="card" onclick="DashboardEditorCtrl.ComponentSeletor.EventListener.onNewItemClick('${val}')">
                        <div class="image" style="background:url('asserts/system/modal/newreport/${img}')"></div>
                        <div class="extra center aligned"><span class="ui tiny text">${name}</span></div>
                    </div>
                `;
            },
            cards:function(data){
                return `<div class="ui link four cards">${data}</div>`;
            },
            divhead:function(data){
                return `<h6 class="ui dividing header">${data}</h6>`;
            }
        }
    },
    ComponentEditor:{
        _ini:function(data=null){
            var output = `
                <div class="ui longer large modal ComponentModal" id="${DashboardEditorCtrl.ComponentEditor.defID}">
                    <div class="header"><h4 class="ui header">Dashboard Component Editors</h4></div>
                    <div class="scrolling content">
                        <div class="ui padded internally celled grid">
                            ${this.UIComponent.preview._ini()}
                            ${this.UIComponent.configs._ini()}
                        </div>
                    </div>
                    <div class="actions">
                        <div class="ui cancel tiny button" onclick="DashboardEditorCtrl.ComponentEditor.EventListener._cancel()">Cancel</div>
                        <div class="ui labeled icon black tiny button" onclick="DashboardEditorCtrl.ComponentEditor.EventListener._return()"><i class="left chevron icon"></i>Return</div>
                        <div class="ui labeled icon primary tiny button" onclick="DashboardEditorCtrl.ComponentEditor.EventListener._submit()"><i class="save icon"></i></i>Submit</div>
                    </div>
                </div>
            `;
            return output;
        },
        UIComponent:{
            //stat,lb,sc,pd
            //tl,sc,fu,fm,ce
            preview:{
                _ini:function(){
                    return `
                        <div class="eight wide column scrolling content center middle aligned ui" id="ComponentPreview">
                            <a class="ui label" onclick="DashboardEditorCtrl.ComponentEditor.EventListener.refresh()"><i class="sync alternate icon"></i>Refresh</a>
                            <div class="sixteen wide column center aligned ui" id="PreviewArea"></div>
                        </div>
                    `;
                }
            },
            configs:{
                _ini:function(){
                    return `
                        <div class="eight wide column scrolling content ui left aligned" id="ComponentConfigSetting">
                            <div class="ui mini form">
                                ${DashboardEditorUI.ComponentEditor.UIComponent.general._ini()}
                            </div>
                        </div>
                    `;
                }
            },
            Components:{
                head:function(data){ return `<div class="ui dividing header"><span class="ui tiny grey text">${data}</span></div>`; },
                field:function(data){
                    var formtype   = data.formtype;
                    var label      = data.label;
                    var id         = data.id;
                    var placeholder= data.placeholder;
                    var form_content = ``;
                    switch(formtype){
                        case "input":
                            form_content = `<input type="text" placeholder="${placeholder}"/>`;break;
                            
                        case "textarea":
                            var row = fs.isEmpty(data.row)?2:data.row;
                            form_content = `<textarea rows="${row}" placeholder="${placeholder}"></textarea>`;break;
                            
                        case "select":
                            var exclasses = ``;for(var i in data.allow){ exclasses+=`${data.allow[i]} ` }   //[ search , multiple ]
                            var options = data.options;
                            var options_content = ``;
                            for(var i in options){ 
                                var option = options[i]; 
                                var val    = option.val;var display = option.display;
                                options_content+=`<div class="item" data-value="${val}">${display}</div>`;
                            }
                            form_content = `
                                <div class="ui fluid ${exclasses} selection dropdown">
                                    <input type="hidden"><i class="dropdown icon"></i>
                                    <div class="default text">${placeholder}</div>
                                    <div class="menu">${options_content}</div>
                                </div>
                            `;
                            break;
                        case "checkbox":
                            var _default = (data.default)?"checked":"";
                            form_content =`
                                <div class="ui toggle checkbox ${_default}" >
                                    <input type="checkbox" tabindex="0" class="hidden"><label>${placeholder}</label>
                                </div>
                            `;
                            break;
                        case "radio":
                            var _default = (data.default)?"checked":"";
                            var options = data.options;
                            var options_content = ``;
                            for(var i in options){
                                var option = options[i];
                                var val = option.val;var display = option.display;
                                //name="${id}"
                                options_content+=`
                                    <div class="field">
                                        <div class="ui radio checkbox">
                                            <input type="radio" value="${val}" class="hidden"><label>${display}</label>
                                        </div>
                                    </div>
                                `;
                            }
                            form_content =`<div class="inline fields">${options_content}</div>`;
                            break;
                        case "calendar":
                            form_content =`
                                <div class="ui calendar" id="${id}">
                                    <div class="ui input left icon">
                                        <i class="calendar icon"></i><input type="text" placeholder="Date/Time">
                                    </div>
                                </div>
                            `;
                            break;

                    }
                    var output   = `
                        <div class="field" data-formtype="${formtype}"  data-id="${id}"><label>${label}</label>${form_content}</div>
                    `;
                    return output;
                },
                datas:{
                    _ini:function(data=null){
                        var data = (data==null)?_GB_DASHBOARD_EDITOR_VARS.DATASET:data;
                        var output = this.UIComponent.editbtn;
                        switch(_GB_DASHBOARD_EDITOR_VARS.TYPE){
                            case "stat":case "lb":case "sc":case "pd": 
                                var data_content = "";
                                for(var i in data){
                                    var currentData = data[i];
                                    data_content += this.UIComponent.main(currentData);
                                }
                                output+= (data_content!=``)?this.UIComponent.list(data_content):this.UIComponent.nodatainfo;
                                break;
                            default:break;
                        }
                        return output;

                    },
                    UIComponent:{
                        editbtn:`<div class="ui fluid teal button center aligned" onclick="DashboardEditorCtrl.ComponentEditor.EventListener.onDataSetBtnClick()">Edit Data Set</div>`,
                        nodatainfo:`<div class="ui fluid basic segment center aligned">No Data Setting</div>`,
                        list:function(data){
                            return `<div class="ui basic segment datalist review" id="DataSelectedList">${data}</div>`;
                        },
                        main:function(data){
                            var main = data.main;//console.log(data);
                            var tablename = marineObj.getTableNameRawData(main.maindt).en;tablename = (tablename.length>12)?tablename.substring(0, 8)+"...":tablename;
                            var columnname = marineObj.getColumnNameRawData(main.maindt).en;columnname = (columnname.length>24)?columnname.substring(0, 21)+"...":columnname;
                            return `
                                <div class="ui styled accordion">
                                    <div class="title"><span class="ui text small header"><div class="ui horizontal label">${tablename}</div>${columnname}</span></div>
                                    <div class="content">
                                        ${this.subs._ini(data)}
                                        ${this.rules._ini(data)}
                                    </div>
                                </div>
                            `;
                        },
                        subs:{
                            _ini:function(data){
                                var subs = data.subs;var subs_content = ``;
                                for(var i in subs){
                                    subs_content+=this.UIComponent.sub(subs[i]);
                                }
                                var output = (subs_content!=``)?this.UIComponent.list(subs_content):"";
                                return output;
                            },
                            UIComponent:{
                                list:function(data){
                                    return `<div class="accordion">
                                        <div class="title"><span class="ui text tiny header">Sub Data List</span></div>
                                        <div class="content"><div class="ui divided selection list">${data}</div></div>
                                    </div>`;
                                },
                                sub:function(data){
                                    var tablename = marineObj.getTableNameRawData(data.subdt).en;tablename = (tablename.length>12)?tablename.substring(0, 8)+"...":tablename;
                                    var columnname = marineObj.getColumnNameRawData(data.subdt).en;columnname = (columnname.length>24)?columnname.substring(0, 21)+"...":columnname;
                                    return `<a class="item"><div class="ui horizontal label">${tablename}</div>${columnname}</a>`;
                                }
                            }
                        },
                        rules:{
                            _ini:function(data){
                                var rule = data.rule;var rule_content = ``;
                                for(var i in rule){
                                    rule_content+=this.UIComponent.rule(rule[i]);
                                }
                                var output = (rule_content!=``)?this.UIComponent.list(rule_content):"";
                                return output;
                            },
                            UIComponent:{
                                list:function(data){
                                    return `<div class="accordion">
                                        <div class="title"><span class="ui text tiny header">Rules List</span></div>
                                        <div class="content"><div class="ui divided selection list">${data}</div></div>
                                    </div>`;
                                },
                                rule:function(data){
                                    var tablename = marineObj.getTableNameRawData(data.data).en;tablename = (tablename.length>12)?tablename.substring(0, 8)+"...":tablename;
                                    var columnname = marineObj.getColumnNameRawData(data.data).en;columnname = (columnname.length>24)?columnname.substring(0, 21)+"...":columnname;
                                    return `<a class="item">${this.data(columnname)}${this.operater(data.operator)}${this.params(data.params)}</a>`;
                                },
                                data:function(data){
                                    var columnname = data;
                                    return `<div class="ui horizontal teal label">${columnname}</div>`;
                                },
                                operater:function(data){
                                    var operater = data;
                                    return `<div class="ui horizontal olive label">${operater}</div>`;
                                },
                                params:function(data){
                                    var params = data;var output = ``;
                                    for(var i in params){ output+= `<div class="ui horizontal violet label">${params[i]}</div>`; }
                                    return output;
                                }
                            }
                        }
                    }
                }
            },
            general:{
                _ini:function(data=null){
                    //general setting { Title, Description, Size, Colors Tone, }
                    
                    var colorOptions = [];
                    var type = _GB_DASHBOARD_EDITOR_VARS.TYPE;var colorTone = COLOR_TONE;
                    switch(type){
                        case "stat":case "tl":case "mv":case "fu":case "fm":case "ce": colorTone = COLORSARRAY;break;
                        default: colorTone = COLOR_TONE;break;
                    }
                    for(var i in colorTone){
                        var color = colorTone[i];
                        var c = {};
                        if(fs.isEmpty(color.set)){ c.val = color.val;c.display = `<div class="ui ${color.val} empty circular label"></div> ${ color.name }`; }
                        else{
                            c.val = i;c.display = "";
                            var temp = "";
                            for(var j in color.set ){
                                temp +=`<a class="ui label" style="background-color:${color.set[j]};"></a>`;
                            }
                            c.display=`<div class="ui field labels">${temp}</div><div class="ui field">${ color.name }</div>`;
                        }
                        colorOptions[colorOptions.length] = c;
                    }
                    
                    var output=`
                        ${DashboardEditorUI.ComponentEditor.UIComponent.Components.head("Genernal Setting")}
                        ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ formtype:"input",id:"title",label:"Title",placeholder:"Title of Component" })}
                        ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ formtype:"textarea",id:"descr",label:"Description",placeholder:"Please Enter Description of Component (Optional)" })}
                        ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ formtype:"select",id:"gsize",label:"Grid Size",placeholder:"Select the grid size",allow:[],options:[
                            {val:4,display:"Full Grid"},{val:3,display:"3/4 Grid"},{val:2,display:"Half Grid"},{val:1,display:"1/4 Grid"}
                        ]})}
                        ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ formtype:"select",id:"color",label:"Color Tone",placeholder:"Select the Color",allow:[],options:colorOptions})}

                        ${DashboardEditorUI.ComponentEditor.UIComponent[type]()}
                    `;
                    return output;
                }
            }, 
            stat:function(data=''){
                //statistic { Is Show Data Data }
                var output = `
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.head("Configs Setting")}
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ formtype:"checkbox",id:"shdtl",label:"Show Detail (Allow popup table)",placeholder:"Default Is Off"})}
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.head("Data Selection")}
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.datas._ini()}
                `;
                return output;
            },
            lb:function(data=''){
                //line & bar { Data }
                var output = `
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.head("Data Selection")}
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.datas._ini()}
                `;
                return output;
            }, 
            sc:function(data=''){
                //scatter { Data }
                var output = `
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.head("Data Selection")}
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.datas._ini()}
                `;
                return output;
            },  
            pd:function(data=''){
                //pie and doughnut { Data }
                var output = `
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.head("Data Selection")}
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.datas._ini()}
                `;
                return output;
            },  
            
            tl:function(data=''){
                //table list { Functions Allow, Data Select, Data Rules }
                var output = `
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.head("Configs Setting")}
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ formtype:"checkbox",id:"search",label:"Allow to Search",placeholder:"Default Is Off"})}
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ formtype:"checkbox",id:"add",label:"Allow to Add New",placeholder:"Default Is Off"})}
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ formtype:"checkbox",id:"edit",label:"Allow to Edit",placeholder:"Default Is Off"})}
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ formtype:"checkbox",id:"delete",label:"Allow to Delete",placeholder:"Default Is Off"})}
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.head("Data Selection")}
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.datas._ini()}
                `;
                return output;
            },  
            mv:function(data=''){
                //map view { Functions Allow, Data Select, Data Rules }
                var output = `
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.head("Configs Setting")}
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ formtype:"checkbox",id:"search",label:"Allow to Search",placeholder:"Default Is Off"})}
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ formtype:"checkbox",id:"showmm",label:"Show Marine Mammal Cases",placeholder:"Default Is Off"})}
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ formtype:"checkbox",id:"showba",label:"Show Boat Activities",placeholder:"Default Is Off"})}
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.head("Data Selection")}
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.datas._ini()}
                `;
                return output;
            },  
            fu:function(data=''){
                //file upload { Target Cases, Preview Allow }
                var output = `
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.head("Configs Setting")}
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ formtype:"input",id:"case",label:"Target Case",placeholder:"Input the Case ID (Optional)" })}
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ formtype:"checkbox",id:"search",label:"Allow to Search",placeholder:"Default Is Off"})}  
                `;
                return output;
            },  
            fm:function(data=''){
                //file management { Functions Allow, Target Files }
                var output = `
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.head("Configs Setting")}
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ formtype:"checkbox",id:"search",label:"Allow to Search",placeholder:"Default Is Off"})}  
                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ formtype:"select",id:"filetype",label:"Shows Files Category",placeholder:"Select the a category",allow:[],options:[
                        {val:"all",display:"All Files"},{val:"own",display:"Own Files"},{val:'tmp',display:"Temp Files"},{val:"doc",display:"Documents"},{val:"pdf",display:"PDF"},{val:"img",display:"Image"}
                    ]})}
                `;
                return output;
            }, 
            ce:function(data=''){
                //case editor { Functions Allow }
                var output = `
                ${DashboardEditorUI.ComponentEditor.UIComponent.Components.head("Data Selection")}
                ${DashboardEditorUI.ComponentEditor.UIComponent.Components.datas._ini()}
            `;
            return output;
                
            }   
        }
    },
    ComponentDataEditor:{
        _ini:function(){
            var output = `
                <div class="ui longer large modal ComponentModal" id="${DashboardEditorCtrl.ComponentDataEditor.defID}">
                    <div class="header"><h4 class="ui header">Dashboard Component Editors</h4></div>
                    <div class="scrolling content">
                        ${ this.TYPE._ini()}
                    </div>
                    <div class="actions">
                        <div class="ui cancel tiny button" onclick="DashboardEditorCtrl.ComponentDataEditor.EventListener._cancel()">Cancel</div>
                        <div class="ui labeled icon black tiny button" onclick="DashboardEditorCtrl.ComponentDataEditor.EventListener._return()"><i class="left chevron icon"></i>Return</div>
                        <div class="ui labeled icon primary tiny button" onclick="DashboardEditorCtrl.ComponentDataEditor.EventListener._submit()"><i class="save icon"></i></i>Submit</div>
                    </div>
                </div>
            `;
            return output;
        },
        TYPE:{
            _ini:function(){
                var type = _GB_DASHBOARD_EDITOR_VARS.TYPE;
                switch(type){
                    case "tl": return this.Component.tl();case "mv": return this.Component.mv();
                    case "ce": return this.Component.ce();default  : return this.Component.default();
                }
            },
            Component:{
                default:function(){
                    return `
                    <div class="ui padded internally celled grid">
                        <div class="${SIZE[12]} wide column scrolling content ui ComponentMainFormList"></div>
                        <div class="${SIZE[4]} wide column scrolling content ui left aligned ComponentMainDataList">
                            ${DashboardEditorUI.ComponentDataEditor.UIComponent.ListUI.Main.list()}
                        </div>
                    </div>
                    `;
                },
                tl:function(){
                    return `
                    <div class="ui padded internally celled grid">
                        <div class="${SIZE[8]} wide column scrolling content ui ComponentMainFormList">
                            <div class="ui internally celled grid">
                                <div class="${SIZE[16]} wide column scrolling content ui left aligned form ComponentMainForm" id="TableListDataPicker">
                                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.head("Select Data Show")}
                                </div>
                            </div>
                        </div>
                        <div class="${SIZE[8]} wide column scrolling content ui ComponentMainFormList">
                            <div class="ui internally celled grid">
                                <div class="${SIZE[16]} wide column scrolling content ui left aligned form ComponentMainForm" id="TableListRulesSetting">
                                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.head("Rules Setting")}
                                    ${DashboardEditorUI.ComponentDataEditor.UIComponent.Components.Rules._ini()}
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                },
                mv:function(){
                    
                    return `
                    <div class="ui padded internally celled grid">
                        <div class="${SIZE[16]} wide column scrolling content ui ComponentMainFormList">
                            <div class="ui internally celled grid">
                                <div class="${SIZE[16]} wide column scrolling content ui left aligned form ComponentMainForm">
                                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.head("Rules Setting")}
                                    ${DashboardEditorUI.ComponentDataEditor.UIComponent.Components.Rules._ini()}
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                },
                ce:function(){
                    return `
                    <div class="ui padded internally celled grid">
                        <div class="${SIZE[16]} wide column scrolling content ui ComponentMainFormList">
                            <div class="ui internally celled grid">
                                <div class="${SIZE[16]} wide column scrolling content ui left aligned form ComponentMainForm" id="CaseEditorDataPicker">
                                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.head("Select Data Show")}
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                },
            }
        },
        UIComponent:{
            FormUI:{
                Main:function(data){
                    var id = data.id;
                    var output = `
                        <div class="ui tab ComponentMainFormGroup" data-tab="main/${id}" data-id="main/${id}">
                            <div class="ui internally celled grid">
                                <div class="${SIZE[10]} wide column scrolling content ui left aligned form ComponentMainForm">
                                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.head("Main Data Config")}
                                    ${DashboardEditorUI.ComponentDataEditor.UIComponent.Components.DataSelector("maindt")}
                                    ${DashboardEditorUI.ComponentDataEditor.UIComponent.Components.GraphTypeOptions()}
                                    ${DashboardEditorUI.ComponentDataEditor.UIComponent.Components.DisplayOptions()}
                                    ${DashboardEditorUI.ComponentEditor.UIComponent.Components.head("Rules Setting")}
                                    ${DashboardEditorUI.ComponentDataEditor.UIComponent.Components.Rules._ini()}
                                </div>
                                <div class="${SIZE[6]} wide column scrolling content ui aligned ComponentSubDataList">
                                    ${DashboardEditorUI.ComponentDataEditor.UIComponent.ListUI.Sub.list()}
                                </div>
                            </div>
                        </div>
                    `;
                    return output;
                },
                Sub:function(){
                    var output = `
                    <div class="sub_form_content ui form">
                        ${DashboardEditorUI.ComponentEditor.UIComponent.Components.head("Sub Data Config")}
                        ${DashboardEditorUI.ComponentDataEditor.UIComponent.Components.DataSelector("subdt")}
                        ${DashboardEditorUI.ComponentDataEditor.UIComponent.Components.GraphTypeOptions()}
                        ${DashboardEditorUI.ComponentDataEditor.UIComponent.Components.DisplayOptions()}
                    </div>
                    `;
                    return output;
                }
            },
            ListUI:{
                Main:{
                    list:function(data=null){
                        var allowAdd = (data!=null)?data.allow:true;
                        var data_content = (data!=null)?data.content:``;
                        var output =`
                            ${DashboardEditorUI.ComponentEditor.UIComponent.Components.head("Main Dataset List")}
                            ${ (allowAdd)?`<div class="teal fluid ui mini button" onclick="DashboardEditorCtrl.ComponentDataEditor.EventListener.Main.onAddMainClick(this)">Add Main Dataset</div>`:"" }
                            <div class="ui link cards">${data_content}</div>
                        `;
                        return output;
                    },
                    item:function(data=null){
                        var id = (data==null)?0:data.id;
                        var allowRemove = (data==null)?true:(fs.isEmpty(data.allowRemove))?true:data.allowRemove;
                        var output = `
                            <div class="ui raised fluid card" data-tab="main/${id}"  onclick="DashboardEditorCtrl.ComponentDataEditor.EventListener.Main.onSwitchMain(this)">
                                <div class="content"><div class="center aligned header"><span class="ui text small">Main Data Set #${id+1}</span></div></div>
                                ${ (allowRemove)?`<div class="ui bottom attached button" onclick="DashboardEditorCtrl.ComponentDataEditor.EventListener.Main.remove(this)"><i class="trash icon"></i>Remove</div>`:`` }
                            </div>
                        `;
                        return output;
                    },
                },
                Sub:{
                    list:function(data=null){
                        var allowAdd = (data!=null)?data.allow:true;
                        var data_content = (data!=null)?data.content:``;//<div class="ui fluid brown mini center aligned message">No Sub Data</div>
                        var output =`
                            ${DashboardEditorUI.ComponentEditor.UIComponent.Components.head("Sub Dataset List")}
                            ${ (allowAdd)?`<div class="secondary mini fluid ui button" onclick="DashboardEditorCtrl.ComponentDataEditor.EventListener.Sub.onAddSubClick(this)">Add Sub-Data</div>`:"" }
                            ${data_content}
                            <div class="ui link cards"></div>
                            
                        `;
                        return output;
                    },
                    item:function(data=null){
                        var output = `
                            <div class="ui fluid card SubComponentForm">
                                <div class="content">
                                    ${ DashboardEditorUI.ComponentDataEditor.UIComponent.FormUI.Sub() }
                                </div>
                                <div class="ui bottom attached button" onclick="DashboardEditorCtrl.ComponentDataEditor.EventListener.Sub.remove(this)"><i class="trash icon"></i>Remove Sub Dataset</div>
                            </div>
                        `;
                        return output;
                    }
                }
            },
            Components:{
                DataPicker:function(data=null){
                    var attributes = marineObj.getAttributesListArray();
                    var options_content = ``;var output = ``;var id = (data==null)?"datapicker":data;
                    for(var i in attributes){
                        var table = attributes[i].table,columns = attributes[i].columns;
                        var table_name = marineObj.getTableName({table:table});
                        options_content += `
                            <div class="item">
                                <div class="ui master checkbox">
                                    <input type="checkbox" name="${table}">
                                    <label>${table_name.en} <span class="ui text tiny gray">${table_name.zh}</span></label>
                                </div><div class="list">
                        `;
                        for(var j in columns){
                            var column = columns[j];var column_name = marineObj.getColumnName({table:table,column:column});
                            options_content += `
                                <div class="item">
                                    <div class="ui child checkbox"  data-value="${table}^${column}">
                                        <input type="checkbox"  data-value="${table}^${column}" value=" data-value="${table}^${column}" name="${column}">
                                        <label><i class="tags icon"></i>${column_name.en} <span class="ui text tiny gray">${column_name.zh}</span></label>
                                    </div>
                                </div>
                            `;
                        }
                        options_content += `</div></div>`;
                    }
                    output = `
                        <div class="field" data-formtype="checkboxgroup" data-id="${id}">
                            <div class="ui celled relaxed list">
                                ${ options_content }
                            </div>
                        </div>
                    `;
                    return output;
                },
                DataPickerNormal:function(data=null){
                    var attributes = NormalType.getAttributesListArray();
                    var options_content = ``;var output = ``;var id = (data==null)?"datapicker":data;
                    for(var i in attributes){
                        var group = attributes[i];
                        options_content += `
                            <div class="ui celled relaxed list group">
                                <div class="item">
                                    <div class="ui master checkbox" data-id-type="group">
                                        <input type="checkbox" value="${i}">
                                        <label>Group #${i} </label>
                                    </div>
                                    <div class="list">
                        `;
                        for(var j in group){
                            var table = group[j].table;
                            var table_name = marineObj.getTableName({table:table});
                            options_content += `
                                        <div class="ui celled relaxed list table">
                                            <div class="item">
                                                <div class="ui master checkbox" data-id-type="group">
                                                    <input type="checkbox" value="${table}">
                                                    <label></i>${table_name.en} <span class="ui text tiny gray">${table_name.zh}</span></label>
                                                </div><div class="list">
                        `;
                            var columns = group[j].columns;
                            for(var k in columns){
                                var column = columns[k];var column_name = marineObj.getColumnName({table:table,column:column});
                                options_content += `
                                    <div class="item">
                                        <div class="ui child checkbox"  data-value="${i}^${table}^${column}">
                                            <input type="checkbox"  data-value="${i}^${table}^${column}" name="${column}">
                                            <label><i class="tags icon"></i>${column_name.en} <span class="ui text tiny gray">${column_name.zh}</span></label>
                                        </div>
                                    </div>
                                `;
                            }
                            options_content += `</div>
                                            </div>
                                        </div>
                            `;
                        }
                        options_content += `
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                    output = `
                        <div class="field" data-formtype="checkboxgroup" data-id="${id}">
                            <div class="ui celled relaxed list">
                                ${ options_content }
                            </div>
                        </div>
                    `;
                    return output;
                },
                DataSelector:function(data=null){
                    var target = (data==null)?"dataselector":data;
                    var attributes = marineObj.getAttributesListArray();
                    var options_content = ``;
                    for(var i in attributes){
                        var table = attributes[i].table,columns = attributes[i].columns;
                        var table_name = marineObj.getTableName({table:table});
                        options_content += `<div class="header"><i class="database icon"></i>${table_name.en} <span class="ui text tiny gray">${table_name.zh}</span></div>`;
                        for(var j in columns){
                            var column = columns[j];var column_name = marineObj.getColumnName({table:table,column:column});
                            options_content += `<div class="item" data-value="${table}^${column}"><i class="tags icon"></i>${column_name.en} <span class="ui text tiny gray">${column_name.zh}</span></div>`;
                        }
                    }
                    var output = `
                        <div class="field" data-formtype="select" data-id="${target}">
                            <label>Data Set</label>
                            <div class="ui fluid search selection dropdown">
                                <input type="hidden"><i class="dropdown icon"></i>
                                <div class="default text">Select A Data Attribute</div>
                                <div class="menu">${options_content}</div>
                            </div>
                        </div>
                    `;
                    return output;
                },
                GraphTypeOptions:function(data=null){
                    var type = _GB_DASHBOARD_EDITOR_VARS.TYPE;
                    var output = ``;
                    switch(type){
                        case "lb":
                            output+= `
                                ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ 
                                    formtype:"radio",id:"graptype",label:"Graph Type For This Data",placeholder:"Select A Display Calculation",
                                    options:[
                                        {val:"line",display:"Line"},{val:"bar",display:"Bar"}
                                    ]
                                })}
                            `;
                            break;
                        case "pd":
                            output+= `
                                ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ 
                                    formtype:"radio",id:"graptype",label:"Graph Type For This Data",placeholder:"Select A Display Calculation",
                                    options:[
                                        {val:"pie",display:"Pie"},{val:"doughnut",display:"Doughnut"}
                                    ]
                                })}
                            `;
                            break;
                        default:
                            break;
                    }
                    return output
                },
                DisplayOptions:function(data=null){
                    var table = (data!=null)?data.split("^")[0]:"",column = (data!=null)?data.split("^")[1]:"";
                    var dataContent = (data!=null)?marineObj.attributes[table].columns[column]:"";
                    var datatype = (data!=null)?dataContent.datatype:"";var _datatype = (data!=null)?IntegatedUI.attrType(datatype):_STRING;
                    var output = ``;var output_content = ``;
                    switch(_datatype){
                        case _NUMBER:
                            output_content = `
                                ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ 
                                    formtype:"radio",id:"dispOpts",label:"Display Options",placeholder:"Select A Display Calculation",
                                    options:[
                                        {val:"cnt",display:"Count"},{val:"max",display:"Maximum"},{val:"min",display:"Minimum"},{val:"avg",display:"Average"},{val:"sum",display:"Summary"}
                                    ]
                                })}
                                <div class="two fields">
                                ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ formtype:"input",id:"max",label:"Maximum",placeholder:"The Maximum Value of the Data (Optional)" })}
                                ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ formtype:"input",id:"min",label:"Minimum",placeholder:"The Minimum Value of the Data (Optional)" })}
                                </div>
                            `;
                            break;
                        case _STRING:case _LONGSTR:
                            output_content = `
                                ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ 
                                    formtype:"select",id:"dispOpts",label:"Target Values",placeholder:"Type the Target Values for the Component",allow:["multiple","clearable","search"],options:[]
                                })}
                                ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ formtype:"checkbox",id:"groupvalue",label:"Grouping the same values",placeholder:"Default Is Off"})}  
                            `;
                            break;
                        case _DATETIME:case _TIME:
                            output_content = ` 
                                ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ 
                                    formtype:"radio",id:"dispOpts",label:"Display Options",placeholder:"Select A Display Calculation",
                                    options:[
                                        {val:"year",display:"By Each Year"},{val:"month",display:"By Each Month"},{val:"day",display:"By Each Day"}
                                    ]
                                })}
                                <div class="two fields">
                                ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ formtype:"calendar",id:"start",label:"Start From",placeholder:"The Start Date (Optional)" })}
                                ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ formtype:"calendar",id:"end",label:"End To",placeholder:"The End Date (Optional)" })}
                                </div>
                                ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ formtype:"checkbox",id:"groupvalue",label:"Grouping the same values",placeholder:"Default Is Off"})} 
                            `;
                            break;
                        default:
                            output_content = `
                                ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ 
                                    formtype:"select",id:"dispOpts",label:"Target Values",placeholder:"Type the Target Values for the Component",allow:["multiple","clearable","search"],options:[]
                                })}
                                ${DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ formtype:"checkbox",id:"groupvalue",label:"Grouping the same values",placeholder:"Default Is Off"})}  
                            `;
                            break;
                    }
                    output = `<div class="field DisplayOptions">
                        ${ output_content }
                    </div>`;
                    return output;
                },
                Rules:{
                    _ini:function(){
                        var output = `
                            <div class="field Rules">
                                <div class="two fields RulesForm">
                                    <div class="field">
                                        ${DashboardEditorUI.ComponentDataEditor.UIComponent.Components.DataSelector("ruledt")}
                                        ${DashboardEditorUI.ComponentDataEditor.UIComponent.Components.Rules.Component.operators()}
                                        ${DashboardEditorUI.ComponentDataEditor.UIComponent.Components.Rules.Component.params()}
                                        <div class="field"><div class="ui submit fluid tiny secondary button" onclick="DashboardEditorCtrl.ComponentDataEditor.EventListener.Rule.addRule(this)">Add Rule</div></div>
                                    </div>
                                    <div class="field">
                                        ${this.Component.UIComponent.list("")}
                                    </div>
                                </div>
                            </div>
                        `;
                        return output;
                    },
                    Component:{
                        params:function(data=null){
                            var table = (data!=null)?data.data.split("^")[0]:"",column = (data!=null)?data.data.split("^")[1]:"";
                            var dataContent = (data!=null)?marineObj.attributes[table].columns[column]:"";
                            var datatype = (data!=null)?dataContent.datatype:"";var _datatype = (data!=null)?IntegatedUI.attrType(datatype):_STRING;
                            var opttype = (data!=null)?(fs.isEmpty(data.operator))?"=":data.operator:"=";
                            var _dType = "input";var output = ``;
                            switch(_datatype){
                                case _STRING:case _NUMBER:case _LONGSTR:
                                    _dType = "input";
                                    break;
                                case _DATETIME:case _TIME:
                                    _dType = "calendar";
                                    break
                            }
                            switch(opttype){
                                case "IN":case "LIKE":
                                    _dType = "select";
                                    break
                            }
                            output = DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ 
                                formtype:_dType,id:"params",label:"Parameter",placeholder:"Enter the parameter(s)",allow:["multiple","search"],options:[]
                            });
                            return output;
                        },
                        operators:function(){
                            var output = "";var optList = DashboardEditorCtrl.OperatorsList;var opt_options = [];
                            for(var val in optList){
                                opt_options[opt_options.length] = { val:val,display:optList[val] };
                            }

                            output = DashboardEditorUI.ComponentEditor.UIComponent.Components.field({ 
                                formtype:"select",id:"opts",label:"Operator",placeholder:"Select an Operator",allow:[],options:opt_options
                            });
                            return output;
                        },
                        UIComponent:{
                            list:function(data){
                                return `<div class="ui RulesList">
                                    <div class="title"><span class="ui text tiny header">Rules List</span></div>
                                    <div class="content"><div class="ui divided selection list">${data}</div></div>
                                </div>`;
                            },
                            rule:function(data){
                                //var tablename = marineObj.getTableNameRawData(data.data).en;tablename = (tablename.length>12)?tablename.substring(0, 8)+"...":tablename;
                                //var columnname = marineObj.getColumnNameRawData(data.data).en;columnname = (columnname.length>24)?columnname.substring(0, 21)+"...":columnname;
                                return `<a class="item"><i class="close icon middle aligned" onclick="DashboardEditorCtrl.ComponentDataEditor.EventListener.Rule.delete(this)" data-value="${data.data}"></i>${this.data(data.data)}${this.operater(data.operator)}${this.params(data.params)}</a>`;
                            },
                            data:function(data){
                                var tablename = marineObj.getTableNameRawData(data).en;tablename = (tablename.length>12)?tablename.substring(0, 8)+"...":tablename;
                                var columnname = marineObj.getColumnNameRawData(data).en;columnname = (columnname.length>24)?columnname.substring(0, 21)+"...":columnname;
                                return `<div class="ui horizontal teal label" data-value="${data}">${columnname}</div>`;
                            },
                            operater:function(data){
                                var operator = data;
                                return `<div class="ui horizontal olive label" data-value="${operator}">${operator}</div>`;
                            },
                            params:function(data){
                                var params = data;var output = ``;
                                for(var i in params){ output+= `<div class="ui horizontal violet label" data-value="${params[i]}">${params[i]}</div>`; }
                                return output;
                            }
                        }
                    }
                }
            }
        }

    }
};

const DashboardUI = {
    _ini:function(data){
        var output =`
        <div class="main-content" id="main-content">
            <div class="ui basic segment">${DashboardUI.UIComponents.header()}</div>
            <div class="ui basic segment" id="DashboardItemList"></div>
        </div>
        `;
        return output;
    },
    UIComponents:{
        header:function(){
            return `
                <div class="sixteen wide column">
                    <h1 class="ui dividing header">Dashboard</h1>
                    <div class="ui teal tiny button" id="editbtn" onclick='DashboardCtrl.EventListener.UI.edit()'>Edit</div>
                    <div class="ui hiding primary tiny button" id="savebtn" onclick='DashboardCtrl.EventListener.UI.save()'>Save</div>
                    <div class="ui hiding secondary tiny button" id="cancelbtn" onclick='DashboardCtrl.EventListener.UI.cancel()'>Cancle</div>
                </div>
            `
        },
        row:{
            tmpRow:function(data){
                return `<div class="ui grid center aligned tempRow nondraggable" data-row-id="${data}" new-row  onclick="DashboardCtrl.EventListener.items.new(this)"><i class="plus big icon"></i></div>`;
            },
            Row:function(data){
                var rowId = (data.id)?data.id:0;
                //var center = (data.CENTER)?" center aligned ":"";
                //var draggable = (data.DRAGGABLE)?" draggable ":"";${ draggable } ${ center }
                var output = `<div class="ui grid componentRow" data-row-id="${rowId}" id="row_${rowId}"></div>`;
                return output;
            },
        },
        col:{
            tmpCol:function(data){
                return `<div class="nondraggable newReportBtn four wide computer eight wide tablet sixteen wide mobile column center aligned" data-row-id="${data}"  onclick="DashboardCtrl.EventListener.items.new(this)"><i class="plus big icon"></i></div>`;
            },
            Col:function(data){
                var colId = (data.id)?data.id:"";var gsize = (fs.isEmpty(data.component.CONFIG.gsize))?0:parseInt(data.component.CONFIG.gsize);
                
                const _SIZE = ['','one', 'two',' three', ' four',  ' five',    ' six',     ' seven',  ' eight',
                                'nine',' ten',' eleven',' twelve','thirteen',' fourteen',' fifteen',' sixteen'];
                
                var size = [[4,8,16],[4,8,16],[8,8,16],[12,16,16],[16,16,16]];
                var output = `<div class="${_SIZE[size[gsize][0]]} wide computer ${_SIZE[size[gsize][1]]} wide tablet ${_SIZE[size[gsize][2]]} wide mobile column"  data-id="${colId}" id="col_${colId}"></div>`;
                return output;
            }
            
        }
    },
    Component:{
        _ini:function(data){
            var type = data.type;
            switch(type){
                case "stat": return "";
                case "lb":case "sc":case "pd": return this.TYPE.chartjs(data);
                default:return this.TYPE.default(data);
            }
        },
        TYPE:{
            stat:function(data){
                var id   = data.id;
                var color  = (data.color)?data.color:"default";
                var val  = data.val;
                var title= data.title;
                var showDetail = data.showDetail;
                var output = `
                        <div class="ui fluid  ${SYSCOLORS[color]} card center aligned">
                            <div class="extra">
                                <div class="right floated"><i class="trash icon" onclick="DashboardCtrl.EventListener.display.delete(this)"></i><i class="ellipsis vertical icon"></i></div>
                            </div>
                            <div class="content">
                                <div class="ui small ${SYSCOLORS[color]} statistic">
                                    <div class="value">${val}</div>
                                    <div class="label">${title}</div>
                                </div>
                            </div>
                            ${ (showDetail)?`
                                <div class="extra content">
                                    <button class="ui ${SYSCOLORS[color]} tiny button" onclick="DashboardCtrl.EventListener.Component.stat.showDetail('${id}')">More Detail</button>
                                </div>`:"" }
                        </div>
                    `;
                return output;
            },
            chartjs:function(data){
                var output = `
                    <div class="ui fluid card">
                        <div class="extra">
                            <div class="left floated"><span class="ui medium black text">${data.title}</span></div>
                            <div class="right floated"><i class="trash icon" onclick="DashboardCtrl.EventListener.display.delete(this)"></i><i class="ellipsis vertical icon"></i></div>
                        </div>
                        <div class="content"><canvas id="chart_${data.id}"></canvas></div>
                    </div>
                `;
                return output;
            },
            default:function(data){
                var output = `
                    <div class="ui fluid card">
                        <div class="extra">
                            <div class="left floated"><span class="ui medium black text">${data.title}</span></div>
                            <div class="right floated"><i class="trash icon" onclick="DashboardCtrl.EventListener.display.delete(this)"></i><i class="ellipsis vertical icon"></i></div>
                        </div>
                        <div class="content"></div>
                    </div>
                `;
                return output;
            }
        }
    }
}