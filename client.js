const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('music.proto', {});
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const musicPackage = grpcObject.music;
const client = new musicPackage.MusicService('localhost:50051', grpc.credentials.createInsecure());

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function createMusic() {
  readline.question('Enter the music title: ', (title) => {
    readline.question('Enter the artist name: ', (artist) => {
      readline.question('Enter the format (e.g. Vinyl, Cassette, CD): ', (format) => {
        readline.question('Enter the price: ', (price) => {
          const music = {
            title: title,
            artist: artist,
            format: format,
            price: parseFloat(price)
          };
          client.createMusic(music, (error, response) => {
            if (error) {
              console.error(error);
              mainMenu();
            } else {
              console.log(`Music created with ID ${response.id}`);
              mainMenu();
            }
            readline.close();
          });
        });
      });
    });
  });
}

function readMusic() {
  readline.question('Enter the music ID: ', (id) => {
    const request = { id: id };
    client.readMusic(request, (error, response) => {
      if (error) {
        console.error(error);
      } else {
        console.log(response);
      }
      mainMenu();
    });
  });
}

function updateMusic() {
  readline.question('Enter the music ID: ', (id) => {
    readline.question('Enter the music title : ', (title) => {
      readline.question('Enter the artist name : ', (artist) => {
        readline.question('Enter the format : ', (format) => {
          readline.question('Enter the price : ', (price) => {
            const updatedMusic = {
              id: id
            };
            if (title) {
              updatedMusic.title = title;
            }
            if (artist) {
              updatedMusic.artist = artist;
            }
            if (format) {
              updatedMusic.format = format;
            }
            if (price) {
              updatedMusic.price = parseFloat(price);
            }
            client.updateMusic(updatedMusic, (error, response) => {
              if (error) {
                console.error(error);
              } else {
                console.log(response);
              }
              mainMenu();
            });
          });
        });
      });
    });
  });
}

function deleteMusic() {
  readline.question('Enter the music ID: ', (id) => {
    const request = { id: id };
    client.deleteMusic(request, (error, response) => {
      if (error) {
        console.error(error);
      } else {
        console.log(response);
      }
      mainMenu();
    });
  });
}

function mainMenu() {
  console.log('\nWelcome to Music Store!');
  console.log('1. Create new member');
  console.log('2. Read music data');
  console.log('3. Update music data');
  console.log('4. Delete music data');
  console.log('0. Exit\n');
  readline.question('Select an option: ', (option) => {
    switch (option) {
      case '1':
        createMusic();
        break;
      case '2':
        readMusic();
        break;
      case '3':
        updateMusic();
        break
    case '4':
        deleteMusic();
        break;
        case '0':
        readline.close();
            break;
            default:
            console.log('Invalid option, please try again.\n');
            mainMenu();
            break;
            }
            });
            }
            
            // Start the application
            mainMenu();