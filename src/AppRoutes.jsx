import React, { useContext, Fragment } from 'react';
import { Route, Switch } from 'react-router';

import { FORBIDDEN, MANDATORY } from 'Components/Widgets/EnforceLogin';
import { DefaultLayoutRoute } from 'Components/Widgets/Route';
import Page404 from 'Pages/Page404';
import AppContext from '~/contexts';
import pages from '~/pages';
import routes from '~/routes';

const AppRoutes = () => {
  const { features } = useContext(AppContext);
  return (
    <Fragment>
      {/* Google Analytics */}
      <Route
        path="/"
        render={({ location }) => {
          const window = { global };
          if (window && typeof window.ga === 'function') {
            window.ga('set', 'page', location.pathname + location.search);
            window.ga('send', 'pageview');
          }
          return null;
        }}
      />

      <Switch>
        <DefaultLayoutRoute exact path={routes.HOME} component={pages.Home} />
        <DefaultLayoutRoute path={routes.DISCOVER} component={pages.Home} />
        <DefaultLayoutRoute path={routes.FEED} component={pages.Home} />

        <DefaultLayoutRoute path={routes.ABOUT} component={pages.About} />
        <DefaultLayoutRoute path={routes.ALBUM} component={pages.Album} exact />
        <DefaultLayoutRoute
          path={routes.ALBUM_EDIT}
          component={pages.AlbumEdit}
          exact
          login={MANDATORY}
        />
        <DefaultLayoutRoute
          path={routes.ALBUM_NEW}
          component={pages.NewAlbum}
          exact
          login={MANDATORY}
        />
        <DefaultLayoutRoute path={routes.ALBUMS} component={pages.Albums} />
        <DefaultLayoutRoute
          path={routes.COMMENT_EDIT}
          component={pages.CommentEdit}
          login={MANDATORY}
        />
        <DefaultLayoutRoute path={routes.CONFIRM_EMAIL} component={pages.ConfirmEmail} />
        <DefaultLayoutRoute path={routes.ERROR} component={pages.Error} />
        <DefaultLayoutRoute path={routes.LOGIN} component={pages.LogIn} login={FORBIDDEN} />
        <DefaultLayoutRoute
          path={routes.LOST_PASSWORD}
          component={pages.LostPassword}
          login={FORBIDDEN}
        />
        <DefaultLayoutRoute
          path={routes.NEW_PASSWORD_ACTIVATED}
          component={pages.NewPasswordActivated}
          login={FORBIDDEN}
        />
        <DefaultLayoutRoute path={routes.OLD_FORUM} component={pages.OldForum} />
        <DefaultLayoutRoute
          path={routes.PHOTO_BATCH_UPLOAD_FOR_ALBUM}
          component={pages.BatchUpload}
          login={MANDATORY}
        />
        <DefaultLayoutRoute path={routes.PHOTO_NEW} component={pages.NewPhoto} login={MANDATORY} />
        <DefaultLayoutRoute
          path={routes.PHOTO_NEW_FOR_ALBUM}
          component={pages.NewPhoto}
          login={MANDATORY}
        />
        <DefaultLayoutRoute path={routes.PHOTO} component={pages.Photo} exact />
        <DefaultLayoutRoute
          path={routes.PHOTO_EDIT}
          component={pages.PhotoEdit}
          login={MANDATORY}
        />
        <DefaultLayoutRoute path={routes.PROFILE} component={pages.Profile} login={MANDATORY} />
        <DefaultLayoutRoute
          path={routes.REGISTRATION}
          component={pages.Registration}
          login={FORBIDDEN}
        />
        <DefaultLayoutRoute path={routes.SETTINGS} component={pages.Settings} login={MANDATORY} />
        <DefaultLayoutRoute path={routes.USER} component={pages.User} exact />
        <DefaultLayoutRoute path={routes.USERS} component={pages.Users} />
        <DefaultLayoutRoute path={routes.VIDEO} component={pages.Video} exact />
        <DefaultLayoutRoute
          path={routes.VIDEO_EDIT}
          component={pages.VideoEdit}
          login={MANDATORY}
        />
        <DefaultLayoutRoute path={routes.VIDEO_NEW} component={pages.NewVideo} login={MANDATORY} />
        <DefaultLayoutRoute
          path={routes.VIDEO_NEW_FOR_ALBUM}
          component={pages.NewVideo}
          login={MANDATORY}
        />
        <DefaultLayoutRoute component={Page404} />
      </Switch>
    </Fragment>
  );
};
export default AppRoutes;
