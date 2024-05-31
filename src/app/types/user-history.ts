import { ParadoxInfo } from "./paradox-info";
import { User } from "./user";

export interface UserHistory {
    history_id: number;
    user: User; // Assuming you have a User interface defined
    paradox: ParadoxInfo; // Assuming you have a ParadoxInfo interface defined
    visitTimestamp: Date;
}