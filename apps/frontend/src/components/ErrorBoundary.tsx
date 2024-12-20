import React, { PropsWithChildren } from "react";
import { FallbackProps, ErrorBoundary as ReactErrorBoundary, useErrorBoundary } from "react-error-boundary";
import { Button, Box, Typography } from "@mui/material";

const ErrorFallback: React.FC<FallbackProps> = ({ error }) => {
    const { resetBoundary } = useErrorBoundary()
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
            }}
        >
            <Typography variant="h4" color="error" gutterBottom>
                Something went wrong!
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ marginBottom: "16px" }}>
                {error.message}
            </Typography>
            <Button variant="contained" onClick={resetBoundary}>
                Try Again
            </Button>
        </Box>
    );
};

const ErrorBoundary = ({ children, onReset }: PropsWithChildren<{ onReset?: () => void, sentryDsn?: string }>) => {
    return (
        <ReactErrorBoundary
            FallbackComponent={ErrorFallback}
        >
            {children}
        </ReactErrorBoundary>
    );
};

export default ErrorBoundary;
