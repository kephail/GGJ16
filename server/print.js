var SerialPort = require('serialport').SerialPort;
var serialPort = new SerialPort('/dev/ttyACM0', { baudrate: 19200 });
var Printer = require('thermalprinter');

module.exports = {

  ready: function(callback) {
    serialPort.on('open',function() {

      console.log('Serial port open');

    	var printer = new Printer(serialPort, {
        maxPrintingDots: 3,
        heatingTime: 250,
        heatingInterval: 100
      });

    	printer.on('ready', function() {
        console.log('Printer ready');
        callback(printer);
    	});

    });
  },

  barcode: function(printer, number, callback) {
    printer
      .barcodeTextPosition(0)
      .barcodeHeight(100)
      .barcode(Printer.BARCODE_TYPES.CODE128, number)
      .printImage(__dirname + '/pete.png')
      .printLine('PETER JONES (NOT THE DRAGON)')
      .barcode(Printer.BARCODE_TYPES.CODE128, number)
      .print(function() {
        console.log('Probably finished printing');
        callback();
      });
  }

};
