router.post('/invoice',
    check('nif').notEmpty().isNumeric().isLength({ min: 9, max: 9 }).escape(),
    check('name').notEmpty().escape(),
    check('address').notEmpty().escape(),
    check('city').notEmpty().escape(),
    check('email').notEmpty().isEmail().normalizeEmail(),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) return res.send({ status: 400, errors: result.errors })
        const { nif, name, address, city, email } = req.body;

        try {
            let customer = await model.getCustomersByNif(nif);
            if (!customer) {
                // create a customer
                console.log({ log: "creating a customer" });
                const saveData = {
                    nif: nif,
                    name: name,
                    address: address,
                    city: city,
                    email: email
                };
                const save = await model.saveCustomer(saveData);
            } else {
                // update customer
                console.log({ log: "updating customer" });
                customer['name'] = name;
                customer['address'] = address;
                customer['city'] = city;
                customer['email'] = email;
                const update = await model.updateCustomer(customer);
            }
            res.send({ status: 200 });
        } catch (err) {
            console.log({ error: err });
            res.send({ status: 400 });
        }
    });