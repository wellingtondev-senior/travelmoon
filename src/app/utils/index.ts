import { DateTime, Settings } from 'luxon'

Settings.defaultLocale = 'pt-BR';

export const formatCurrency = (value: string) => {
  if(!value) return 'R$ 0.00'
  
  return value
      .replace(/\D/g, '') 
      .replace(/^0+/, '') 
      .replace(/^([0-9]{1,})([0-9]{2})$/, 'R$ $1,$2') 
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); 
};

export function formatCPF(input: string) {

    if(!input?.length) return '';

    let value = input.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    
    if (value.length > 3) {
        value = value.replace(/^(\d{3})(\d)/, '$1.$2'); // Adiciona o primeiro ponto
    }
    if (value.length > 6) {
        value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3'); // Adiciona o segundo ponto
    }
    if (value.length > 9) {
        value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4'); // Adiciona o traço
    }

    return value
}

export function formatHour(hour: string) {
  if(!hour) return '';
  
  return hour.replace(/(\d{2})(\d{2})/, "$1:$2");
}

export const isValidEmail = (value: string): boolean => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|com\.br)$/;

    return regex.test(value);
};

export const getInitials = (name: string) => {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
}

export const DateFormat = (value: string | undefined, format: string, toFormat: string): string => {
    if (value === undefined) return '';

    const  date = DateTime.fromFormat(value, format);
   
    return date.toFormat(toFormat);
};

export function UploadBase64(file: File ): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject("File is null or undefined");
      }
  
      const reader = new FileReader();
  
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        const base64String = reader.result?.toString().split(",")[1]; // Get the base64 part of the result
  
        if (base64String) {
          resolve(`data:image/png;base64,${base64String}`);
        } else {
          reject("Base64 string is undefined");
        }
      };
  
      reader.onerror = () => {
        reject("Error reading the file.");
      };
    });
  }
  