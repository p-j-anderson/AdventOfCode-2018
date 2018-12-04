/**
 * Avent of Code - Day 2
 * Inventory Management System: https://adventofcode.com/2018/day/2
 */

const input = ['auxwcbzrmdvpsjfgkrthnkioqm', 'auxwcbzrmdvpsjfgbltonyijqe', 'auxwcbzrmdfpsefgklthnoioqe', 'auxwcbzrmdvpsjfgkluhnjisqe', 'auxwcbzrmdvesjfgdzthnyioqe', 'auxwcbzrmdvhsjfgklthnmijqe', 'auxwcbzridvpsjfgkltxeyioqe', 'ayxwcbzrgdvpsjfgklthiyioqe', 'ajxwcbzrmdvpsjfgklkhnyiode', 'auxwcbcrmdvpsjfqelthnyioqe', 'auxwcbzrmsvpsjsgklthnyiope', 'auxwcbzrmqvpsjzgklghnyioqe', 'auxwcbzrmdvpsjtqklthxyioqe', 'auxwcbzrmdopsjfdklthncioqe', 'auxwcbzrmdvpsjfgkltmhyfoqe', 'aixwcbzrmdvpsjfgllthdyeoqe', 'vuxicbzrmdepsjfgklthnyioqe', 'auxwcbbxmdkpsjfgklthnyioqe', 'auxwcbzrgdvpsofaklthnyioqe', 'auxycbzrmdvpsjfgklthnyuose', 'aujwcbzrmdvprjfgkltcnyioqe', 'auxwgbzrmdvpsjfgyzthnyioqe', 'auxwcbzrmavpsjfgkltsnyiome', 'auxwcbgrmdvpsjfgkdthnrioqe', 'kuxwcbzrmdvpsyfgklthnyioue', 'auxwcbzomdvpjdfgklthnyioqe', 'auxwcbzrmdppsjfgklthvyifqe', 'aunwubzrmdvpsjrgklthnyioqe', 'auxwcbzrmoipsjfgklbhnyioqe', 'auxwdbzrmdvpsjfgmlthnyioce', 'auxwcbzjmsvpsjfiklthnyioqe', 'auxwcbzrmwcpsjfcklthnyioqe', 'auxwcbzfmdvprjfhklthnyioqe', 'auxdcbzrgdvpsjfgklthnyxoqe', 'wuxwbbzrmdvpsjfgklthnyiote', 'auowcbjrmdvpsjfgklthnyfoqe', 'auxwsbzrmdvpsjfglltcnyioqe', 'quxwcbzrmdvpkjfgklthnyioqt', 'vuxwcbzrudvpsjfgklthnyioqi', 'puxwcbzrmdvgsjfgklthncioqe', 'luxdcbzrmdvpsjfgkothnyioqe', 'auxwcbzrmdvpsjfyklthfhioqe', 'auxwcbqrmdvpsjfgkldhnyiote', 'quxwcbzrmlvpsjfgklthnyioqi', 'auxwcbzgmdvpsjfoklthnyiuqe', 'auxwcbzrmdvpsbfgkltdjyioqe', 'auxwcbzsmdrpsjfgklthpyioqe', 'auxwcbzrmfvpsjfwklthnyiote', 'auxbkpzrmdvpsjfgklthnyioqe', 'auxwcbzrddvpsjfsklthnyroqe', 'abxwcbzrmdvpsjfgkltdnyivqe', 'awxwcbzrmvvpsjfgklthngioqe', 'auxwcbzrmkvgsjfgkltcnyioqe', 'auxwcbammdvpsjfgklthpyioqe', 'auxwcbhrmdvpsjfgtlthnuioqe', 'auxwcpzrmdvpbjogklthnyioqe', 'auxwcbzrmdvpslfgklbhkyioqe', 'auxwcbsrmdvpjjfgkldhnyioqe', 'auxwcbzrmdqpsjfgauthnyioqe', 'ydxwcbxrmdvpsjfgklthnyioqe', 'auxwcbzrmdvpejfgklthnyyofe', 'auxwchzrmxvpsjfgklthnyioqh', 'auxwcbzrtdvpsjfgklxhnzioqe', 'auxwcbyrmdvpsnfgklnhnyioqe', 'auxwcbzrcdvpsjugklihnyioqe', 'auxwcbzrddvpsjfgklhhnyiaqe', 'aumwtbzrmdvpsjfgklthnyitqe', 'auxucbzrmdvpsjfgklthwfioqe', 'auxwcbzrmdvpzmfgkllhnyioqe', 'auxwcbzrmdvpsjhgklthntiome', 'buxwzbzrmdvpszfgklthnyioqe', 'ouxwcbzsgdvpsjfgklthnyioqe', 'auxwcbzrmdvpsjfskltgnyioqz', 'auxwcbbrmdvpsjftklthnyioqu', 'quxocbzrmdvpsjfgklthfyioqe', 'acxwcbzrmdvpsjfgklfhnrioqe', 'auxwcbzrmdnpsjfrkjthnyioqe', 'wuxwybzrmdwpsjfgklthnyioqe', 'auxwgbxrmdvpsjfghlthnyioqe', 'atxwcbzrmdvnsjfgklthnyjoqe', 'acxwcbzmmdvpsjfbklthnyioqe', 'auxhcbzrmdvbsjbgklthnyioqe', 'auxwlbzrfdvpsjfgxlthnyioqe', 'auxwmbzrmdfpsjqgklthnyioqe', 'auxwcbzrmdvpsgfgklahnyigqe', 'auxwgbzrmdvpsjfgzldhnyioqe', 'auxwcbzrmdvpydfgklthnyiohe', 'auxwxbzrmdvpsjfsklchnyioqe', 'auxqcbzrmdvpsjfgqlthnyiwqe', 'auxwcozrmdvssbfgklthnyioqe', 'auxvcczrmdvpsufgklthnyioqe', 'auxwcbzrudvpsjfgklyhnyioxe', 'aulwcbzrmdvpsjqgknthnyioqe', 'auukcbzrmdvpsjfgklthtyioqe', 'auxwcszimdvpsjfgklthnyigqe', 'juxwcbzrbdvpsjfgklthnyboqe', 'auxwcbzrmdvpjofgklthnyioqj', 'auxwcbzrmdvpsjfgplfhnyione', 'auxwcbzrmdhpsjfgkltknyeoqe', 'luxwcqzrmdvpsjfgklthnbioqe', 'uuxwcbzrmdvpsjfgkithnyiiqe', 'auxwcbzrmdvpdjfgkrthnyeoqe', 'auuwcbnrmdvpsjfgklthnjioqe', 'auxwcnzrmdvpsjvgklthnyooqe', 'auxwcbzcmdvpsjfcklthnyiose', 'auxwcbzrldfpsjfgklthjyioqe', 'auxwcizrmdvpsjfjklthnymoqe', 'auxwcbtrmdvpsjfgtlphnyioqe', 'amxwcbzrmdvksjfgklthnyiove', 'auxwcbzrmdvpszfgkpthnyiuqe', 'auxwcbzrmdvxdjfgkltqnyioqe', 'auxwcbzrudvpsjfgklthnymiqe', 'auxwcbirmdvfsjfgklmhnyioqe', 'auwwcbzrndvprjfgklthnyioqe', 'auxwcbormdgpsjfgklbhnyioqe', 'auxwabzrmdupsjfgklthnyioqt', 'auxvcbzrmdvpsjfgkltrmyioqe', 'auxwcbzrmddpsjfsklthnyizqe', 'auxwcczrmuvpyjfgklthnyioqe', 'auxwcczrmdvpsnfgkpthnyioqe', 'auxkcbzrmdvpsjfhklihnyioqe', 'auxwcbzrmdvpsjfgklthnkijje', 'auxwcbzcmdvpsjpgkldhnyioqe', 'auxwcnzrudvpstfgklthnyioqe', 'xuxwcbzrgdvusjfgklthnyioqe', 'aaxwcbzrmdvpsjvgklthnyidqe', 'auxwcbztmdvpsjfgklthnyhqqe', 'auxwcbzrmfvpsjfgklthnyilfe', 'auxwcbzrmdvksjfgklthjyioqq', 'auxwcbzrmdzksjfgktthnyioqe', 'auxwcbzrmfvpszfgklohnyioqe', 'auxwckzamdvpsjfgklthnyioqs', 'auxwcmzrhdvpsjfaklthnyioqe', 'fuxwcbzrmdapsjfgklrhnyioqe', 'avxwxbzrmdvpsjfgklthniioqe', 'auxwubzrmevpsjfgkltpnyioqe', 'fuxwcbzrgdvpsjfgklhhnyioqe', 'duxwwbdrmdvpsjfgklthnyioqe', 'audwcbzrmdvpnjcgklthnyioqe', 'auxtcbzrmdvpsjmgklthnyyoqe', 'aucwcbwrmdepsjfgklthnyioqe', 'auxwcbzrudvpsjfpklthnyiose', 'auxwcbzridvpsjfsklthxyioqe', 'auxtcbzrmdvpscfgklyhnyioqe', 'auxwcbzrmdvppjfgklthnyivee', 'auxwdbzrmuvpskfgklthnyioqe', 'auxwubzrmdvosjfgklthnyiope', 'auxwcbzrmhnpsjfgklthnyimqe', 'auxwcbzrmdqpwjfgkltpnyioqe', 'auxwcbormdvpsjljklthnyioqe', 'auxwcbzrmdjpsjfgkltjpyioqe', 'auxwcbzrmdvpszfgklthkyizqe', 'auxwcbzighvpsjfgklthnyioqe', 'auxwcbzrmdlpsjfgcythnyioqe', 'auxwcbzumdvpsjflklthnyimqe', 'pdxwcbzrmdvpsjfgklthnyihqe', 'auxwcbzrsdvpsjfgklhhvyioqe', 'auxwcfzamdvpsjfgkmthnyioqe', 'aexwcdzrmdvpsjogklthnyioqe', 'auxxcbkrmavpsjfgklthnyioqe', 'auxwcbzredvssjfgklthryioqe', 'aupwqbzrmdvpsjfgklthnyioqc', 'auxwcbzrmdvpkcagklthnyioqe', 'auxwcbzrmdvwsbfgklthnlioqe', 'aunwcbzxmdvhsjfgklthnyioqe', 'auxwcbzrhddpsjfgklthnnioqe', 'ouxwcbzrmdvtsifgklthnyioqe', 'auxwcbzrmdqpsjfgklthnyfoqp', 'auxwrbzrhdvpsjfgolthnyioqe', 'auxwcbcqmdvpsjugklthnyioqe', 'auxwcbzrqdvpsjhgklthnjioqe', 'auxmcbzrmdvpsjfgmlthnyjoqe', 'auxwcbzrmdvpsjfgzlthnycoqv', 'auswcbzrmdvpsffgslthnyioqe', 'auxwcbzrfdvpsjfrmlthnyioqe', 'auxwcbzrmdvpsjngzlthnxioqe', 'auxwcbzrmdvpsjfuqlthnyiyqe', 'auxwzbzrrdvosjfgklthnyioqe', 'auxwcbzdmdvpsjfikxthnyioqe', 'guxwcbzrmdvpsjfgmlthnytoqe', 'auxwcbzrmdvpspfgkytenyioqe', 'auxvcbzrldvpsjfgklthnyhoqe', 'auxwcbzrmavpckfgklthnyioqe', 'autwcbzrmdvpsafgklthnyirqe', 'auxwcbzrxuvpsjfgklthmyioqe', 'auxwcbarmdppsjfgklthnywoqe', 'anxvcbzrmdvpsjfgklthnyijqe', 'auxwcbwrmdapsjngklthnyioqe', 'abxwcbzrmdvpsjugkltgnyioqe', 'auxwcbtrmdvpsjfgkltunyioue', 'aujwcbzrmovpsjfgklthryioqe', 'auxwcbzrydvpsjfgklthndikqe', 'auxwcbzrmdvpsjfgklmrnyioqo', 'auxwcbzrddvpsjfggithnyioqe', 'auxwcbzrmdvpfjfaklthlyioqe', 'fuxtcbzrmdvpsjfgklwhnyioqe', 'tuxwcbzrjdvpsjfgjlthnyioqe', 'auxwcbzrmdppsofgklthnyfoqe', 'auxvclzamdvpsjfgklthnyioqe', 'auxwcbzrmdvpsjfdklhhnzioqe', 'auxwcbzrmsvpsvdgklthnyioqe', 'arxfcbzrmdvpsvfgklthnyioqe', 'auxzcbzrmdvpsjfgklthnhioqj', 'auxwcbzrrdvpsjfgpltunyioqe', 'auxuibzrmdvpwjfgklthnyioqe', 'auxwcbzrwdqpsjfgklthnyooqe', 'aujwcbzrmdvpsjvgklthxyioqe', 'abxwcbzrmfvpsjfgklthnyxoqe', 'aurwcbzrmdvpshfgklthnyhoqe', 'auxwcbzjmdvpsjfgknthnycoqe', 'auxwcbzrmdvpsjfgklmhxwioqe', 'auxwcbzrmfvpsjfgklthnyiorq', 'auxwcbormdvpsjfgklwhnlioqe', 'auxwctzrmdvpsjfgklcknyioqe', 'awxwcbzrmdvpsjfgvlthnyiome', 'auxwcbzrmdvpsjfjklthnyixje', 'auxwcsxrmdvpsjfgkltsnyioqe', 'auxbmbzrmdvpsjfgklthnyioce', 'auxwcbzrmdvpsjfukzthnytoqe', 'aixwcbzrmdvpsjfgllthdyioqe', 'auxwcbzrmdypsjfgklthnlioqy', 'auxccbzrmdvpsjfgkltrnnioqe', 'auxwcznrmdvpsjfgklthnykoqe', 'auxwmqzrmdvpsjfgilthnyioqe', 'auxwcbzrmdvpdyfgolthnyioqe', 'auxwcbzrmdvpsjfgkmohnqioqe', 'auxwcfzrmzvpsjfoklthnyioqe', 'auxwjyzrmdvpsjfgulthnyioqe', 'auxwcgzredvpsjfgkxthnyioqe', 'wuxwcbtrmdvpsjfgklthnyiofe', 'auxwcbzrmdopsgfgklthncioqe', 'auxmcbzjmdvpsjfgklbhnyioqe', 'auxwlbzrmdvpsjffklthgyioqe', 'auxwcbzrmrvpsjfgqlthtyioqe', 'kuxwhbzrmdvpsjfgklthgyioqe', 'auxwcozrmdgpsjfgklthnydoqe', 'auxwdbzrmdvpdjfgklthgyioqe', 'auxwqbzrmdapsvfgklthnyioqe', 'auqwcbzridvjsjfgklthnyioqe', 'auxwckzrmdvpsjfoklthnyuoqe', 'auxwcbzvmdvpsjfgklghnyiome', 'auxtcbzrmdvpsjqgktthnyioqe', 'auxwcbzrmdvesjfgkljhnnioqe', 'auxwcbzrmpvpsqfgklthnqioqe', 'auxwcbzrmdcpsqfgklthnzioqe', 'yuxwcbzrmdvpsjggklthnlioqe', 'auxwcbzradvpsjftklthoyioqe', 'auxwcbzrmdvjujfgklmhnyioqe', 'auxwcbzrmdvpsrfgklpinyioqe', 'auxwobzrvqvpsjfgklthnyioq']

