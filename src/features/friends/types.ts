import { User } from "../../helpers/requests/types";

export interface Friends {
    currentFriends: User[],
    incomingRequests: User[],
    outgoingRequests: User[],
}
