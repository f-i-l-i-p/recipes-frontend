import { Stack, Paper, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';
import "./style.css";

const LoginPage = () => {
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isCreateLoading, setIsCreateLoading] = useState(false);

    const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        setIsLoginLoading(true);

        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const handleCreateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        setIsCreateLoading(true);

        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <div id="login-page">
            <Stack>
                <Paper>
                    <Stack spacing={1} component="form" onSubmit={handleLoginSubmit}>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <TextField
                            id="outlined-required"
                            required
                            label="Email"
                            type="text"
                            name="email"
                            autoComplete="email"
                        />
                        <TextField
                            id="outlined-required"
                            required
                            label="Password"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                        />
                        <Button disabled={isLoginLoading} variant="contained" type="submit">Sign in</Button>
                    </Stack>
                </Paper>
                <Paper>
                    <Stack spacing={1} component="form" onSubmit={handleCreateSubmit}>
                        <Typography component="h1" variant="h5">
                            Create account
                        </Typography>
                        <TextField
                            id="outlined-required"
                            required
                            label="Username"
                            type="text"
                            name="username"
                            autoComplete="username"
                        />
                        <TextField
                            id="outlined-required"
                            required
                            label="Email"
                            type="text"
                            name="email"
                            autoComplete="email"
                        />
                        <TextField
                            id="outlined-required"
                            required
                            label="Password"
                            type="password"
                            name="password"
                            autoComplete="new-password"
                        />
                        <Button disabled={isCreateLoading} variant="contained" type="submit">Create</Button>
                    </Stack>
                </Paper>
            </Stack>
        </div>
    )
}

export default LoginPage;