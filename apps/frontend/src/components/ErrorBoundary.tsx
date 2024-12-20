import React, { PropsWithChildren, useEffect } from "react";
import {
    FallbackProps,
    ErrorBoundary as ReactErrorBoundary,
    useErrorBoundary,
} from "react-error-boundary";
import { Button, Box, Typography } from "@mui/material";

// NOTE
// we could also add sentry to log errors to our dashboard as it will help in catching errors in prod that are not reproducible in dev

const ErrorFallback: React.FC<FallbackProps> = ({ error }) => {
    const { resetBoundary, showBoundary } = useErrorBoundary();

    useEffect(() => {
        // these are added to catch unhandled errors and promise rejections that happens async which are naturally not caught by react error boundary, but this way we still utilize the error boundary to show the error page
        const errorHandler = (event: ErrorEvent) => {
            console.error("Unhandled error:", event.error);
            showBoundary(event.error);
        };

        const promiseRejectionHandler = (event: PromiseRejectionEvent) => {
            console.error("Unhandled promise rejection:", event.reason);
            showBoundary(event.reason)
        };

        window.addEventListener("error", errorHandler);
        window.addEventListener("unhandledrejection", promiseRejectionHandler);

        return () => {
            window.removeEventListener("error", errorHandler);
            window.removeEventListener("unhandledrejection", promiseRejectionHandler);
        };
    }, []);


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
            <Typography
                variant="body1"
                color="textSecondary"
                sx={{ marginBottom: "16px", maxWidth: "600px" }}
            >
                {error.message}
            </Typography>
            <Button variant="contained" onClick={resetBoundary}>
                Try Again
            </Button>
        </Box>
    );
};

const ErrorBoundary = ({ children }: PropsWithChildren<{}>) => {
    return (
        <ReactErrorBoundary FallbackComponent={ErrorFallback}>
            {children}
        </ReactErrorBoundary>
    );
};

export default ErrorBoundary;
