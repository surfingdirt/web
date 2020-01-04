import loadable from '@loadable/component';

import loading from 'Components/Widgets/Loading';

const options = { fallback: loading };

const pages = {
  About: loadable(() => import(/* webpackChunkName: 'About' */ './pages/About'), options),
  Album: loadable(() => import(/* webpackChunkName: 'Album' */ './pages/Album'), options),
  Albums: loadable(() => import(/* webpackChunkName: 'Albums' */ './pages/Albums'), options),
  BatchUpload: loadable(
    () => import(/* webpackChunkName: 'BatchUpload' */ './pages/Photo/BatchUpload'),
    options,
  ),
  ConfirmEmail: loadable(
    () => import(/* webpackChunkName: 'ConfirmEmail' */ './pages/ConfirmEmail'),
    options,
  ),
  Error: loadable(() => import(/* webpackChunkName: 'Error' */ './pages/Error'), options),
  Home: loadable(() => import(/* webpackChunkName: 'Home' */ './pages/Home'), options),
  LogIn: loadable(() => import(/* webpackChunkName: 'LogIn' */ './pages/LogIn'), options),
  LostPassword: loadable(
    () => import(/* webpackChunkName: 'LostPassword' */ './pages/LostPassword'),
    options,
  ),
  NewAlbum: loadable(
    () => import(/* webpackChunkName: 'NewAlbum' */ './pages/Album/Post'),
    options,
  ),
  NewPhoto: loadable(
    () => import(/* webpackChunkName: 'NewPhoto' */ './pages/Photo/Post'),
    options,
  ),
  NewVideo: loadable(
    () => import(/* webpackChunkName: 'NewVideo' */ './pages/Video/Post'),
    options,
  ),
  OldForum: loadable(() => import(/* webpackChunkName: 'OldForum' */ './pages/OldForum'), options),
  Photo: loadable(() => import(/* webpackChunkName: 'Media' */ './pages/Photo'), options),
  Profile: loadable(() => import(/* webpackChunkName: 'Profile' */ './pages/Profile'), options),
  User: loadable(() => import(/* webpackChunkName: 'User' */ './pages/User'), options),
  Users: loadable(() => import(/* webpackChunkName: 'Users' */ './pages/Users'), options),
  Video: loadable(() => import(/* webpackChunkName: 'Video' */ './pages/Video'), options),
};

export default pages;
