export default class RouterUtil {

    static goToPage = (history: any, path: string) => {

      const pathAtual = history.location.pathname
      
      if(pathAtual.slice(1) != path){
        history.push(`/${path}`);
      }
    }
  
    static returnOfLastPage = (history: any) => {
      history.goBack();
    }
  }
  