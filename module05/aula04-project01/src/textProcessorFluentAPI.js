const Person = require('./person');
const { evaluateRegex } = require('./util');
//the goal of FluentAPI is run tasks, like a pipeline, step by step, and the end of process it calls the method build that returns the result of process, it's very similar to Builder Approach, the difference is that Fluent API is related with process, while Builder is related with object construction
class TextProcessorFluentAPI {
  //this private property property is accessible just inside of this context
  #content;
  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    //?<= just extract data that comes after this group that we're filtering
    //[contratante|contratado] or condition, (this condition just work because we're using the flag /i to get letters in lower case or upper case)
    //:\s{1} search just texts that have : followed by one space
    //all conditions above are inside of parenthesis to sinalize that we're get all text in front of them

    //(?!\s) negative look around, e.g. if have other text that has more than one space after : this expression will be ignore it
    //.*\n get anything still the first break line (\n)
    //.*? non greety, this ? stop the search in the first recurrence, avoiding loops

    //$ inform that search finish at end of line
    // g => global (search in all lines)
    // m => multiline
    // i => insensitive (lowercase and uppercase)

    const matchPerson = evaluateRegex(
      /(?<=[contratante|contratado]:\s{1})(?!\s)(.*\n.*)$/gim,
    );
    const onlyPerson = this.#content.match(matchPerson);
    this.#content = onlyPerson;
    return this;
  }

  divideTextInColumns() {
    const splitRegex = evaluateRegex(/,/);
    this.#content = this.#content.map(line => line.split(splitRegex));
    return this;
  }

  removeEmptyCharacters() {
    const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g);
    this.#content = this.#content.map(line =>
      line.map(item => item.replace(trimSpaces, '')),
    );
    return this;
  }

  mapPerson() {
    this.#content = this.#content.map(line => new Person(line));
    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
