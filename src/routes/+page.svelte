<script lang="ts">
	import currencies from '$lib/data/currencies.json';
	import { PUBLIC_API_KEY } from '$env/static/public';

	async function fetchConversion(baseCurrency: string, targetCurrency: string) {
		if (baseCurrency && targetCurrency) {
			const response = await fetch(
				`https://api.freecurrencyapi.com/v1/latest?apikey=${PUBLIC_API_KEY}&currencies=${targetCurrency}&base_currency=${baseCurrency}`
			);
	
			if (!response.ok) {
				throw new Error(`HTTP error: ${response.status}`);
			}
			const result = await response.json();
			console.log(result);
			console.log(targetCurrency);
	
			conversionRate = result.data[targetCurrency];
			console.log(conversionRate);
		}
		}

	let baseCurrency: string;

	let targetCurrency: string| null = null;

	let amountToConvert: number|null = null;

	let conversionRate: number;
	let convertedAmount:number|null = null;

	$: convertedAmount = amountToConvert * conversionRate;
</script>

<svelte:head>
	<title>Currency X</title>
	<meta name="description" content="Real time exchange rates at your fingertips" />
</svelte:head>

<section>
	<header>
		<div class="h-[236px] w-full rounded-bl-[20px] rounded-br-[20px] bg-red-500">
			<div class="flex h-full items-center justify-center">
				<div class="flex basis-2/3 flex-col justify-center">
					<div
						class="h-[42px] w-[258px] font-piazzolla text-2xl font-bold tracking-wider text-white"
					>
						🅲🆄🆁🆁🅴🅽🅲🆈-🆇
					</div>
					<h1
						class="h-[78px] w-[196px] text-center font-piazzolla text-base font-semibold text-white"
					>
						Real time exchange rates at your fingertips
					</h1>
				</div>
				<p class="text-5xl">💸</p>
			</div>
		</div>
	</header>
</section>

<section class="mt-10">
	<form action="" method="post" class="mx-auto max-w-[80%]">
		<div class="mb-3">
			<label for="base-currency" class="mb-2 block text-white">Base Currency</label>
			<select
				name="base-currency"
				id="base-currency"
				class="w-full rounded-md p-1"
				bind:value={baseCurrency}
				on:change={fetchConversion(baseCurrency, targetCurrency)}
			>
				{#each Object.keys(currencies.data) as currency}
					<option>{currency}</option>
				{/each}
			</select>
		</div>
		<div class="mb-3">
			<label for="amount-to-convert" class="mb-2 block text-white">Amount to convert</label>
			<input
				type="string"
				name="amount-to-convert"
				id="amount-to-convert"
				class="w-full rounded-md p-1"
				bind:value={amountToConvert}
			/>
		</div>
		<div class="mt-5">
			<label for="target-currency" class="mb-2 block text-white">Convert to</label>
			<select
				name="target-currency"
				id="target-currency"
				class="w-full rounded-md p-1"
				bind:value={targetCurrency}
				on:change={fetchConversion(baseCurrency, targetCurrency)}
			>
				{#each Object.keys(currencies.data) as currency}
					<option>{currency}</option>
				{/each}
			</select>
		</div>
		<p class="text-white mt-5">Converted Amount</p>
		{#if amountToConvert && targetCurrency }
			<p class="text-white">{amountToConvert} {baseCurrency} = {convertedAmount} {targetCurrency}</p>
			<p class="text-white">Conversion rate: {conversionRate}</p>
		{/if}
		<!-- <div class="mt-3">
			<label for="amount-to-convert" class="mb-2 block text-white">Converted amount</label>
			<input
				type="string"
				name="amount-to-convert"
				id="amount-to-convert"
				class="w-full rounded-md p-1"
				bind:value={convertedAmount}
			/>
		</div> -->
	</form>
</section>
