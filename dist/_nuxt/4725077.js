/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{526:function(e,t,n){"use strict";n.d(t,"a",(function(){return w}));var r=n(517),o=n(520),c=n(519),l=n(528);class d{constructor(e,t){this._delegate=e,this.firebase=t,Object(c._addComponent)(e,new o.a("app-compat",(()=>this),"PUBLIC")),this.container=e.container}get automaticDataCollectionEnabled(){return this._delegate.automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this._delegate.automaticDataCollectionEnabled=e}get name(){return this._delegate.name}get options(){return this._delegate.options}delete(){return new Promise((e=>{this._delegate.checkDestroyed(),e()})).then((()=>(this.firebase.INTERNAL.removeApp(this.name),Object(c.deleteApp)(this._delegate))))}_getService(e,t=c._DEFAULT_ENTRY_NAME){var n;this._delegate.checkDestroyed();const r=this._delegate.container.getProvider(e);return r.isInitialized()||"EXPLICIT"!==(null===(n=r.getComponent())||void 0===n?void 0:n.instantiationMode)||r.initialize(),r.getImmediate({identifier:t})}_removeServiceInstance(e,t=c._DEFAULT_ENTRY_NAME){this._delegate.container.getProvider(e).clearInstance(t)}_addComponent(component){Object(c._addComponent)(this._delegate,component)}_addOrOverwriteComponent(component){Object(c._addOrOverwriteComponent)(this._delegate,component)}toJSON(){return{name:this.name,automaticDataCollectionEnabled:this.automaticDataCollectionEnabled,options:this.options}}}const h={"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance."},_=new r.b("app-compat","Firebase",h);const m=function e(){const t=function(e){const t={},n={__esModule:!0,initializeApp:function(o,l={}){const d=c.initializeApp(o,l);if(Object(r.e)(t,d.name))return t[d.name];const h=new e(d,n);return t[d.name]=h,h},app:o,registerVersion:c.registerVersion,setLogLevel:c.setLogLevel,onLog:c.onLog,apps:null,SDK_VERSION:c.SDK_VERSION,INTERNAL:{registerComponent:function(component){const t=component.name,l=t.replace("-compat","");if(c._registerComponent(component)&&"PUBLIC"===component.type){const c=(e=o())=>{if("function"!=typeof e[l])throw _.create("invalid-app-argument",{appName:t});return e[l]()};void 0!==component.serviceProps&&Object(r.i)(c,component.serviceProps),n[l]=c,e.prototype[l]=function(...e){return this._getService.bind(this,t).apply(this,component.multipleInstances?e:[])}}return"PUBLIC"===component.type?n[l]:null},removeApp:function(e){delete t[e]},useAsService:function(e,t){return"serverAuth"===t?null:t},modularAPIs:c}};function o(e){if(e=e||c._DEFAULT_ENTRY_NAME,!Object(r.e)(t,e))throw _.create("no-app",{appName:e});return t[e]}return n.default=n,Object.defineProperty(n,"apps",{get:function(){return Object.keys(t).map((e=>t[e]))}}),o.App=e,n}(d);return t.INTERNAL=Object.assign(Object.assign({},t.INTERNAL),{createFirebaseNamespace:e,extendNamespace:function(e){Object(r.i)(t,e)},createSubscribe:r.g,ErrorFactory:r.b,deepExtend:r.i}),t}(),f=new l.b("@firebase/app-compat");if(Object(r.m)()&&void 0!==self.firebase){f.warn("\n    Warning: Firebase is already defined in the global scope. Please make sure\n    Firebase library is only loaded once.\n  ");const e=self.firebase.SDK_VERSION;e&&e.indexOf("LITE")>=0&&f.warn("\n    Warning: You are trying to load Firebase while using Firebase Performance standalone script.\n    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.\n    ")}const w=m;var O;Object(c.registerVersion)("@firebase/app-compat","0.1.18",O)},621:function(e,t,n){"use strict";n.r(t);var r=n(526),o=n(544),c=n(520);class l{constructor(e,t,n){this._delegate=e,this.task=t,this.ref=n}get bytesTransferred(){return this._delegate.bytesTransferred}get metadata(){return this._delegate.metadata}get state(){return this._delegate.state}get totalBytes(){return this._delegate.totalBytes}}class d{constructor(e,t){this._delegate=e,this._ref=t,this.cancel=this._delegate.cancel.bind(this._delegate),this.catch=this._delegate.catch.bind(this._delegate),this.pause=this._delegate.pause.bind(this._delegate),this.resume=this._delegate.resume.bind(this._delegate)}get snapshot(){return new l(this._delegate.snapshot,this,this._ref)}then(e,t){return this._delegate.then((t=>{if(e)return e(new l(t,this,this._ref))}),t)}on(e,t,n,r){let o;return t&&(o="function"==typeof t?e=>t(new l(e,this,this._ref)):{next:t.next?e=>t.next(new l(e,this,this._ref)):void 0,complete:t.complete||void 0,error:t.error||void 0}),this._delegate.on(e,o,n||void 0,r||void 0)}}class h{constructor(e,t){this._delegate=e,this._service=t}get prefixes(){return this._delegate.prefixes.map((e=>new _(e,this._service)))}get items(){return this._delegate.items.map((e=>new _(e,this._service)))}get nextPageToken(){return this._delegate.nextPageToken||null}}class _{constructor(e,t){this._delegate=e,this.storage=t}get name(){return this._delegate.name}get bucket(){return this._delegate.bucket}get fullPath(){return this._delegate.fullPath}toString(){return this._delegate.toString()}child(e){const t=Object(o.h)(this._delegate,e);return new _(t,this.storage)}get root(){return new _(this._delegate.root,this.storage)}get parent(){const e=this._delegate.parent;return null==e?null:new _(e,this.storage)}put(data,e){return this._throwIfRoot("put"),new d(Object(o.s)(this._delegate,data,e),this)}putString(e,t=o.a.RAW,n){this._throwIfRoot("putString");const data=Object(o.g)(t,e),r=Object.assign({},n);return null==r.contentType&&null!=data.contentType&&(r.contentType=data.contentType),new d(new o.f(this._delegate,new o.b(data.data,!0),r),this)}listAll(){return Object(o.p)(this._delegate).then((e=>new h(e,this.storage)))}list(e){return Object(o.o)(this._delegate,e||void 0).then((e=>new h(e,this.storage)))}getMetadata(){return Object(o.n)(this._delegate)}updateMetadata(e){return Object(o.r)(this._delegate,e)}getDownloadURL(){return Object(o.m)(this._delegate)}delete(){return this._throwIfRoot("delete"),Object(o.l)(this._delegate)}_throwIfRoot(e){if(""===this._delegate._location.path)throw Object(o.j)(e)}}class m{constructor(e,t){this.app=e,this._delegate=t}get maxOperationRetryTime(){return this._delegate.maxOperationRetryTime}get maxUploadRetryTime(){return this._delegate.maxUploadRetryTime}ref(path){if(f(path))throw Object(o.i)("ref() expected a child path but got a URL, use refFromURL instead.");return new _(Object(o.q)(this._delegate,path),this)}refFromURL(e){if(!f(e))throw Object(o.i)("refFromURL() expected a full URL but got a child path, use ref() instead.");try{o.c.makeFromUrl(e,this._delegate.host)}catch(e){throw Object(o.i)("refFromUrl() expected a valid full URL but got an invalid one.")}return new _(Object(o.q)(this._delegate,e),this)}setMaxUploadRetryTime(time){this._delegate.maxUploadRetryTime=time}setMaxOperationRetryTime(time){this._delegate.maxOperationRetryTime=time}useEmulator(e,t,n={}){Object(o.k)(this._delegate,e,t,n)}}function f(path){return/^[A-Za-z]+:\/\//.test(path)}function w(e,{instanceIdentifier:t}){const n=e.getProvider("app-compat").getImmediate(),r=e.getProvider("storage").getImmediate({identifier:t});return new m(n,r)}!function(e){const t={TaskState:o.e,TaskEvent:o.d,StringFormat:o.a,Storage:m,Reference:_};e.INTERNAL.registerComponent(new c.a("storage-compat",w,"PUBLIC").setServiceProps(t).setMultipleInstances(!0)),e.registerVersion("@firebase/storage-compat","0.1.10")}(r.a)}}]);