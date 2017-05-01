import * as firebase from 'firebase'

const config = {
    databaseURL: 'https://vardump.firebaseio.com/',
}

firebase.initializeApp(config)

export default firebase
