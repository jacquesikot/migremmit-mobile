import { AppMessages } from '.';
import { useAppSelector } from '../redux/hooks';
import englishLang from './english';
import bembaLang from './bemba';

const useCreateMessage = () => {
  const language = useAppSelector((state) => state.country.language);

  const createMessage = (message: AppMessages) => {
    switch (language.value) {
      case 'ENGLISH':
        return englishLang[message];
      case 'BEMBA':
        return bembaLang[message];
      default:
        return englishLang[message];
    }
  };

  return {
    createMessage,
  };
};

export default useCreateMessage;
