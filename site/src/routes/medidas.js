var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:token", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:token", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/tempo-real-1/:token", function (req, res) {
    medidaController.buscarTipoCaminhao(req, res);
})

router.get("/tempo-real-2/:token", function (req, res) {
    medidaController.buscarStatSensor(req, res);
})

router.get("/tempo-real-3/:token", function (req, res) {
    medidaController.buscarQtdCaminhao(req, res);
})

router.get("/tempo/:token/:idCaminhao", function (req, res) {
    medidaController.buscarStatSensorCam(req, res);
})

module.exports = router;