import { PUBLIC_API_KEY } from '$env/static/public'

export const actions = {
 historical: async ({ request, url }) => {
        
        const formData = await request.formData()
        console.log(formData);
        const baseCurrency = formData.get('base-currency');
        const amountToConvert = formData.get('amount-to-convert');
        const targetCurrency = formData.get('target-currency');
        const date = formData.get('date');
        const conversionRate = url.searchParams.get('conversion-rate')
        console.log(date);
        try {
            const response = await fetch(`https://api.freecurrencyapi.com/v1/historical?apikey=${PUBLIC_API_KEY}&currencies=${targetCurrency}&base_currency=${baseCurrency}&date=${date}`

            )
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`)
            }
            const result = await response.json();
            console.log(result);
            console.log(baseCurrency);
            console.log(targetCurrency);
            console.log(date);
            console.log(Object.values(result));


            const historicalRate = result.data[date][targetCurrency];
            console.log(historicalRate);

            return {
                success: true, 
                date, historicalRate,
                conversionRate,
                baseCurrency, targetCurrency,
                amountToConvert
            };
        }
        catch (error) {
            console.error(error)
            return { error: 'Unable to fetch currencies' }
        }
    }
}