'use strict';

module.exports = {
    serviceName: "jsconfbeirut",
    serviceGroup: "JSConf",
    requestTimeout: 30,
    requestTimeoutRenewal: 5,
    servicePort: 4111,
    extKeyRequired: true,
	"awareness": true,
    "errors": {
        "600": "Database error",
        "601": "Missing info"
    },
    "schema": {
        "/addInfo": {
            "_apiInfo":{
                "l": "Add Info",
                "group": "Information",
	            "groupMain": true
            },
            "username": {
                "source": ['body.username'],
                "required": true,
                "validation": {
                    "type": "string",
                    "minLength": 4,
                    "maxLength": 8,
                    "pattern": /^[a-zA-Z][0-9a-zA-Z_\-]+$/
                }
            },
            "name": {
                "source": ['body.name'],
                "required": false,
                "default": "anonymous",
                "validation": {
                    "type": "string"
                }
            },
            "email": {
                "source": ['body.email'],
                "required": true,
                "validation": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "address": {"type": "string", "format": "email", "required": true},
                            "primary": {"type": "boolean", "required": true}
                        }
                    },
                    "minItems": 1,
                    "maxItems": 5,
                    "uniqueItems": true
                }
            }
        },
        "/getInfo": {
            "_apiInfo": {
                "l": "Get Info",
                "group": "Information",
                "groupMain": true
            },
            "email": {
                "source": ['query.email'],
                "required": true,
                "validation": {
                    "type": "string",
                    "format": "email"
                }
            }
        }
    }
};