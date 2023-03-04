import express, { Request } from "express";
import { existsSync, readFileSync, writeFileSync, writeFile } from "fs";
import { join } from "path";
import ViteExpress from "vite-express";

class Database {
  private _data: { users: string[] } = {
    users: [],
  };

  private path = join(__dirname, "db.json");

  private cloneDeep(value: typeof this._data) {
    return JSON.parse(JSON.stringify(value));
  }

  public get data(): { users: string[] } {
    return this.cloneDeep(this._data);
  }

  constructor() {
    this.read();
  }

  read = () => {
    if (existsSync(this.path)) {
      this._data = JSON.parse(readFileSync(this.path, "utf-8"));
    } else {
      writeFileSync(this.path, JSON.stringify(this._data));
    }
  };

  write(values: typeof this._data) {
    return new Promise<void>((resolve) => {
      this._data = this.cloneDeep(values);
      writeFile(this.path, JSON.stringify(this._data), (err) => {
        if (!err) {
          resolve();
        }
      });
    });
  }
}

const app = express();
const db = new Database();

export class ResponseConstruct {
  data = null;
  code = 1;
  message: string | undefined = undefined;

  constructor(data: any, message?: string, code?: 0 | 1) {
    this.data = data;
    this.message = message ?? this.message;
    this.code = code ?? this.code;
  }
}

// app.post("/login", async (req, res) => {
//   // res.json(new ResponseConstruct(false));
//   // return db.data.users.includes(ip);

//   // db.read();
//   console.log(db.data);

//   const data = db.data;
//   data.users.push(new Date().valueOf());

//   res.json(new ResponseConstruct(false));
// });

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
