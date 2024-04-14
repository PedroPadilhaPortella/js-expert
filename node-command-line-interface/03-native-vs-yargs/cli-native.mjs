const [ nodePath, filePath, ...commands ] = process.argv;

const COMMAND_PREFIX = '--';


function parseArguments(commands) {
  const cmd = new Map();
  
  for(const key in commands) {
    const index = parseInt(key);
    const command = commands[key];

    if(!command.includes(COMMAND_PREFIX)) continue;

    cmd.set(
      command.replace(COMMAND_PREFIX, ''),
      commands[index + 1]
    );
  }

  return Object.fromEntries(cmd);
}

console.log(parseArguments(commands))