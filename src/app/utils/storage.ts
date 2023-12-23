type CONSTANTS_TYPES = '@user'

interface StoreDataProps {
  item: CONSTANTS_TYPES;
  value: any;
}

export const storeData = ({ item, value }: StoreDataProps) => {
    const jsonValue = JSON.stringify(value);
    
    localStorage.setItem(item, jsonValue);
};

export const getData = (item: CONSTANTS_TYPES) => {
    if (typeof localStorage !== 'undefined') {

        const value = localStorage.getItem(item);

        if(!value) return 

        return JSON.parse(value);
    }
};

export const removeData = (item: CONSTANTS_TYPES) => {
    localStorage.removeItem(item);
};

export const cleanStorage = async () => {
    localStorage.clear()
};
