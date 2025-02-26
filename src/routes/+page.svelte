<script lang="ts">
	import currencies from '$lib/data/currencies.json';
	export let form;
	import { enhance } from '$app/forms';
	import verticalSwap from '$lib/images/swap-vertical-sharp.svg';
	import horizontalSwap from '$lib/images/swap-horizontal-sharp.svg';
	import time from '$lib/images/time.svg';
	import { fade, scale, blur } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { PUBLIC_API_KEY } from '$env/static/public';

	$: historicalRate = form?.historicalRate;
	let date = form?.date ?? null;

	let conversionRate: number = 0;

	const formatter = new Intl.NumberFormat(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});

	let myForm: HTMLFormElement;

	let baseCurrency: string | null = null;

	let targetCurrency: string | null = null;

	let amountToConvert: any = form?.amountToConvert ?? null;

	$: formattedAmount = formatter.format(Number(amountToConvert));

	let convertedAmount: number | null = null;

	$: convertedAmount = amountToConvert * conversionRate;

	async function getConversionRate(baseCurrency: string, targetCurrency: string) {
		try {
			const response = await fetch(
				`https://api.freecurrencyapi.com/v1/latest?apikey=${PUBLIC_API_KEY}&currencies=${targetCurrency}&base_currency=${baseCurrency}`
			);
			if (!response.ok) {
				throw new Error(`HTTP error: ${response.status}`);
			}
			const result = await response.json();

			const conversionRate = result.data[targetCurrency];

			return conversionRate;
		} catch (error) {
			console.error(error);
			return { error: 'Unable to fetch currencies' };
		}
	}

	async function fetchData() {
		console.log(baseCurrency);
		console.log(targetCurrency);
		if (!targetCurrency || !baseCurrency) {
			return;
		} else {
			conversionRate = await getConversionRate(baseCurrency, targetCurrency);
		}
	}

	function handleSwap() {
		if (baseCurrency && targetCurrency && baseCurrency !== targetCurrency) {
			const cached = baseCurrency;
			baseCurrency = targetCurrency;
			targetCurrency = cached;
			setTimeout(() => {
				fetchData();
			}, 100);
		}
	}
</script>

<svelte:head>
	<title>Currency X</title>
	<meta name="description" content="Real time exchange rates at your fingertips" />
</svelte:head>

<header>
	<div class="h-[236px] w-full rounded-bl-[20px] rounded-br-[20px] bg-red-500">
		<div class="flex h-full items-center justify-center">
			<div class="flex basis-2/3 flex-col justify-center">
				<div class="h-[42px] w-[258px] font-piazzolla text-2xl font-bold tracking-wider text-white">
					<a href="/"> <span class="rotate-180">🅲</span>🆄🆁🆁🅴🅽🅲🆈-🆇</a>
				</div>
				<h1
					class="h-[78px] w-[196px] text-justify font-piazzolla text-base font-semibold text-white"
				>
					Real time exchange rates at your fingertips
				</h1>
			</div>
			<p class="text-5xl hover:animate-spin">💸</p>
		</div>
	</div>
</header>

