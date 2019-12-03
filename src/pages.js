import loadable from '@loadable/component';
import loading from 'Components/Loading';

const pages = {
  Test: loadable(() => import(/* webpackChunkName: 'Test' */ './pages/Test'), {
    fallback: loading,
  }),
  // Test: () => ,
  //   return <p>This is static</p>;
  // },
  About: loadable(
    () => import(/* webpackChunkName: 'About' */ './pages/About').then((m) => m.About),
    { fallback: loading },
  ),
  Album: loadable(
    () => import(/* webpackChunkName: 'Album' */ './pages/Album').then((m) => m.Album),
    { fallback: loading },
  ),
  Albums: loadable(
    () => import(/* webpackChunkName: 'Albums' */ './pages/Albums').then((m) => m.Albums),
    { fallback: loading },
  ),
  BatchUpload: loadable(
    () =>
      import(/* webpackChunkName: 'BatchUpload' */ './pages/Photo/BatchUpload').then(
        (m) => m.BatchUpload,
      ),
    { fallback: loading },
  ),
  ConfirmEmail: loadable(
    () =>
      import(/* webpackChunkName: 'ConfirmEmail' */ './pages/ConfirmEmail').then(
        (m) => m.ConfirmEmail,
      ),
    { fallback: loading },
  ),
  Error: loadable(
    () => import(/* webpackChunkName: 'Error' */ './pages/Error').then((m) => m.Error),
    { fallback: loading },
  ),
  Home: loadable(() => import(/* webpackChunkName: 'Home' */ './pages/Home'), {
    fallback: loading,
  }),
  LogIn: loadable(
    () => import(/* webpackChunkName: 'LogIn' */ './pages/LogIn').then((m) => m.LogIn),
    { fallback: loading },
  ),
  NewAlbum: loadable(
    () => import(/* webpackChunkName: 'NewAlbum' */ './pages/Album/Post').then((m) => m.NewAlbum),
    { fallback: loading },
  ),
  NewPhoto: loadable(
    () => import(/* webpackChunkName: 'NewPhoto' */ './pages/Photo/Post').then((m) => m.NewPhoto),
    { fallback: loading },
  ),
  NewVideo: loadable(
    () => import(/* webpackChunkName: 'NewVideo' */ './pages/Video/Post').then((m) => m.NewVideo),
    { fallback: loading },
  ),
  OldForum: loadable(
    () => import(/* webpackChunkName: 'OldForum' */ './pages/OldForum').then((m) => m.OldForum),
    { fallback: loading },
  ),
  Photo: loadable(
    () => import(/* webpackChunkName: 'Photo' */ './pages/Photo').then((m) => m.Photo),
    { fallback: loading },
  ),
  Profile: loadable(
    () => import(/* webpackChunkName: 'Profile' */ './pages/Profile').then((m) => m.Profile),
    { fallback: loading },
  ),
  User: loadable(() => import(/* webpackChunkName: 'User' */ './pages/User').then((m) => m.User), {
    fallback: loading,
  }),
  Users: loadable(
    () => import(/* webpackChunkName: 'Users' */ './pages/Users').then((m) => m.Users),
    { fallback: loading },
  ),
  Video: loadable(
    () => import(/* webpackChunkName: 'Video' */ './pages/Video').then((m) => m.Video),
    { fallback: loading },
  ),
};

export default pages;
