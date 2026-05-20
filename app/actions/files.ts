'use server'

import { UploadFormState } from "../lib/definitions";
import { redirect } from "next/navigation";

const bbKeyId = process.env.BACKBLAZE_KEY_ID;
const bbKeySecret = process.env.BACKBLAZE_KEY_SECRET;
const bbBucketId = process.env.BACKBLAZE_BUCKET_ID;


async function getAuthToken() {
    const bbaAuthKeyRes = await fetch('https://api.backblazeb2.com/b2api/v4/b2_authorize_account', {
        headers: {
            'Authorization': 'Basic ' + btoa(`${bbKeyId}:${bbKeySecret}`)
        }
    });

    const data = await bbaAuthKeyRes.json();
    return data.authorizationToken
}

async function getUploadURL() {
    const authToken = await getAuthToken();
    const paramsObj = { bucketId: `${bbBucketId}`};
    const queryParams = new URLSearchParams(paramsObj);



    const bbUploadUrlRes = await fetch(`https://api.backblazeb2.com/b2api/v4/b2_get_upload_url?${queryParams.toString()}`, {
        headers: {
            'Authorization': authToken,
        },
    })

    const data = await bbUploadUrlRes.json();
    console.log(data); // CURRENTLY RETURNS 400 BAD_REQUEST BUCKETID INVALID
}

export async function fileUpload(formState: UploadFormState, formData: FormData) {
    getUploadURL();
    redirect('/upload')
}