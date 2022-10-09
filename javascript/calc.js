document.addEventListener("DOMContentLoaded", function(){
  // Handler when the DOM is fully loaded
  console.log("loading event listenr...");

  document.querySelectorAll('input').forEach(item => {
    item.addEventListener('blur', event => {
		calcTotals(event);
    })
  })

    let searchParams = new URLSearchParams(window.location.search);
    let trs = searchParams.get('total_round_size') || searchParams.get('trs');

    console.log("found trs param: "+trs);
    // bump for pages

    if (trs) {
      trs = Number(trs);
      console.log("setting trs = "+trs);
      document.querySelector('#tot-rnd-size').value = trs;
    }

  calcTotals();

});

function calcTotals(event) {
    console.log("calc totals...");

    let first_cap_raise = calc_cap_raise(to_percent(document.querySelector('#first_per_round').value));
    document.querySelector('#first .cap-raise').innerHTML = to_currency(first_cap_raise);

    let sec_cap_raise = calc_cap_raise(to_percent(document.querySelector('#sec_per_round').value));
    document.querySelector('#second .cap-raise').innerHTML = to_currency(sec_cap_raise);

    let third_cap_raise = calc_cap_raise(to_percent(document.querySelector('#third_per_round').value));
    document.querySelector('#third .cap-raise').innerHTML = to_currency(third_cap_raise);


   	let per_rnd_acct = calc_per_rnd_acct();
    document.querySelector('#per-rnd-acct').value = per_rnd_acct.toFixed(2);

    let first_calc_per_comp_sold = calc_per_company_sold(first_cap_raise, document.querySelector('#first_cap_val').value);
    document.querySelector('#first .per-comp-sold').innerHTML = first_calc_per_comp_sold.toFixed(2)+"%";

    let sec_calc_per_comp_sold = calc_per_company_sold(sec_cap_raise, document.querySelector('#sec_cap_val').value);
    document.querySelector('#second .per-comp-sold').innerHTML = sec_calc_per_comp_sold.toFixed(2)+"%";

    let third_calc_per_comp_sold = calc_per_company_sold(third_cap_raise, document.querySelector('#third_cap_val').value);
    document.querySelector('#third .per-comp-sold').innerHTML = third_calc_per_comp_sold.toFixed(2)+"%";

    document.querySelector('#per-comp-sold-tot').value = (Number(first_calc_per_comp_sold)+Number(sec_calc_per_comp_sold)+Number(third_calc_per_comp_sold)).toFixed(2);
}

function to_percent(num) {
	if (num) {
		return 	(num / 100);
	}

	return 0;

}

function to_currency(num) {
	const formatter = new Intl.NumberFormat('en-US', {
	  style: 'currency',
	  currency: 'USD',
	  minimumFractionDigits: 2
	});
	return formatter.format(num);
}

// #############################################################################

function calc_cap_raise(val) {
	let tot_rnd_size = document.querySelector('#tot-rnd-size').value;

	let cap_raise = (val * tot_rnd_size);
  return cap_raise;
}

function calc_per_company_sold(raise, valuation) {
  if (!valuation || valuation <= 0) {
    return 0;
  }
	let val =  raise / valuation;
  return val*100;
}


function calc_per_rnd_acct() {
  let first_per = document.querySelector('#first_per_round').value;
  let second_per_sold = document.querySelector('#sec_per_round').value;
  let third_per_sold = document.querySelector('#third_per_round').value;

  return Number(first_per) + Number(second_per_sold) + Number(third_per_sold);

}
