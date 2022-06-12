import { spawn } from 'child_process';
import path from 'path'
import os from 'os'
import { FAREWELL_MESSAGE, WELCOME_MESSAGE, DIRECTORY_MESSAGE } from './common/constants.js';

const USERNAME = '--username='

export const spawnChildProcess = async (args) => {
  const username = args[0].includes(USERNAME) ? args[0].replace(USERNAME, '') : 'Unknown'
  const childProcessDir = process.cwd()
  const homedir = os.homedir()

  process.chdir(homedir)

  console.log(WELCOME_MESSAGE(username))
  console.log(DIRECTORY_MESSAGE(process.cwd()))
  
  const child = spawn(
   'node',
    [path.join(childProcessDir, 'src/index.js'), ...args],
    {stdio: [process.stdin, 'pipe'], cwd: process.cwd()}
  )


  process.on('SIGINT', () => {
    console.log(FAREWELL_MESSAGE(username))
  })

  child.stdout.on('data', data => {
    if(data.toString('utf-8') === '.exit') {
      return
    }

    console.log(data.toString('utf-8'));
  });
        
  child.on('close', (code) => {
    if(code <= 1) {
      console.log(FAREWELL_MESSAGE(username))
    }
  });
};

spawnChildProcess(process.argv.slice(2))