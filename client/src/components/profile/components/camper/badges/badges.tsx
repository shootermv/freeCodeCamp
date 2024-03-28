import React, { useContext } from 'react';
import './badges.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { Link } from '../../../../helpers';
import { UserCtx } from '../../../contexts/user-context';
import { joinArray } from '../utils';
const Badges = () => {
  const { yearsTopContributor } = useContext(UserCtx);
  const { t } = useTranslation();
  return (
    <section className='flex-col border-gray padding-vertical-3'>
      <h3>Badges</h3>
      <div className='flex'>
        <div className='flex flex-1'>
          {yearsTopContributor.filter(Boolean).length > 0 && (
            <div>
              <div className='yearsTopContributor'>
                <FontAwesomeIcon icon={faAward} />{' '}
                <Link to={t('links:top-contributors')}>
                  {t('profile.contributor')}
                </Link>
              </div>
              <div className='text-center'>
                {joinArray(yearsTopContributor, t)}
              </div>
            </div>
          )}
        </div>
        <div className='flex-1'>2</div>
      </div>
    </section>
  );
};
export default Badges;
