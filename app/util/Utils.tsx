export function cleanString(input: string) {
  // Define a regular expression that matches all characters except a-z, A-Z, ., ,, and ?
  const regex = /[^a-zA-Z.,?!% 0-9]/g;
  // Replace all matched characters with an empty string
  return input.replace(regex, "");
}
