const getDirtyValues = <T>(values: any, initialObject: any): Partial<T> => {
    const data = { ...values };
    const keyValues = Object.keys(data);

    const dirtyValues = keyValues.filter(
        (keyValue) => data[keyValue] !== initialObject[keyValue],
    );

    keyValues.forEach((key) => {
        if (!dirtyValues.includes(key)) delete data[key];
    });

    return data;
};

export { getDirtyValues };