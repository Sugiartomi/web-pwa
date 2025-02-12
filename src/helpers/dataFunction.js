import axiosConfig from "../config/axios";
import { GET_DEPOSIT_HISTORY, GET_WITHDRAWAL_HISTORY } from "../store/types/history";

// funtion count estimasi IDR
export const handleAddIdrEstimation = (dataTicker, amount, amountFrozen, symbol) => {
	let allData = dataTicker && dataTicker.filter((el) => el.symbol.slice(0, -3) === symbol)[0]?.last_price * (+amount + +amountFrozen);

	if (symbol === "IDR") {
		allData = +(+amount + +amountFrozen);
	}
	if (!isNaN(allData)) {
		return allData;
	} else {
		return 0;
	}
};

// funtion untuk merubah string ke number
export const changeStringToNumber = (stringValue) => {
	stringValue = stringValue.trim();
	var result = stringValue.replace(/[^0-9]/g, "");
	if (/[,\.]\d{2}$/.test(stringValue)) {
		result = result.replace(/(\d{2})$/, ".$1");
	}
	return parseFloat(result);
};

function handleRawDataHisroty(data) {
	let allData = [];
	data[0].history.forEach((e) => {
		allData.push(e);
	});
	data[0].pending.forEach((e) => {
		allData.push(e);
	});

	allData.sort(function (a, b) {
		const x = new Date(a.date.date);
		const y = new Date(b.date.date);
		// DESC
		return y - x;
	});
	return allData;
}

// function get data API POST METHOD
export const handleGetData = (api, setState, dataBody) => (dispatch, getState) => {
	setTimeout(() => {
		axiosConfig
			.post(api, dataBody)
			.then(({ data }) => {
				if (data.status === "success") {
					let finalData = handleRawDataHisroty(data.data)
					setState(finalData);
					if (api === "depositAsset") {
						return dispatch({
							type: GET_DEPOSIT_HISTORY,
							payload: finalData
						});
					} else {
						return dispatch({
							type: GET_WITHDRAWAL_HISTORY,
							payload: finalData
						});
					}
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, 500);
};
