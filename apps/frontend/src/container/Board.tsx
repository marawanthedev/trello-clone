import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { Column } from '../components/Column';
import { Box, CircularProgress, Typography, Grid } from '@mui/material';
import { CardStatus } from '../../../../packages/constants';
import { useErrorBoundary } from 'react-error-boundary';
import { Card } from 'types';
import {
  addCardAtom,
  columnsAtom,
  getAllCardsAtom,
  loadingAtom,
  loadingStartAtom,
  removeCardAtom,
  showLoaderAtom,
  updateCardContentAtom,
  updateCardStatusAtom,
} from '../store';
import { BoardProvider } from '../context';
import { useDebouncedCallback } from '../utils';

export const Board: React.FC = () => {
  const [columns, setColumns] = useAtom(columnsAtom);
  const [loading] = useAtom(loadingAtom);
  const [showLoader, setShowLoader] = useAtom(showLoaderAtom);
  const [loadingStart, setLoadingStart] = useAtom(loadingStartAtom);
  const [, addCard] = useAtom(addCardAtom);
  const [, getAllCards] = useAtom(getAllCardsAtom);
  const [, removeCard] = useAtom(removeCardAtom);
  const [, updateCardContent] = useAtom(updateCardContentAtom);
  const [, updateCardStatus] = useAtom(updateCardStatusAtom);
  const { showBoundary } = useErrorBoundary();

  const moveCard = (
    sourceColumn: CardStatus,
    targetColumn: CardStatus,
    card: Card,
  ) => {
    setColumns((prevState) => {
      const sourceCards = [...prevState[sourceColumn]];
      const targetCards = [...prevState[targetColumn]];
      const cardIndex = sourceCards.findIndex((c) => c.id === card.id);

      if (cardIndex > -1) {
        sourceCards.splice(cardIndex, 1);
      }

      if (targetCards.includes(card) === false) {
        targetCards.push(card);
        updateCardStatus({
          id: card.id,
          status: targetColumn as CardStatus,
        }).catch(showBoundary);
      }

      return {
        ...prevState,
        [sourceColumn]: sourceCards,
        [targetColumn]: targetCards,
      };
    });
  };

  const handleAddCard = async (status: CardStatus) => {
    addCard(status).catch(showBoundary);
  };

  const handleRemoveCard = async (card: Card) => {
    removeCard(card).catch(showBoundary);
  };

  const debouncedUpdateCardContent = useDebouncedCallback(
    async (id: number, content: string) => {
      updateCardContent({ id, content }).catch(showBoundary);
    },
    300,
  );

  const handleUpdateCardContent = async (id: number, content: string) => {
    debouncedUpdateCardContent(id, content);
  };

  useEffect(() => {
    getAllCards().catch(showBoundary);
  }, [getAllCards]);

  useEffect(() => {
    let delayTimer: NodeJS.Timeout;
    let hideTimer: NodeJS.Timeout;

    if (loading) {
      setLoadingStart(Date.now());
      delayTimer = setTimeout(() => {
        setShowLoader(true);
      }, 250);
    } else if (showLoader && !loading) {
      const loadDuration = Date.now() - (loadingStart || 0);
      const remainingTime = loadDuration > 500 ? 0 : 500 - loadDuration;

      hideTimer = setTimeout(() => {
        setShowLoader(false);
        setLoadingStart(null);
      }, remainingTime);
    }

    return () => {
      clearTimeout(delayTimer);
      clearTimeout(hideTimer);
    };
  }, [loading, showLoader, loadingStart]);

  return (
    <BoardProvider
      value={{
        moveCard,
        addCard: handleAddCard,
        removeCard: handleRemoveCard,
        updateCardContent: handleUpdateCardContent,
      }}
    >
      <Box sx={{ padding: { xs: '20px', sm: '40px 60px' } }}>
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
          Tasks List
        </Typography>
        {showLoader && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
            }}
          >
            <CircularProgress size={60} />
          </Box>
        )}

        <Grid container spacing={2}>
          {Object.keys(columns).map((colName) => (
            <Grid item key={colName} xs={12} sm={12} md={4}>
              <Column
                title={CardStatus[colName as keyof typeof CardStatus]}
                cards={columns[colName]}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </BoardProvider>
  );
};
