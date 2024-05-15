export class ParadoxInfo {
    id: number;
    title: string;
    author: string;
    description: string;
    tech_name: string;
    constructor(obj: { id: number, title: string, author: string, description: string , tech_name: string}) {
        this.id = obj.id;
        this.title = obj.title;
        this.author = obj.author;
        this.description = obj.description;
        this.tech_name = obj.tech_name;
    }
}