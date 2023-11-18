import React from 'react';
import cl from './App.module.scss';
import ContentSection from '../ContentSection';

const App = () => {
  return (
    <React.Fragment>
      <main className={cl.main}>
        <ContentSection></ContentSection>
      </main>
    </React.Fragment>
  );
};

export default App;
