import { Stack, Paper, Typography, TextField, Button } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { checkTokenRequest, createAccountRequest, loginRequest } from '../../../interface/requests';
import "./style.css";

export interface LoginPageProps {
    onLogin: () => void,
}

// TODO: Warn user if error
/**
 * Page that displays a login form and a create account form.
 * onLogin is called with a token when the user logged in.
 */
const LoginPage = (props: LoginPageProps) => {
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isCreateLoading, setIsCreateLoading] = useState(false);

    // Sends a login request and handles the response
    const login = (email: string, password: string) => {
        loginRequest(email, password, {
            onSuccess: (json) => {
                setIsLoginLoading(false);
                setIsCreateLoading(false);
                props.onLogin();
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

        const name = data.get('username')?.toString()
        const email = data.get('email')?.toString()
        const password = data.get('password')?.toString()

        if (!name || !email || !password) {
            return;
        }

        createAccount(name, email, password)
    };

    // Automatically login if valid token
    const checkToken = () => {
        checkTokenRequest({
            onSuccess: (json) => props.onLogin(),
            onError: (json) => {},
        })
    }

    React.useEffect(() => {
        checkToken();
    }, []);

    return (
        <div id="login-page">
            <Stack>
                <Paper>
                    <Stack spacing={1} component="form" onSubmit={handleLoginSubmit}>
                        <Typography component="h1" variant="h5">
                            Logga in
                        </Typography>
                        <TextField
                            id="outlined-required"
                            required
                            label="Mejladress"
                            type="text"
                            name="email"
                            autoComplete="email"
                        />
                        <TextField
                            id="outlined-required"
                            required
                            label="Lösenord"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                        />
                        <Button disabled={isLoginLoading} variant="contained" type="submit">Logga in</Button>
                    </Stack>
                </Paper>
                <Paper>
                    <Stack spacing={1} component="form" onSubmit={handleCreateSubmit}>
                        <Typography component="h1" variant="h5">
                            Skapa konto
                        </Typography>
                        <TextField
                            id="outlined-required"
                            required
                            label="Användarnamn"
                            type="text"
                            name="username"
                            autoComplete="username"
                        />
                        <TextField
                            id="outlined-required"
                            required
                            label="Mejladress"
                            type="text"
                            name="email"
                            autoComplete="email"
                        />
                        <TextField
                            id="outlined-required"
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
        </div>
    )
}

export default LoginPage;