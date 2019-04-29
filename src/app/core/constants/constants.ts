export const DATE_PARSE_FORMAT = 'YYYY-MM-DD';
export const DATE_DISPLAY_DEFAULT = 'DD/MM/YYYY';
export const DATE_DISPLAY_FULL = 'D MMMM, Y';
export const NIN_PATTERN = /^(?!BG)(?!GB)(?!NK)(?!KN)(?!TN)(?!NT)(?!ZZ)(?:[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z])(?:\s*\d\s*){6}([A-D]|\s)$/;
export const POSTCODE_PATTERN = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/;
export const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,50}$/;
export const INT_PATTERN = /^[0-9]*$/;
export const FLOAT_PATTERN = /^([0-9]*[.])?[0-9]+$/;
