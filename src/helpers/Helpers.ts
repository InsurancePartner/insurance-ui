class Helpers {
    static capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
      
    static extractFileName(fileName: string)
    {
        if(fileName !== undefined)
        {
            const arr = fileName.split(".");
            return this.capitalizeFirstLetter(arr[0]); 
        }
        return fileName;
    }
}

export default Helpers;
