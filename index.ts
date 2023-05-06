#! /usr/bin/env node
import chalk, { Chalk } from 'chalk';
import inquirer, { QuestionCollection } from 'inquirer';

//enum define four possible operations
enum Operation {
  ADD = '+',
  SUBTRACT = '-',
  MULTIPLY = '*',
  DIVIDE = '/',
}
//Interface defines shape of input
interface CalculatorInput {
  firstNumber: number;
  secondNumber: number;
  operation: Operation;
}

// function using switch operation , interface as parameter
function performOperation(input: CalculatorInput): number {
  switch (input.operation) {
    case Operation.ADD:
      return input.firstNumber + input.secondNumber;
    case Operation.SUBTRACT:
      return input.firstNumber - input.secondNumber;
    case Operation.MULTIPLY:
      return input.firstNumber * input.secondNumber;
    case Operation.DIVIDE:
      return input.firstNumber / input.secondNumber;
    default:
      throw new Error(`Invalid operation: ${input.operation}`);
  }
}
// Entry point of application, defines an array of Questioncollection

async function main() {
  const questions: QuestionCollection<CalculatorInput> = [
    {
      type: 'number',
      name: 'firstNumber',
      message: 'Enter the first number:',
      validate: (input) => input > 0 || 'The number must be greater than 0',
    },
    {
      type: 'number',
      name: 'secondNumber',
      message: 'Enter the second number:',
      validate: (input) => input > 0 || 'The number must be greater than 0',
    },
    {
      type: 'list',
      name: 'operation',
      message: 'Select an operation:',
      choices: [
        { name: 'Addition', value: Operation.ADD },
        { name: 'Subtraction', value: Operation.SUBTRACT },
        { name: 'Multiplication', value: Operation.MULTIPLY },
        { name: 'Division', value: Operation.DIVIDE },
      ],
    },
  ];

  const input: CalculatorInput = await inquirer.prompt(questions);
  const result = performOperation(input);
  console.log(chalk.green(`The result is: ${result}`));
}

main().catch((error) => console.error(chalk.red(error)));
