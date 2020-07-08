import func from './app';

export default (context) => {
    console.log(context);
    const { app } = func();
    return app;
}
