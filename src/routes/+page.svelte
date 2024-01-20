<script>
	export let data;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
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
			<select name="base-currency" id="base-currency" class="w-full rounded-md">
				{#each Object.values(data.data) as currency}
					<option>{currency.name}</option>
				{/each}
			</select>
		</div>
		<div class="">
			<label for="base-currency" class="mb-2 block text-white">Amount</label>
			<input type="text" name="base-currency" id="base-currency mb-3" class="w-full rounded-md" />
		</div>
		<div class="mt-16">
			<label for="base-currency" class="mb-2 block text-white">Convert to</label>
			<input type="text" name="base-currency" id="base-currency mb-3" class="w-full rounded-md" />
		</div>
	</form>
</section>
