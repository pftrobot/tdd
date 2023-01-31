function refineText(source, options) {
  /*
  source = normalizeWhiteSpaces(source)
  source = compactWhiteSpaces(source)
  source = maskBannedWords(options, source);

  return source
  */

  // source = source.trim()
  // (refactoring) ->
  // x => x.trim()
  return [normalizeWhiteSpaces, compactWhiteSpaces, maskBannedWords, trimWhitespaces].reduce(
      (value, filter) => filter(value, options),
      source
  )
}

function normalizeWhiteSpaces(value) {
  return value.replace("\t", " ");
}

function maskBannedWords(source, options) {
  return options ? options.bannedWords.reduce(maskBannedWord, source) : source
}

function compactWhiteSpaces(value){
  return value.indexOf("  ") < 0 ? value : compactWhiteSpaces(value.replace("  ", " "))
}

function maskBannedWord(source, bannedWord) {
  const mask = "*".repeat(bannedWord.length)
  return source.replace(bannedWord, mask)
}

function trimWhitespaces(value) {
  return value.trim();
}

module.exports = refineText;
