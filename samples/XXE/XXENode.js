const parserXml = (str) => {
    return new Promise((resolve, reject) => {

        try {
            const doc = libxmljs.parseXmlString(str);
            resolve(doc);
        } catch (err) {
            reject(err)
        }

    });
};