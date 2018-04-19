<template>
    <div> 
    <mt-popup
	  v-model="showPrinterSelectDialog" style="width:98%">
	  				<mt-cell :title="deviceName"><mt-button size="small"  @click="handlePrinterAddDialog()">添加打印机</mt-button></mt-cell>
			          <div v-if="loading">
			 				<i class="el-icon-loading" ></i> {{loadStatus}}
			          </div>
	</mt-popup>
     <mt-popup v-model="showPrinterAddDialog"  style="width:98%">
      				 <div v-if="loading">
			 				<i class="el-icon-loading" ></i> {{loadStatus}}
			          </div> 
			           <label>已配对打印机</label>
			          <mt-cell v-for="device in pairedDeviceList" :title="device.name+'('+device.address+')'"><mt-button size="small"  @click="doConnectNewBluetooth(device)">连接</mt-button></mt-cell>
			      	 <label>可选打印机<i v-if="scaning" class="el-icon-loading" ></i></label>
			            <mt-cell v-for="device in newDeviceList" :title="device.name+'('+device.address+')'"><mt-button size="small"  @click="doConnectNewBluetooth(device)">连接</mt-button></mt-cell>
			     
	  </mt-popup>           
    </div>
</template> 
<script>
    export default {
        data() {
            return {
            	printer: {
            		"printerId":"1",
            		"usbDeviceName":"",
            		"bluetoothAddr":"" ,
            		"portOpenState":"" 
            	}, 
            	newPrinter:{
            		"usbDeviceName":"",
            		"bluetoothAddr":"" 
            	},
                loading: false, 
                scaning:false,
                loadStatus: "",
                showPrinterSelectDialog:false,
                showPrinterAddDialog:false,
                newDeviceList: [],//新设备列表 
                pairedDeviceList:[], //已配对设备列表
                storedDeviceList:[],//已存储设备列表
                timer:false,
            }
        },
        mounted() {
        	 try{
        	   var printerJSON = JsBridge.getStoredDevice(this.printer.printerId);
             	if(printerJSON){
             	   var printer = JSON.parse(printerJSON);
             	   this.printer.usbDeviceName = printer.usbDeviceName;
             	   this.printer.bluetoothAddr = printer.bluetoothAddr;
             	   this.printer.portOpenState = printer.portOpenState;
             	} 
        		var pairedDevices = JsBridge.getPairedDevices();
            	if(pairedDevices){
            		this.pairedDeviceList = JSON.parse(pairedDevices);
            	}
        	}catch(e){
        		
        	}
        	var self = this;
       
            eventBus.$on('discoverNewDevice',function(data){
                var device = JSON.parse(data);
                if(device.type = 1536){ //只添加打印机
                	var existed = false;
                	for(var i in  self.newDeviceList){
                		if(self.newDeviceList.address == device.address){
                			existed = true;
                			break;
                		}
                	}
                	if(!existed)
                    self.newDeviceList.push(device);
                }
            });  
            
            eventBus.$on('discoverDeviceFinished',function(data){
            	self.scaning = false;
            });  
            
            eventBus.$on('connectStatus',function(type){
               if(type == 5){
               
                   this.$toast("条码打印机已连接");
                   self.loadStatus="条码打印机已连接";
                   self.loading = false; 
                   
                   if(typeof(self.newPrinter.bluetoothAddr) != "undefined" && self.newPrinter.bluetoothAddr != self.printer.bluetoothAddr){
                	   self.printer.bluetoothAddr = self.newPrinter.bluetoothAddr;
                	   self.printer.usbDeviceName = self.newPrinter.usbDeviceName;
                   }
                   self.$global.labelPrinterConnected = true;
                   self.showPrinterAddDialog = false;  
                   self.showPrinterSelectDialog = false;
               } else if(type == 0){
                    self.loading = true;
                    self.$global.labelPrinterConnected = false;
                    self.showPrinterSelectDialog = true;
                    self.retryConnect();
              }else if( type == 4){
                    self.loading = false;
                    self.loadStatus="无效的打印机..";
                    self.showPrinterSelectDialog = true;
                    self.$global.labelPrinterConnected = false;
                     
               }else if( type == 2){
            	     self.loading = true;
            	     self.loadStatus="打印机正在连接..";
            	     self.showPrinterSelectDialog = true;
                     self.$global.labelPrinterConnected = false;
                }
            });  
        },   
        computed: {
        	deviceName () {
                var deviceName ="";
                if( this.printer.usbDeviceName == ""){
                	deviceName = "未设置";
                }else{
                	deviceName = this.printer.usbDeviceName;
                }
                if(this.printer.bluetoothAddr){
            		deviceName += "("+this.printer.bluetoothAddr+")";
            	}
                return deviceName;
            }
        },  
        methods: { 
        	retryConnect(){
        	     const TIME_COUNT = 10;
        	       this.count = TIME_COUNT;
        	       this.timer = setInterval(() => {
        	    	   this.loadStatus="打印机连接已断开..("+this.count+")秒后重连";
        	       if (this.count > 0 && this.count <= TIME_COUNT) {
        	         this.count--;
        	        } else {
        	         clearInterval(this.timer);
        	         this.doConnectBluetooth();
        	        }
        	       }, 1000);
        	 }, 
            doConnectNewBluetooth(row){ 
        		 if(this.printer.bluetoothAddr == row.address){
        				  this.$toast("已连接该打印机");
        				 return ;
        		  }
        		 this.newPrinter.bluetoothAddr = row.address;
        		 this.newPrinter.usbDeviceName = row.name;
        		 this.loading = true;
         		JsBridge.connectBluetooth(this.printer.printerId,row.address,row.name);
         	},
        	doConnectBluetooth(){ 
         		if(this.printer.bluetoothAddr != ""){
         			this.loading = true;
            		this.loadStatus="打印机正在连接..";
            		this.$global.labelPrinterConnected = false;
            		//this.showPrinterSelectDialog = true;
            		JsBridge.connectBluetooth(this.printer.printerId,this.printer.bluetoothAddr,this.printer.usbDeviceName);
       		     }else{
       		    	this.handlePrinterAddDialog();
       		     }
         	 },
        	doScanDevice(){
        		this.scaning = true;
        	    JsBridge.scanDevice();
        	}, 
        	doPrint(printObj){
        		JsBridge.doPrint(printObj);
        	} ,   
        	handlePrinterAddDialog(){
        		this.showPrinterAddDialog = true;
        		this.doScanDevice();
        	}
        }
    }
</script>