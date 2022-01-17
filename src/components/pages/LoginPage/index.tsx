import { CircularProgress } from '@material-ui/core';
import { Stack, Paper, Typography, TextField, Button } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { BasePage, setBasePage } from '../../../features/navigation/navigationSlice';
import { checkTokenRequest, createAccountRequest, loginRequest } from '../../../interface/requests';
import CarrotLoading from '../../CarrotLoading';

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
        dispatch(setBasePage(BasePage.RecipeList))
    }

    // Automatically login if valid token
    const checkToken = () => {
        checkTokenRequest({
            onSuccess: (json) => { onLogin(); },
            onError: (json) => { setStartupLoading(false) },
        })
    }

    // Sends a login request and handles the response
    const login = (email: string, password: string) => {
        loginRequest(email, password, {
            onSuccess: (json) => {
                setIsLoginLoading(false);
                setIsCreateLoading(false);
                onLogin();
            },
            onError: (json) => {
                setIsLoginLoading(false);
                setIsCreateLoading(false);
            },
        })
    }

    // Sends a create account request and handles the response
    const createAccount = (name: string, email: string, password: string) => {
        createAccountRequest(name, email, password, {
            onSuccess: (json) => {
                login(email, password)
            },
            onError: (json) => {
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
                <CarrotLoading style={{position: "fixed", margin: "auto", left: 0, right: 0, bottom: 0, top: 0}} />
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