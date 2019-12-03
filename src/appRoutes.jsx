import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router';

import { FORBIDDEN, MANDATORY } from 'Components/EnforceLogin';
import { DefaultLayoutRoute } from 'Components/Route';
import { Page404 } from 'Pages/Page404';
import pages from '~/pages';
import routes from '~/routes';

// const appRoutes = <Route component={pages.Test} />;

const appRoutes = (
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
      <DefaultLayoutRoute exact path="/test" component={pages.Test} />

      <DefaultLayoutRoute exact path={routes.HOME} component={pages.Home} />

      <DefaultLayoutRoute path={routes.ABOUT} component={pages.About} />
      <DefaultLayoutRoute path={routes.ALBUM} component={pages.Album} exact />
      <DefaultLayoutRoute
        path={routes.ALBUM_NEW}
        component={pages.NewAlbum}
        exact
        login={MANDATORY}
      />
      <DefaultLayoutRoute path={routes.ALBUMS} component={pages.Albums} />
      <DefaultLayoutRoute path={routes.CONFIRM_EMAIL} component={pages.ConfirmEmail} />
      <DefaultLayoutRoute path={routes.ERROR} component={pages.Error} />
      <DefaultLayoutRoute path={routes.LOGIN} component={pages.LogIn} login={FORBIDDEN} />
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
      <DefaultLayoutRoute path={routes.PHOTO} component={pages.Photo} />
      <DefaultLayoutRoute path={routes.PROFILE} component={pages.Profile} login={MANDATORY} />
      <DefaultLayoutRoute path={routes.USER} component={pages.User} />
      <DefaultLayoutRoute path={routes.USERS} component={pages.Users} />
      <DefaultLayoutRoute path={routes.VIDEO} component={pages.Video} exact />
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
export default appRoutes;
