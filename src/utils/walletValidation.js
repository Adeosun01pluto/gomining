// import * as bip39 from "bip39";

// // **Validate Mnemonic (Passphrase)**
// export const isValidMnemonic = (phrase) => {
//   const words = phrase.trim().toLowerCase().split(/\s+/);
  
//   // Check if it's 12 or 24 words
//   if (![12, 24].includes(words.length)) return false;
//   console.log(bip39.validateMnemonic(phrase))
//   // Check if all words exist in BIP39 wordlist
//   return bip39.validateMnemonic(phrase);
// };

// // **Validate Private Key**
// export const isValidPrivateKey = (key) => {
//   // Remove "0x" prefix if present
//   if (key.startsWith("0x")) key = key.slice(2);
//   console.log(key)
//   // Check if it's a 64-character hex string
//   return /^[a-fA-F0-9]{64}$/.test(key);
// };



// ✅ Validate Mnemonic (Passphrase)
export const isValidMnemonic = (phrase) => {
  if (!phrase || typeof phrase !== "string") return false;

  // Split words and trim extra spaces
  const words = phrase.trim().split(/\s+/);

  // Check if it's exactly 12 or 24 words
  return words.length === 12 || words.length === 24;
};

// ✅ Validate Private Key
export const isValidPrivateKey = (key) => {
  if (!key || typeof key !== "string") return false;

  // Remove "0x" prefix if present
  if (key.startsWith("0x")) key = key.slice(2);

  // Check if it is a 64-character hexadecimal string
  return /^[a-fA-F0-9]{64}$/.test(key);
};
