import { CardItem } from './index';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { CardStatus } from '../../../../../packages/constants';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BoardProvider } from '../../context';

describe('CardItem Component', () => {
  const card = { id: 1, content: 'test', status: CardStatus.INPROGRESS };

  const moveCard = vi.fn();
  const handleAddCard = vi.fn();
  const handleRemoveCard = vi.fn();
  const handleUpdateCardContent = vi.fn();

  const renderCardItem = () => {
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
          <CardItem card={card} sourceColumn={CardStatus.DONE} />
        </DndProvider>
      </BoardProvider>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render card content correctly', () => {
    renderCardItem();
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should display a text field when the card content is clicked', () => {
    renderCardItem();
    const cardItem = screen.getByText('test');
    fireEvent.click(cardItem);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should call handleUpdateCardContent when card content is changed', () => {
    renderCardItem();
    const cardItem = screen.getByText('test');
    fireEvent.click(cardItem);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new content' } });
    expect(handleUpdateCardContent).toHaveBeenCalled();
  });

  it('should call handleUpdateCardContent upon content change and blur after clicking the card', () => {
    renderCardItem();

    const cardItem = screen.getByText('test');
    fireEvent.click(cardItem);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new content' } });
    fireEvent.blur(input);

    expect(handleUpdateCardContent).toHaveBeenCalled();
  });

  it('should not call handleUpdateCardContent if content has not changed upon blur after clicking the card', () => {
    renderCardItem();

    const cardItem = screen.getByText('test');
    fireEvent.click(cardItem);

    const input = screen.getByRole('textbox');
    fireEvent.blur(input);

    expect(handleUpdateCardContent).not.toHaveBeenCalled();
  });

  it('should call handleRemoveCard upon clicking the delete button', () => {
    renderCardItem();
    const deleteButton = screen.getByTestId('delete-card');
    fireEvent.click(deleteButton);

    expect(handleRemoveCard).toHaveBeenCalled();
  });
});
