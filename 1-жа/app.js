function solve(input) {
  const n = input.shift();
  const initialState = input.slice(0, n);
  const commands = input.slice(n);
  const raceTrack = [];
  const board = initialState.reduce((acc, curr) => {
    const [rider, fuelCapacity, position] = curr.split("|");
    if (!acc.hasOwnProperty[rider]) {
      acc[rider] = {};
    }
    acc[rider] = {
      rider,
      fuelCapacity,
      position: Number(position),
    };
    return acc;
  }, {});
  console.log(JSON.stringify(board, null, 2));
  commands.forEach((command) => {
    const [commandName, ...rest] = command.split(" - ");
    if (commandName === "StopForFuel") {
      const [rider, minimumFuel, changedPosition] = [...rest];
      const riderFuel = board[rider].fuelCapacity;
      const currRiderPosition = board[rider].position;
      if (Number(riderFuel) < minimumFuel) {
        board[rider].position = changedPosition;
        console.log(
          `${rider} stopped to refuel but lost his position, now he is ${changedPosition}.`
        );
        return;
      } else {
        console.log(`${rider} does not need to stop for fuel!`);
        return;
      }
    } else if (commandName === "Overtaking") {
      const [rider1, rider2] = [...rest];
      const searchedRiderOne = board[rider1];
      const searchedRiderTwo = board[rider2];
      const firstPosition = searchedRiderOne.position;
      const secondPosition = searchedRiderTwo.position;
      if (searchedRiderOne.position < searchedRiderTwo.position) {
        searchedRiderOne.position = secondPosition;
        searchedRiderTwo.position = firstPosition;
        console.log(`${rider1} overtook ${rider2}!`);
        return;
      } else {
        return;
      }
    } else if (commandName === "EngineFail") {
      const [rider, laps] = [...rest];
      delete board[rider];
      console.log(
        `${rider} is out of the race because of a technical issue, ${laps} laps before the finish.`
      );
      return;
    } else if (commandName === "Finish") {
      const newBoard = Object.values(board);
      newBoard.forEach((ride) => {
        if (ride.position > 0) {
          console.log(`${ride.rider}\n  Final position: ${ride.position}`);
        }
      });
      return;
    }
  });
}
solve([
  "3",
  "Valentino Rossi|100|1",
  "Marc Marquez|90|2",
  "Jorge Lorenzo|80|3",
  "StopForFuel - Valentino Rossi - 50 - 1",
  "Overtaking - Marc Marquez - Jorge Lorenzo",
  "EngineFail - Marc Marquez - 10",
  "Finish",
]);
