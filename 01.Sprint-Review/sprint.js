function solve(input) {
  const n = input.shift();
  const initialState = input.slice(0, n);
  const commands = input.slice(n);
  const board = initialState.reduce((acc, curr) => {
    const [assignee, taskId, title, status, estimatedPoints] = curr.split(":");
    if (!acc.hasOwnProperty(assignee)) {
      acc[assignee] = [];
    }
    acc[assignee].push({
      taskId,
      title,
      status,
      estimatedPoints: Number(estimatedPoints),
    });

    return acc;
  }, {});
  commands.forEach((command) => {
    const [commandName, ...rest] = command.split(":");

    if (commandName === "Add New") {
      const [assignee, taskId, title, status, estimatedPoints] = [...rest];
      if (!board.hasOwnProperty(assignee)) {
        console.log(`Assignee ${assignee} does not exist on the board!`);
        return;
      }
      board[assignee].push({
        taskId,
        title,
        status,
        estimatedPoints: Number(estimatedPoints),
      });
    } else if (commandName === "Change Status") {
      const [assignee, taskId, status] = [...rest];

      if (!board.hasOwnProperty(assignee)) {
        console.log(`Assignee ${assignee} does not exist on the board!`);
        return;
      } else if (board[assignee].taskId != taskId) {
        console.log(`task with ID ${taskId} does not exist for ${assignee}!`);
        return;
      }
      const task = board[assignee].find((t) => t.taskId === taskId);
      task.status = status;
    } else if (commandName === "Remove Task") {
      const [assignee, index] = [...rest];
      if (!board.hasOwnProperty(assignee)) {
        console.log(`Assignee ${assignee} does not exist on the board!`);
        return;
      }
      if (index < 0 || index > board[assignee].lenght) {
        console.log("Index is out of range!");
      }
      board[assignee].splice(index, 1);
    }
  });

  let toDoSum = Object.values(board)
    .flat()
    .filter((t) => t.status === "ToDo")
    .reduce((acc, curr) => {
      return acc + curr.estimatedPoints;
    }, 0);
  console.log(toDoSum);
}
solve([
  "5",
  "Kiril:BOP-1209:Fix Minor Bug:ToDo:3",
  "Mariya:BOP-1210:Fix Major Bug:In Progress:3",
  "Peter:BOP-1211:POC:Code Review:5",
  "Georgi:BOP-1212:Investigation Task:Done:2",
  "Mariya:BOP-1213:New Account Page:In Progress:13",
  "Add New:Kiril:BOP-1217:Add Info Page:In Progress:5",
  "Change Status:Peter:BOP-1290:ToDo",
  "Remove Task:Mariya:1",
  "Remove Task:Joro:1",
]);
