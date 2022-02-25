import { ReactNode } from 'react';

export type InstructionsListType = {
  title: string;
  text: string;
  component?: ReactNode;
};
export type InstructionsListTypeWithIndex = InstructionsListType & {
  index: number;
};
