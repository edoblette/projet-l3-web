const ModuleBase = load("com/base"); // import ModuleBase class

class Base extends ModuleBase {

	constructor(app, settings) {
		super(app, new Map([["name", "baseapp"], ["io", true]]));
		this.user=new Array();
	}

	/**
	 * @method hello : world
	 * @param {*} req 
	 * @param {*} res 
	 * @param  {...*} params : some arguments
	 */
	hello(req, res, ... params) {
		let answer = ["hello", ...params, "!"].join(" "); // say hello
		trace(answer); // say it
		this.sendJSON(req, res, 200, {message: answer}); // answer JSON
	}

	/**
	 * @method data : random data response
	 * @param {*} req 
	 * @param {*} res 
	 */
	data(req, res) {
		let data = [ // some random data
			{id: 0, name: "data0", value: Math.random()},
			{id: 1, name: "data1", value: Math.random()},
			{id: 2, name: "data2", value: Math.random()},
			{id: 3, name: "data3", value: Math.random()}

		];
		this.sendJSON(req, res, 200, data); // answer JSON
	}

	other(req, res) {
		let data = [ // some random data
			{id: 0, name: "data0", value: Math.random()},
			{id: 1, name: "data1", value: Math.random()},
			{id: 2, name: "data2", value: Math.random()},
			{id: 3, name: "data3", value: Math.random()},
			{id:"coucou,",name:"mehdi",value:10}

		];
		this.sendJSON(req, res, 200, data); // answer JSON
	}

	Identifie(req, res,name)
	{	
		if(this.user.includes(name))
			this.sendJSON(req, res, 200, [{id:false}]);
		else
		{
			this.user.push(name);
			this.sendJSON(req,res,200,[{id:true,value:name}])
		}	

	}
	/**
	 * @method _onIOConnect : new IO client connected
	 * @param {*} socket 
	 */
	_onIOConnect(socket) {
		super._onIOConnect(socket); // do not remove super call
		socket.on("dummy",packet => this._onDummyData(socket, this.user+"\nbonjour le monde")); // listen to "dummy" messages
		}

	_onDummyData(socket, packet) { // dummy message received
		trace(socket.id, "dummy", packet); // say it
	//	socket.emit("dummy",{message:"salut a toi",value:2})
		socket.emit("dummy", {message: packet, value: Math.random()}); // answer dummy random message

	}

}

module.exports = Base; // export app class