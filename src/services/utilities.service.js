import { createContext } from 'react';

export const UtilitiesServiceContext = createContext(UtilitiesService());

function UtilitiesService() {    
    const headerCheck = (headers) => {
        return (buffers, options = { offset: 0 }) => headers.every((header, index) => header === buffers[options.offset + index]);
    }

    const stringToBytes = (string) => {
        return [...string].map((char) => char.charCodeAt(0));
    }

    const isPDF = headerCheck(stringToBytes("%PDF"));

    const readBuffer = (file, start = 0, end = 0) => {
        return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => {
                resolve(fr.result);
            };

            fr.onerror = reject;
            if (end === 0 || end <= start) {
                fr.readAsArrayBuffer(file);
            } else {
                fr.readAsArrayBuffer(file.slice(start, end));
            }            
        });
    }

    const validatePDF = async (file) => {
        var buffer = await readBuffer(file, 0, 4);
        return isPDF(new Uint8Array(buffer));
    }

    const getU8intArray = async (file) => {
        var buffer = await readBuffer(file);
        return new Uint8Array(buffer);
    }

    const getBase64String = (file) => {
        return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => {
                resolve(fr.result);
            };

            fr.onerror = reject;
            fr.readAsDataURL(file);
        });
    }

    const sanitizeString = (string) => {
        const sanitize = require('sanitize-filename');
        return sanitize(string);
    }

    return {
        validatePDF,
        getBase64String,
        getU8intArray,
        sanitizeString
    }
}

export default UtilitiesService;