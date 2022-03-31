export default function ({ app, route, redirect }) {
  // accessing protected route

  if (route.path != '/auth') {
    // check if he/she is logged in

    if (!app.$fire.auth.currentUser) {
      return redirect('/auth');
    }
  } else if (route.path == '/auth') {
    // check if he/she is already signed in

    if (app.$fire.auth.currentUser) {
      // they are signed in, so no need to go to login page

      return redirect('/');
    }
  }
}
