'use client';

import React, { useState, useMemo, useCallback } from 'react';

import { RoundStroke } from '../../../icons';
import { Button } from '../Button';

import { CalendarProps, CalendarView, CalendarDay } from './types';
import { getCalendarDays, isSameDay, isInRange, isDateDisabled } from './utils';

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];
const MONTH_LABELS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

export function Calendar(props: CalendarProps): React.JSX.Element {
  const {
    showButton = false,
    showDayHeader = true,
    minDate,
    maxDate,
    onCancel,
    onConfirm,
    className,
    style,
  } = props;

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

  // Year picker page (show 9 years at a time)
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
    [mode, props, minDate, maxDate, rangeStart],
  );

  const handleYearSelect = useCallback(
    (year: number) => {
      setViewYear(year);
      setView('month');
      setYearPage(0);
    },
    [],
  );

  const handleMonthSelect = useCallback(
    (month: number) => {
      setViewMonth(month);
      setView('calendar');
    },
    [],
  );

  // Determine cell states
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
          // Actively selecting — show preview, ignore existing value
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
          // Committed range — show value
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
    [mode, props, today, minDate, maxDate, rangeStart, hoverDate],
  );

  // ============================================================================
  // Render: Header
  // ============================================================================
  const renderHeader = () => {
    if (view === 'year') {
      return (
        <div style={headerStyle}>
          <button
            type="button"
            onClick={() => setYearPage((p: number) => p - 1)}
            style={arrowButtonStyle}
          >
            <RoundStroke.Left size={24} />
          </button>
          <button type="button" onClick={() => setView('calendar')} style={titleButtonStyle}>
            {yearList[0]}년 - {yearList[yearList.length - 1]}년
          </button>
          <button
            type="button"
            onClick={() => setYearPage((p: number) => p + 1)}
            style={arrowButtonStyle}
          >
            <RoundStroke.Right size={24} />
          </button>
        </div>
      );
    }

    if (view === 'month') {
      return (
        <div style={headerStyle}>
          <button
            type="button"
            onClick={() => setViewYear((y: number) => y - 1)}
            style={arrowButtonStyle}
          >
            <RoundStroke.Left size={24} />
          </button>
          <button type="button" onClick={() => setView('year')} style={titleButtonStyle}>
            {viewYear}년
          </button>
          <button
            type="button"
            onClick={() => setViewYear((y: number) => y + 1)}
            style={arrowButtonStyle}
          >
            <RoundStroke.Right size={24} />
          </button>
        </div>
      );
    }

    return (
      <div style={headerStyle}>
        <button type="button" onClick={goPrevMonth} style={arrowButtonStyle}>
          <RoundStroke.Left size={24} />
        </button>
        <button type="button" onClick={() => { setYearPage(0); setView('year'); }} style={titleButtonStyle}>
          {viewYear}년 {viewMonth + 1}월
        </button>
        <button type="button" onClick={goNextMonth} style={arrowButtonStyle}>
          <RoundStroke.Right size={24} />
        </button>
      </div>
    );
  };

  // ============================================================================
  // Render: Day Grid
  // ============================================================================
  const renderDayGrid = () => (
    <div>
      {showDayHeader && (
        <div style={weekRowStyle}>
          {DAY_LABELS.map((label) => (
            <div key={label} style={dayHeaderCellStyle}>
              {label}
            </div>
          ))}
        </div>
      )}
      {Array.from({ length: 6 }, (_, week) => (
        <div key={week} style={{ ...weekRowStyle, marginTop: week === 0 && showDayHeader ? 12 : week > 0 ? 12 : 0 }}>
          {days.slice(week * 7, week * 7 + 7).map((day, i) => {
            const state = getDayCellState(day);
            return (
              <div
                key={i}
                style={getRangeBgStyle(state.inRange, state.isRangeStart, state.isRangeEnd)}
              >
                <button
                  type="button"
                  onClick={() => handleDayClick(day)}
                  onMouseEnter={() => {
                    if (mode === 'range' && rangeStart) setHoverDate(day.date);
                  }}
                  disabled={state.disabled && day.isCurrentMonth && isDateDisabled(day.date, minDate, maxDate)}
                  style={getDayCellStyle(state)}
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

  // ============================================================================
  // Render: Year Picker
  // ============================================================================
  const renderYearPicker = () => (
    <div style={pickerGridStyle}>
      {yearList.map((year) => (
        <button
          key={year}
          type="button"
          onClick={() => handleYearSelect(year)}
          style={getPickerItemStyle(year === viewYear)}
        >
          {year}년
        </button>
      ))}
    </div>
  );

  // ============================================================================
  // Render: Month Picker
  // ============================================================================
  const renderMonthPicker = () => (
    <div style={pickerGridStyle}>
      {MONTH_LABELS.map((label, i) => (
        <button
          key={i}
          type="button"
          onClick={() => handleMonthSelect(i)}
          style={getPickerItemStyle(i === viewMonth)}
        >
          {label}
        </button>
      ))}
    </div>
  );

  // ============================================================================
  // Render: Bottom Buttons
  // ============================================================================
  const renderButtons = () => {
    if (!showButton) return null;
    return (
      <div style={buttonRowStyle}>
        <Button variant="ghost" size="l" fullWidth onClick={onCancel}>
          취소
        </Button>
        <Button variant="primary" size="l" fullWidth onClick={onConfirm}>
          확인
        </Button>
      </div>
    );
  };

  return (
    <div className={className} style={{ ...containerStyle, ...style }}>
      {renderHeader()}
      {view === 'calendar' && renderDayGrid()}
      {view === 'year' && renderYearPicker()}
      {view === 'month' && renderMonthPicker()}
      {renderButtons()}
    </div>
  );
}

// ============================================================================
// Styles
// ============================================================================

const containerStyle: React.CSSProperties = {
  width: 328,
  padding: 24,
  borderRadius: 4,
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)',
  background: 'var(--component-calendar-default-background)',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 36,
};

const arrowButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  padding: 0,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  color: 'var(--component-calendar-default-icon)',
  borderRadius: 4,
};

const titleButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 36,
  padding: '0 8px',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  fontSize: 18,
  fontWeight: 500,
  lineHeight: '28px',
  letterSpacing: '-0.36px',
  color: 'var(--component-calendar-default-text)',
};

const weekRowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 40px)',
};

const dayHeaderCellStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '22px',
  letterSpacing: '-0.28px',
  color: 'var(--component-calendar-default-text)',
};

function getDayCellStyle(state: {
  isToday: boolean;
  disabled: boolean;
  selected: boolean;
  inRange: boolean;
}): React.CSSProperties {
  const base: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    padding: 0,
    border: 'none',
    background: 'transparent',
    cursor: state.disabled ? 'default' : 'pointer',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '-0.32px',
    borderRadius: '50%',
    position: 'relative',
    zIndex: 1,
    boxSizing: 'border-box',
  };

  if (state.disabled) {
    return { ...base, color: 'var(--component-calendar-disabled-text)' };
  }

  if (state.selected) {
    return {
      ...base,
      background: 'var(--component-calendar-selected-background)',
      color: 'var(--component-calendar-selected-text)',
    };
  }

  if (state.isToday) {
    return {
      ...base,
      border: '1px solid var(--component-calendar-today-border)',
      color: 'var(--component-calendar-today-text)',
    };
  }

  return { ...base, color: 'var(--component-calendar-default-text)' };
}

