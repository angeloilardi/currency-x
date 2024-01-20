// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const load = async ({ fetch }) => {
    const response = await fetch(
        'https://api.freecurrencyapi.com/v1/currencies?apikey=fca_live_BMcuGGW6kC0ydLybKx78hJQgWsMHAJKCKPXRfWpa'
    )
    const currencies = await response.json()
    console.log(currencies.data);
    return currencies
   
}
