class Searchbar{
    constructor(placeholder){
        this.body;
        this.input;
        this.button;
        this.onSearch = $.Callbacks();
        this.placeholder = placeholder;
        this.render();
    }
    render(){
        this.body = $('<div class="sw-searchbar row"></div>');
        let col10 = $('<div class="col-10" class="sb-c10"></div>');
        let col2 = $('<div class="col-2" class="sb-c2" style="padding:0"></div>');
        this.input = $('<input class="sw-searchbar-input" placeholder="'+this.placeholder+'" type="text"></input>');
        this.button = $('<span class="sw-searchbar-button"><i class="fas fa-search search-icon"></i></span>');
        col10.append(this.input);
        col2.append(this.button);
        this.body.append(col10,col2);
    }
    addBinds(){
        this.button.click(()=>{
            this.onSearch.fire();
        })
    }
}

