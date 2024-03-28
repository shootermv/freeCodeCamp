import { faAward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from '@freecodecamp/ui';
import type { User } from '../../../../redux/prop-types';
import { AvatarRenderer } from '../../../helpers';
import Link from '../../../helpers/link';
import SupporterBadge from '../../../../assets/icons/supporter-badge';
import SocialIcons from '../social-icons';
import './camper.css';
import Badges from './badges';
import Statistics from './statistics';
import Bio from './bio';
import { joinArray } from './utils';

export type CamperProps = Pick<
  User,
  | 'about'
  | 'githubProfile'
  | 'isDonating'
  | 'linkedin'
  | 'username'
  | 'twitter'
  | 'yearsTopContributor'
  | 'location'
  | 'website'
  | 'picture'
  | 'name'
  | 'joinDate'
>;

function Camper({
  username,
  picture,
  yearsTopContributor,
  githubProfile,
  isDonating,
  linkedin,
  twitter,
  website
}: CamperProps): JSX.Element {
  const { t } = useTranslation();
  return (
    <div>
      <Row>
        <Col className='avatar-camper' xs={12}>
          <AvatarRenderer
            isDonating={isDonating}
            isTopContributor={yearsTopContributor.length > 0}
            picture={picture}
          />
        </Col>
      </Row>
      <SocialIcons
        githubProfile={githubProfile}
        linkedin={linkedin}
        twitter={twitter}
        username={username}
        website={website}
      />
      <br />

      {isDonating && (
        <p className='supporter'>
          <SupporterBadge />
          {t('profile.supporter')}
        </p>
      )}

      <Bio />
      <Statistics />
      <Badges />

      {yearsTopContributor.filter(Boolean).length > 0 && (
        <div>
          <br />
          <p className='yearsTopContributor'>
            <FontAwesomeIcon icon={faAward} />{' '}
            <Link to={t('links:top-contributors')}>
              {t('profile.contributor')}
            </Link>
          </p>
          <p className='text-center'>{joinArray(yearsTopContributor, t)}</p>
        </div>
      )}
      <br />
    </div>
  );
}

Camper.displayName = 'Camper';

export default Camper;
