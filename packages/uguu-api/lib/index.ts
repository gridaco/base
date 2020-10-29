import Axios from "axios"
import * as FormData from "form-data"
const UGUU_BASE_URL = "https://uguu.se/api.php?d=upload-tool"


/**
 * This is a message fromo server when not valid argument is passed.
 * http status code will still be 200 OK, but this should be handled as an error.
 */
const ERROR_RESPONSES = [
    "Please provide a valid argument.",
    "You did not send a file, try again."
]

const axios = Axios.create(
    {
        baseURL: UGUU_BASE_URL
    }
)

interface TempHostingResponse {
    originName: string
    url: string
}

/**
 * 
 * @param name name of the file
 * @param file the file content as raw, or as fs.stream, or as buffer.
 */
export async function upload(name: string, file: any): Promise<TempHostingResponse> {
    const formData = new FormData();

    formData.append("file", file, { filename: name });

    const resp = await axios.post("", formData, {
        headers: formData.getHeaders()
    })
    /** Since this api does not use standart http status code, even error response comes with 200 OK.
     * To explicitly handle this, we have to check the response data. */
    if (ERROR_RESPONSES.some((e) => { return (resp.data as string).includes(e) })) {
        throw resp.data
    }
    return {
        originName: name,
        url: resp.data as string
    }
}