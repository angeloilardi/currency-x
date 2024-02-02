import { PUBLIC_API_KEY } from '$env/static/public'

export const actions = {
    default: async ({ request }) => {
        // read the form data sent by the browser
        const formData = await request.formData()
        const baseCurrency = formData.get('base-currency');
        const amountToConvert = formData.get('amount-to-convert');
        const targetCurrency = formData.get('target-currency');
        try {
            const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${PUBLIC_API_KEY}&currencies=${targetCurrency}&base_currency=${baseCurrency}`

            )
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`)
            }
            const result = await response.json();
            console.log(baseCurrency);

            const conversionRate = result.data[targetCurrency];
            console.log(conversionRate);

            return {
                success: true, baseCurrency,
                targetCurrency,
                conversionRate,
                amountToConvert};
        }
        catch (error) {
            console.error(error)
            return { error: 'Unable to fetch currencies' }
        }
    },

    // historical: async ({ request }) => {
    //     const formData = await request.formData()
    //     const baseCurrency = formData.get('base-currency');
    //     const targetCurrency = formData.get('target-currency');
    //     const date = formData.get('date');
    //     try {
    //         const response = await fetch(`https://api.freecurrencyapi.com/v1/historical?apikey=${PUBLIC_API_KEY}&currencies=${targetCurrency}&base_currency=${baseCurrency}&date=${date}`

    //         )
    //         if (!response.ok) {
    //             throw new Error(`HTTP error: ${response.status}`)
    //         }
    //         const result = await response.json();
    //         console.log(result);
    //         console.log(baseCurrency);
    //         console.log(targetCurrency);
    //         console.log(date);
    //         console.log(Object.values(result));


    //         const historicalRate = result.data[date][targetCurrency];
    //         console.log(historicalRate);

    //         return {
    //             success: true, 
    //             baseCurrency,
    //             targetCurrency,
    //             conversionRate,
    //             amountToConvert,
    //             date, historicalRate
    //         };
    //     }
    //     catch (error) {
    //         console.error(error)
    //         return { error: 'Unable to fetch currencies' }
    //     }
    // }
}