// import { PUBLIC_API_KEY } from '$env/static/public'

// export async function load({fetch }) {
    
 
//     const response = await fetch(
//         `https://api.freecurrencyapi.com/v1/latest?apikey=${PUBLIC_API_KEY}&currencies=${targetCurrency}&base_currency=${baseCurrency}`
//     );

//     if (!response.ok) {
//         throw new Error(`HTTP error: ${response.status}`)
//     }
//     const result = await response.json();
//     return result
//     console.log(result);
//     console.log(targetCurrency);

//     conversionRate = result.data[targetCurrency]
//     console.log(conversionRate);


// };

// // export async function fetchConversion(
// // 		/** @type {string} */ baseCurrency,
// // 		/** @type {string} */ targetCurrency
// // ) {
// //     const response = await fetch(
// //         `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&currencies=${targetCurrency}&base_currency=${baseCurrency}`
// //     );

// //     if (!response.ok) {
// //         throw new Error(`HTTP error: ${response.status}`)
// //     }
// //     const result = await response.json();
// //     console.log(result);
// //     console.log(targetCurrency);

// //     conversionRate = result.data[targetCurrency]
// //     console.log(conversionRate);


// // };


// // export const load = async ({ fetch }) => {
// //     const response = await fetch(
// //         `https://api.freecurrencyapi.com/v1/currencies?apikey=${API_KEY}`
// //     )
// //     const currencies = await response.json()
// //     return currencies

// // }

