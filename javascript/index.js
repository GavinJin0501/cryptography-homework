const sodium = require('libsodium-wrappers-sumo');

function Uint8ArrayToString(array) {
  let result = [];
  for (let c of array) {
    result.push(String.fromCharCode(c));
  }
  return result.join('');
}

// Your code goes here.
function solution() {
  console.log("in solution");
  let message = "test";

  // 1. Generate a secret and public key pair for the sender and one for the receiver. Look at `sodium.crypto_box_keypair()`.
  //    You can find details about its return type here https://www.npmjs.com/package/libsodium-wrappers-sumo#api
  const senderKeyPair = sodium.crypto_box_keypair();
  const receiverKeyPair = sodium.crypto_box_keypair();

  // 2. Generate a random nonce using `sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES)`.
  const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);

  // 3. use `sodium.crypto_box_easy(...)` to encrypt some message.
  //    Look here for its signature https://github.com/jedisct1/libsodium.js/blob/master/wrapper/symbols/crypto_box_easy.json
  const encryptedBytes = sodium.crypto_box_easy(message, nonce, receiverKeyPair.publicKey, senderKeyPair.privateKey);
  console.log("Encrypted bytes:", encryptedBytes, Uint8ArrayToString(encryptedBytes));

  // 4. use `sodium.crypto_box_open_easy(...)` to decrypt it.
  //    Look here for its signature https://github.com/jedisct1/libsodium.js/blob/master/wrapper/symbols/crypto_box_open_easy.json
  const decryptedBytes = sodium.crypto_box_open_easy(encryptedBytes, nonce, senderKeyPair.publicKey, receiverKeyPair.privateKey);
  console.log("Decrypted bytes:", decryptedBytes)
  // const view = new DataView(decryptedBytes.buffer);
  // view.setUint8(0, 100);

  // 5. crypto_box_open_easy returns a Uint8Array buffer, use the provided `Uint8ArrayToString` to convert it to a string.
  const decryptedMessage = Uint8ArrayToString(decryptedBytes)

  // 6. print the result and validate it is correct.
  // Mimic this example but using the JS API https://doc.libsodium.org/public-key_cryptography/authenticated_encryption
  // Note how the keys flip between encryption and decryption.
  console.log("Original message :", message)
  console.log("Decrypted message:", decryptedMessage)
}

// Wait for libsodium to initialize first
sodium.ready.then(solution);