/**
 * Part One
 */

// Searches each word and totals letter counts
const wordReducer = word => word.split('').reduce((acc, cur) => {
  // Increment the word count
  (acc[cur] ? acc[cur]++ : acc[cur] = 1)
  return acc
}, {})

// Searches an array of words and finds 2/3 character occurrences
const searchWords = arr => arr.reduce((acc, cur) => {
  // Set details and twice/thrice
  const details = wordReducer(cur)
  let twice, thrice = false

  // Search the object entires for 2/3 occurrences
  Object.entries(details).forEach(([k, v]) => {
    if (v === 2) twice = true
    if (v === 3) thrice = true
  })

  // Increment the global counter
  if (twice) acc['twice']++
  if (thrice) acc['thrice']++
  return acc
}, {twice: 0, thrice: 0})

const searchResult = searchWords(input)
console.log('Inventory Management - Part One:', searchResult['twice'] * searchResult['thrice'])

/**
 * Part Two
 */

// Compares two strings to determine if 1 or less characters are different
const compareStr = (str1, str2, count, err = 0) => {
  // Confirm characters remain
  if (count >= 0) {
    // Check if characters match
    if (str1.charAt(count) !== str2.charAt(count)) {
      // Increment the err count
      err++
      if (err > 1) {
        // Break the loop if more than 1 character differs
        return false
      }
    }
    // Continue looping
    return compareStr(str1, str2, count - 1, err)
  } else {
    // No remaining characters to check
    return true
  }
}

// Checks a key against array values for compareStr matches
const compareArr = (key, src) => {
  // Check for a match
  const match = src.find((a, i) => {
    return compareStr(key, a, key.length)
  })

  // return match if found
  if (match) {
    return [key, match]
  } else {
    return false
  }
}

// Loops a list of arrays to find matches through cmpareArr/compareStr
const findMatch = (arr, match = false) => {
  if (arr.length > 1) {
    const key = arr[0]
    const src = arr.slice(1)
    match = compareArr(key, src)

    if (!match) {
      // Search again
      return findMatch(src)
    } else {
      // Found a match. Remove the different char and return
      return key.split('').map((char, i) => {
        if (char !== match[1].charAt(i)) return ''
        return char
      }).join('')
    }
  } else {
    // No remaining arrs to search
    return false
  }
}

console.log('Inventory Management - Part Two:', findMatch(input))
