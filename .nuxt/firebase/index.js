import createApp from './app.js'

import authService from './service.auth.js'
import firestoreService from './service.firestore.js'
import storageService from './service.storage.js'

const appConfig = {"apiKey":"AIzaSyAjC92MzDhD30ZSgXj7j_PrhRe3JnLru_4","authDomain":"trello-clone-7c9e7.firebaseapp.com","projectId":"trello-clone-7c9e7","storageBucket":"trello-clone-7c9e7.appspot.com","messagingSenderId":"198966984041","appId":"1:198966984041:web:60e14a24fb67742b0e51f8","measurementId":"G-TXGMTRM03V"}

export default async (ctx, inject) => {
  const { firebase, session } = await createApp(appConfig, ctx)

  let servicePromises = []

  if (process.server) {
    servicePromises = [
      authService(session, firebase, ctx, inject),
    firestoreService(session, firebase, ctx, inject),
    storageService(session, firebase, ctx, inject),

    ]
  }

  if (process.client) {
    servicePromises = [
      authService(session, firebase, ctx, inject),
      firestoreService(session, firebase, ctx, inject),
      storageService(session, firebase, ctx, inject),

    ]
  }

  const [
    auth,
    firestore,
    storage
  ] = await Promise.all(servicePromises)

  const fire = {
    auth: auth,
    firestore: firestore,
    storage: storage
  }

    inject('fireModule', firebase)
    ctx.$fireModule = firebase

  inject('fire', fire)
  ctx.$fire = fire
}

function forceInject (ctx, inject, key, value) {
  inject(key, value)
  const injectKey = '$' + key
  ctx[injectKey] = value
  if (typeof window !== "undefined" && window.$nuxt) {
  // If clause makes sure it's only run when ready() is called in a component, not in a plugin.
    window.$nuxt.$options[injectKey] = value
  }
}