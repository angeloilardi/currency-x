import { PUBLIC_API_KEY } from '$env/static/public'

export const actions = {
    default: async ({ request }) => {
        // read the form data sent by the browser
        const formData = await request.formData()
        const baseCurrency = formData.get('base-currency');
        const amountToConvert = formData.get('amount-to-convert');
        const targetCurrency = formData.get('target-currency');
        console.log(targetCurrency);
        const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${PUBLIC_API_KEY}&currencies=${targetCurrency}&base_currency=${baseCurrency}`

        )
        const result = await response.json();
        
    
        const conversionRate = result.data[targetCurrency];

        const values = {
            baseCurrency,
            targetCurrency,
            conversionRate,
            amountToConvert
        }
        return {success:true, values};
    }
}