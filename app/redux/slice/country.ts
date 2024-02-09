import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Country {
  name: string;
  code: string;
  flagUrl: string;
  currencyName: string;
  currencyCode: string;
}

export interface Currency {
  code: string;
  name: string;
}

export interface Language {
  flagUrl: string;
  value: 'ENGLISH' | 'BEMBA';
  name: string;
}

export type ThemeMode = 'LIGHT' | 'DARK';

interface CountryState {
  countries: Country[];
  activeToCountry: Country;
  activeFromCountry: Country;
  activeFromCurrency: Currency;
  activeToCurrency: Currency;
  fromCurrencies: Currency[];
  toCurrencies: Currency[];
  language: Language;
  mode: ThemeMode;
}

export const defaultFromCurrencies: Currency[] = [
  {
    code: 'EUR',
    name: 'Euro',
  },
  {
    code: 'USD',
    name: 'United States dollar',
  },
  {
    code: 'GBP',
    name: 'British pound',
  },
  {
    code: 'AED',
    name: 'United Arab Emirates dirham',
  },
];

const defaultToCurrencies: Currency[] = [
  {
    code: 'EUR',
    name: 'Euro',
  },
  {
    code: 'USD',
    name: 'United States dollar',
  },
];

const initialState: CountryState = {
  countries: [],
  activeToCountry: {
    name: 'Zambia',
    code: 'ZM',
    flagUrl: 'https://flagcdn.com/w320/zm.png',
    currencyName: 'Zambian kwacha',
    currencyCode: 'ZMW',
  },
  activeFromCountry: {
    name: 'United States',
    code: 'US',
    flagUrl: 'https://flagcdn.com/w320/us.png',
    currencyName: 'United States dollar',
    currencyCode: 'USD',
  },
  activeFromCurrency: {
    code: 'USD',
    name: 'United States dollar',
  },
  activeToCurrency: {
    code: 'ZMW',
    name: 'Zambian kwacha',
  },
  fromCurrencies: defaultFromCurrencies,
  toCurrencies: defaultToCurrencies,
  language: {
    flagUrl: 'https://flagcdn.com/w320/us.png',
    value: 'ENGLISH',
    name: 'English',
  },
  mode: 'LIGHT',
};

const countrySlice: any = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<Country[] | []>) => {
      state.countries = action.payload;
    },
    setActiveFromCountry: (state, action: PayloadAction<Country>) => {
      state.activeFromCountry = action.payload;
      state.fromCurrencies = [
        ...defaultFromCurrencies,
        {
          code: action.payload.code,
          name: action.payload.currencyName,
        },
      ];
      state.activeFromCurrency = {
        code: action.payload.currencyCode,
        name: action.payload.currencyName,
      };
    },
    setActiveToCountry: (state, action: PayloadAction<Country>) => {
      state.activeToCountry = action.payload;
      state.toCurrencies = [
        ...defaultToCurrencies,
        {
          code: action.payload.code,
          name: action.payload.currencyName,
        },
      ];
      state.activeToCurrency = {
        code: action.payload.currencyCode,
        name: action.payload.currencyName,
      };
    },
    setFromCurrency: (state, action: PayloadAction<Currency>) => {
      state.activeFromCurrency = action.payload;
    },
    setToCurrency: (state, action: PayloadAction<Currency>) => {
      state.activeToCurrency = action.payload;
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    toggleTheme: (state) => {
      if (state.mode === 'LIGHT') {
        state.mode = 'DARK';
      } else {
        state.mode = 'LIGHT';
      }
    },
  },
});

export const {
  setCountries,
  setActiveFromCountry,
  setActiveToCountry,
  setFromCurrency,
  setToCurrency,
  setLanguage,
  toggleTheme,
} = countrySlice.actions;

export default countrySlice.reducer;
