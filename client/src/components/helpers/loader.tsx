import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Spinner from '../../assets/images/loader.svg';

import './loader.css';

interface LoaderProps {
  fullScreen?: boolean;
  loaderDelay?: number;
  messageDelay?: number;
}
function Loader({
  fullScreen,
  loaderDelay,
  messageDelay
}: LoaderProps): JSX.Element {
  const { t } = useTranslation();

  const [showSpinner, setShowSpinner] = useState(!loaderDelay);
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    if (loaderDelay) {
      const timerId = setTimeout(() => setShowSpinner(true), loaderDelay);
      return () => clearTimeout(timerId);
    }
  }, [loaderDelay]);

  useEffect(() => {
    if (messageDelay) {
      const timerId = setTimeout(() => setShowMessage(true), messageDelay);
      return () => clearTimeout(timerId);
    }
  }, [messageDelay]);

  return (
    <div
      className={`fcc-loader ${fullScreen ? 'full-screen-wrapper' : ''}`}
      data-testid='fcc-loader'
    >
      {showSpinner && <img src={Spinner} alt='loading' />}
      {showMessage && fullScreen && (
        <>
          <br />
          <p className='text-center'>{t('misc.slow-load-msg')}</p>
        </>
      )}
    </div>
  );
}

Loader.displayName = 'Loader';

export default Loader;
