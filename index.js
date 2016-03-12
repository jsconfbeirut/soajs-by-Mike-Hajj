'use strict';
var soajs = require('soajs');
var config = require('./config.js');

var collection = "data";

var jsconfSRV = new soajs.server.service(config);
jsconfSRV.init(function () {

	jsconfSRV.get("/getInfo", function (req, res) {
		var customTenantConfiguration = req.soajs.servicesConfig;

		if (!customTenantConfiguration || !customTenantConfiguration.demo || !customTenantConfiguration.demo.msg) {
			return res.json(req.soajs.buildResponse({'code': 601, 'msg': config.errors[601]}));
		}

		var txt = customTenantConfiguration.demo.msg + ' ' + req.soajs.inputmaskData.email;

		return res.json(req.soajs.buildResponse(null, txt));
	});

	jsconfSRV.post("/addInfo", [
		function (req, res, next) {
			/**
			 * Initializing DB Connection
			 */
			req.soajs.log.debug("Creating new DB connection to users database.");
			var dbConfiguration = req.soajs.registry.coreDB['users'];
			req.soajs.mongo = new soajs.mongo(dbConfiguration);

			/**
			 * Formulating Document to insert
			 */
			req.soajs.log.debug("Formulating new record: " + JSON.stringify(req.soajs.data));
			req.soajs.data = {
				'username': req.soajs.inputmaskData.username,
				'name': req.soajs.inputmaskData.name,
				'email': req.soajs.inputmaskData.email
			};
			next();

		},
		function (req, res) {

			/**
			 * Inserting Document in DB
			 */
			req.soajs.mongo.insert(collection, req.soajs.data, true, function (error) {
				req.soajs.mongo.closeDb();
				if (error) {
					req.soajs.log.error(error);
					return res.jsonp(req.soajs.buildResponse({'code': 600, 'msg': config.errors[600]}));
				}

				return res.json(req.soajs.buildResponse(null, true));
			});
		}
	]);

	jsconfSRV.start();
});