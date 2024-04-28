function generateUserId(): string {
  return "user" + Math.floor(Math.random() * 10);
}

function generateUserPin(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

function generateAccountBalance(): number {
  return Math.floor(10000 + Math.random() * 9000);
}
export const userDetails = {
  userId: generateUserId(),
  userPin: generateUserPin(),
  balance: generateAccountBalance(),
};
console.log("userDetails :>> ", userDetails);

export function validateUser(input: string): boolean {
  return userDetails?.userId === input;
}
export function validatePin(input: string): boolean {
  return userDetails?.userPin === input;
}
export function validateAmount(input: string): boolean {
  return (
    Number(input) >= 500 && Number(input) <= 25000 && Number(input) % 500 === 0
  );
}
