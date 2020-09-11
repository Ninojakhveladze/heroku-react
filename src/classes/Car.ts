class Car {
    id: string;
    manufacturer: string;
    model: string;
    color: string;
    releaseYear: number;
    price: string;
    horsepower: number;
    imageType: string;
    oldPrice: string;

    getDescription() {
        return `მანქანის მახასიათებლები: \nმარკა - ${this.manufacturer} \nფერი - ${this.color} \nმოდელი - ${this.model} \nგამოშვების წელი - ${this.releaseYear} \nცხენის ძალა - ${this.horsepower} \nფასი - ${this.price}`;
    }

    constructor(id: string, manufacturer: string, model: string, color: string, releaseYear: number, price: string, horsepower: number, imageType: string, oldPrice: string) {
        this.id = id;
        this.manufacturer = manufacturer;
        this.model = model;
        this.color = color;
        this.releaseYear = releaseYear;
        this.price = price;
        this.horsepower = horsepower;
        this.imageType = imageType;
        this.oldPrice = oldPrice;
    }
}

export default Car;