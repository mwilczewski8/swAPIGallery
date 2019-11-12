class ShowContainer{
    constructor(){
        this.body;
        this.contentRow;
        this.infoContainer;
        this.header;
        this.title;
        this.searchBar;
        this.resultList;
        this.init();
    }
    init(){
        this.body = $('.show-container');
        this.contentRow = $('.content-row');
        this.infoContainer = $('#info-container');
    }
    renderElements(){
        this.header = $('<h2 class="show-header">P</h2>');
        this.body.find('#title-row-c1').append(this.header);
        this.searchBar = new Searchbar('Search To Do...');
        this.body.find('#title-row-c2').append(this.searchBar.body);
        this.pager = new Pager();
        this.contentRow.append(this.pager.body);
        this.pager.onPageChange.add((pageNumber)=>{
            this.loadPage(pageNumber);
        });
        this.searchBar.onSearch.add(()=>{
            //To Do;
        });
    }
    async loadPage(pageNumber){
        this.clear();
        this.pager.blockButtons();
        let actualPage = await getPage(this.title, pageNumber);
        this.pager.unblockButtons();
        this.showActualPageResults(actualPage);
        //this.selectFirstResult();
    }
    async initContent(title){
        this.changeTitle(title);
        let firstPage = await getPage(title, 1);  
        this.pager.setNumbers(1, getNumberOfPages(10, firstPage.count));
        this.showActualPageResults(firstPage);
        this.selectFirstResult();
    }
    changeTitle(title){
        this.header.text(title);
        this.title = title;
    }
    setName(name){
        $('#name').text(name);
    }
    setImage(srcFromAnotherApi){
        $('#image').attr('src', './images/basic.jpg');
        //ToDo
    }
    clear(){
        $('.result').remove();
    }
    showActualPageResults(page){
        this.clear();
        this.resultList = [];
        let list = $('<div id="result-list"></div>');
        page.results.forEach((res, i)=>{
            let resultButton = $('<div class="result"></div>');
            let buttonText = (i + 1 + (this.pager.pageNumber)*10 - 10) + ". ";
            if(res.name)
                buttonText += res.name;
            else
                buttonText += res.title;
            resultButton.text(buttonText);
            list.append(resultButton); 
            this.resultList.push({
                button:resultButton,
                data:res
            });
        });
        $('#pages-container').append(list);
        this.bindResults();
    }
    selectFirstResult(){
        this.resultList[0].button.click();
    }
    bindResults(){
        this.resultList.forEach((result)=>{
            result.button.click((e)=>{
                $('.result').removeClass('result-selected');
                $(e.target).addClass('result-selected');
                let information = this.prepareData(result.data);
                this.showInformation(information);
            });
        });
    }
    prepareData(data){
        delete data['edited'];
        delete data['created'];
        delete data['url'];
        let information = [];
        for (var key in data) {
            let newKey = key[0].toUpperCase() + key.slice(1);
            let newData = data[key].toString();
            information.push({field:newKey, value:newData});
        }
        return information;
    }
    prepareFieldName(name){
        let fieldName = name
        if(fieldName.includes('_')){
            let fieldSplit = fieldName.split('_');
            fieldName = fieldSplit[0] + " " + fieldSplit[1];
        }  
        return fieldName;
    }
    async showInformation(information){
        $('.info-data').remove();
        let info = $('<div class="info-data"></div>');
        information.forEach(async(i, indx)=>{
            let fieldName = this.prepareFieldName(i.field);
            let value = i.value;
            if(indx == 0)
                this.setName(value);
            let dataRow;
            if(!value.includes('https'))
                dataRow = $('<div><span class="field-name">'+fieldName+': </span><span>'+i.value+'</span></div>');
            else{
                let valuesSplit = value.split(',');
                let names = '';
                let spanBody = $('<span></span>');
                valuesSplit.forEach(async(https)=>{
                    let valueData = await urlRequest(https);
                    let name = valueData.name;
                    if(valueData.title)
                        name = valueData.title;
                    names += name;
                    names += ", ";
                    spanBody.text(names.substr(0,names.length-2));
                });
                dataRow = $('<div><span class="field-name">'+fieldName+': </span></div>');
                dataRow.append(spanBody);
            }
            info.append(dataRow);
        })
        this.infoContainer.append(info);
        this.setImage('src from another api');
    }
    
}

