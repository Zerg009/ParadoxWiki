export class ParadoxInfo {
    id: number;
    title: string;
    author: string;
    description: string;

    constructor(obj: { id: number, title: string, author: string, description: string }) {
        this.id = obj.id;
        this.title = obj.title;
        this.author = obj.author;
        this.description = obj.description;
    }
}
