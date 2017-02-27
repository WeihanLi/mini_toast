function Toast(options) {
    //default settings
    this._settings = {root:"mini_toast",logger:false,autoHide:true,delay:2000,content:"这里是toast内容",callback:function(){}};
    //custom settings
    this._customSettings = {};
    //define the function getSetting
    this.getSetting = function (settingName){
        return this._settings[settingName];
    };
    //define the function setSetting
    this.setSetting = function (settingName,settingValue){
        this._settings[settingName] = settingValue;
    };
    //toast init
    this.initToast = function (options){
        this._customSettings = options;
        for (var settingName in this._customSettings) {
            if (this._customSettings.hasOwnProperty(settingName)) {
                this._settings[settingName] = (this._customSettings[settingName] === undefined) ?  this._settings[settingName] : this._customSettings[settingName];
            }
        }
        if(this.getSetting("logger")){
            console.log('toast inited');
        }
    };
    //hide toast
    this.hide = function (){
        if(this.getSetting("logger")){
            console.log("hide begin");
        }
        var ele = document.getElementById(this.getSetting('root'));
        if (ele.style.display === 'none') {
            if(this.getSetting("logger")){
                console.warn('already hide');
            }
            return;
        }
        ele.style.display = 'none';
        if(typeof arguments[0] === 'function'){
            arguments[0]();
        }
        if(this.getSetting("logger")){
            console.log("hide end");
        }
    };
    
    /*
    *show toast
    *show()
    *show(content)
    *show(delay)
    *show(content,delay)
    *show(content,callback)
    *show(content,autoHide)
    *show(content,delay,callback)
    *show(content,autoHide,delay,callback) //autoHide为false时设置delay是没有什么意义的
    */
    this.show = function () {
        var content = this.getSetting('content');
        var delay = this.getSetting('delay');
        var autoHide = this.getSetting('autoHide');
        var callback = this.getSetting('callback');
        if(this.getSetting("logger")){
            console.log("show toast begin");
        }
        if (arguments.length===1) {
            if(typeof arguments[0]==='string'){
                content = arguments[0];
            }else if(typeof arguments[0]==='number'){
                delay = arguments[0];
            }else if(typeof arguments[0] === 'function'){
                callback = arguments[0];
            }else if(typeof arguments[0] === 'boolean'){
                autoHide = arguments[0];
            }
        }else if(arguments.length===2){
            //第一个参数
            if(typeof arguments[0] === 'string'){
                content = arguments[0];
            }else if(typeof arguments[0] === 'number'){
                delay = arguments[0];
            }else if(typeof arguments[0] === 'boolean'){
                autoHide = arguments[0];
            }
            //第二个参数
            if(typeof arguments[1] === 'number'){
                delay = arguments[1];
            }else if(typeof arguments[1] === 'function'){
                callback = arguments[1];
            }
        }else if(arguments.length===3){
            content = arguments[0];
            delay = arguments[1];
            callback = arguments[2];
        }
        var body = document.getElementsByTagName("body")[0];
        var ele = document.getElementById(this.getSetting('root'));
        if(typeof ele === 'undefined'||ele === null){
            ele = document.createElement("div");
            ele.innerHTML = '<div class="custom_mask_transparent"></div><div class="mini_toast"><p class="mini_toast_content">'+content+'</p></div>';
            ele.style.display = 'none';
            ele.id = this.getSetting('root');
            body.appendChild(ele);
        }else{
            ele.innerHTML = '<div class="custom_mask_transparent"></div><div class="mini_toast"><p class="mini_toast_content">'+content+'</p></div>';
        }
        //register hide event
        var mask = document.getElementsByClassName("custom_mask_transparent")[0];
        mask.onclick = function(){
            ele.style.display = 'none';
            callback();
        };
        if (ele.style.display!=='none') {
            if(this.getSetting("logger")){
                console.warn('already shown');
            }
            return;
        }
        ele.style.display = 'block';
        if (autoHide) {
            setTimeout(function () {
                ele.style.display = 'none';
                callback();
            },delay);
        }
        if(this.getSetting("logger")){
            console.log("show toast end");
        }
    };
    //toogle
    this.toogle = function(){
        var ele = document.getElementById(this.getSetting('root'));
        if(typeof ele === 'undefined' || ele === null || ele.style.display === 'none'){
            this.show(arguments);
        }else{
            this.hide();
        }
    };
    //constructor
    constructor = this.initToast(options);
    //make sure there is a constructor
    if (Toast._initialized === "undefined") {
        Toast.prototype.constructor = this.initToast(options);        
        Toast._initialized = true;
    }
}
//point a toast object to window.toast
window.toast = new Toast();
