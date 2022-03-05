import { Stack, Paper, Typography, TextField, Button } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { replacePage, setShowNavigation } from '../../../features/navigation/navigationSlice';
import { checkTokenRequest, createAccountRequest, loginRequest } from '../../../helpers/requests/routes';
import CarrotLoading from '../../CarrotLoading';
import { fetchFriends } from "../../../features/friends/friendsSlice";
import RecipeListPage from '../../../features/recipeList/RecipeList';

// TODO: Warn user if error
/**
 * Page that displays a login form and a create account form.
 * onLogin is called with a token when the user logged in.
 */
const LoginPage = () => {
    const dispatch = useAppDispatch()

    const [isStartupLoading, setStartupLoading] = useState(true);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isCreateLoading, setIsCreateLoading] = useState(false);

    const onLogin = () => {
        dispatch(fetchFriends())
        dispatch(setShowNavigation(true))
        dispatch(replacePage(<RecipeListPage />))
    }

    // Automatically login if valid token
    const checkToken = () => {
        checkTokenRequest({
            onSuccess: () => { onLogin(); },
            onError: () => { setStartupLoading(false) },
        })
    }

    // Sends a login request and handles the response
    const login = (email: string, password: string) => {
        loginRequest(email, password, {
            onSuccess: () => {
                setIsLoginLoading(false);
                setIsCreateLoading(false);
                onLogin();
            },
            onError: (res) => {
                setIsLoginLoading(false);
                setIsCreateLoading(false);

                if (res.data.msg === "Wrong email or password") {
                    alert("Fel mejladress eller lösenord")
                }
            },
        })
    }

    // Sends a create account request and handles the response
    const createAccount = (name: string, email: string, password: string) => {
        createAccountRequest(name, email, password, {
            onSuccess: () => {
                login(email, password)
            },
            onError: () => {
                setIsCreateLoading(false);
            }
        })
    }

    const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        setIsLoginLoading(true);

        const email = data.get('email')?.toString()
        const password = data.get('password')?.toString()

        if (!email || !password) {
            return;
        }

        login(email, password)
    };

    const handleCreateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        setIsCreateLoading(true);

        const name = data.get('display-name')?.toString()
        const email = data.get('email')?.toString()
        const password = data.get('password')?.toString()

        if (!name || !email || !password) {
            return;
        }

        createAccount(name, email, password)
    };

    React.useEffect(() => {
        checkToken();
    }, []);

    return (
        <div id="login-page">
            {isStartupLoading ?
                <CarrotLoading style={{ position: "fixed", margin: "auto", left: 0, right: 0, bottom: 0, top: 0 }} />
                :
                <Stack spacing={3} sx={{ maxWidth: "400px", alignSelf: "center", margin: "auto" }}>
                    <Paper sx={{ p: "16px" }}>
                        <Stack spacing={1} component="form" onSubmit={handleLoginSubmit}>
                            <Typography component="h1" variant="h5">
                                Logga in
                            </Typography>
                            <TextField
                                id="email"
                                required
                                label="Mejladress"
                                type="email"
                                name="email"
                                autoComplete="email"
                            />
                            <TextField
                                id="current-password"
                                required
                                label="Lösenord"
                                type="password"
                                name="password"
                                autoComplete="current-password"
                            />
                            <Button disabled={isLoginLoading} variant="contained" type="submit">Logga in</Button>
                        </Stack>
                    </Paper>
                    <Paper sx={{ p: "16px" }}>
                        <Stack spacing={1} component="form" onSubmit={handleCreateSubmit}>
                            <Typography component="h1" variant="h5">
                                Skapa konto
                            </Typography>
                            <TextField
                                required
                                label="Användarnamn"
                                name="display-name"
                                autoComplete="off"
                            />
                            <TextField
                                id="email"
                                required
                                label="Mejladress"
                                type="email"
                                name="email"
                                autoComplete="email"
                            />
                            <TextField
                                id="new-password"
                                required
                                label="Lösenord"
                                type="password"
                                name="password"
                                autoComplete="new-password"
                            />
                            <Button disabled={isCreateLoading} variant="contained" type="submit">Skapa</Button>
                        </Stack>
                    </Paper>
                </Stack>
            }
        </div>
    )
}

export default LoginPage;