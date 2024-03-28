import React, { useContext } from 'react';
import './bio.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faLocation } from '@fortawesome/free-solid-svg-icons';
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { getLangCode } from '../../../../../../../shared/config/i18n';
import envData from '../../../../../../config/env.json';
import { UserCtx } from '../../../contexts/user-context';
const { clientLocale } = envData;
const localeCode = getLangCode(clientLocale);
function parseDate(joinDate: string, t: TFunction): string {
  const convertedJoinDate = new Date(joinDate);
  const date = convertedJoinDate.toLocaleString([localeCode, 'en-US'], {
    year: 'numeric',
    month: 'long'
  });
  return t('profile.joined', { date });
}
const Bio = () => {
  const { t } = useTranslation();
  const { joinDate, location, username, name, about } = useContext(UserCtx);
  return (
    <section className='flex-col padding-vertical-3'>
      <h2 className='username'>@{username}</h2>
      {name && <p className='name gray-color'>{name}</p>}
      {about && <p className='bio'>{about}</p>}
      <div className='flex gap-1'>
        {joinDate && (
          <div className='gray-color'>
            <FontAwesomeIcon icon={faCalendar} />
            <span>{parseDate(joinDate, t)}</span>
          </div>
        )}
        {location && (
          <div className='gray-color'>
            <FontAwesomeIcon icon={faLocation} />
            <span>From: {location}</span>
          </div>
        )}
      </div>
    </section>
  );
};
export default Bio;
