async function getPeopleFromPage(pageNumber){
    let result = await swapiModule.getPeople({page:pageNumber});
    console.log(result);
    return result;
}
async function getVechiclesFromPage(pageNumber){
    let result = await swapiModule.getVehicles({page:pageNumber});
    console.log(result);
    return result;
}
async function getStarshipsFromPage(pageNumber){
    let result = await swapiModule.getStarships({page:pageNumber});
    console.log(result);
    return result;
}
async function getSpeciesFromPage(pageNumber){
    let result = await swapiModule.getAllSpecies({page:pageNumber});
    console.log(result);
    return result;
}
async function getPlanetsFromPage(pageNumber){
    let result = await swapiModule.getPlanets({page:pageNumber});
    console.log(result);
    return result;
}
async function getFilmsFromPage(pageNumber){
    let result = await swapiModule.getFilms({page:pageNumber});
    console.log(result);
    return result;
}
async function getPeopleByName(name){
    let result = await swapiModule.getPeople({search:name});
}
async function getPage(title, number){
    let page;
    switch (title) {
        case 'people':
            page = await getPeopleFromPage(number);
            break;
        case 'vechicles':
            page = await getVechiclesFromPage(number);
            break;
        case 'starships':
            page = await getStarshipsFromPage(number); 
            break;
        case 'species':
            page = await getSpeciesFromPage(number);
            break;
        case 'films':
            page = await getFilmsFromPage(number);
            break;
        case 'planets':
            page = await getPlanetsFromPage(number);
            break;
    }
    return page;
}
async function urlRequest(url){
    var promise = new Promise((resolve, reject)=>{
        fetch(url).then(function(response){
            if(response.status !== 200){
                console.log('status code: ' + response.status);
                return;
            }
            response.json().then(function(data) {
                resolve(data);
            });
        })
        .catch(function(err) {
            console.log('error: ', err);
        });
    });
    return promise;
}