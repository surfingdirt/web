import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';

import AppContext from '~/contexts';

const SPORT = 'football';

class StructuredData extends PureComponent {
  static contextType = AppContext;

  static propTypes = {
    match: PropTypes.objectOf(PropTypes.any),
    player: PropTypes.objectOf(PropTypes.any),
    team: PropTypes.objectOf(PropTypes.any),
    type: PropTypes.string.isRequired,
    video: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    match: {},
    player: {},
    team: {},
    video: {},
  };

  render() {
    const {
      props: { match, player, team, type, video },
      context: { baseUrl },
    } = this;
    let newBaseUrl = '';

    if (baseUrl) {
      newBaseUrl = baseUrl.slice(0, -5);
    }

    let athletes = () => {};

    if (type === 'sportsOrganization') {
      athletes = () =>
        team.getSquads.items.map((teammate) => ({
          '@type': 'Person',
          birthDate: teammate.birthDate,
          birthPlace: teammate.birthPlace,
          familyName: teammate.name,
          givenName: teammate.givenName,
          nationality: teammate.country,
        }));
    }

    return (
      <Helmet>
        {type === 'video' && (
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "VideoObject",
                "name": "${video.name}",
                "description": "${video.description}",
                "thumbnailUrl": "${video.Video.poster}",
                "uploadDate": "2007-04-05T14:30",
                "publisher": {
                  "@type": "Organization",
                  "name": "Surfing Dirt",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "${video.Video.url}"
                  }
                }
              }
            `}
          </script>
        )}
        {type === 'sportsEvent' && (
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org/",
                "@type": "SportsEvent",
                "startDate": "${match.startDate}",
                "endDate": "${match.endDate}",
                "description": "${match.description}",
                "location": {
                  "@type": "Place",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "${match.location}"
                  },
                  "name": "${match.location}"
                },
                "image": "",
                "name": "${match.name}",
                "homeTeam": {
                  "@type": "SportsTeam",
                  "sport": "${SPORT}",
                  "logo": "${match.stats.homeTeam.team.picture}",
                  "name": "${match.stats.homeTeam.team.name}",
                },
                "awayTeam": {
                  "@type": "SportsTeam",
                  "sport": "${SPORT}",
                  "logo": "${match.stats.awayTeam.team.picture}",
                  "name": "${match.stats.awayTeam.team.name}",
                }
              }
            `}
          </script>
        )}
        {type === 'sportsOrganization' && (
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org/",
                "@type": "SportsTeam",
                "sport": "${SPORT}",
                "memberOf": {
                  "@type": "SportsOrganization",
                  "name": "${team.role}"
                },
                "logo": "${team.picture}",
                "name": "${team.name}",
                "url": "${newBaseUrl}/club/${team.id}",
                "coach": {
                  "@type": "Person",
                  "name": "${team.coachName}"
                },
                "athlete" : ${JSON.stringify(athletes())}
              }
            `}
          </script>
        )}
        {type === 'person' && (
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org/",
                "@type": "Person",
                "birthDate": "${player.birthDate}",
                "birthPlace": "${player.birthPlace}",
                "familyName": "${player.familyName}",
                "gender": "male",
                "givenName": "${player.givenName}",
                "nationality": "${player.nationality}",
                "height": "${player.height}",
                "weight": "${player.weight}",
                "image": "${player.picture}"
              }
            `}
          </script>
        )}
      </Helmet>
    );
  }
}

export default StructuredData;
