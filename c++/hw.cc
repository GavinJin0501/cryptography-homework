#include <sodium.h>
#include <iostream>

#define MESSAGE (const unsigned char *) "test"
#define MESSAGE_LEN 4
#define CIPHERTEXT_LEN (crypto_box_MACBYTES + MESSAGE_LEN)


int main(int argc, char **argv) {
  // Initialize libsodium.
  if (sodium_init() < 0) {
    std::cout << "libsodium is badly installed" << std::endl;
    return -1;
  }

  // Your implementation goes here:
  // 1. Generate a secret and public key pair for the sender and one for the receiver.
  // 2. Define the message you want to encrypt including its length.
  // 3. Allocate a buffer for the nonce and cipher text.
  // 4. use `crypto_box_easy` to encrypt, then `crypto_box_open_easy` to decrypt.
  // 5. print the result and validate it is correct.
  // Follow this example https://doc.libsodium.org/public-key_cryptography/authenticated_encryption

  return 0;
}
