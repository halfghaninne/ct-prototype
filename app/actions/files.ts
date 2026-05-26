'use server'

import { UploadFormState } from "../lib/definitions";
import crypto from "node:crypto";
import { sha1 } from "hash-wasm";
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
    // console.log(data);
    return { authToken: data.authorizationToken, uploadUrl: data.uploadUrl }
}

async function postUpload(authToken: string, uploadUrl: string, file: any) { // TODO: more-specific file type
    const checksum = await calculateCheckSum(file); 
    console.log('checksum: ', checksum);

    const bbUploadUrlRes = await fetch(uploadUrl, {
        headers: {
            'Authorization': authToken,
            // 'X-Bz-File-Name' - name of the file, in percent-encoded UTF-8
            'X-Bz-File-Name': encodeURI(file.name),
            // 'Content-Type' - MIME type of the content of the file. Mappings here: https://www.backblaze.com/docs/cloud-storage-b2-content-type-mappings
            'Content-Type': file.type,
            // 'Content-Length' - number of bytes in the file being uploaded
            'Content-Length': file.size.toString(),
            // 'X-Bz-Content-Sha1' - SHA1 checksum of content in the file. See: https://www.backblaze.com/docs/cloud-storage-upload-files-with-the-native-api#:~:text=Copy-,SHA1%20Checksums,-You%20must%20always
            'X-Bz-Content-Sha1': checksum
        },  
    })

    const { data, error } = await bbUploadUrlRes.json();
    console.log(data);
}

async function calculateCheckSum(file: any) { // TODO: more-specific file type
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    return await sha1(uint8Array);
}

export async function fileUpload(formState: UploadFormState, formData: any) { // TODO: more-specific types
    const file = formData.get('file');
    
    const { authToken, uploadUrl } = await getUploadURL();
    postUpload(authToken, uploadUrl, file);
    // the 303status code is applicable to any HTTP method.  It is primarily used to allow the output of a POST action
    // to redirect the user agent to a selected resource, since doing so provides the information corresponding
    // to the POST response in a form that can be separately identified, bookmarked, and cached, independent of
    // the original request.
    // redirect('/upload')
}