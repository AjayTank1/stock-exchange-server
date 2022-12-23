import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

const saveData = async (req: Request, res: Response, next: NextFunction) => {
	var fs = require('fs');

    let existingSymbols = await fs.promises.readFile('./db/symbols.txt', 'utf8');
    existingSymbols = existingSymbols.split(',');
    let symbolSet = new Set();

    for(let symbol of existingSymbols) {
        symbolSet.add(symbol);
    }

    for(let t of req.body.transactions) {
        symbolSet.add(t.symbol);
    }

    fs.writeFile('./db/symbols.txt', Array.from(symbolSet).join(','), function (err : any) {
      if (err) throw err;
      console.log('File is created successfully.');
    });
    
	fs.writeFile('./db/'+req.body.date+'.json', JSON.stringify(req.body), function (err : any) {
	  if (err) throw err;
	  console.log('File is created successfully.');
	});
	return res.status(200).json({
        message: "done"
    });
}

// const getGame = async (req: Request, res: Response, next: NextFunction) => {
//     var fs = require('fs');
//     let ans = [];
//     try {
//         const files = await fs.promises.readdir('db');
//         for(let file of files) {
//             console.log(file);
//             const data = await fs.promises.readFile(`./db/${file}`, 'utf8');
//             ans.push(data);
//         }
//         return res.status(200).json(ans);
//     } catch (err) {
//         console.error('Error occurred while reading directory!', err);
//     }
// }

const getData = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params.date);
    var fs = require('fs');
    try {
        const data = await fs.promises.readFile('./db/'+req.params.date+'.json', 'utf8');
        return res.status(200).json(JSON.parse(data));
    } catch (err) {
        console.error('Error occurred while reading directory!', err);
        return res.status(200).json('');
    }
}

const getSymbols = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params.date);
    var fs = require('fs');
    try {
        let existingSymbols = await fs.promises.readFile('./db/symbols.txt', 'utf8');
        existingSymbols = existingSymbols.split(',');
        return res.status(200).json(existingSymbols);
    } catch (err) {
        console.error('Error occurred while reading directory!', err);
        return res.status(200).json('');
    }
}

export default { saveData, getData, getSymbols };