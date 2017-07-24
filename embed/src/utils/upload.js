import ReactGA from 'react-ga';

export default (file, onProgress = () => {}) => ({ url, signedRequest }) =>
    new Promise((res, rej) => {
        if (file.type === 'image/jpeg' && file.size > 5e6) {
            return rej(new Error('Before and After images must be under 5mb'));
        } else if (file.size > 8e7) {
            return rej(new Error('RAW images must be under 80mb'));
        }

        const formData = new FormData();

        Object.keys(signedRequest.fields).forEach(key => {
            formData.append(key, signedRequest.fields[key]);
        });

        formData.append('key', url);
        formData.append('file', file);

        const xhr = new XMLHttpRequest();
        xhr.upload.addEventListener(
            'progress',
            pe => {
                onProgress(Math.ceil(pe.loaded / pe.total * 100));
            },
            false
        );
        xhr.open('POST', signedRequest.url);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 204) {
                    res(url);
                } else {
                    ReactGA.event({
                        category: 'Upload',
                        action: 'Failed',
                        label: xhr.responseText,
                        nonInteraction: true
                    });
                    rej(new Error('Could not upload file.'));
                }
            }
        };
        xhr.send(formData);

        return xhr;
    });
