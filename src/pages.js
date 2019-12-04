import loadable from '@loadable/component';
import loading from 'Components/Loading';

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
  Home: loadable(() => import(/* webpackChunkName: 'Home' */ './pages/Home'), {
    fallback: loading,
  }),
  LogIn: loadable(() => import(/* webpackChunkName: 'LogIn' */ './pages/LogIn'), options),
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
  Media: loadable(() => import(/* webpackChunkName: 'Media' */ './pages/Media'), options),
  Profile: loadable(() => import(/* webpackChunkName: 'Profile' */ './pages/Profile'), options),
  User: loadable(() => import(/* webpackChunkName: 'User' */ './pages/User'), options),
  Users: loadable(() => import(/* webpackChunkName: 'Users' */ './pages/Users'), options),
  Video: loadable(() => import(/* webpackChunkName: 'Video' */ './pages/Video'), options),
};

export default pages;
