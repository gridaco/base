import Axios from "axios"

const UGUU_BASE_URL = "https://uguu.se/api.php"

const axios = Axios.create(
    {
        baseURL: UGUU_BASE_URL
    }
)

interface TempHostingResponse {
    url: string
}

// TODO make file from data or accept file type.
export async function upload(file: any): Promise<TempHostingResponse> {
    const resp = await axios.post("/", { file: file }, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        params: {
            "d": "upload-tool"
        }
    })
    return {
        url: resp.data as string
    }
}