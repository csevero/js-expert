import StringUtil from '@csevero/string-util';

const availableFormats = {
  "dd-mm-yyyy": '$<day>-$<month>-$<year>',
  "yyyy-mm-dd": '$<year>-$<month>-$<day>',
  "yyyy/mm/dd": '$<year>/$<month>/$<day>',
  "dd/mm/yyyy": '$<day>/$<month>/$<year>',
}

const yymmdd = /(?<year>\d{4}).(?<month>\d{2}).(?<day>\d{2})/g
const ddmmyy = /(?<day>\d{2}).(?<month>\d{2}).(?<year>\d{4})/g

const stringToDateExps = {
  "dd-mm-yyyy": ddmmyy,
  "dd/mm/yyyy": ddmmyy,
  "yyyy-mm-dd": yymmdd,
  "yyyy/mm/dd": yymmdd,
}
export default class DateUtil {
  static formatDate(date, format) {
    if (!availableFormats[format])
      return { error: `the format ${format} is not available yet :(` }

    const exp = availableFormats[format]
    const [result] = date.toISOString().match(yymmdd)

    return result.replace(yymmdd, exp)
  }

  static formatString(dateString, currentFormat, expectedFormat) {
    if (StringUtil.isEmpty(dateString))
      return { error: 'your text is empty' }

    if (!availableFormats[currentFormat])
      return { error: `the format ${currentFormat} is not available yet :(` }

    if (!availableFormats[expectedFormat])
      return { error: `the format ${expectedFormat} is not available yet :(` }

    const toDateExp = stringToDateExps[currentFormat]
    const dateStringInISO = StringUtil.removeEmptySpaces(dateString).replace(toDateExp, '$<year>-$<month>-$<day>')

    const dateConverted = new Date(dateStringInISO)

    return this.formatDate(dateConverted, expectedFormat)
  }
}