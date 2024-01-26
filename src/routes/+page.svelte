<script lang="ts">
	import currencies from '$lib/data/currencies.json';
	export let form;
	import { enhance } from '$app/forms';

	$: console.log(form);

	$: conversionRate = form?.values.conversionRate;
	// async function fetchConversion(baseCurrency: string, targetCurrency: string) {
	// 	if (baseCurrency && targetCurrency) {
	// 		const response = await fetch(
	// 			`https://api.freecurrencyapi.com/v1/latest?apikey=${PUBLIC_API_KEY}&currencies=${targetCurrency}&base_currency=${baseCurrency}`
	// 		);

	// 		if (!response.ok) {
	// 			throw new Error(`HTTP error: ${response.status}`);
	// 		}
	// 		const result = await response.json();
	// 		console.log(result);
	// 		console.log(targetCurrency);

	// 		conversionRate = result.data[targetCurrency];
	// 		console.log(conversionRate);
	// 	}
	// 	}

	let myForm: HTMLFormElement;

	let baseCurrency = form?.values.baseCurrency ?? null;

	let targetCurrency = form?.values.targetCurrency ?? null;

	let amountToConvert = form?.values.amountToConvert ?? null;

	let convertedAmount: number | null = null;

	$: convertedAmount = amountToConvert * conversionRate;

	function fetchData() {
		if (!targetCurrency || !baseCurrency) {
			return;
		} else {
			myForm.submit();
		}
	}

	// $: baseCurrency = form?.values.baseCurrency
	// $: targetCurrency = form?.values.targetCurrency
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
	<form
		action="/"
		id="myform"
		method="POST"
		class="mx-auto max-w-[80%]"
		use:enhance
		bind:this={myForm}
		on:submit|preventDefault
	>
		<div class="flex w-full flex-col gap-5 md:flex-row">
			<div>
				<label for="base-currency" class="mb-2 block text-white">Select Base Currency</label>
				<select
					name="base-currency"
					id="base-currency"
					class="w-full rounded-md p-1"
					bind:value={baseCurrency}
					on:change={fetchData}
				>
					{#each Object.keys(currencies.data) as currency}
						<option>{currency}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="target-currency" class="mb-2 block text-white">Convert to</label>
				<select
					name="target-currency"
					id="target-currency"
					class="w-full rounded-md p-1"
					bind:value={targetCurrency}
					on:change={fetchData}
				>
					{#each Object.keys(currencies.data) as currency}
						<option value={currency}>{currency}</option>
					{/each}
				</select>
			</div>
		</div>

		{#if form}
			<p class="mt-5 text-white">
				Conversion rate: 1 {baseCurrency} = {conversionRate}
				{targetCurrency}
			</p>
			<div class="mt-5">
				<label for="amount-to-convert" class="mb-2 block text-white">Amount to convert</label>
				<input
					type="number"
					name="amount-to-convert"
					id="amount-to-convert"
					class="w-full rounded-md p-1"
					bind:value={amountToConvert}
				/>
			</div>
		{/if}
		{#if amountToConvert}
			<p class="mt-5 text-white">
				{amountToConvert}
				{baseCurrency} = {convertedAmount}
				{form?.values.targetCurrency}
			</p>
		{/if}

		<!-- <button type="submit" class="text-white">Submit</button> -->
	</form>
</section>
