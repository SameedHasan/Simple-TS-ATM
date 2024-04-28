#!/usr/bin/env node

// npm i inquirer @types/inquirer -D @types/node -D
// npm i @types/inquirer -D
// npm i @types/node -D
import inquirer from "inquirer";
import {
  userDetails,
  validateAmount,
  validatePin,
  validateUser,
} from "./functions.js";

async function main() {
  // Interactive menu
  while (true) {
    const answer = await inquirer.prompt({
      type: "list",
      name: "action",
      message: "Choose an action:",
      choices: ["Balance Inquiry", "Cash Withdrawal", "Exit"],
    });

    if (answer.action === "Balance Inquiry") {
      console.log(`Your Current Account Balance is Rs. ${userDetails.balance}`);
    } else if (answer.action === "Cash Withdrawal") {
      let { amount } = await inquirer.prompt([
        {
          name: "amount",
          message: "Please enter amount to withdraw: ",
          type: "input",
          validate: function (input) {
            if (validateAmount(input)) {
              return true;
            } else {
              return "Please enter amount between 500-25000 & multiple of 500.";
            }
          },
        },
      ]);
      if (Number(amount) > userDetails.balance) {
        console.log("Insufficient Balance! Transaction Failed.");
      } else {
        userDetails.balance -= amount;
        console.log(
          `Transaction Successful! Your new balance is Rs.${userDetails.balance}.`
        );
      }
    } else {
      console.log("Exiting...");
      break;
    }
  }
}

inquirer
  .prompt([
    {
      name: "userId",
      message: "Please enter your ID: ",
      type: "input",
      validate: function (input) {
        if (validateUser(input)) {
          return true;
        } else {
          return "Please enter a valid user ID";
        }
      },
    },
    {
      name: "userPin",
      message: "Please enter your Pin: ",
      type: "input",
      validate: function (input) {
        if (validatePin(input)) {
          return true;
        } else {
          return "The pin you have entered is incorrect!";
        }
      },
    },
  ])
  .then((answers) => {
    main().catch(console.error);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
