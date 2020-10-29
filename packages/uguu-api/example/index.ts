import { upload } from "../lib"
import * as fs from "fs"
const TEST_TXT_FILE_CONTENT = `# Read Me !!`
const TEST_TXT_FILE_NAME = `file.txt`

async function example() {

    try {
        // const file = Buffer.from(TEST_TXT_FILE_CONTENT)
        const file = fs.createReadStream('./example/file.txt')
        // const blob = await fetch(TEST_TXT_FILE_CONTENT).then(res => res.blob());

        const res = upload(TEST_TXT_FILE_NAME, file)
        res.then((d) => {
            console.log(d)
        })
    } catch (e) {
        console.error(e)
    }

}

example()