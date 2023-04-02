const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const firebaseAdmin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: 'https://grpc.firebaseio.com'
});

const db = firebaseAdmin.firestore();
const packageDefinition = protoLoader.loadSync('music.proto', {});
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const musicPackage = grpcObject.music;

const server = new grpc.Server();

server.addService(musicPackage.MusicService.service, {
  createMusic: createMusic,
  readMusic: readMusic,
  updateMusic: updateMusic,
  deleteMusic: deleteMusic
});

function createMusic(call, callback) {
  const music = call.request;
  db.collection('music').add(music)
    .then((docRef) => {
      const response = {
        id: docRef.id,
        title: music.title,
        artist: music.artist,
        format: music.format,
        price: music.price
      };
      callback(null, response);
    })
    .catch((error) => {
      const response = { error: error.message };
      callback(response, null);
    });
}

function readMusic(call, callback) {
  const id = call.request.id;
  db.collection('music').doc(id).get()
    .then((doc) => {
      if (!doc.exists) {
        const response = { error: 'Music not found' };
        callback(response, null);
      } else {
        const response = {
          id: doc.id,
          title: doc.data().title,
          artist: doc.data().artist,
          format: doc.data().format,
          price: doc.data().price
        };
        callback(null, response);
      }
    })
    .catch((error) => {
      const response = { error: error.message };
      callback(response, null);
    });
}

function updateMusic(call, callback) {
  const id = call.request.id;
  const updatedMusic = {
    title: call.request.title || '',
    artist: call.request.artist || '',
    format: call.request.format || '',
    price: call.request.price || 0
    };
    db.collection('music').doc(id).set(updatedMusic, { merge: true })
    .then(() => {
    const response = {
    id: id,
    title: updatedMusic.title,
    artist: updatedMusic.artist,
    format: updatedMusic.format,
    price: updatedMusic.price
    };
    callback(null, response);
    })
    .catch((error) => {
    const response = { error: error.message };
    callback(response, null);
    });
    }
    
    function deleteMusic(call, callback) {
    const id = call.request.id;
    db.collection('music').doc(id).delete()
    .then(() => {
    const response = { id: id };
    callback(null, response);
    })
    .catch((error) => {
    const response = { error: error.message };
    callback(response, null);
    });
    }
    
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    console.log('Server running at http://0.0.0.0:50051');
    server.start();