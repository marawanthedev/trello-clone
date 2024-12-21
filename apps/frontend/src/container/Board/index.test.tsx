import { Board } from './index';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CardStatus } from '../../../../../packages/constants';
import { BoardProvider } from '../../context';
import '@testing-library/jest-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ErrorBoundary from '../../components/ErrorBoundary';

describe('Board Component', () => {
  const moveCard = vi.fn();
  const handleAddCard = vi.fn();
  const handleRemoveCard = vi.fn();
  const handleUpdateCardContent = vi.fn();

  const renderBoard = () => {
    render(
      <ErrorBoundary>
        <DndProvider backend={HTML5Backend}>
          <BoardProvider
            value={{
              moveCard,
              addCard: handleAddCard,
              removeCard: handleRemoveCard,
              updateCardContent: handleUpdateCardContent,
            }}
          >
            <Board />
          </BoardProvider>
        </DndProvider>
      </ErrorBoundary>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render properly', () => {
    renderBoard();
    expect(screen.getByText('pending')).toBeInTheDocument();
    expect(screen.getByText('inprogress')).toBeInTheDocument();
    expect(screen.getByText('done')).toBeInTheDocument();
  });
});
