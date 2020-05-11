import { validateForm } from "./FormValidation";

// Input
// {
//     title: value,
//     number: money,
//     transaction: transactionType,
//     type: "food"
// }

// Test case
// 1. Title cannot be empty
// 2. Title maximum 256 chars
// 3. Money is greater than 0
// 4. Money must be integer

test("Test 1: Title is valid", () => {
  //arrange
  const data = {
    title: "jajan boba",
    number: 1000,
    transaction: "expense",
    type: "food"
  };

  //action
  var result = validateForm(data);

  //assert/verify
  expect(result.valid).toBe(true);
  expect(result.errorMessage).toBe("");
});

test("Test 2: Title cannot be empty", () => {
  //arrange
  const data = {
    title: "",
    number: 1000,
    transaction: "expense",
    type: "food"
  };

  //action
  var result = validateForm(data);

  //assert/verify
  expect(result.valid).toBe(false);
  expect(result.errorMessage).toBe("Title cannot be empty");
});

test("Test 3: Title cannot be longer than 256 characters", () => {
  //arrange
  const data = {
    title:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.",
    number: 1000,
    transaction: "expense",
    type: "food"
  };

  //action
  var result = validateForm(data);

  //assert/verify
  expect(result.valid).toBe(false);
  expect(result.errorMessage).toBe(
    "Title cannot be longer than 256 characters"
  );
});

test("Test 4: Number is valid", () => {
  //arrange
  const data = {
    title: "jajan boba",
    number: 1000,
    transaction: "expense",
    type: "food"
  };

  //action
  var result = validateForm(data);

  //assert/verify
  expect(result.valid).toBe(true);
  expect(result.errorMessage).toBe("");
});

test("Test 5: Money must be integer", () => {
  //arrange
  const data = {
    title: "jajan boba",
    number: "harga",
    transaction: "expense",
    type: "food"
  };

  //action
  var result = validateForm(data);

  //assert/verify
  expect(result.valid).toBe(false);
  expect(result.errorMessage).toBe("Money must be integer");
});

test("Test 6: Money must be greater than 0", () => {
  //arrange
  const data = {
    title: "jajan boba",
    number: 0,
    transaction: "expense",
    type: "food"
  };

  //action
  var result = validateForm(data);

  //assert/verify
  expect(result.valid).toBe(false);
  expect(result.errorMessage).toBe("Money must be greater than 0");
});


// testcase

// title
//valid
//empty
//>256

// money
//valid
//isi selain number - invalid
//ga boleh 0 atau < 0
