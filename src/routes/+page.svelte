<script lang="ts">
	import currencies from '$lib/data/currencies.json';
	export let form;
	import { enhance } from '$app/forms';
	import verticalSwap from '$lib/images/swap-vertical-sharp.svg';
	import horizontalSwap from '$lib/images/swap-horizontal-sharp.svg';
	import time from '$lib/images/time.svg';
	import { fade, scale, blur } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	$: console.log(form);
	$: console.log(conversionRate);
	$: historicalRate = form?.historicalRate;
	let date = form?.date ?? null;

	$: conversionRate = form?.conversionRate;

	const formatter = new Intl.NumberFormat(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});

	let myForm: HTMLFormElement;

	$: baseCurrency = form?.baseCurrency ?? null;

	$: targetCurrency = form?.targetCurrency ?? null;

	let amountToConvert = form?.amountToConvert ?? null;

	$: formattedAmount = formatter.format(amountToConvert);

	let convertedAmount: number | null = null;

	$: convertedAmount = amountToConvert * conversionRate;

	function fetchData() {
		if (!targetCurrency || !baseCurrency) {
			return;
		} else {
			console.log(baseCurrency);
			myForm.submit();
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
		action="?/getConversionRate"
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
{#if form}
			<p transition:blur class="mt-5 italic text-white">
				Conversion rate: 1 {baseCurrency} = {Number(conversionRate).toFixed(6)}
				{targetCurrency}
			</p>
		{/if}
		<!-- amount conversion -->
		{#if form}
			<div class="flex flex-col justify-between gap-6 md:flex-row">
				<div class="mt-5">
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
						<p class="mt-5 text-white">
							{formattedAmount}
							{baseCurrency} = {formatter.format(convertedAmount)}
							{targetCurrency}
						</p>
					</div>
				{/if}
				
			</div>
			<div class="mt-5 flex flex-col gap-5 md:flex-row">
				<div>
					<label for="date" class="text-white mb-2 block">Want to check the past performance? Pick a date</label>
						<input class="mt-3 w-full rounded-md p-1" type="date" name="date" bind:value={date} />
				</div>
					<button
						formaction={`?/historical&conversion-rate=${conversionRate}`}
						class="hidden h-6 w-6 shrink-0 self-end rounded-md bg-white p-1 hover:bg-slate-200 md:block">
						<img src={time} alt="">
						<span class="sr-only">Go back in time</span></button
					>
					{#if form?.historicalRate}
						<p class="text-white self-end">Historical Rate: {historicalRate.toFixed(6)} ({(conversionRate - historicalRate).toFixed(6)})</p>
						<p class="text-white"></p>
					{/if}
				</div>
		{/if}
	</form>
	<!-- {#if form}
		<form action="?/historical&base-currency=EUR&target-currency=USD" method="post" use:enhance>
		<input hidden type="text" name="base-currency" bind:value={baseCurrency} />
		<input hidden type="text" name="conversion-rate" bind:value={conversionRate} />
		<input hidden type="text" name="target-currency" bind:value={targetCurrency} />
		<input hidden type="text" name="amount-to-convert" bind:value={amountToConvert} />
		
		<p class="text-white">Historical rate {historicalRate}</p>
		<button type="submit" class="w-5 bg-white text-white">button</button>
	</form> 
	{/if} -->
</section>
