// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
	// check if we need to save what we already have in localStorage
	var currentStorage = localStorage.getItem(key);
	var newStorage;
	if (currentStorage === null) {
		// nothing in storage for this key, so just save as array of one
		newStorage = JSON.stringify([data]);
	} else {
		// we have stuff in storage for this key (as an array) so add to it
		var currentStorageArray = JSON.parse(currentStorage);
		currentStorageArray.push(data);
		newStorage = JSON.stringify(currentStorageArray);
	}
	localStorage.setItem(key, newStorage);
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
