// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// import { PUBLIC_API_KEY } from '$env/static/public';

// export const load = async (
    
// 		baseCurrency: string,
// 		targetCurrency: string
// ) => {
//     const response = await fetch(
//         `https://api.freecurrencyapi.com/v1/latest?apikey=${PUBLIC_API_KEY}&currencies=${targetCurrency}&base_currency=${baseCurrency}`
//     );

//     if (!response.ok) {
//         throw new Error(`HTTP error: ${response.status}`)
//     }
//     const conversionRate = await response.json()
//     console.log('success')
//     return { conversionRate }
    
// };
