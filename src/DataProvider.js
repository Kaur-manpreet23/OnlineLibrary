import React, { useState } from 'react';
import DataContext from './DataContext';

const DataProvider = ({ children }) => {
  const [data, setData] = useState({}); 

  // Example function to update data
  const updateData = (newData) => {
    setData(newData);
  };

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;