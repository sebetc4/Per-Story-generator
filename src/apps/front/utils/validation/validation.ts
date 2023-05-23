export const isValidOpenAiKey = (key: string): boolean => {
    const keyFormat = /^sk-[a-zA-Z0-9]{48}$/;
    const reslut = keyFormat.test(key);
    return reslut
};
