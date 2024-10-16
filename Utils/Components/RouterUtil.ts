export default class RouterUtil {

    static goToPage = (history: any, path: string) => {
      history.push(`/${path}`);
    }
  
    static returnOfLastPage = (history: any) => {
      history.goBack();
    }
  }
  