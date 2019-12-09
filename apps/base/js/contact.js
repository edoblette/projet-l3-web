
class Contact {

	constructor() {
		console.log("loaded");

		this.initialize();
	}

	async initialize() {

		this.iospace = "baseapp"; // IO namespace for this app
		this.io = io.connect("http://localhost/" + this.iospace); // connect socket.io
		this.io.on("connect", () => this.onIOConnect()); // listen connect event

		this.mvc = new MVC("myMVC", this, new ModelContact(), new ViewContact(), new ControllerContact()); // init app MVC
		await this.mvc.initialize(); // run init async tasks
		this.mvc.view.attach(document.body); // attach view
		this.mvc.view.activate(); // activate user interface

	}

	/**
	 * @method test : test server GET fetch
	 */
	async test() {
		console.log("test server hello method");
		let result = await Comm.get("hello/everyone"); // call server hello method with argument "everyone"
		console.log("result", result);
		console.log("response", result.response);
	}

	/**
	 * @method onIOConnect : socket is connected
	 */
	onIOConnect() {
		trace("yay IO connected");
		this.io.on("dummy", packet => this.onDummyData(packet)); // listen to "dummy" messages
		this.io.emit("dummy", {value: "dummy data from client"}) // send test message
	}

	/**
	 * @method onDummyData : dummy data received from io server
	 * @param {Object} data 
	 */
	onDummyData(data) {
		trace("IO data", data);
		this.mvc.controller.ioDummy(data); // send it to controller
	}
}

class ModelContact extends Model {

	constructor() {
		super();
	}

	async initialize(mvc) {
		super.initialize(mvc);

	}

	async data() {
		trace("get data");
		// keep data in class variable ? refresh rate ?
		let result = await Comm.get("data"); // wait data from server
		return result.response; // return it to controller
	}
	async other() {
		trace("get data");
		// keep data in class variable ? refresh rate ?
		let result = await Comm.get("other"); // wait data from server
		return result.response; // return it to controller
	}

}

class ViewContact extends View {

	constructor() {
		super(); 
		this.table = null;
	}

	initialize(mvc) {
		super.initialize(mvc);

		this.utilisateur=createElement("table")
		this.stage.appendChild(this.utilisateur)
		this.stage.style.left = "100px";
		this.stage.style.top = "1000px";
	}

	// activate UI
	activate() {
		super.activate();
		this.addListeners(); // listen to events
	}

	// deactivate
	deactivate() {
		super.deactivate();
		this.removeListeners();
	}

	addListeners(){
	
	}

	removeListeners(){
	
	}

	btnClick(event) {
	}

	ioBtnClick(event){

	}

	inscBtnClick(event){

	}

	update(data,table) {
		while(table.firstChild) table.removeChild(table.firstChild); // empty table
		data.forEach(el => { // loop data
			let line = document.createElement("tr"); // create line
			Object.keys(el).forEach(key => { // loop object keys
				let cell = document.createElement("td"); // create cell
				cell.innerHTML = el[key]; // display
				line.appendChild(cell); // add cell
			});
			table.appendChild(line); // add line
		});
	}
	
	updateIO(value) {
	
	}

}

class ControllerContact extends Controller {

	constructor() {
		super();
	}

	initialize(mvc) {
		super.initialize(mvc);

	}

	async inscWasclicked(params){
		trace("ins click", params);
		//	this.mvc.app.io.emit("dummy", {message: "is click"}); // send socket.io packet

	}
	async btnWasClicked(params) {
		trace("btn click", params);
	}

	async ioBtnWasClicked(params) {
		trace("io btn click", params);
	}

	ioDummy(data) {
	
	}

}