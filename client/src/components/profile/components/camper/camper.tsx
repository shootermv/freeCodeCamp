import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from '@freecodecamp/ui';
import type { User } from '../../../../redux/prop-types';
import { AvatarRenderer } from '../../../helpers';
import SupporterBadge from '../../../../assets/icons/supporter-badge';
import SocialIcons from '../social-icons';
import './camper.css';
import Badges from './badges';
import Statistics from './statistics';
import Bio from './bio';

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
    </div>
  );
}

Camper.displayName = 'Camper';

export default Camper;
