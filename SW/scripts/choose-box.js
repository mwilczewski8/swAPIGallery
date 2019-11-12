class ChooseBox{
    constructor(title, imgSrc, clickHandler){ 
        this.title = title;
        this.imgSrc = imgSrc;
        this.clickHandler = clickHandler;
        this.boxHeader;
        this.body;
        this.render();
    }
    render(){
        this.initBoxHeader();
        this.initBoxBody();
        this.addBinds();
    }
    initBoxHeader(){
        this.boxHeader = $('<span class="box-header"></span>');
        this.boxHeader.text(this.title);
    }
    initBoxBody(){
        this.body = $('<div class="choose-box col-4 col-md-2">');
        this.body.attr('id', this.title);
        this.body.append(this.boxHeader);
        let image = $('<img class="choose-image" src="'+this.imgSrc+'"/>');
        this.body.append(image);
    }
    addBinds(){
        this.body.click(()=>{
            $('.choose-box').removeClass('clicked');
            this.body.addClass('clicked');
            this.clickHandler.fire(this.title);
        });
    }
}

