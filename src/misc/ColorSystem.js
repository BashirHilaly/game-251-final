class ColorSystem{

    // Basic colors
    black = 0;
    darkGray = 3158064;
    gray = 7895160;
    offWhite = 7895160;
    white = 16777215;


    hexToDecimal(hexString){
        let decimal = parseInt(hexString, 16);
        return decimal;
    }
}

export default ColorSystem;