function getRangeBgStyle(
  inRange: boolean,
  isRangeStart: boolean,
  isRangeEnd: boolean,
): React.CSSProperties {
  const base: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  };

  if (inRange) {
    return {
      ...base,
      background: 'var(--component-calendar-selected-range)',
    };
  }

  if (isRangeStart && isRangeEnd) {
    return base;
  }

  if (isRangeStart) {
    return {
      ...base,
      background: 'linear-gradient(to right, transparent 50%, var(--component-calendar-selected-range) 50%)',
    };
  }

  if (isRangeEnd) {
    return {
      ...base,
      background: 'linear-gradient(to left, transparent 50%, var(--component-calendar-selected-range) 50%)',
    };
  }

  return base;
}

const pickerGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 12,
};

function getPickerItemStyle(selected: boolean): React.CSSProperties {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 18px',
    borderRadius: 4,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '-0.28px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    cursor: 'pointer',
  };

  if (selected) {
    return {
      ...base,
      background: 'var(--component-input-selected-background)',
      color: 'var(--component-input-selected-text)',
      border: '1px solid transparent',
    };
  }

  return {
    ...base,
    background: 'transparent',
    color: 'var(--component-input-default-label)',
    border: '1px solid var(--component-input-default-border)',
  };
}

const buttonRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: 8,
};
