'use client'

import { useActionState } from "react"
import { fileUpload} from "../actions/files";

export default function FileUploadForm() {
    const [state, action, pending] = useActionState(fileUpload, undefined);

    return (
        <form action={action}>
            <label htmlFor="file">Choose file to upload</label>
            <input type="file" id="file" name="file" multiple />
            <button type="submit">
                Upload
            </button>
        </form>
    )
}

