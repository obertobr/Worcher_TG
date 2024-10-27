export default class DateUtil {
  
    static formatToDDMMYYYYAndDay(date: Date): string {
      return this.formatToDDMMYYYY(date) + " - " + this.getDayOfWeek(date)
    }

    static formatToDDMMYYYY(date: Date): string {
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
  
    static formatToTime(date: Date): string {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    }
  
    static getDayOfWeek(date: Date): string {
      const daysOfWeek = [
        'Domingo', 'Segunda', 'Terça', 
        'Quarta', 'Quinta', 'Sexta', 'Sábado'
      ];
      return daysOfWeek[date.getDay()];
    }

    static formatFullDateTime(date: Date): string {
      return `${this.getDayOfWeek(date)}, ${this.formatToDDMMYYYY(date)} ${this.formatToTime(date)}`;
    }
  }
  