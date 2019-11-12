function getNumberOfPages(resultsPerPage, numberOfResults){
    let numberOfPages = numberOfResults/resultsPerPage;
    return Math.ceil(numberOfPages);
}