function solve(input) {
  [horsesArray, ...commands] = input;
  const horses = horsesArray.split("|");
  console.log(horses);
  const commandArray = commands;
  commandArray.forEach((command) => {
    const splittedCommand = command.split(" ");
    const commandName = splittedCommand[0];
    console.log(commandName);
    if (commandName === "Retake") {
      const overTakingHorse = splittedCommand[1];
      const overTakenHorse = splittedCommand[2];
      const firstHorse = horses.indexOf(overTakingHorse);
      const secondHorse = horses.indexOf(overTakenHorse);
      if (firstHorse < secondHorse) {
        horses[firstHorse] = overTakenHorse;
        horses[secondHorse] = overTakingHorse;
        console.log(`${overTakingHorse} retakes ${overTakenHorse}.`);
        console.log(horses);
      }
    } else if (commandName === "Trouble") {
      const droppingHorse = splittedCommand[1];
      if (horses[0] === droppingHorse) {
        return;
      }
      const overTakingHorse = horses[index - 1];
      horses[index] = overTakingHorse;
      horses[index - 1] = droppingHorse;
      console.log(`Trouble for ${droppingHorse} - drops one position.`);
    } else if (commandName === "Rage") {
      let ragingHorse = splittedCommand[1];
      let ragingHorseIndex = horses.indexOf(splittedCommand[1]);
      if (ragingHorseIndex == horses.length - 1) {
        console.log(ragingHorseIndex);
        console.log(`${ragingHorse} rages 2 positions ahead.`);
      } else if (ragingHorseIndex == horses.length - 2) {
        let firstPlaceHorse = horses.length - 1;
        horses[horses.length - 1] = ragingHorse;
        horses[horses.length - 2] = firstPlaceHorse;
        console.log(`${ragingHorse} rages 2 positions ahead.`);
      }
      const nextIndex = ragingHorseIndex + 2;
      const overTakenHorse = horses[nextIndex];
      horses[nextIndex] = ragingHorse;
      horses[ragingHorseIndex] = overTakenHorse;
      console.log(`${ragingHorse} rages 2 positions ahead.`);
      console.log(horses);
    } else if (commandName === "Miracle") {
      const lastHorse = horses[0];
      const firstHorse = horses[horses.length - 1];
      horses[0] = firstHorse;
      horses[horses.length - 1] = lastHorse;
      console.log(`What a miracle - ${lastHorse} becomes first.`);
    } else if (commandName === "Finish") {
      console.log(horses.join("->"));
    }
  });
}
solve([
  "Onyx|Domino|Sugar|Fiona",
  "Trouble Onyx",
  "Retake Onyx Sugar",
  "Rage Domino",
  "Miracle",
  "Finish",
]);
