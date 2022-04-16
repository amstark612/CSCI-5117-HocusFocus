import Vue from "vue";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import App from "./App.vue";
import router from "./router";
import { firestorePlugin } from "vuefire";
import "@/assets/styles/global.css";
Vue.use(firestorePlugin);

Vue.config.productionTip = false;

let app = "";
const firebaseConfig = {
	apiKey: "AIzaSyDt_lZ8mt7LW2GDwlAbHJrMtrWC26rU_mc",
	authDomain: "hocus-focus-mutiny.firebaseapp.com",
	projectId: "hocus-focus-mutiny",
	storageBucket: "hocus-focus-mutiny.appspot.com",
	messagingSenderId: "345284571286",
	appId: "1:345284571286:web:c095b5dd4cc845c2b912b7",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(() => {
	if (!app) {
		/* eslint-disable no-new */
		app = new Vue({
			router,
			render: (h) => h(App),
		}).$mount("#app");
	}
});

const db = firebase.firestore();

const settings = { timestampsInSnapshots: true };
db.settings(settings);

const auth = firebase.auth();

export { db, auth };
