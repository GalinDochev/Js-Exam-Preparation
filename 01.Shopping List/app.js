function solve(input) {
  const veggiesList = input.shift().split("!");
  input.forEach((command) => {
    const commandLine = command.split(" ");
    const commandName = commandLine[0];
    if (commandName === "Unnecessary") {
      const item = commandLine[1];
      if (!veggiesList.find((element) => element == item)) {
        return;
      }
      const itemIndex = veggiesList.indexOf(item);
      veggiesList.splice(itemIndex, 1);
    } else if (commandName === "Urgent") {
      const item = commandLine[1];
      if (veggiesList.find((element) => element == item)) {
        return;
      }
      veggiesList.unshift(item);
    } else if (commandName === "Go") {
      return;
    } else if (commandName === "Correct") {
      const oldItem = commandLine[1];
      const newItem = commandLine[2];
      if (veggiesList.find((element) => element == oldItem)) {
        const indexOfOldItem = veggiesList.indexOf(oldItem);
        veggiesList[indexOfOldItem] = newItem;
      } else {
        return;
      }
    } else if (commandName === "Rearrange") {
      const item = commandLine[1];
      if (veggiesList.find((element) => element == item)) {
        const indexOfOldItem = veggiesList.indexOf(item);
        const itemToArrange = veggiesList.splice(indexOfOldItem, 1);
        veggiesList.push(itemToArrange);
      } else {
        return;
      }
    }
  });
  console.log(veggiesList.join(", "));
}

solve([
  "Milk!Pepper!Salt!Water!Banana",
  "Urgent Salt",
  "Unnecessary Grapes",
  "Correct Pepper Onion",
  "Rearrange Grapes",
  "Correct Tomatoes Potatoes",
  "Go Shopping!",
]);
