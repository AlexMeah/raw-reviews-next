import exif from 'exif-parser';

function formatExposure(d) {
    if (d >= 1) {
        return `${Math.round(d * 10) / 10}s`;
    }
    let df = 1;
    let top = 1;
    let bot = 1;
    const tol = 1e-8;

    while (df !== d && Math.abs(df - d) > tol) {
        if (df < d) {
            top += 1;
        } else {
            bot += 1;
            top = parseInt(d * bot, 10);
        }
        df = top / bot;
    }
    if (top > 1) {
        bot = Math.round(bot / top);
        top = 1;
    }
    if (bot <= 1) {
        return '1s';
    }
    return `${top}/${bot}s`;
}

export default function extractExif(file) {
    return new Promise(res => {
        const filereader = new FileReader();

        filereader.onload = () => {
            const buffer = filereader.result;
            const parser = exif.create(buffer, window);
            const result = parser.parse();

            if (!result) {
                return res({});
            }

            return res({
                imageSize: result.imageSize,
                tags: {
                    fNumber: result.tags.FNumber,
                    exposureTime: formatExposure(result.tags.ExposureTime),
                    originalExposureTime: result.tags.ExposureTime,
                    focalLength: result.tags.FocalLength,
                    focalLengthIn35mmFormat: result.tags
                        .FocalLengthIn35mmFormat,
                    iSO: result.tags.ISO,
                    lensModel: result.tags.LensModel,
                    make: result.tags.Make,
                    model: result.tags.Model,
                    shutterSpeedValue: result.tags.ShutterSpeedValue,
                    software: result.tags.Software
                }
            });
        };

        filereader.readAsArrayBuffer(file);
    });
}
