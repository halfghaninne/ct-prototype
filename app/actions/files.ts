'use server'

import { UploadFormState } from "../lib/definitions";
import { redirect } from "next/navigation";

const bbKeyId = process.env.BACKBLAZE_KEY_ID;
const bbKeySecret = process.env.BACKBLAZE_KEY_SECRET;
const bbAllAccessKeyId = process.env.BACKBLAZE_ALL_ACCESS_KEY_ID;
const bbAllAccessKeySecret = process.env.BACKBLAZE_ALL_ACCESS_KEY_SECRET;
const bbBucketId = process.env.BACKBLAZE_BUCKET_ID;


async function getAuthToken() {
    const bbaAuthKeyRes = await fetch('https://api.backblazeb2.com/b2api/v4/b2_authorize_account', {
        headers: {
            'Authorization': 'Basic ' + btoa(`${bbAllAccessKeyId}:${bbAllAccessKeySecret}`)
        }
    });

    const data = await bbaAuthKeyRes.json();
    return { authToken: data.authorizationToken, apiUrl: data.apiInfo.storageApi.apiUrl }
}

async function getUploadURL() {
    const { authToken, apiUrl } = await getAuthToken();
    //console.log(authToken, apiUrl)
    const paramsObj = { bucketId: `${bbBucketId}`};
    const queryParams = new URLSearchParams(paramsObj);

    // const bbBucketIdsRes = await fetch(`${apiUrl}/b2api/v4/b2_list_buckets`, {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': authToken,
    //     },
    //     body: '{"accountId":  "887e97cc3bce", "bucketTypes": ["allPrivate","allPublic"]}'
    // })

    // const bucketIdsData = await bbBucketIdsRes.json();
    // console.log(bucketIdsData)



    const bbUploadUrlRes = await fetch(`${apiUrl}/b2api/v4/b2_get_upload_url?${queryParams.toString()}`, {
        headers: {
            'Authorization': authToken,
        },  
    })

    const data = await bbUploadUrlRes.json();
    console.log(data);
    return { authToken: data.authorizationToken, uploadUrl: data.uploadUrl }
}

async function postUpload(authToken: string, uploadUrl: string) {
    const bbUploadUrlRes = await fetch(uploadUrl, {
        headers: {
            'Authorization': authToken,
            // 'X-Bz-File-Name' - name of the file, in percent-encoded UTF-8
            // 'Content-Type' - MIME type of the content of the file. Mappings here: https://www.backblaze.com/docs/cloud-storage-b2-content-type-mappings

        },  
    })
}

export async function fileUpload(formState: UploadFormState, formData: FormData) {
    const { authToken, uploadUrl } = await getUploadURL();
    postUpload(authToken, uploadUrl);
    redirect('/upload')
}