<section class="mx-auto mt-10 md:max-w-4xl">
	<form
		id="myform"
		method="POST"
		class="mx-auto max-w-[80%]"
		use:enhance
		bind:this={myForm}
		on:submit|preventDefault
	>
		<!-- currencies input -->
		<div class="flex w-full flex-col gap-3 md:flex-row">
			<div class="w-full">
				<!-- base currency input -->
				<label for="base-currency" class="mb-2 block text-white">Select Base Currency</label>
				<select
					name="base-currency"
					id="base-currency"
					class="w-full rounded-md p-1"
					bind:value={baseCurrency}
					on:change={fetchData}
				>
					{#each Object.values(currencies.data) as currency}
						<option value={currency.code}>{currency.code} ({currency.name})</option>
					{/each}
				</select>
			</div>
			<!-- swap button -->
			<button
				class="hidden h-6 w-6 shrink-0 self-end rounded-md bg-white p-1 hover:bg-slate-200 md:block"
				type="button"
				on:click|preventDefault={handleSwap}
				><img src={horizontalSwap} alt="" /><span class="sr-only">Swap currencies</span></button
			>
			<button
				class="h-6 w-6 shrink-0 self-center rounded-md bg-white p-1 hover:bg-slate-200 md:hidden"
				type="button"
				on:click|preventDefault={handleSwap}
				><img src={verticalSwap} alt="" /><span class="sr-only">Swap currencies</span></button
			>
			<!-- target currency button -->
			<div class="w-full">
				<label for="target-currency" class="mb-2 block text-white">Convert to</label>
				<select
					name="target-currency"
					id="target-currency"
					class="w-full rounded-md p-1"
					bind:value={targetCurrency}
					on:change={fetchData}
				>
					{#each Object.values(currencies.data) as currency}
						<option value={currency.code}>{currency.code} ({currency.name})</option>
					{/each}
				</select>
			</div>
		</div>
		<!-- conversion rate -->
		{#if conversionRate !== 0}
			<p transition:blur class="mt-5 italic text-white">
				Conversion rate: 1 {baseCurrency} = {Number(conversionRate).toFixed(6)}
				{targetCurrency}
			</p>
			<div class="flex flex-col justify-between gap-6 md:flex-row">
				<div class="mt-6 w-1/2">
					<label for="amount-to-convert" class="mb-2 block text-white md:inline-block"
						>Amount to convert</label
					>
					<input
						type="text"
						pattern="\d*"
						maxlength="12"
						name="amount-to-convert"
						id="amount-to-convert"
						autocomplete="off"
						class="w-full rounded-md p-1"
						bind:value={amountToConvert}
					/>
				</div>
				<hr class="mt-5" />

				{#if amountToConvert}
					<div class="md:justify-end md:self-end">
						<p class="text-white">
							{formattedAmount}
							{baseCurrency} = {formatter.format(Number(convertedAmount))}
							{targetCurrency}
						</p>
					</div>
				{/if}
			</div>
			
		{/if}

		<hr class="mt-5" />
		
		<!-- amount conversion -->
		{#if form}
			<div class="flex flex-col justify-between gap-6 md:flex-row">
				<div class="mt-6 w-1/2">
					<label for="amount-to-convert" class="mb-2 block text-white md:inline-block"
						>Amount to convert</label
					>
					<input
						type="text"
						pattern="\d*"
						maxlength="12"
						name="amount-to-convert"
						id="amount-to-convert"
						autocomplete="off"
						class="w-full rounded-md p-1"
						bind:value={amountToConvert}
					/>
				</div>

				{#if amountToConvert}
					<div class="md:justify-end md:self-end">
						<p class="text-white">
							{formattedAmount}
							{baseCurrency} = {formatter.format(Number(convertedAmount))}
							{targetCurrency}
						</p>
					</div>
				{/if}
			</div>
			<hr class="mt-5" />

			<!-- Historical -->
			<div class="mt-6 flex flex-row gap-5 md:flex-row">
				<div class="w-2/3">
					<label for="date-picker" class="mb-2 block text-white"
						>Want to check the past performance?<br />
						Pick a date</label
					>
					<input
						class="w-full rounded-md p-1"
						type="date"
						placeholder="Pick a date"
						id="date-picker"
						name="date"
						bind:value={date}
						min="2000-01-01"
						max={new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0]}
					/>
				</div>
				<button
					formaction={`?/historical&conversion-rate=${conversionRate}`}
					class="w-1/3 shrink-0 self-end rounded-md bg-white p-1 hover:bg-slate-200"
				>
					<img src={time} alt="" class="inline" /> Go back in time
				</button>
			</div>
			{#if form?.historicalRate}
				<p class="mt-5 self-end italic text-white">
					Historical Rate: {historicalRate.toFixed(6)}
					<br />({conversionRate < historicalRate ? '+' : ''}{(
						historicalRate - conversionRate
					).toFixed(6)} compared to today)
				</p>
			{/if}
		{/if}
	</form>
</section>
