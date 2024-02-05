import { AppMessages } from '.';
import { useAppSelector } from '../redux/hooks';
import englishLang from './english';
import swahiliLang from './swahili';

const useCreateMessage = () => {
  const language = useAppSelector((state) => state.country.language);

  const createMessage = (message: AppMessages) => {
    switch (language.value) {
      case 'ENGLISH':
        return englishLang[message];
      case 'SWAHILI':
        return swahiliLang[message];
      default:
        return englishLang[message];
    }
  };

  return {
    createMessage,
  };
};

export default useCreateMessage;
