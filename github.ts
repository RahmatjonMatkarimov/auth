import { exec } from "child_process";

const date = new Date().toISOString();

exec(
  `git add . && git commit -m "${date}" && git push origin main`,
  (err) => {
    if (err) console.error("Git error");
    else console.log("Pushed to GitHub");
  }
);
