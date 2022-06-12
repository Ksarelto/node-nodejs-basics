import fs from 'fs';
import crypto from 'crypto';
import { getErrorMessage } from '../common/utils.js';
import { OPERATION_FAILED } from '../common/constants.js';
import { DIRECTORY_MESSAGE } from '../common/constants.js';

export const calcHash = (pathToFile) => {
    if (pathToFile.length !== 1) throw new Error(INVALID_ARGS);
    
    const readStream = fs.createReadStream(pathToFile[0], 'utf-8')

    let data = '';

    readStream.on('data', (chunk) => {
        data += chunk.toString()
    })

    readStream.on('end', () => {
        try {
            const fileHex = crypto.createHash('sha256').update(data).digest('hex');
            console.log(fileHex)
            console.log(DIRECTORY_MESSAGE(process.cwd()))
        } catch (err) {
            getErrorMessage(err)
        }
    })
    
    readStream.on('error', (err) => {
        getErrorMessage(err)
    })
};
