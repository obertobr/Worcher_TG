export default class DateUtil {
  
    static formatToDDMMYYYYAndDay(date: Date | undefined): string {
      if(date){
        return this.formatToDDMMYYYY(date) + " - " + this.getDayOfWeek(date)
      }
      
      return "";
    }

    static formatToDDMMYYYY(date: Date | string): string {
      if (!(date instanceof Date)) {
        date = new Date(date);
      }
    
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
    
      return `${day}/${month}/${year}`;
    }
  
    static formatToMMDDYYYY(date: Date): string {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    }
  
    static formatToYYYYMMDD(date: Date): string {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    }
  
    static formatToTime(date: Date | string): string {
      if (!(date instanceof Date)) {
        date = new Date(date);
      }

      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    }
  
    static getDayOfWeek(date: Date): string {
      if (!(date instanceof Date)) {
        date = new Date(date);
      }

      const daysOfWeek = [
        'Domingo', 'Segunda', 'Terça', 
        'Quarta', 'Quinta', 'Sexta', 'Sábado'
      ];
      return daysOfWeek[date.getDay()];
    }

    static formatFullDateTime(date: Date): string {
      return `${this.getDayOfWeek(date)}, ${this.formatToDDMMYYYY(date)} ${this.formatToTime(date)}`;
    }

    static getRelativeTime(date: Date | string): string {
      if (!(date instanceof Date)) {
        date = new Date(date);
      }
    
      const now = new Date();
      const differenceInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
      if (differenceInSeconds < 60) {
        return `Há 1 min`;
      }
    
      const differenceInMinutes = Math.ceil(differenceInSeconds / 60);
    
      if (differenceInMinutes < 60) {
        return `Há ${differenceInMinutes} min`;
      }
    
      const differenceInHours = Math.ceil(differenceInMinutes / 60);
    
      if (differenceInHours < 24) {
        return `Há ${differenceInHours} horas`;
      }
    
      const differenceInDays = Math.ceil(differenceInHours / 24);
      return `Há ${differenceInDays} dias`;
    }
    
  }
  