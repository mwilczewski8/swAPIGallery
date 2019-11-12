class ChooseBoxContainer{
    constructor(){
        this.onClick = $.Callbacks();
        this.body;
        this.cBoxes = {
            people:null,
            starships:null,
            vechicles:null,
            species:null,
            planets:null,
            movies:null
        }
        this.render();
    }
    render(){
        this.initBody();
        this.initChooseBoxes();
        this.body.append(this.cBoxes.people.body, this.cBoxes.starships.body);
        this.body.append(this.cBoxes.vechicles.body, this.cBoxes.species.body);
        this.body.append(this.cBoxes.planets.body, this.cBoxes.movies.body);
    }
    initBody(){
        this.body = $('<div class="choose-boxes row">');
    }
    initChooseBoxes(){
        this.cBoxes.people = new ChooseBox('people', 'images/people.png', this.onClick);
        this.cBoxes.starships = new ChooseBox('starships', 'images/starships.png', this.onClick);
        this.cBoxes.vechicles = new ChooseBox('vechicles', 'images/vechicles.png', this.onClick);
        this.cBoxes.species = new ChooseBox('species', 'images/species.png', this.onClick);
        this.cBoxes.planets = new ChooseBox('planets', 'images/planets.png', this.onClick);
        this.cBoxes.movies = new ChooseBox('films', 'images/films.png', this.onClick);
    }
}

