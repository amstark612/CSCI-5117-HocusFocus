import { db, fieldValueUtility } from "./main";
import { pomodoro } from "@/constants";

async function setDefaultSettings(user) {
    db.collection("users")
        .doc(user.uid)
        .collection("timer_settings")
        .doc("0")
        .set(pomodoro.DEFAULT_SETTINGS)
        .then(() => {
            console.log("User timer settings document created!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
    });
}

async function setDefaultTask(user) {
    db.collection("users")
        .doc(user.uid)
        .collection("tasks")
        .doc("0")
        .set({
            createdAt: fieldValueUtility.serverTimestamp(),
            progress: 0,
            tags: ["tapToAddTags"],
            title: "Tap to edit title",
        })
        .then(() => {
            console.log("Default task created!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
    });
}

async function registerNewUser(user) {
    db.collection("users")
        .doc(user.uid)
        .set({
            displayName: user.displayName,
            email: user.email,
            focusTime: 0,
            joinDate: fieldValueUtility.serverTimestamp(),
            photoUrl: user.photoURL,
        })
        .then(() => {
            console.log("User document created!");
            setDefaultSettings(user);
            setDefaultTask(user);
            return true;
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
            return false;
    });
}

export async function registerUser(user) {
    db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
            if (doc.exists) {
                return true;
            } else {
                registerNewUser(user).then(success => {
                    if (success) {
                        return true;
                    } else {
                        return false;
                    }
                });
            }
    });
}
