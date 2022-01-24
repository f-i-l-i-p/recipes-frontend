import { User } from "../../types/ingredient";

export interface Friends {
    currentFriends: User[],
    incomingRequests: User[],
    outgoingRequests: User[],
}
