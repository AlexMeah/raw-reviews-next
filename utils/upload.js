export default (file, onProgress = () => {}) => ({ url, signedRequest }) =>
    new Promise((res, rej) => {
        if (file.type === 'image/jpeg' && file.size > 5e6) {
            return rej(new Error('Before and After images must be under 5mb'));
        } else if (file.size > 8e7) {
            return rej(new Error('RAW images must be under 80mb'));
        }

        const xhr = new XMLHttpRequest();
        xhr.upload.addEventListener(
            'progress',
            pe => {
                onProgress(Math.ceil(pe.loaded / pe.total * 100));
            },
            false
        );
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    res(url);
                } else {
                    rej(new Error('Could not upload file.'));
                }
            }
        };
        xhr.send(file);

        return xhr;
    });
