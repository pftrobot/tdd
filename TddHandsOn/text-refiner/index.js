function refineText(source, options) {
  /*
  source = normalizeWhiteSpaces(source)
  source = compactWhiteSpaces(source)
  source = maskBannedWords(options, source);

  return source
  */

  return [normalizeWhiteSpaces, compactWhiteSpaces, maskBannedWords].reduce(
      (value, filter) => filter(value, options),
      source
  )
}
function normalizeWhiteSpaces(source) {
  return source.replace("\t", " ");
}

function maskBannedWords(source, options) {
  return options ? options.bannedWords.reduce(maskBannedWord, source) : source
}

function compactWhiteSpaces(source){
  return source.indexOf("  ") < 0 ? source : compactWhiteSpaces(source.replace("  ", " "))
}

function maskBannedWord(source, bannedWord) {
  const mask = "*".repeat(bannedWord.length)
  return source.replace(bannedWord, mask)
}

module.exports = refineText;
