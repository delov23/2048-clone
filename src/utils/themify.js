const themify = (theme, className) => {
    return className + theme.charAt(0).toUpperCase() + theme.substring(1);
}

export default themify;