export const IdGenerator = () => {
  var template = "xyxx-xyyx-yyxx";
  var res = "";
  for (var i = 0; i < template.length; i++) {
    if (template.charAt(i) === "x") {
      res += randomNum().toString();
    } else if (template.charAt(i) === "y") {
      res += randomChar();
    } else {
      res += "-";
    }
  }
  return res;
};

const randomNum = () => {
  return Math.floor(Math.random() * 10);
};

const randomChar = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const index = Math.floor(Math.random() * (chars.length - 1));
  return chars.charAt(index);
};
