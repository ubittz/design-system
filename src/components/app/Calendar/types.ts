import React from 'react';

export type CalendarView = 'calendar' | 'year' | 'month';

export type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
};

type CalendarBaseProps = {
  showButton?: boolean;
  showDayHeader?: boolean;
  minDate?: Date;
  maxDate?: Date;
  onCancel?: () => void;
  onConfirm?: () => void;
  className?: string;
  style?: React.CSSProperties;
};

type CalendarSingleProps = CalendarBaseProps & {
  mode?: 'single';
  value?: Date | null;
  onChange?: (date: Date) => void;
};

type CalendarRangeProps = CalendarBaseProps & {
  mode: 'range';
  value?: [Date, Date] | null;
  onChange?: (range: [Date, Date] | null) => void;
};

export type CalendarProps = CalendarSingleProps | CalendarRangeProps;
