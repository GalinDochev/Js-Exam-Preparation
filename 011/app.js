function solve(input) {
  const n = input.shift();
  const initialState = input.slice(0, n);
  const commands = input.slice(n);
  const board = initialState.reduce((acc, curr) => {
    const [astronaut, oxygenLevel, energyReserve] = curr.split(" ");
    if (!acc.hasOwnProperty[astronaut]) {
      acc[astronaut] = {};
    }
    acc[astronaut] = {
      astronaut,
      oxygenLevel: Number(oxygenLevel),
      energyReserve: Number(energyReserve),
    };
    return acc;
  }, {});
  commands.forEach((command) => {
    const [commandName, ...rest] = command.split(" - ");
    if (commandName === "Explore") {
      const [astronaut, energyReserveNeeded] = [...rest];
      const astronautEnergy = board[astronaut].energyReserve;
      if (energyReserveNeeded <= astronautEnergy) {
        board[astronaut].energyReserve -= energyReserveNeeded;
        console.log(
          `${astronaut} has successfully explored a new area and now has ${board[astronaut].energyReserve} energy!`
        );
        return;
      } else {
        console.log(`${astronaut} does not have enough energy to explore!`);
      }
    } else if (commandName === "Refuel") {
      const [astronaut, amount] = [...rest];
      const firstEnergyAmount = board[astronaut].energyReserve;
      board[astronaut].energyReserve += Number(amount);
      if (board[astronaut].energyReserve > 200) {
        const difference = 200 - firstEnergyAmount;
        board[astronaut].energyReserve = 200;
        console.log(`${astronaut} refueled their energy by ${difference}!`);
        return;
      } else {
        console.log(`${astronaut} refueled their energy by ${amount}!`);
        return;
      }
    } else if (commandName === "Breathe") {
      const [astronaut, amountToBreathe] = [...rest];
      const firstOxygenLevel = board[astronaut].oxygenLevel;
      board[astronaut].oxygenLevel += Number(amountToBreathe);
      if (board[astronaut].oxygenLevel > 100) {
        const difference = 100 - firstOxygenLevel;
        board[astronaut].oxygenLevel = 100;
        console.log(
          `${astronaut} took a breath and recovered ${difference} oxygen!`
        );
        return;
      } else {
        console.log(
          `${astronaut} took a breath and recovered ${amountToBreathe} oxygen!`
        );
      }
    } else if (commandName === "End") {
      Object.values(board).forEach((astr) => {
        console.log(
          `Astronaut: ${astr.astronaut}, Oxygen: ${astr.oxygenLevel}, Energy: ${astr.energyReserve}`
        );
      });
    }
  });
}
