from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
from Crypto.Random import get_random_bytes
import base64
# The message to be encrypted
message = "Hello my name is noor and i encrypted this string"
print(message)
# Generate a random 256-bit key (32 bytes)
key = get_random_bytes(32)

# Create a new AES cipher object with the key and AES.MODE_ECB mode
cipher = AES.new(key, AES.MODE_ECB)

# Pad the message, then encrypt it
encrypted = cipher.encrypt(pad(message.encode('utf-8'), AES.block_size))

# Print the encrypted message, base64 encoded so it's safe to print
print(base64.b64encode(encrypted))

