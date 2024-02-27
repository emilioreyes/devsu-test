class Regex{
    constructor(){}
    public getRegexDate(): RegExp {
        let value: RegExp = /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/
        return value;
      }
}
const RegexUtil = new Regex();
export { RegexUtil };