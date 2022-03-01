// 3rd party
import React, { ReactNode, useMemo } from 'react';
import { Container, Grid } from '@mui/material';
// local
import { InstructionsListType } from '../../../../store';
import { InstructionsListItem } from './InstructionsListItem';
import { StyledFAQButton, StyledStack } from '../styles';

const FAQItem = ({
  index,
  onFAQClick
}: {
  index: number;
  onFAQClick: () => void;
}) => {
  const component = (
    <StyledFAQButton color="primary" variant="contained" onClick={onFAQClick}>
      Learn More
    </StyledFAQButton>
  );
  return (
    <InstructionsListItem
      instruction={{
        title: 'Got questions?',
        text: 'Take a look at our FAQ page to learn more.',
        component,
        index: index + 1
      }}
      key={'grid-item-faq'}
    />
  );
};

const getInstructionListColumn = (
  instructions: InstructionsListType[],
  maxColumns: number,
  maxItemsPerColumn: number,
  onFAQClick: () => void
) => {
  const columns: ReactNode[] = [];
  let columnItems: ReactNode[] = [];
  const pushColumns = (items: ReactNode[], isLastItem?: boolean) => {
    columns.push(
      <StyledStack
        spacing={2}
        sx={(theme) => ({
          mx: theme.breakpoints.down('md') ? '16px' : '0'
        })}>
        {items}
        {isLastItem ? (
          <FAQItem index={instructions?.length} onFAQClick={onFAQClick} />
        ) : null}
      </StyledStack>
    );
    columnItems = [];
  };
  instructions.forEach((instruction: InstructionsListType, index: number) => {
    if (maxItemsPerColumn === index) {
      pushColumns(columnItems);
    }
    columnItems.push(
      <InstructionsListItem
        instruction={{ ...instruction, index: index + 1 }}
        key={'grid-item' + index}
      />
    );
    if (instructions?.length - 1 === index) {
      pushColumns(columnItems, true);
    }
  });
  return columns;
};

export const InstructionListSection = ({
  instructions,
  maxColumns = 2,
  onFAQClick
}: {
  instructions: InstructionsListType[];
  maxColumns?: number;
  onFAQClick: () => void;
}) => {
  const maxItemsPerColumn: number = useMemo(
    () => Math.round(instructions?.length / maxColumns),
    [maxColumns]
  );
  const gridMDSize: number = useMemo(
    () => Math.round(12 / maxColumns),
    [maxColumns]
  );
  const instructionListColumns = getInstructionListColumn(
    instructions,
    maxColumns,
    maxItemsPerColumn,
    onFAQClick
  );

  return (
    <Container sx={{ padding: '16px 0' }}>
      <Grid container spacing={2}>
        {instructionListColumns?.map((column: ReactNode, index: number) => (
          <Grid item md={gridMDSize} key={'grid-column-' + index}>
            {column}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
