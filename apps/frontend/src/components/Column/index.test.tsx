import React from 'react';
import { Column } from './index';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CardStatus } from '../../constants';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BoardProvider } from '../../context';
import '@testing-library/jest-dom';

describe('Column Component', () => {
  const cards = [{ id: 1, content: 'test', status: CardStatus.INPROGRESS }];

  const moveCard = vi.fn();
  const handleAddCard = vi.fn();
  const handleRemoveCard = vi.fn();
  const handleUpdateCardContent = vi.fn();

  const renderColumn = () => {
    render(
      <BoardProvider
        value={{
          moveCard,
          addCard: handleAddCard,
          removeCard: handleRemoveCard,
          updateCardContent: handleUpdateCardContent,
        }}
      >
        <DndProvider backend={HTML5Backend}>
          <Column cards={cards} title={CardStatus.INPROGRESS} />
        </DndProvider>
      </BoardProvider>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render properly', () => {
    renderColumn();
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should render column title correctly', () => {
    renderColumn();
    expect(screen.getByText('inprogress')).toBeInTheDocument();
  });

  it('should call handleAddCard when Add New Card button is clicked', () => {
    renderColumn();
    const addCardButton = screen.getByText('Add New Card');
    fireEvent.click(addCardButton);
    expect(handleAddCard).toHaveBeenCalled();
  });

  it('should list all cards', () => {
    renderColumn();
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should call moveCard when a card is dropped', () => {
    renderColumn();
    const cardItem = screen.getByText('test');
    fireEvent.dragStart(cardItem);
    fireEvent.drop(cardItem);
    expect(moveCard).toHaveBeenCalled();
  });
});
