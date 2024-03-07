import React from 'react';
import styles from '../styles/Loader.module.css';

const Loading = () => {
  return (
    <div className={styles.loaderContainer}>
      <img src="Blocks.svg" />
    </div>
  );
};

export default Loading;
