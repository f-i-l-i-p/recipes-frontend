import { CircularProgress, Stack } from "@mui/material";
import React from "react";
import { useState } from "react";
import { latestRecipesRequest } from "../../../interface/requests";

interface Friends {
    incomingRequests: any[],
    outgoingRequests: any[],
    currentFriends: any[],
}

const FriendsPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [friends, setFriends] = useState<Friends>({
        incomingRequests: [], outgoingRequests: [], currentFriends: []
    })

    const request = () => {
        latestRecipesRequest(null, {
            onSuccess: (json: any) => {
                setIsLoading(false)
                // TODO: setFriends
            },
            onError: (json: any) => {
                setIsLoading(false)
            },
        })
    }

    React.useEffect(() => {
        request();
    }, []);

    return (
        <Stack>
            {isLoading &&
                <CircularProgress />
            }
        </Stack>
    )
}

export default FriendsPage