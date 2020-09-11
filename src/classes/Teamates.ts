class Teamate {
    name: string;
    skill: string;
    description : string;
    img : string;

    constructor (name: string , skill:string , description:string , img : string) {
        this.name = name;
        this.skill = skill;
        this.img = img;
        this.description = description;
    }
}

export default Teamate;