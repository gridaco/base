import { upload } from "../lib/hosting";

upload({
    file: Buffer.from(['content']),
    name: "test.txt",
}).then((d) => {
    console.log(d)
})