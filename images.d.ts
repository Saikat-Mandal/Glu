declare module '*.jpg' {
    const value: number; // For React Native's require/import images
    export default value;
}

declare module '*.png' {
    const value: number;
    export default value;
}
