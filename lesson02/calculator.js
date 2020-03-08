const readline = require("readline-sync");
const colors = require("colors/safe");

// const MESSAGES = {
//   welcome: "Welcome to Calculator! Enter your name:",
//   validName: "Make sure to enter a valid name."
// };

const MESSAGES = {
  english: {
    welcome: "Welcome to Calculator! Enter your name:",
    validName: "Make sure to enter a valid name."
  },
  spanish: {
    welcome: "Bienvenido a la calculadora! Entre su nombre:",
    validName: "Asegúrese de entrar un nombre válido."
  },
  en: {
    welcome: "Welcome to Calculator! Enter your name:",
    validName: "Make sure to enter a valid name."
  },
  es: {
    welcome: "Bienvenido a la calculadora! Entre su nombre:",
    validName: "Asegúrese de entrar un nombre válido."
  }
};

function prompt(message) {
  console.log(colors.red("=> ") + message);
}

function invalidNumber(number) {
  return number.trimStart() === "" || Number.isNaN(Number(number));
}

function invalidName(name) {
  return !Number.isNaN(Number(name));
}

prompt(colors.yellow("Please choose a language (en/es) or (english/spanish)"));
let lang = readline.question();
lang = lang.toLocaleLowerCase();

while (!["en", "es", "english", "spanish"].includes(lang)) {
  prompt(colors.red("Please choose one of both langauges (en/es)"));
  lang = readline.question();
}

// function language(lang, msg) {
//   if (lang === "en") {
//     return MESSAGES["en"][msg];
//   }
//   if (lang === "es") {
//     return MESSAGES["es"][msg];
//   }
// }

function language(lang) {
  return function(msg) {
    return MESSAGES[lang][msg];
  };
}

while (true) {
  prompt(colors.rainbow(language(lang)("welcome")));
  let name = readline.question();

  while (invalidName(name)) {
    prompt(colors.red(language(lang)("validName")));
    name = readline.question();
  }

  prompt(colors.green(name + ", What's the first number?"));
  let number1 = readline.question();

  while (invalidNumber(number1)) {
    prompt(colors.red("Hmm... that doesn't look like a valid number."));
    number1 = readline.question();
  }

  prompt(colors.green(name + ", What's the second number?"));
  let number2 = readline.question();

  while (invalidNumber(number2)) {
    prompt(colors.red("Hmm... that doesn't look like a valid number."));
    number2 = readline.question();
  }

  prompt(
    colors.bold.blue(
      "What operation would you like to perform? \n" +
        colors.red("=> ") +
        "1) Add 2) Subtract 3) Multiply 4) Divide"
    )
  );
  let operation = readline.question();

  while (!["1", "2", "3", "4"].includes(operation)) {
    prompt(colors.red("Must choose 1, 2, 3 or 4"));
    operation = readline.question();
  }

  let output;
  switch (operation) {
    case "1":
      output = Number(number1) + Number(number2);
      break;
    case "2":
      output = Number(number1) - Number(number2);
      break;
    case "3":
      output = Number(number1) * Number(number2);
      break;
    case "4":
      output = Number(number1) / Number(number2);
      break;
  }
  prompt(colors.rainbow(`${name}, The result is: ${output.toFixed(2)}\n`));
  prompt(
    colors.black.bgWhite("Would you like to perform another operation? (y/n)")
  );
  let answer = readline.question();
  while (!["y", "n"].includes(answer.toLowerCase())) {
    prompt(colors.red("choose y or n"));
    answer = readline.question();
  }

  if (answer.toLowerCase() === "n") break;
  console.clear();
}
