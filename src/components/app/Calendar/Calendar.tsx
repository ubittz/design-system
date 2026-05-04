'use client';

import React, { useState, useMemo, useCallback } from 'react';

import { RoundStroke } from '../../../icons';
import { cn } from '../../../utils/cn';
import { Button } from '../Button';
import { CalendarProps, CalendarView, CalendarDay } from './types';
import { getCalendarDays, isSameDay, isInRange, isDateDisabled } from './utils';

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];
const MONTH_LABELS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

export function Calendar(props: CalendarProps): React.JSX.Element {
  const { showButton = false, showDayHeader = true, minDate, maxDate, onCancel, onConfirm, className, style } = props;

  const mode = props.mode ?? 'single';

  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState<number>(() => {
    if (mode === 'single') {
      const v = (props as { value?: Date | null }).value;
      if (v) return v.getFullYear();
    }
    if (mode === 'range') {
      const v = (props as { value?: [Date, Date] | null }).value;
      if (v) return v[0].getFullYear();
    }
    return today.getFullYear();
  });
  const [viewMonth, setViewMonth] = useState<number>(() => {
    if (mode === 'single') {
      const v = (props as { value?: Date | null }).value;
      if (v) return v.getMonth();
    }
    if (mode === 'range') {
      const v = (props as { value?: [Date, Date] | null }).value;
      if (v) return v[0].getMonth();
    }
    return today.getMonth();
  });
  const [view, setView] = useState<CalendarView>('calendar');
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const days = useMemo(() => getCalendarDays(viewYear, viewMonth), [viewYear, viewMonth]);

  const [yearPage, setYearPage] = useState(0);
  const yearList = useMemo(() => {
    const base = viewYear + yearPage * 9;
    const start = base - 4;
    return Array.from({ length: 9 }, (_, i) => start + i);
  }, [viewYear, yearPage]);

  const goPrevMonth = useCallback(() => {
    setViewMonth((m: number) => {
      if (m === 0) {
        setViewYear((y: number) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }, []);

  const goNextMonth = useCallback(() => {
    setViewMonth((m: number) => {
      if (m === 11) {
        setViewYear((y: number) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }, []);

  const handleDayClick = useCallback(
    (day: CalendarDay) => {
      if (isDateDisabled(day.date, minDate, maxDate)) return;

      if (!day.isCurrentMonth) {
        setViewYear(day.date.getFullYear());
        setViewMonth(day.date.getMonth());
      }

      if (mode === 'single') {
        const singleProps = props as Extract<CalendarProps, { mode?: 'single' }>;
        singleProps.onChange?.(day.date);
      } else {
        const rangeProps = props as Extract<CalendarProps, { mode: 'range' }>;
        if (!rangeStart) {
          setRangeStart(day.date);
        } else {
          const start = rangeStart;
          const end = day.date;
          if (start.getTime() <= end.getTime()) {
            rangeProps.onChange?.([start, end]);
          } else {
            rangeProps.onChange?.([end, start]);
          }
          setRangeStart(null);
          setHoverDate(null);
        }
      }
    },
    [mode, props, minDate, maxDate, rangeStart]
  );

  const handleYearSelect = useCallback((year: number) => {
    setViewYear(year);
    setView('month');
    setYearPage(0);
  }, []);

  const handleMonthSelect = useCallback((month: number) => {
    setViewMonth(month);
    setView('calendar');
  }, []);

  const getDayCellState = useCallback(
    (day: CalendarDay) => {
      const isToday = isSameDay(day.date, today);
      const disabled = !day.isCurrentMonth || isDateDisabled(day.date, minDate, maxDate);

      let selected = false;
      let inRange = false;
      let isRangeStart = false;
      let isRangeEnd = false;

      if (mode === 'single') {
        const singleProps = props as Extract<CalendarProps, { mode?: 'single' }>;
        if (singleProps.value && isSameDay(day.date, singleProps.value)) {
          selected = true;
        }
      } else {
        const rangeProps = props as Extract<CalendarProps, { mode: 'range' }>;
        if (rangeStart) {
          if (isSameDay(day.date, rangeStart)) {
            selected = true;
            isRangeStart = true;
          }
          if (hoverDate && !isSameDay(rangeStart, hoverDate)) {
            const previewStart = rangeStart.getTime() <= hoverDate.getTime() ? rangeStart : hoverDate;
            const previewEnd = rangeStart.getTime() <= hoverDate.getTime() ? hoverDate : rangeStart;
            if (isSameDay(day.date, previewStart)) {
              isRangeStart = true;
              selected = true;
            }
            if (isSameDay(day.date, previewEnd)) {
              isRangeEnd = true;
              selected = true;
            }
            if (isInRange(day.date, previewStart, previewEnd)) {
              inRange = true;
            }
          }
        } else if (rangeProps.value) {
          const [start, end] = rangeProps.value;
          if (isSameDay(day.date, start)) {
            selected = true;
            isRangeStart = true;
          }
          if (isSameDay(day.date, end)) {
            selected = true;
            isRangeEnd = true;
          }
          if (isInRange(day.date, start, end)) {
            inRange = true;
          }
        }
      }

      return { isToday, disabled, selected, inRange, isRangeStart, isRangeEnd };
    },
    [mode, props, today, minDate, maxDate, rangeStart, hoverDate]
  );

  const getDayCellClasses = (state: { isToday: boolean; disabled: boolean; selected: boolean; inRange: boolean }) => {
    const base =
      'flex items-center justify-center w-10 h-10 p-0 border-0 bg-transparent text-base font-normal leading-6 tracking-[-0.32px] rounded-full relative z-[1]';

    if (state.disabled) {
      return cn(base, 'cursor-default text-[var(--component-calendar-disabled-text)]');
    }
    if (state.selected) {
      return cn(base, 'cursor-pointer bg-[var(--component-calendar-selected-background)] text-[var(--component-calendar-selected-text)]');
    }
    if (state.isToday) {
      return cn(base, 'cursor-pointer border border-[var(--component-calendar-today-border)] text-[var(--component-calendar-today-text)]');
    }
    return cn(base, 'cursor-pointer text-[var(--component-calendar-default-text)]');
  };

  const getRangeBgClasses = (inRange: boolean, isRangeStart: boolean, isRangeEnd: boolean) => {
    const base = 'relative flex items-center justify-center w-10 h-10';
    if (inRange) return cn(base, 'bg-[var(--component-calendar-selected-range)]');
    if (isRangeStart && isRangeEnd) return base;
    // For gradient backgrounds, we still need inline style
    return base;
  };

  const getRangeBgStyle = (inRange: boolean, isRangeStart: boolean, isRangeEnd: boolean): React.CSSProperties | undefined => {
    if (inRange || (isRangeStart && isRangeEnd) || (!isRangeStart && !isRangeEnd)) return undefined;
    if (isRangeStart) {
      return { background: 'linear-gradient(to right, transparent 50%, var(--component-calendar-selected-range) 50%)' };
    }
    if (isRangeEnd) {
      return { background: 'linear-gradient(to left, transparent 50%, var(--component-calendar-selected-range) 50%)' };
    }
    return undefined;
  };

  const renderHeader = () => {
    if (view === 'year') {
      return (
        <div className='flex items-center justify-between h-9'>
          <button
            type='button'
            onClick={() => setYearPage((p: number) => p - 1)}
            className='inline-flex items-center justify-center w-9 h-9 p-0 border-0 bg-transparent cursor-pointer text-[var(--component-calendar-default-icon)] rounded'
          >
            <RoundStroke.Left size={24} />
          </button>
          <button
            type='button'
            onClick={() => setView('calendar')}
            className='inline-flex items-center justify-center h-9 px-2 border-0 bg-transparent cursor-pointer text-lg font-medium leading-7 tracking-[-0.36px] text-[var(--component-calendar-default-text)]'
          >
            {yearList[0]}년 - {yearList[yearList.length - 1]}년
          </button>
          <button
            type='button'
            onClick={() => setYearPage((p: number) => p + 1)}
            className='inline-flex items-center justify-center w-9 h-9 p-0 border-0 bg-transparent cursor-pointer text-[var(--component-calendar-default-icon)] rounded'
          >
            <RoundStroke.Right size={24} />
          </button>
        </div>
      );
    }

    if (view === 'month') {
      return (
        <div className='flex items-center justify-between h-9'>
          <button
            type='button'
            onClick={() => setViewYear((y: number) => y - 1)}
            className='inline-flex items-center justify-center w-9 h-9 p-0 border-0 bg-transparent cursor-pointer text-[var(--component-calendar-default-icon)] rounded'
          >
            <RoundStroke.Left size={24} />
          </button>
          <button
            type='button'
            onClick={() => setView('year')}
            className='inline-flex items-center justify-center h-9 px-2 border-0 bg-transparent cursor-pointer text-lg font-medium leading-7 tracking-[-0.36px] text-[var(--component-calendar-default-text)]'
          >
            {viewYear}년
          </button>
          <button
            type='button'
            onClick={() => setViewYear((y: number) => y + 1)}
            className='inline-flex items-center justify-center w-9 h-9 p-0 border-0 bg-transparent cursor-pointer text-[var(--component-calendar-default-icon)] rounded'
          >
            <RoundStroke.Right size={24} />
          </button>
        </div>
      );
    }

    return (
      <div className='flex items-center justify-between h-9'>
        <button
          type='button'
          onClick={goPrevMonth}
          className='inline-flex items-center justify-center w-9 h-9 p-0 border-0 bg-transparent cursor-pointer text-[var(--component-calendar-default-icon)] rounded'
        >
          <RoundStroke.Left size={24} />
        </button>
        <button
          type='button'
          onClick={() => {
            setYearPage(0);
            setView('year');
          }}
          className='inline-flex items-center justify-center h-9 px-2 border-0 bg-transparent cursor-pointer text-lg font-medium leading-7 tracking-[-0.36px] text-[var(--component-calendar-default-text)]'
        >
          {viewYear}년 {viewMonth + 1}월
        </button>
        <button
          type='button'
          onClick={goNextMonth}
          className='inline-flex items-center justify-center w-9 h-9 p-0 border-0 bg-transparent cursor-pointer text-[var(--component-calendar-default-icon)] rounded'
        >
          <RoundStroke.Right size={24} />
        </button>
      </div>
    );
  };

  const renderDayGrid = () => (
    <div>
      {showDayHeader && (
        <div className='grid grid-cols-[repeat(7,40px)]'>
          {DAY_LABELS.map((label) => (
            <div
              key={label}
              className='flex items-center justify-center w-10 h-10 text-sm font-normal leading-[22px] tracking-[-0.28px] text-[var(--component-calendar-default-text)]'
            >
              {label}
            </div>
          ))}
        </div>
      )}
      {Array.from({ length: 6 }, (_, week) => (
        <div key={week} className='grid grid-cols-[repeat(7,40px)]' style={{ marginTop: week === 0 && showDayHeader ? 12 : week > 0 ? 12 : 0 }}>
          {days.slice(week * 7, week * 7 + 7).map((day, i) => {
            const state = getDayCellState(day);
            return (
              <div
                key={i}
                className={getRangeBgClasses(state.inRange, state.isRangeStart, state.isRangeEnd)}
                style={getRangeBgStyle(state.inRange, state.isRangeStart, state.isRangeEnd)}
              >
                <button
                  type='button'
                  onClick={() => handleDayClick(day)}
                  onMouseEnter={() => {
                    if (mode === 'range' && rangeStart) setHoverDate(day.date);
                  }}
                  disabled={state.disabled && day.isCurrentMonth && isDateDisabled(day.date, minDate, maxDate)}
                  className={getDayCellClasses(state)}
                >
                  {day.date.getDate()}
                </button>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );

  const renderYearPicker = () => (
    <div className='grid grid-cols-3 gap-3'>
      {yearList.map((year) => {
        const isSelected = year === viewYear;
        return (
          <button
            key={year}
            type='button'
            onClick={() => handleYearSelect(year)}
            className={cn(
              'inline-flex items-center justify-center px-[18px] py-[10px] rounded text-sm font-normal leading-5 tracking-[-0.28px] text-center whitespace-nowrap cursor-pointer',
              isSelected
                ? 'bg-[var(--component-input-selected-background)] text-[var(--component-input-selected-text)] border border-transparent'
                : 'bg-transparent text-[var(--component-input-default-label)] border border-[var(--component-input-default-border)]'
            )}
          >
            {year}년
          </button>
        );
      })}
    </div>
  );

  const renderMonthPicker = () => (
    <div className='grid grid-cols-3 gap-3'>
      {MONTH_LABELS.map((label, i) => {
        const isSelected = i === viewMonth;
        return (
          <button
            key={i}
            type='button'
            onClick={() => handleMonthSelect(i)}
            className={cn(
              'inline-flex items-center justify-center px-[18px] py-[10px] rounded text-sm font-normal leading-5 tracking-[-0.28px] text-center whitespace-nowrap cursor-pointer',
              isSelected
                ? 'bg-[var(--component-input-selected-background)] text-[var(--component-input-selected-text)] border border-transparent'
                : 'bg-transparent text-[var(--component-input-default-label)] border border-[var(--component-input-default-border)]'
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );

  const renderButtons = () => {
    if (!showButton) return null;
    return (
      <div className='flex gap-2'>
        <Button variant='ghost' size='l' fullWidth onClick={onCancel}>
          취소
        </Button>
        <Button variant='primary' size='l' fullWidth onClick={onConfirm}>
          확인
        </Button>
      </div>
    );
  };

  return (
    <div
      className={cn(
        'w-[328px] p-6 rounded shadow-[0_0_10px_rgba(0,0,0,0.05)] bg-[var(--component-calendar-default-background)] flex flex-col gap-5',
        className
      )}
      style={style}
    >
      {renderHeader()}
      {view === 'calendar' && renderDayGrid()}
      {view === 'year' && renderYearPicker()}
      {view === 'month' && renderMonthPicker()}
      {renderButtons()}
    </div>
  );
}
