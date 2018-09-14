<?php
/**
 * calculates the amount of time to serve tacos on Taco Tuesday
 *
 * @param array $queue array of positive integers representing the amount of time each client spends in the queue
 * @param int $numCashiers positive integer of how many cashiers are on duty
 * @return int amount of time necessary to process the entire queue
 **/
function serveTacos(array $queue, int $numCashiers): int {
	// optimization: one cashier is the sum of the array
	if($numCashiers === 1) {
		return(array_sum($queue));
	}

	// greedily fill the queue based on which cashier is available first
	$cashiers = array_fill(0, $numCashiers, 0);
	while(empty($queue) === false) {
		$next = array_shift($queue);
		$selectedCashier = array_search(min($cashiers), $cashiers);
		$cashiers[$selectedCashier] += $next;
	}

	return(max($cashiers));
}

