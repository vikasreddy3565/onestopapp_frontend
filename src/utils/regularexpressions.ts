export const RegularExpressions = {
    name: '^[a-zA-Z ]*$',
    trim: '^\s*|\s*$',
    email: '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$',
    password: '^(?=.{12,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&+=-])(?:(.)(?!\\1))*$.*$',
    zip: '^[0-9]{5}([0-9]{4})?$',
    phoneDomesticNumeric: '^[0-9]{10}$',
    phoneInternationalNumeric: '^[0-9]*$',
    numeric: '^-*[0-9]+[0-9]*$',
    numericHyphen: '^(\\d+-?)+\\d+$'
  };
