// output
// {
//     valid: true
//     errorMessage: "Title cannot be empty"
// }

export function validateForm(data) {
  //test case 1 default
  const output = { valid: true, errorMessage: "" };

  //test case 2
  if (data.title === "") {
    output.valid = false;
    output.errorMessage = "Title cannot be empty";
  }

  //test case 3
  if (data.title.toString().length > 256) {
    output.valid = false;
    output.errorMessage = "Title cannot be longer than 256 characters";
  }
  
  //test case 4 number default
  

  //test case 5
  if (Number.isInteger(data.number) === false) {
    output.valid = false;
    output.errorMessage = "Money must be integer";
  }

  //test case 6
  if (data.number === 0 || data< 0) {
    output.valid = false;
    output.errorMessage = "Money must be greater than 0";
  }

  return output;
}
