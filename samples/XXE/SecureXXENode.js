const parserXml = (str) => {
    return new Promise((resolve, reject) => {

        try {
            const parserOptions = {
                noent: false
            };
            const doc = libxmljs.parseXmlString(str, parserOptions);
            resolve(doc);
        } catch (err) {
            reject(err)
        }

    });
};