class Container{
    constructor(){
        this.body = $('.container');
        this.chooseContainer;
        this.showContainer;
    }
    init(){
        this.renderChooseBox();
        this.renderShowContainer();
        this.addBinds();
        this.loadFirstPage();
    }
    renderChooseBox(){
        this.chooseContainer = new ChooseBoxContainer();
        this.body.append(this.chooseContainer.body);
    }
    renderShowContainer(){
        this.showContainer = new ShowContainer();
        this.body.append(this.showContainer.body);
        this.showContainer.renderElements();
    }
    addBinds(){
        this.chooseContainer.onClick.add((boxName)=>{
            this.showContainer.clear();
            this.showContainer.initContent(boxName);
        });
    }
    loadFirstPage(){
        this.showContainer.initContent('people');
        this.chooseContainer.cBoxes.people.body.addClass('clicked');
    }
}

