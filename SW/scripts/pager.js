class Pager{
    constructor(){
        this.body;
        this.pageCounter;
        this.nextButton;
        this.prevButton;
        this.pageNumber;
        this.lastPageNumber;
        this.onPageChange = $.Callbacks();
        this.block = false;
        this.init();
    }
    init(){
        this.nextButton = $('<span class="pager-button" id="pButton-next"><i class="fas fa-arrow-right"></i></span>');
        this.prevButton = $('<span class="pager-button" id="pButton-prev"><i class="fas fa-arrow-left"></i></span>');
        this.pageCounter = $('<span id="page-counter"></span>');
        this.body = $('<div class="col-12" id="pager">');
        this.body.append(this.prevButton, this.pageCounter, this.nextButton);
    }
    setNumbers(actual, max){
        let counterText = actual + "/" + max;
        this.pageCounter.text(counterText);
        this.pageNumber = actual;
        this.lastPageNumber = max;
        this.bind();
    }
    blockButtons(){
        this.block = true;
    }
    unblockButtons(){
        this.block = false;
    }
    bind(){
        this.prevButton.unbind('click').bind('click', ()=>{
            if(this.pageNumber == 1 || this.block)
                return;
            this.setNumbers(this.pageNumber-1, this.lastPageNumber);
            this.onPageChange.fire(this.pageNumber);
        })
        this.nextButton.unbind('click').bind('click', ()=>{
            if(this.pageNumber == this.lastPageNumber || this.block)
                return;
            this.setNumbers(this.pageNumber+1, this.lastPageNumber);
            this.onPageChange.fire(this.pageNumber);
        })
    }
}

