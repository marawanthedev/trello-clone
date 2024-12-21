import ErrorBoundary from './index';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('ErrorBoundary Component', () => {
  // what else could be tested?
  // 1-async errors
  // 2- nested error boundaries
  // 3- reset error boundary and seeing container content again
  // sadly no time but just thought of sharing what i had in mind

  const ErrorComponent = () => {
    throw new Error('Test Error');
  };

  it('should render error message when an error is thrown', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
  });

  it('should show try again button when fallback is shown', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>,
    );

    const tryAgainButton = screen.getByText('Try Again');
    expect(tryAgainButton).toBeInTheDocument();
  });
});
