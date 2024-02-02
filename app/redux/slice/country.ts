import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Country {
  name: string;
  code: string;
  flagUrl: string;
  currencyName: string;
}

export interface Currency {
  code: string;
  name: string;
}

interface CountryState {
  countries: Country[];
  activeToCountry: Country;
  activeFromCountry: Country;
  activeFromCurrency: Currency;
  activeToCurrency: Currency;
  fromCurrencies: Currency[];
  toCurrencies: Currency[];
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
    code: 'ZMW',
    flagUrl: 'https://flagcdn.com/w320/zm.png',
    currencyName: 'Zambian kwacha',
  },
  activeFromCountry: {
    name: 'United States',
    code: 'USD',
    flagUrl: 'https://flagcdn.com/w320/us.png',
    currencyName: 'United States dollar',
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
};

const countrySlice = createSlice({
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
    },
    setFromCurrency: (state, action: PayloadAction<Currency>) => {
      state.activeFromCurrency = action.payload;
    },
    setToCurrency: (state, action: PayloadAction<Currency>) => {
      state.activeToCurrency = action.payload;
    },
  },
});

export const { setCountries, setActiveFromCountry, setActiveToCountry, setFromCurrency, setToCurrency } =
  countrySlice.actions;

export default countrySlice.reducer;
