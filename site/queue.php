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

try {
	// prepare reply
	$reply = new \stdClass();
	$reply->class = "alert-success";

	// sanitize inputs
	$numCashiers = filter_input(INPUT_POST, "numCashiers", FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]]);
	$queue = json_decode($_POST["queue"]);
	if(is_array($queue) === false) {
		throw(new Exception("This queue is highly subject to operator error"));
	}
	$queue = filter_var($queue, FILTER_VALIDATE_INT, ["flags" => FILTER_REQUIRE_ARRAY, "options" => ["min_range" => 1]]);

	// handle degenerate cases
	if(empty($numCashiers) === true) {
		throw(new Exception("Nobody is serving tacos!? So sad...:("));
	}
	if(empty($queue) === true) {
		throw(new Exception("Nobody wants tacos!?!? Parse error!"));
	}

	// serve tacos :D
	$processTime = serveTacos($queue, $numCashiers);
	$reply->data = $processTime;
} catch(\Exception $exception) {
	$reply->class = "alert-danger";
	$reply->message = $exception->getMessage();
}

// send reply
header("Content-type: application/json");
echo json_encode($reply);
