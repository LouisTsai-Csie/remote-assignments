function checkName(name) {
    const nameLength = name.length;
    for(let i=0;i<nameLength;i++){
        const charcode = name[i].charCodeAt();
        if(charcode>=48&&charcode<=57)  continue;
        if(charcode>=65&&charcode<=90)  continue;
        if(charcode>=97&&charcode<=122) continue;
        return false;
    }
    return true;
}

function checkMailFormat(email) {
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!email.match(mailFormat)) return false;
    return true;
}

function checkPasswordFormat(password) {
    let hasUpperCaseLetter = 0;
    let hasLowerCaseLetter = 0;
    let hasNumber          = 0;
    let hasSymbol          = 0;
    let symbolTable = '~`! @#$%^&*()_-+={[}]|:;"\'<,>.?/|';
    
    const passwordLength = password.length;
    for(let i=0;i<passwordLength;i++){
        const charcode = password[i].charCodeAt();
        if(charcode>=48&&charcode<=57) hasNumber = 1;
        if(charcode>=65&&charcode<=90) hasUpperCaseLetter = 1;
        if(charcode>=97&&charcode<=122) hasLowerCaseLetter = 1;
        const res = symbolTable.match(charcode);
        if(res!=null) hasSymbol = 1;
    }
    if(hasUpperCaseLetter+hasLowerCaseLetter+hasNumber+hasSymbol>=3) return true;
    return false;
}

function checkData(name, email, password) {
    if(typeof(name)!='string'||typeof(email)!='string'||typeof(password)!='string')
        return false;
    if(!name.length&&!email.length&&!password.length)
        return false;
    
    return checkName(name) && checkMailFormat(email) && checkPasswordFormat(password);
}


module.exports = {
    checkData,
}