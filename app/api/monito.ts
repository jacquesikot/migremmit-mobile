import axios from 'axios';

interface Language {
  code: string;
  label: string;
}

interface ProviderScoreCategory {
  type: string;
  value: number;
}

interface ProviderScore {
  value: number;
  categories: ProviderScoreCategory[];
}

interface Logo {
  sm: string;
}

interface Exposure {
  device: string | null;
  language: string | null;
  index: number;
}

interface ValueProps {
  messageKeys: string[];
}

interface Fee {
  transfer: number;
  externalPayin: number;
  externalPayout: number;
  payin: number;
  payout: number;
  total: number;
}

interface Quote {
  payin: string;
  payout: string;
  transferTime: {
    min: number;
    max: number;
  };
  receivedAmount: number;
  rate: number;
  fee: Fee;
  promos: any[];
  exposures: Exposure[];
  valueProps: ValueProps[];
  messages: any[];
}

interface Provider {
  slug: string;
  name: string;
  displayName: string;
  type: string;
  url: string;
  affiliateUrl: string;
  affiliate: boolean;
  isQuoteRequestLink: boolean;
  logo: Logo;
  languages: Language[];
  providerScore: ProviderScore;
  payoutNetworks: any[];
}

interface ProviderQuote {
  psp: Provider;
  quotes: Quote[];
}

export interface GetRemittanceProvidersRequest {
  from: string;
  to: string;
  currencyFrom: string;
  currencyTo: string;
  amount: number;
}

export interface RemittanceProviderResponse {
  comparisonId: string;
  start: string;
  midMarket: { rate: string };
  corridor: { amountUSD: string };
  providerQuotes: ProviderQuote[];
}

export type PayoutType = 'CASH' | 'WALLET' | 'CARD';

export interface PayoutMethod {
  payout: PayoutType;
  receivedAmount: number;
  promosAmount: number | undefined;
  isBestValue: boolean;
}

function getUniquePayouts(providerQuotes: ProviderQuote[]): PayoutMethod[] {
  console.log(providerQuotes);
  const payoutMap: Map<string, number> = new Map();
  const promosAmountMap: Map<string, number | undefined> = new Map();

  providerQuotes.forEach((providerQuote) => {
    const { quotes } = providerQuote;

    quotes.forEach((quote) => {
      const currentAmount = payoutMap.get(quote.payout);

      if (currentAmount === undefined || quote.receivedAmount > currentAmount) {
        payoutMap.set(quote.payout, quote.receivedAmount);
      }

      // Check if there is at least one promo in the array
      if (quote.promos && quote.promos.length > 0) {
        const promosAmount = quote.promos[0].receivedAmount;

        // Update promosAmountMap only if it's higher than the existing value
        if (promosAmountMap.get(quote.payout) === undefined || promosAmount > promosAmountMap.get(quote.payout)!) {
          promosAmountMap.set(quote.payout, promosAmount);
        }
      }
    });
  });

  const result: PayoutMethod[] = [];

  payoutMap.forEach((receivedAmount, payout) => {
    const promosAmount = promosAmountMap.get(payout);
    const isBestValue = receivedAmount === Math.max(...Array.from(payoutMap.values()));

    result.push({ payout: payout as PayoutType, receivedAmount, promosAmount, isBestValue });
  });

  return result;
}

const client = axios.create({
  baseURL: 'https://migremmit-api.onrender.com/api/v1',
});

export const getRemittanceProviders = async (reqBody: GetRemittanceProvidersRequest) => {
  console.log(reqBody);
  const res = await client.post('/', {
    lang: 'en',
    maxAge: 0,
    ...reqBody,
  });
  const remittanceRes: RemittanceProviderResponse = res.data.data.results;
  return {
    options: getUniquePayouts(remittanceRes.providerQuotes),
  };
};
