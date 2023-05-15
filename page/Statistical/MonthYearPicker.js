import React from 'react';
import RNPickerSelect from 'react-native-picker-select';

const MonthYearPicker = ({ selectedMonth, selectedYear, onMonthChange, onYearChange }) => {
  const monthPickerItems = [
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];

  const currentYear = new Date().getFullYear();
  const yearPickerItems = Array.from({ length: 10 }, (_, index) => {
    const year = currentYear - index;
    return { label: `${year}`, value: `${year}` };
  });

  return (
    <>
      <RNPickerSelect
        placeholder={{ label: 'Select a month', value: null }}
        value={selectedMonth}
        onValueChange={onMonthChange}
        items={monthPickerItems}
      />
      <RNPickerSelect
        placeholder={{ label: 'Select a year', value: null }}
        value={selectedYear}
        onValueChange={onYearChange}
        items={yearPickerItems}
      />
    </>
  );
};

export default MonthYearPicker;
