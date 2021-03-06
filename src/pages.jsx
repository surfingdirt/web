import loadable from '@loadable/component';

import loading from 'Components/Widgets/Loading';

const options = { fallback: loading };

const pages = {
  About: loadable(() => import(/* webpackChunkName: 'About' */ './pages/About'), options),
  Album: loadable(() => import(/* webpackChunkName: 'Album' */ './pages/Album'), options),
  AlbumEdit: loadable(
    () => import(/* webpackChunkName: 'AlbumEdit' */ './pages/Album/Edit'),
    options,
  ),
  Albums: loadable(() => import(/* webpackChunkName: 'Albums' */ './pages/Albums'), options),
  Articles: {
    MBSMatrix2Mods: loadable(
      () =>
        import(/* webpackChunkName: 'Article-MBSMatrix2Mods' */ './pages/Articles/MBSMatrix2Mods'),
      options,
    ),
  },
  BatchUpload: loadable(
    () => import(/* webpackChunkName: 'BatchUpload' */ './pages/Photo/BatchUpload'),
    options,
  ),
  CommentEdit: loadable(
    () => import(/* webpackChunkName: 'CommentEdit' */ './pages/Comment/Edit'),
    options,
  ),
  ConfirmEmail: loadable(
    () => import(/* webpackChunkName: 'ConfirmEmail' */ './pages/ConfirmEmail'),
    options,
  ),
  Error: loadable(() => import(/* webpackChunkName: 'Error' */ './pages/Error'), options),
  FourDown: loadable(() => import(/* webpackChunkName: 'FourDown' */ './pages/FourDown'), options),
  FourDownVideo: loadable(
    () => import(/* webpackChunkName: 'FourDownVideo' */ './pages/FourDown/Video'),
    options,
  ),
  FourDownLogIn: loadable(
    () => import(/* webpackChunkName: 'FourDownLogIn' */ './pages/LogIn/FourDown'),
    options,
  ),
  Home: loadable(() => import(/* webpackChunkName: 'Home' */ './pages/Home'), options),
  LogIn: loadable(() => import(/* webpackChunkName: 'LogIn' */ './pages/LogIn'), options),
  LogInOAuth: loadable(
    () => import(/* webpackChunkName: 'LogInOAuth' */ './pages/LogIn/OAuth'),
    options,
  ),
  LostPassword: loadable(
    () => import(/* webpackChunkName: 'LostPassword' */ './pages/LostPassword'),
    options,
  ),
  NewAlbum: loadable(
    () => import(/* webpackChunkName: 'NewAlbum' */ './pages/Album/Post'),
    options,
  ),
  NewPasswordActivated: loadable(
    () => import(/* webpackChunkName: 'NewPasswordActivated' */ './pages/NewPasswordActivated'),
    options,
  ),
  NewPhoto: loadable(
    () => import(/* webpackChunkName: 'NewPhoto' */ './pages/Photo/Post'),
    options,
  ),
  Media: loadable(() => import(/* webpackChunkName: 'Media' */ './pages/Media'), options),
  NewVideo: loadable(
    () => import(/* webpackChunkName: 'NewVideo' */ './pages/Video/Post'),
    options,
  ),
  OldForum: loadable(() => import(/* webpackChunkName: 'OldForum' */ './pages/OldForum'), options),
  PhotoEdit: loadable(
    () => import(/* webpackChunkName: 'PhotoEdit' */ './pages/Photo/Edit'),
    options,
  ),
  Privacy: loadable(() => import(/* webpackChunkName: 'Privacy' */ './pages/Privacy'), options),
  Profile: loadable(() => import(/* webpackChunkName: 'Profile' */ './pages/Profile'), options),
  Registration: loadable(
    () => import(/* webpackChunkName: 'UserRegistration' */ './pages/User/Registration'),
    options,
  ),
  Settings: loadable(
    () => import(/* webpackChunkName: 'UserSettings' */ './pages/User/Settings'),
    options,
  ),
  Terms: loadable(() => import(/* webpackChunkName: 'Terms' */ './pages/Terms'), options),
  User: loadable(() => import(/* webpackChunkName: 'User' */ './pages/User'), options),
  Users: loadable(() => import(/* webpackChunkName: 'Users' */ './pages/Users'), options),
  VideoEdit: loadable(
    () => import(/* webpackChunkName: 'VideoEdit' */ './pages/Video/Edit'),
    options,
  ),
};

export default pages;
