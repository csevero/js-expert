const { evaluateRegex } = require('./util');

class Person {
  constructor([
    nome,
    nacionalidade,
    estadoCivil,
    documento,
    rua,
    numero,
    bairro,
    estado,
  ]) {
    //^ init of text
    //(\w{1}) get the first letter of text and store it in the first group
    //([a-zA-Z]+$) get the rest of text and store in the second group
    //g search for all occurrences
    const firstLetterExp = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/g);
    const formatFirstLetter = prop => {
      return prop.replace(
        firstLetterExp,
        (fullMatch, group1, group2, index) => {
          return `${group1.toUpperCase()}${group2.toLowerCase()}`;
        },
      );
    };

    this.nome = nome;
    this.nacionalidade = formatFirstLetter(nacionalidade);
    this.estadoCivil = formatFirstLetter(estadoCivil);
    this.documento = documento.replace(evaluateRegex(/\D/g), '');
    //start search after " a " and get all that is in front of it
    //(?<=) ignore all that is behind of this match
    this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/)).join();
    this.numero = numero;
    this.bairro = bairro.match(evaluateRegex(/(?<=\s).*$/)).join();
    this.estado = estado.replace(evaluateRegex(/\.$/), '');
  }
}

module.exports = Person;
